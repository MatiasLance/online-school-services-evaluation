<?php

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->safeLoad();

function sanitizeData($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function sanitizeInput($input)
{
    if (is_array($input)) {
        foreach ($input as $key => $value) {
            $input[$key] = sanitizeInput($value);
        }
        return $input;
    }

    if (is_string($input)) {
        $input = trim($input);
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    }

    return $input;
}

function summarizeWithGemini($title, $feedbackText) {
    $apiKey = $_ENV['GEMINI_KEY'];
    if (!$apiKey) {
        error_log('GEMINI_KEY not set in environment');
        return 'Error: API key not configured.';
    }

    $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" . $apiKey;

    // 🚨 CRITICAL: This prompt is now designed for FULL FEEDBACK TEXT input
    $prompt = "
You are generating a concise, objective summary for a school evaluation report.

Analyze the following student feedback about \"$title\" and extract exactly the following information:

- MCA (Most Common Answer): Identify the most frequently mentioned sentiment or comment. Paraphrase it clearly and concisely. Do not list multiple points — pick the single most recurring theme.
- GWA (General Weighted Average): Extract the average rating if provided. If no numeric average is given, respond with 'N/A'.
- Summary: Write 4–5 neutral, factual sentences summarizing overall sentiment from students/parents/teachers. Focus on strengths, weaknesses, and general tone. Do not include recommendations or opinions.

Do NOT use markdown. Do NOT add headings, bullet points, or embellishments. Use plain text only. Maintain an academic and professional tone suitable for official school records.

Here is the full feedback:
{$feedbackText}

Provide your response strictly in this exact format:
MCA (Most Common Answer): [your answer here]
GWA (General Weighted Average): [number or N/A]
Summary: [your 4–5 sentence summary here]

Do not include any other text before or after this format.
";

    $data = [
        'contents' => [
            ['parts' => [['text' => trim($prompt)]]]
        ]
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        error_log('cURL error for "' . $title . '": ' . curl_error($ch));
        curl_close($ch);
        return 'Error: Could not connect to AI service.';
    }

    curl_close($ch);

    $result = json_decode($response, true);

    if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
        $summary = trim($result['candidates'][0]['content']['parts'][0]['text']);

        if (strpos($summary, 'MCA (Most Common Answer):') === 0 &&
            strpos($summary, 'GWA (General Weighted Average):') !== false &&
            strpos($summary, 'Summary:') !== false) {
            return $summary;
        } else {
            return "MCA (Most Common Answer): Unable to determine\nGWA (General Weighted Average): N/A\nSummary: The system received feedback but could not generate a properly formatted summary.";
        }
    } else {
        error_log('Gemini API error for "' . $title . '": ' . json_encode($result));
        return 'Could not generate summary.';
    }
}

/**
 * Analyzes a list of feedback using Google Gemini (batched) with keyword fallback.
 * 
 * @param string $title
 * @param array $feedbackList
 * @return array
 */
function analyzeFeedbackRatings($title, $feedbackList) {
    $feedbackList = array_values(array_filter(array_map('trim', (array)$feedbackList), 'strlen'));
    
    if (empty($feedbackList)) {
        return [
            'title' => $title,
            'individual_results' => [],
            'top_5_ratings' => [],
            'weighted_average_top5' => null,
            'total_feedback_count' => 0
        ];
    }

    $apiKey = $_ENV['GEMINI_KEY'] ?? null;
    if (!$apiKey) {
        return applyKeywordFallback($title, $feedbackList);
    }

    $aiResult = callGeminiBatch($apiKey, $title, $feedbackList);
    
    if ($aiResult !== null && isValidBatchResult($aiResult, count($feedbackList))) {
        $results = $aiResult;
    } else {
        $results = applyKeywordFallback($title, $feedbackList)['individual_results'];
    }


    usort($results, function($a, $b) {
        $ratingA = isset($a['rating']) && is_numeric($a['rating']) ? (int)$a['rating'] : 0;
        $ratingB = isset($b['rating']) && is_numeric($b['rating']) ? (int)$b['rating'] : 0;
        return $ratingB <=> $ratingA;
    });

    $validRatings = [];
    foreach ($results as $item) {
        if (isset($item['rating']) && is_numeric($item['rating'])) {
            $rating = (int)$item['rating'];
            if ($rating >= 1 && $rating <= 5) {
                $validRatings[] = $rating;
            }
        }
    }

    rsort($validRatings);
    $top5 = array_slice($validRatings, 0, 5);
    $average = !empty($top5) ? round(array_sum($top5) / count($top5), 2) : null;

    return [
        'title' => $title,
        'individual_results' => $results,
        'top_5_ratings' => $top5,
        'weighted_average_top5' => $average,
        'total_feedback_count' => count($feedbackList)
    ];
}

function callGeminiBatch($apiKey, $title, $feedbackList) {
    $items = [];
    foreach ($feedbackList as $i => $fb) {

        $safeFb = str_replace('"', "'", $fb);
        $items[] = ($i + 1) . '. "' . $safeFb . '"';
    }

    $prompt = "
You are an expert feedback analyst. Analyze the following list of user feedback about \"$title\".

For EACH feedback item, output a JSON array of objects with EXACTLY these keys:
- \"feedback\": the original feedback text (verbatim)
- \"sentiment\": either \"Positive\", \"Negative\", or \"Neutral\"
- \"rating\": an integer from 1 to 5 (1=Poor, 2=Fair, 3=Good, 4=Very Good, 5=Excellent)

Respond ONLY with a valid JSON array. No explanations, no markdown, no extra text.

Feedback items:
" . implode("\n", $items) . "

JSON output:";

    $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" . urlencode($apiKey);

    $data = [
        'contents' => [
            ['parts' => [['text' => $prompt]]]
        ]
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error || $httpCode !== 200) {
        error_log("Gemini API error: HTTP $httpCode, cURL: $error, Response: " . substr((string)$response, 0, 300));
        return null;
    }

    $result = json_decode($response, true);
    if (!isset($result['candidates'][0]['content']['parts'][0]['text'])) {
        error_log("Gemini response missing text content");
        return null;
    }

    $jsonStr = trim($result['candidates'][0]['content']['parts'][0]['text']);
    $jsonStr = preg_replace('/^```json\s*|\s*```$/i', '', $jsonStr);
    $parsed = json_decode($jsonStr, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log("Failed to parse Gemini JSON: " . json_last_error_msg() . " | Raw: " . substr($jsonStr, 0, 200));
        return null;
    }

    return is_array($parsed) ? $parsed : null;
}

function isValidBatchResult($result, $expectedCount) {
    if (!is_array($result) || empty($result)) {
        return false;
    }


    if (count($result) < max(1, $expectedCount - 2)) {
        return false;
    }

    foreach ($result as $item) {
        if (!is_array($item)) return false;
        if (!isset($item['feedback'], $item['sentiment'], $item['rating'])) return false;
        if (!in_array($item['sentiment'], ['Positive', 'Negative', 'Neutral'])) return false;
        if (!is_numeric($item['rating'])) return false;
        $rating = (int)$item['rating'];
        if ($rating < 1 || $rating > 5) return false;
    }
    return true;
}

function applyKeywordFallback($title, $feedbackList) {
    $positiveStrong = ['excellent', 'amazing', 'outstanding', 'perfect', 'love', 'awesome'];
    $positiveMild = ['good', 'great', 'nice', 'satisfied', 'helpful', 'pleased'];
    $negativeStrong = ['terrible', 'awful', 'worst', 'horrible', 'hate', 'disgusting'];
    $negativeMild = ['bad', 'poor', 'disappointed', 'frustrating', 'slow', 'useless'];

    $results = [];
    foreach ($feedbackList as $feedback) {
        $lower = strtolower($feedback);
        $sentiment = 'Neutral';
        $rating = 3;

        if (preg_match('/(' . implode('|', $positiveStrong) . ')/i', $lower)) {
            $sentiment = 'Positive';
            $rating = 5;
        } elseif (preg_match('/(' . implode('|', $positiveMild) . ')/i', $lower)) {
            $sentiment = 'Positive';
            $rating = 4;
        } elseif (preg_match('/(' . implode('|', $negativeStrong) . ')/i', $lower)) {
            $sentiment = 'Negative';
            $rating = 1;
        } elseif (preg_match('/(' . implode('|', $negativeMild) . ')/i', $lower)) {
            $sentiment = 'Negative';
            $rating = 2;
        }

        $results[] = [
            'feedback' => $feedback,
            'sentiment' => $sentiment,
            'rating' => $rating
        ];
    }

    $validRatings = array_column($results, 'rating');
    rsort($validRatings);
    $top5 = array_slice($validRatings, 0, 5);
    $average = !empty($top5) ? round(array_sum($top5) / count($top5), 2) : null;

    return [
        'title' => $title,
        'individual_results' => $results,
        'top_5_ratings' => $top5,
        'weighted_average_top5' => $average,
        'total_feedback_count' => count($feedbackList)
    ];
}
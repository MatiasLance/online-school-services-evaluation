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
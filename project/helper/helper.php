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

function summarizeWithGemini($title, $keyword) {
    $apiKey = $_ENV['GIMINI_KEY'];
    if (!$apiKey) {
        error_log('GIMINI_KEY not set in environment');
        return 'Error: API key not configured.';
    }

    $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $apiKey;

    $prompt = "
You are generating a concise, professional summary for a report.
Based on the most common comment or suggestion from participants regarding \"$title\", write 2–3 sentences about the overall sentiment.
Do not use markdown. Keep tone neutral and observational.

Most common feedback for \"$title\": \"$keyword\"

Write a 2–3 sentence summary suitable for presentation to stakeholders:
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
        return trim($result['candidates'][0]['content']['parts'][0]['text']);
    } else {
        error_log('Gemini API error: ' . json_encode($result));
        return 'Could not generate summary.';
    }
}
<?php
function sendRequest($url, $method = 'GET', $data = [])
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 
    // Set request method
    switch ($method) {
        case 'GET':
            curl_setopt($ch, CURLOPT_HTTPGET, true);
            break;
        case 'POST':
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            break;
    }
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return json_encode(['response' => $response, 'http_code' => $httpCode]);
}
?>
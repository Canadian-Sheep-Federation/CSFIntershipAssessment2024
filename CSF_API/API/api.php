<?php
require_once '../../database_CSF.php';
require_once 'api_functions.php';
// Get the request method
$method = $_SERVER['REQUEST_METHOD'];
// Get the requested endpoint
$endpoint = $_SERVER['PATH_INFO'];

// Set the response content type
header('Content-Type: application/json');
// Process the request
switch ($method) {
    case 'GET':
        if ($endpoint === '/surveys') {
            // Get all employees
            $survey = getSurveys($connection);
            echo json_encode($survey);
        } elseif (preg_match('/^\/surveys\/(\d+)$/', $endpoint, $matches)) {
                    // Get employee by ID
                    $id = $matches[1];
            $survey = getSurveyById($connection, $id);
            echo json_encode($survey);
        }
        break;
    case 'POST':
        if ($endpoint === '/surveys') {
            // Add new employee
            $data = json_decode(file_get_contents('php://input'), true);
            $result = submitSurvey($connection, $data);
            echo json_encode(['success' => $result]);
        }
        break;
}
?>
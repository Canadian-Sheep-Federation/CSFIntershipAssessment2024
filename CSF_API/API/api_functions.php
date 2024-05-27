<?php

// Function to get all the surveys
function getSurveys($connection) {
    $query = "SELECT * FROM responses";
    $result = $connection->query($query);
    $surveys = array();
    while ($row = $result->fetch_assoc()) {
        $surveys[] = $row;
    }
    return $surveys;
}

// Function to get a survey by id
function getSurveyById($connection, $id) {
    $query = "SELECT * FROM responses WHERE id = ?;";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $survey = $result->fetch_assoc();
    return $survey;
}

#function to submit a survey
function submitSurvey($connection, $survey) {
    $query = "INSERT INTO responses (response, username, dog_name, image_link) VALUES (?, ?, ?, ?)";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('ssss', $survey['response'], $survey['username'], $survey['dog_name'], $survey['image_link']);
    $stmt->execute();
    return $stmt->affected_rows > 0;
}
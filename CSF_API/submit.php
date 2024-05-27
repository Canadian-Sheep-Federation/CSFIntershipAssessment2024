<?php
require_once './API/curl_helper.php';
    #check if the request method is POST, if it is we are submitting a response
if($_SERVER["REQUEST_METHOD"] == "POST"){
    if($_POST['response'] == '' || $_POST['username'] == '' || $_POST['dog_name'] == '' || $_POST['image_link'] == '') {
        echo json_encode(['error' => 'All fields are required']);
        exit();
    }
    $data = [
        'response' => $_POST['response'],
        'username' => $_POST['username'],
        'dog_name' => $_POST['dog_name'],
        'image_link' => $_POST['image_link']
    ];
    $url = 'http://localhost/CSF_API/API/api.php/surveys';
    $response = sendRequest($url, 'POST', $data);
    header('Location: index.php');
}
else{   #if the request method is GET, we are viewing a specific story
    if($_SERVER["REQUEST_METHOD"] == "GET"&&$_GET['id']!=null){
        $id = $_GET['id'];
        header('Location: stories.php?id='.$id);
    }
    else
    echo json_encode(['error' => 'Invalid request method']);
}


?>
<?php

declare(strict_types=1);
if($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = $_POST;

    spl_autoload_register(function ($class) {
        require __DIR__ . "/src/$class.php";
    });

    set_error_handler("ErrorHandler::handleError");
    set_exception_handler("ErrorHandler::handleException");

    header("Content-type: application/json; charset=UTF-8");

    $parts = explode("/", ($_SERVER["REQUEST_URI"]));

    if($parts[2] != "products") {
        http_response_code(404);
        exit;
    }

    $id = $parts[3] ?? null;


    //in production settings, put credentials in seperate config file
    $database = new Database("localhost", "product_db", "root", "");

    $gateway = new ProductGateway($database);

    $controller = new ProductController($gateway);

    $controller->processRequest($_SERVER["REQUEST_METHOD"], $id);
}

?>


<!DOCTYPE html>
<html>
<head>
    <title>Form</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
</head>
<body>
    
    <h1>Form</h1>
    
    <form method="post">
        <label for="name">Tags</label>
        <input type="text" name="name" id="name" required value="<?= htmlspecialchars($_POST["name"] ?? "")?>">
        
        <label for="text">GIF?</label>
        <input type="text" name="text" id="text" required value="<?= htmlspecialchars($_POST["text"] ?? "")?>">
        
        <label for="random">Randomize?</label>
        <input type="checkbox" name="random" id="random" <?= isset($_POST["random"]) ? "1" : "0" ?>>
        <button>Submit</button>
    </form>
    
    <script>
        function submitForm(event) {
            event.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                text: document.getElementById('text').value,
                random: document.getElementById('random').checked ? 1 : 0
            };

            fetch('localhost/csf/productcontroller.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                } else {
                    console.log('Success:', data);
                }
            })
            .catch(error => console.error('Error:', error));
        }
    </script>

</body>
</html>

<html>
<head>
<title>Dog Stories</title>
</head>
<body>
<h1>Dog Stories!</h1>
<?php
require_once './API/curl_helper.php';
$imgUrl=sendRequest('https://dog.ceo/api/breeds/image/random', 'GET');

$imgUrl=json_decode(json_decode($imgUrl, true)['response'], true)['message'];
echo "<img class='dogImage' src='$imgUrl' alt='Random dog image'>";
#This Webpage will display a random dog image and ask the user to submit a story about the dog.
#The Public API I chose displays random dog images. 
#The User will be asked to submit a name for themselves, a name for the dog, and a story about the dog.
#These, along with the image URL are sent to the POST endpoint of my API which stores them in a MySQL Database.
#The user can then click on the "See Stories" link to view all the stories submitted by other users.
#The stories are displayed in a table format with the image, username, dog name, and story.
#The user can also search for a specific response by ID.
#While the version I have submitted here is not live, you can use a live version on my website at:
#https://jordorob.com/CSF_API/index.php
#There may be slight differences as I would like to make the website prettier and more user-friendly.
#This version lacks any CSS or javascript as I did not have time to implement it yet, (Sunday evening).
?>
<form action="submit.php" method="post">
<input type="text" name="username" placeholder="Enter your username" required><br>
<input type="text" name="dog_name" placeholder="Name the dog" required><br>
<textarea name="response" placeholder="Tell us your dog story" required></textarea><br>
<input type="hidden" name="image_link" value="<?php echo $imgUrl; ?>">
<input type="submit" value="Submit">
</form>

<a id="seeStories" href="stories.php">See Stories
</a>

</html>


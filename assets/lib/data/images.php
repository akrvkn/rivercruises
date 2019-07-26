<?php
if (isset($_GET['q'])) {
header('Content-Type: image/jpeg');
$image = file_get_contents('http://tehnotour.ru' . $_GET['q']);
echo  $image;
die();

} else {

 header('HTTP/1.1 404 Not Found');
 die('404 Image not found');

}





?>
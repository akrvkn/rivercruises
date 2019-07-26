<?php
ini_set('display_errors', '1');
header('Content-Type: image/jpeg');

$img = file_get_contents('https://'.$_GET['image']);
echo $img;
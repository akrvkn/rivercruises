<?php
//ini_set('display_errors', '1');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$userhash = 'be2d50f5a7ad5daa6df0163c77b4ee59a2b3dbfc';
if(isset($_GET)) $get = $_GET;
$args = '';
foreach($get as $key=>$val)
{
	$args .= '&'.$key.'='.$val;
}
$url = 'https://booking.mosturflot.ru/api?userhash='.$userhash.$args;
//'&format=json&section=rivercruises&own=false&request=tours';
$out = file_get_contents($url);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
echo $out;

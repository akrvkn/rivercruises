<?php
$id=0;
if(isset($_GET['id'])){
	$id = $_GET['id'];
}

$val = json_decode(@file_get_contents('https://www.mosturflot.ru/wp-json/wp/v2/posts/'.$id));
$out = array();

$media = json_decode(@file_get_contents('https://www.mosturflot.ru/wp-json/wp/v2/media/'.$val->featured_media));
$img_src = $media->media_details->sizes->full->source_url;
$out['id'] = $val->id;
$out['date'] = $val->date;
$out['title'] = $val->title->rendered;
$out['content'] = strip_tags($val->content->rendered, '<table><tr><td>');
$out['image'] = $img_src;
$out['width'] = $media->media_details->width;	

		

$output = json_encode($out);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
echo $output;

?>

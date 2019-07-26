<?php


$posts = json_decode(@file_get_contents('https://www.mosturflot.ru/wp-json/wp/v2/posts?categories=43'));
$out = array();
$count = 0;
foreach($posts as $val){	
	if($val->featured_media > 0 && $count<3){
		$media = json_decode(@file_get_contents('https://www.mosturflot.ru/wp-json/wp/v2/media/'.$val->featured_media));
		$img_src = $media->media_details->sizes->full->source_url;
		$out[$count]['id'] = $val->id;
		$out[$count]['date'] = $val->date;
		$out[$count]['title'] = $val->title->rendered;
		$out[$count]['excerpt'] = strip_tags($val->excerpt->rendered);
		$out[$count]['image'] = $img_src;
		$out[$count]['width'] = $media->media_details->width;
		$count++;
	}	
}
usort($out, function ($item1, $item2) {
    return $item2['date'] <=> $item1['date'];
});

$output = json_encode($out);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
echo $output;


?>

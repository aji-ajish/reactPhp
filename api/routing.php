<?php

// error_reporting(E_ALL);
// ini_set('display_error','1');

require("services/DB.php");
require("./Api.php");
use services\DB;
use Api\Api;

require('controllers/PostsController.php');

//Getting current url

$current_link = $_SERVER['REQUEST_URI'];

//Hndling query string

// if(str_contains($current_link,'?')){
//     $current_link=explode('?',$current_link);
// }
if (strpos($current_link, '?') !== false) {
    $current_link = explode('?', $current_link)[0];
}


//Routs

$urls = [
    '/php/reactPhp/api/posts' => ['PostsController@getPostsFromDatabase'],
    '/php/reactPhp/api/searchresult' => ['PostsController@getSearchResult'],

];

//check if rout available

$availableRoutes = array_keys($urls);

if (!in_array($current_link, $availableRoutes)) {
    header('HTTP/1.0 404 Not found');
    exit;
}


Api::routing($current_link, $urls);
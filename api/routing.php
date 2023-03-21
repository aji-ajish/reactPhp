<?php

// error_reporting(E_ALL);
// ini_set('display_error','1');

require("services/DB.php");
use services\DB;

require('controllers/PostsController.php');

//Getting current url

$current_link = $_SERVER['REQUEST_URI'];

//Routs

$urls = [
    '/php/reactPhp/api/posts' => ['PostsController@getPostsFromDatabase']
];
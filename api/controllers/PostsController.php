<?php

// error_reporting(E_ALL);
// ini_set('display_error','1');
namespace Api\Controllers;

use services\DB;

class PostsController
{
    public $conn = null;

    public function __construct()
    {
        //create connection
        $this->conn = (new DB())->database();
    }

    /**
     * GEtting posts from thired party api.
     */
    public function getPosts()
    {
        try {
            //getting data
            $url = "https://jsonplaceholder.typicode.com/posts";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_ENCODING, 0);
            curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

            //getting image

            $url = "https://jsonplaceholder.typicode.com/photos";
            $chImg = curl_init();
            curl_setopt($chImg, CURLOPT_AUTOREFERER, TRUE);
            curl_setopt($chImg, CURLOPT_HEADER, 0);
            curl_setopt($chImg, CURLOPT_ENCODING, 0);
            curl_setopt($chImg, CURLOPT_MAXREDIRS, 10);
            curl_setopt($chImg, CURLOPT_TIMEOUT, 30);
            curl_setopt($chImg, CURLOPT_CUSTOMREQUEST, "GET");
            curl_setopt($chImg, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($chImg, CURLOPT_URL, $url);
            curl_setopt($chImg, CURLOPT_FOLLOWLOCATION, TRUE);
            curl_setopt($chImg, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));


            $responseData = json_decode(curl_exec($ch), true);
            $responseImage = json_decode(curl_exec($chImg), true);
            $newArray = [];

            //Combining Data

            foreach ($responseData as $resData) {
                if ($responseImage[$resData['id']]) {
                    $resData['image'] = $responseImage[$resData['id']]['url'];
                }
                $newArray[] = $resData;
            }
            $this->savePostsToDatabase($newArray);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
            exit;
        }
    }
    /**
     * save posts in database from api
     */
    public function savePostsToDatabase($posts = null)
    {
        //insert data in database
        foreach ($posts as $post) {

            $sql = "INSERT INTO `posts`(`user_id`, `title`, `content`, `image`) 
                VALUES (
                    '" . $post['userId'] . "',
                    '" . $post['title'] . "',
                    '" . $post['body'] . "',
                    '" . $post['image'] . "')";

            if (mysqli_query($this->conn, $sql)) {
                echo "new record creared Success";
            } else {
                echo "error : " . $sql . "<br/>" . mysqli_error($this->conn);
            }
        }
        mysqli_close($this->conn);
    }

}
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

    /**
     * getting paginated posts from database
     */
    public function getPostsFromDatabase()
    {
        try {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Headers: *");
            // echo "<pre>";
            $perPage = $_GET['limit'] ?? 5;
            $pageNumber = $_GET['offset'] ?? 0;
            $postsArray = [];
            $sql = "SELECT * FROM posts";
            $totlPosts = mysqli_num_rows(mysqli_query($this->conn, $sql));

            $sql = "SELECT * FROM posts ORDER BY id LIMIT $perPage OFFSET $pageNumber";
            $response = mysqli_query($this->conn, $sql);
            if ($response) {
                while ($row = mysqli_fetch_assoc($response)) {
                    $postsArray['posts'][] = $row;
                }
            } else {
                echo "ERROR ." . $sql . "<br />" . mysqli_error($this->conn);
            }
            $postsArray['count'] = $totlPosts;
            mysqli_close($this->conn);
            echo json_encode($postsArray, JSON_PRETTY_PRINT);
            // return json_encode($postsArray, JSON_PRETTY_PRINT);

        } catch (\Exception $e) {
            var_dump($e->getMessage());
            exit;
        }
    }

    /**
     * getting search result from database
     */
    public function getSearchResult()
    {
        try {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Headers: *");
            $postArray=[];
            $keyword=$_GET['keyword'] ?? null;
            if($keyword){
                $sql="SELECT id,title FROM posts WHERE title LIKE '%$keyword%' LIMIT 5; ";
                $response= mysqli_query($this->conn,$sql);
                if($response){
                    while($row =mysqli_fetch_assoc($response)){
                        $postArray['posts'][]=$row;
                    }
                }
            }
            // var_dump($postArray);
            //     die();
            echo json_encode($postArray,JSON_PRETTY_PRINT);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
            exit;
        }
    }
public function getCurrentTopic()
{
    try {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");

        $this->getHeaders();
        $currentTopic =null;
        $id=$_GET['id'??null];
        if($id){
            
        }
    }
    catch (\Exception $e) {
        var_dump($e->getMessage());
        exit;
    }
}
}
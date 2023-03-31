<?php

namespace Api;
class Api
{
    public static function routing($current_link, $urls)
    {
        try {

            foreach ($urls as $index => $url) {
                if ($index != $current_link) {
                    continue;
                }
               
                //gettinh controller and  method  out
                $routeElemet = explode('@',$url[0]);
                $className=$routeElemet[0];
                $function=$routeElemet[1];
                // check if controller present

                if(!file_exists("controllers/".$className.".php")){
                    return "Controller not found";
                }
                $class = "api\controllers\\$className";
                $object = new $class();
                // var_dump($function);exit;
                $object->$function();

            }
        } catch (\Exception $e) {
           var_dump($e->getMessage());
        }
    }
}

<?php 
  if($_SERVER["REQUEST_METHOD"] == "POST") { 
    
  ini_set("display_errors","1");
  ini_set("error_reporting", E_ALL);

  ini_set("max_execution_time","86400");
  ini_set("max_input_time","86400");
  ini_set('memory_limit', '-1');

  if(!isset($_SESSION)) {
    session_start();
} 

    //   echo 'HTTP_SERVER = '.HTTP_SERVER.'<br>';
      
     if(!defined('SCRIPT_DIR')) { 
           define('SCRIPT_DIR', dirname(__FILE__));   
     } 
     $temp_config_url = str_replace("/", "\\", SCRIPT_DIR);
    //  echo 'SCRIPT_DIR = '.SCRIPT_DIR.'<br>';
     $temp_config_url = str_replace('\ajax', '', $temp_config_url); 
    //  echo 'temp_config_url = '.$temp_config_url.'<br>';
     $folder_path = "";    
     $inner_folder = "";   
     $folder_path = "";        
     $array_explode = explode("\\", $temp_config_url);
     if($array_explode) {
            $array_explode = array_reverse($array_explode); 
            if(isset($array_explode[0])){
                if($array_explode[0]){
    
                 $inner_folder = $array_explode[0];
                }
            } 

            if(isset($array_explode[1])){
                if($array_explode[1]){
    
                 $inner_folder_2 = $array_explode[1];
                }
            } 
     }   
     
     $address_url_web_site = "";
     if(isset($_REQUEST['address_url_web_site'])){
        if($_REQUEST['address_url_web_site']!=false){
            $address_url_web_site =  $_REQUEST['address_url_web_site']; // Вот конфиг тянется из .js 

        }
     } 
    //  echo '$address_url_web_site = '.$address_url_web_site.'<br>';
    //  echo '$inner_folder = '.$inner_folder.'<br>';
    //  echo '$inner_folder_2 = '.$inner_folder_2.'<br>';

    //  echo '$address_web_site = '.$address_web_site.'<br>';
     //echo "  address_url_web_site: = ".$address_url_web_site."<br />"; 
     $game_folder = "";
     if(isset($_REQUEST['game_folder'])){
        if($_REQUEST['game_folder']!=false){
            $game_folder =  $_REQUEST['game_folder']; // Вот конфиг тянется из .js 
            // echo '$game_folder = '.$game_folder.'<br>';
            // echo 'HTTP_SERVER = '.$game_folder.'<br>';
        }
    }  




    // ! inserted 1

    // $address_url_web_site = SCRIPT_DIR;
   
    // $address_url_web_site = str_replace($folder.'/'.$game_folder.'/ajax', '', $address_url_web_site);
    // $address_url_web_site = str_replace($folder.'\\'.$game_folder.'\ajax', '', $address_url_web_site);
    // $address_url_web_site = str_replace('\\', '/', $address_url_web_site);
    // $address_url_web_site = str_replace('//', '/', $address_url_web_site);  
    
    // $game_path_address_url_web_site = $address_url_web_site."".$folder."/".$game_folder."/";
    
    
    // require_once('../lib/config_class.php'); 

    // ! inserted 2




    // require_once('../functions_2/games_functions.php');  
    require_once('../functions/functions_dt.php');
    // require_once('../lib/config_class.php'); 
     
    $response = new stdClass();    
    $message = "Error query!";
    $succes = false;
    $width = 0;
    $height = 0;
    $html_message = ""; 
 
    if(isset($_REQUEST['width'])){
        if($_REQUEST['width']!=false){
            $width = (int) $_REQUEST['width']; 
        }
    }
     
    if(isset($_REQUEST['height'])){
        if($_REQUEST['height']!=false){
            $height = (int) $_REQUEST['height']; 
        }
    }

    if(isset($_REQUEST['game_folder'])){
        if($_REQUEST['game_folder']!=false){
            $game_folder = (int) $_REQUEST['game_folder']; 
        }
    } 

    $array_return =  parse_xml_puzzleface( $width, $height, $address_url_web_site );
    if($array_return){
        $succes = true;
       
        if(isset( $array_return['html_puzzleface'] )){
            if($array_return['html_puzzleface']){
              $message = "Success have content!";
              $html_message = $array_return['html_puzzleface'];
            }
        } 
    }     
    $response->success = $succes; 
    $response->messages = $message;
    $response->html_message = $html_message;
    $response->array_return = $array_return;   
 echo json_encode($response); // Вовзращаем все данные!                                 
} // exit   
?>
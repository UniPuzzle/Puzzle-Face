<?php 
  if($_SERVER["REQUEST_METHOD"] == "POST") { 
    
  ini_set("display_errors","1");
  ini_set("error_reporting", E_ALL);

  ini_set("max_execution_time","86400");
  ini_set("max_input_time","86400");
  ini_set('memory_limit', '-1');

  if(!isset($_SESSION)) { // !!! do not delete !!!
    session_start();
  } 

  // print_r($_SESSION);
  // exit();
//$_SESSION['base64result'] = 'empty';

 //   $session_id = session_id();
    // echo '$session_id = ';
    // echo $session_id.'<br>';

    // echo '$_SESSION = ';
    // print_r($_SESSION);
    // echo '<br><br>';
    // exit();





	// echo '$_SESSION$$$$$$$$$$$$$$$$$["base64result"] = ';
	// echo $_SESSION['base64result'];


    

    require_once('../functions/games_functions.php');  
    require_once('../functions/functions.php');
    // require_once('../lib/config_class.php'); 
     
    $response = new stdClass();    
    $message = "Error query!";
    $succes = false;
 
    // $base64result_response = '';
    // $html_message = ""; 
 
    if(isset($_REQUEST['base64result'])){
        if($_REQUEST['base64result']!=false){
            $base64result = $_REQUEST['base64result']; 
        }
    }
    // if(isset($_REQUEST['session_id'])){
    //     if($_REQUEST['session_id']!=false){
    //         $session_id = $_REQUEST['session_id']; 
    //     }
    // }

    $_SESSION['base64result'] = $base64result;  // !!!

    // echo '$_SESSION = ';
    // print_r($_SESSION);
    // exit();
    $response->success = $succes; 
    $response->messages = $message;
    // $response->base64result = $base64result;
    // $response->session_id = $session_id;
    // $response->array_return = $array_return;   
 echo json_encode($response); // Вовзращаем все данные!                                 
} // exit   
?>

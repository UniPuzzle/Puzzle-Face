<?php

function Redirect($url, $permanent = false)
{
  header('Location: ' . $url, true, $permanent ? 301 : 302);

  exit();
}

$myObj = new stdClass();
$response = new stdClass();
$message = "Error query!";
$succes = false;
$server = 'https://puzzleface.letsticktogether.com';

if ($_SERVER["REQUEST_METHOD"] == "GET") {

  $case = "vertical";
  $dirs = array();
  if (isset($_REQUEST['dirs'])) {
    if ($_REQUEST['dirs']) {
      $dirs = ($_REQUEST['dirs']); // clear_string
      $dirs = explode(",", $dirs);
    }
  }

  $tiles = array();
  if (isset($_REQUEST['tiles'])) {
    if ($_REQUEST['tiles']) {
      $tiles = ($_REQUEST['tiles']); // clear_string
      $tiles = explode(",", $tiles);
    }
  }

  if (isset($_REQUEST['case'])) {
    if ($_REQUEST['case']) {
      $case = ($_REQUEST['case']);
    }
  }
  sleep(0.5);
  if (!isset($_SESSION)) { // !!! do not delete !!!
    session_start();
  }

  $data_url = '';
  if (isset($_SESSION['base64result'])) {
    if ($_SESSION['base64result']) {
      $data_url = ($_SESSION['base64result']);
    }
  }

  $myObj->dirs = $dirs;
  $myObj->tiles = $tiles;
  $myObj->case = $case;
  $myObj->data_url = $data_url;

  $myJSON = json_encode($myObj);
  $filename = uniqid('');

  $myfile = fopen("data/" . $filename . ".json", "w") or die("Unable to open file!");
  fwrite($myfile, $myJSON);
  fclose($myfile);

  // echo $server . '/pdf.php?data=' .  $filename;
  Redirect('/pdf.php?data=' .  $filename, true);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {

  if (isset($_REQUEST['base64result'])) {
    if ($_REQUEST['base64result'] != false) {
      $data_url = $_REQUEST['base64result'];
    }
  }
  if (isset($_REQUEST['dirs'])) {
    if ($_REQUEST['dirs'] != false) {
      $dirs = $_REQUEST['dirs'];
      $dirs = explode(",", $dirs);
    }
  }
  if (isset($_REQUEST['tiles'])) {
    if ($_REQUEST['tiles'] != false) {
      $tiles = $_REQUEST['tiles'];
      $tiles = explode(",", $tiles);
    }
  }
  if (isset($_REQUEST['case'])) {
    if ($_REQUEST['case'] != false) {
      $case = $_REQUEST['case'];
    }
  }

  $myObj->dirs = $dirs;
  $myObj->tiles = $tiles;
  $myObj->case = $case;
  $myObj->data_url = $data_url;

  $myJSON = json_encode($myObj);
  $filename = uniqid('');

  $myfile = fopen("data/" . $filename . ".json", "w") or die("Unable to open file!");
  fwrite($myfile, $myJSON);
  fclose($myfile);

  // echo $server . '/pdf.php?data=' .  $filename;
  $response->success = $succes;
  $response->data = $server . '/pdf.php?data=' .  $filename;
  // $response->base64result = $base64result;
  // $response->session_id = $session_id;
  // $response->array_return = $array_return;   
  echo json_encode($response); // Вовзращаем все данные!             
}

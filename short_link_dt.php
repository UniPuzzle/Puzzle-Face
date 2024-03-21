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
// $server = 'https://puzzleface.letsticktogether.com';
// echo 'SERVER = '.$server;
// exit();
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
  
  Redirect('pdf.php?data=' .  $filename, true);
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

  $response->success = $succes;
  $response->data = 'pdf.php?data=' .  $filename;
  echo json_encode($response); // Вовзращаем все данные!             
}

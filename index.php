<?php 

ini_set("display_errors","1");
ini_set("error_reporting", E_ALL);



        mb_internal_encoding("UTF-8");

        if(!defined('SCRIPT_DIR')) {
            define('SCRIPT_DIR', dirname(__FILE__)); 
        } 


// * START: Define the Device - Mobile or Desktop



require_once("include/about_guest/about_guest.php");

 // ============================= ABOUT Guest ==================================
 $this_mobile_version = 0;
     
 $about_gest_all_user_information = about_guest_get_content();
//  print_r($about_gest_all_user_information);
 
 $counter_gest_is_mobile = 0; 
// Проверяем пк или мобилка
 if(isset($about_gest_all_user_information)){
     if($about_gest_all_user_information){
          
                     if(isset( $about_gest_all_user_information['counter_gest_is_mobile'] )){
                         if($about_gest_all_user_information['counter_gest_is_mobile']){
                             $counter_gest_is_mobile = $about_gest_all_user_information['counter_gest_is_mobile'];
                         }
                     }
      
         
     }
 }
 // ============================ About Guest ====================================
  

 if( $counter_gest_is_mobile == 1  ){  // $POS_have_mac OR  OR $POS_have_ipad 
       $this_mobile_version = 1;    
 }

//  echo '$this_mobile_version = '.$this_mobile_version;

$folder_css = 'css';
$folder_js = 'js';
$folder_functions = 'functions';
$folder_ajax = 'ajax';
$folder_short_link = 'short_link_dt';

//  if($this_mobile_version){
   
//  }
//  else{
//     $folder_css = 'css_2';
//     $folder_js = 'js_2';
//     $folder_functions = 'functions_2';
//     $folder_ajax = 'ajax_2';
//     $folder_short_link = 'short_link_2';
//  }



 // * END: Define the Device - Mobile or Desktop

 $show_google_js_script = '';



        // Виртуальный конфиг 
        $server = 'https://puzzleface.letsticktogether.com';
        $temp_config_url = str_replace("/", "\\", SCRIPT_DIR); 
        $folder_path = ""; 
        $inner_folder = "";            
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
               $folder_path = $array_explode[1];
 
              }
           }
        }    
       
        // Включаем рекламу от гугла
        // $show_google_js_script = true; 
        $address_url_web_site = SCRIPT_DIR;
        $address_url_web_site = str_replace('\\', '/', $address_url_web_site);  
        // require_once('functions/functions.php');  

      //  require_once('../../up_lib/config_class.php');                               // ! 13.01.23 added
         
// echo 'HTTP_SERVER ='. HTTP_SERVER;


        $include_resolution_screen_online_show_in_browser = false;
        $css_style_code = 'display:none;';
        if($include_resolution_screen_online_show_in_browser){
            $css_style_code = 'position:absolute;right:0;z-index:5; opacity:0.8;';
        }
    
?> 
<!DOCTYPE html>
<html lang="en"> 
<head>

  <!-- Google tag (gtag.js) --> 
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-JN56ZXGSKW"></script>
  <script> 
    window.dataLayer = window.dataLayer || []; 
    function gtag(){dataLayer.push(arguments);} 
    gtag('js', new Date()); 

    gtag('config', 'G-JN56ZXGSKW'); 
  </script>

<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimum-scale=1">
  <title>Create Your Puzzle Face™ Image Key</title>
  <meta name="description" content="With Puzzle Face™, one single 300-piece puzzle can be assembled and re-assembled, again and again to make any face. To start, sort the 300 pieces" />
  <meta name="keywords" content="puzzle face, face to picture, face pic, puzzle maker, make your own puzzle, make a puzzle from a photo, make a custom puzzle, picture puzzle maker, create puzzle, create your own puzzle, face puzzle, free puzzle maker, puzzle maker online, custom made puzzles, puzzle face art" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="robots" content="index,noodp,follow" />
  <meta name="content-language" content="en-US">
  <meta name="publisher" content="StickTogether Products, LLC" />
  <meta name="copyright" content="© 2023" />
  <meta name="author" content="Ken Knowlton, Mark Setteducati" />

  <meta prefix="og:http://ogp.me/ns#">
  <meta property="og:type" content="product">
  <meta property="og:image" content="https://www.unipuzzle.com/puzzleface/v271chv/images/og.png">

  <link rel="icon" type="image/x-icon" href="images/favicon-pf.png">
  <meta property="og:title" content="Create Your Puzzle Face™ Image Key">
  <meta property="og:url" content="https://www.puzzleface.letsticktogether.com/index_Dec_25_2023_v2.php">
  <meta property="og:site_name" content="Create Puzzle">
  <meta property="og:description" content="With Puzzle Face™, one single 300-piece puzzle can be assembled and re-assembled, again and again to make any face. To start, sort the 300 pieces">
  <meta property="og:price:amount" content="39.99">
  <meta property="og:price:currency" content="USD">


    <script type="application/ld+json"> {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Puzzle Face",
    "image": "https://puzzleface.letsticktogether.com/images/puzzle_face_logo_black+tm_dt.svg",
    "description": "With Puzzle Face, one single 300-piece puzzle can be assembled—and re-assembled, again
    and again—to make any face. To start, sort the 300 pieces", "brand": {
    "@type": "Brand",
    "name": "StickTogether Products, LLC" },
    "offers": {
    "@type": "Offer",
    "url": "",
    "priceCurrency": "USD",
    "price": "39.99",
    "availability": "https://schema.org/InStock", "itemCondition": "https://schema.org/NewCondition"
    } }
    </script>


    <link rel="icon" type="image/x-icon" href="images/pf_favicon.svg">
    <link href="<?=$folder_css;?>/reset.css" rel="stylesheet" type="text/css" /> 
    
    <?php 
      if($this_mobile_version){
    ?>
    <link href="<?=$folder_css;?>/style.css" rel="stylesheet" type="text/css" /> 
    <?php
      }else{
    ?>
    <link href="<?=$folder_css;?>/style_dt.css" rel="stylesheet" type="text/css" /> 
    <?php
      }
    ?>

    <?php 
      if(!$this_mobile_version){
    ?>
       <link href="<?=$folder_css;?>/croppie.css" rel="stylesheet" type="text/css" /> 
    <?php
      }
    ?>

   <!-- <link href="https://fonts.googleapis.com/css?family=Archivo+Black&amp;subset=latin-ext" rel="stylesheet" /> --> 
    
    <script type="text/javascript" src="<?=$folder_js;?>/jquery.js"></script>

    <script type="text/javascript" src="<?=$folder_js;?>/jquery.min.js"></script>
   
    <script src="<?=$folder_js;?>/jquery.mousewheel.min.js"></script>

    <?php 
      if($this_mobile_version){
    ?>
      <script type="text/javascript" src="<?=$folder_js;?>/screen_update_online.js" ></script> 
    <?php
      }else{
    ?>  
     <script type="text/javascript" src="<?=$folder_js;?>/screen_update_online_dt.js" ></script> 
    <?php
      }
    ?>

    <?php /* 1. JS GRID - This content for Submit Button */ ?>     
</head> 

<style type="text/css">
    .box{
      width: 300px;
      height: 300px;
      border: 30px solid green;
      background-color: white;
      overflow: hidden;
    }
    .box img{
      cursor: move;
      position: relative;
    } 
</style>

<body id="fi_body">
    <?php /* 2. This content for Submit Button */ ?>
    <input type="hidden" value="<?=$folder_path;?>" id="game_folder" />
    <input type="hidden" value="<?=$address_url_web_site;?>" id="js_address_url_web_site" /> 
    <input type="hidden" id="js_show_google_js_script" value="<?=$show_google_js_script;?>" />
    
    <input type="hidden" id="js_id_path_pdf_php" value="<?= $folder_short_link; ?>.php" /> <!--            13.01.23 added -->



    <div style="<?=$css_style_code;?>">  <?php /* js Pixel browser resolution RESIZE width and Height   */ ?>     
        <input type="text" value="0" id="js_browser_width"   style="margin: 4px;width:30px;background-color:#ccc;"/>
        <input type="text" value="0" id="js_browser_height"  style="margin: 4px;width:30px;background-color:#ccc;"/>
        <input type="text" value="0" id="js_browser_ratio"   style="margin: 4px;width:30px;background-color:#ccc;"/>
    </div>   
    <div id="js_html_content_from_ajax_image"> </div> 


    
    


  <!-- here was js/jigazo_script_functions.js -->
    

    <?php 
      if($this_mobile_version){
    ?>
      <script type="text/javascript" src="<?=$folder_js;?>/jigazo.js"></script>
      <script type="text/javascript" src="<?=$folder_js;?>/puzzleface_zoom.js"></script>
      <script type="text/javascript" src="<?=$folder_js;?>/puzzleface_script.js"></script> 
      <script type="text/javascript" src="<?=$folder_js;?>/jigazo_script_functions.js"></script>

    <?php
      }else{
    ?>
        <script type="text/javascript" src="<?=$folder_js;?>/jigazo_dt.js"></script>
        <script type="text/javascript" src="<?=$folder_js;?>/puzzleface_script_dt.js"></script> 
        <script type="text/javascript" src="<?=$folder_js;?>/jigazo_script_functions_dt.js"></script>
        <script type="text/javascript" src="<?=$folder_js;?>/croppie.js"></script>
    <?php
      }
    ?>
 
      <script type="text/javascript"> 

      //  var load_content_first_step = 1;

      setTimeout(onload_page_when_take_browser_screen_size, 100); 
      </script>
    <!-- <script type="text/javascript" src="js/functions.js"></script>  -->



</body> 
</html> 

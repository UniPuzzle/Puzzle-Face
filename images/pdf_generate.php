<?php
/*
    Link local: http://puzzlebase_unipuzzle_v10.local/crop/v19/pdf.php?dirs=0,3,1,0,0,1,2,1,2,1,1,1,0,2,0,1,2,0,2,0,3,0,1,0,3,0,1,3,3,3,0,3,0,3,2,0,3,2,2,0,0,0,3,0,1,2,2,2,2,0,3,0,1,1,1,0,0,3,3,1,1,1,1,0,3,2,2,1,3,0,3,1,0,0,0,1,1,2,2,2,0,2,3,0,1,2,0,3,0,1,2,2,0,0,2,0,0,2,2,3,0,2,0,3,1,1,1,1,0,2,2,0,0,0,3,0,2,1,3,2,1,2,1,2,0,1,2,2,0,2,1,2,0,0,1,0,2,1,2,2,2,3,0,3,2,0,0,1,1,3,2,1,1,2,1,2,3,0,2,2,2,0,1,3,0,0,3,3,3,0,0,3,0,2,0,2,3,0,2,2,0,3,0,1,2,1,2,1,2,2,1,2,0,3,0,2,2,1,2,2,1,3,3,1,2,2,2,3,1,3,0,2,1,2,1,2,0,0,2,2,3,0,3,3,2,2,0,2,0,3,0,3,1,1,2,2,1,0,1,2,2,1,1,1,1,2,1,2,1,2,1,1,2,0,2,2,3,1,3,3,2,0,3,2,2,1,3,0,3,3,3,1,2,0,1,2,1,1,0,3,0,0,3,3,0,3,0,0,3,2,1,0,3,2,0,0,2,0,0,3&tiles=0,213,232,230,135,269,78,162,141,142,150,250,74,73,270,295,92,291,87,85,3,110,224,233,62,56,296,170,156,33,161,50,60,183,82,96,290,191,86,84,215,128,22,32,154,57,165,253,164,41,273,61,272,274,181,197,90,293,288,72,25,225,122,26,52,65,152,241,151,155,271,260,171,281,70,297,193,93,88,76,125,106,210,114,133,66,266,146,53,261,173,251,285,180,71,198,190,91,187,286,37,10,248,228,124,284,282,174,75,184,262,186,275,283,196,94,299,199,298,83,20,226,139,28,116,157,167,15,54,172,177,166,64,185,294,194,259,58,95,81,16,14,21,235,231,222,45,11,254,160,30,252,143,276,289,192,147,159,97,80,120,24,130,244,236,149,188,145,257,40,246,178,242,55,169,195,237,189,99,280,111,36,134,268,63,267,258,148,292,42,277,278,175,263,89,79,51,279,98,182,48,44,227,247,68,176,27,214,29,256,77,69,255,264,168,238,163,67,287,265,112,115,31,49,153,217,220,113,121,245,59,249,136,144,43,108,137,140,47,127,9,105,109,39,221,102,13,212,209,12,239,179,46,35,158,205,2,129,34,219,104,101,203,202,100,201,7,17,118,132,119,19,208,207,4,200,6,107,18,234,103,218,38,206,1,216,123,126,243,223,23,229,117,5,131,211,8,204,138,240
 
*/
ini_set("display_errors", "0");
// Finish time how macht long load this page
// На крон файлах или страницах показать время загрузки сайта - То есть время при загрузке и при финише показать результат.
function footer_bottom_show_time_how_long_load_this_page($show_time_statistiks = false, $PAGE_START_TIME = 0, $page_start_microtime = 0, $admin = array())
{
  $html_string_time = "";

  if ($show_time_statistiks) {
    // Finish time how macht long load this page
    $PAGE_FINISH_TIME = time();
    $page_finish_microtime = microtime(1);
    // Check how much was spent time on loading the entire page
    $create_start_date = 0;
    $create_finish_date = 0;
    $create_difference_in_time = 0;
    $create_difference_microtime = 0;

    $html_string_time = '';
    if (isset($PAGE_START_TIME)) {
      if ($PAGE_START_TIME) {
        $create_start_date = date('Y-m-d H:i:s', $PAGE_START_TIME);
        $create_finish_date = date('Y-m-d H:i:s', $PAGE_FINISH_TIME);
        $create_difference_microtime = $page_finish_microtime - $page_start_microtime;
        $create_difference_microtime = number_format($create_difference_microtime, 2, '.', '');

        if (isset($admin['id'])) {
          if (in_array($admin['id'], array(1, 2, 14))) {
            $html_string_time  = '  <div style="padding-left:10px; font-size:12px; font-family:Arial, sans-serif; ">
                                               <b>Start:</b> ' . $create_start_date . ' - <b>Finish:</b> ' . $create_finish_date . ' / time: <b>' . $create_difference_microtime . '</b>
                                            </div>
                                         ';
          }
        }
      }
    }
  }

  return $html_string_time;
}


if ($_SERVER["REQUEST_METHOD"] == "GET") {


  // Start ------------ Статистика проверяет время ---------------------------
  // Show time how macht long load this page
  $PAGE_START_TIME = time();
  $page_start_microtime = microtime(1);
  $show_time_statistiks = false;

  ini_set("max_execution_time", "86400");
  ini_set("max_input_time", "86400");
  ini_set('memory_limit', '-1');


  if (!defined('SCRIPT_DIR')) {
    define('SCRIPT_DIR', dirname(__FILE__));
  }

  // Этот код меняет путь а именно  $folder = "interactive-puzzles"; - берет из URL!
  $temp_config_url = str_replace("/", "\\", SCRIPT_DIR);
  $folder = "";

  /*           
        $array_explode = explode("\\", $temp_config_url);
        if($array_explode) {
           $array_explode = array_reverse($array_explode);
           if(isset($array_explode[0])){
              if($array_explode[0]){
                 
                    $folder = $array_explode[0]; 
                    
              }
           }
        }    
        */

  //   echo "SCRIPT_DIR: ".SCRIPT_DIR."<Br />";

  //   echo " ".$folder;



  // В ЭТОМ ФАЙЛЕ КОНФИГ УЖЕ НЕ НАДО!
  //  $folder = "holiday-puzzles";

  //$game_folder = "festive-ignition-v1";// "christmas-circle";   
  // $main_folder_for_image = "puzzlebase";


  $address_url_web_site = SCRIPT_DIR;

  $address_url_web_site = str_replace($folder, '', $address_url_web_site);
  $address_url_web_site = str_replace($folder, '', $address_url_web_site);
  $address_url_web_site = str_replace('\\', '/', $address_url_web_site);
  $address_url_web_site = str_replace('//', '/', $address_url_web_site);

  //  echo "  \n\n  SCRIPT_DIR: ".SCRIPT_DIR." \n\n "; SCRIPT_DIR: Z:\home\puzzlebase_unipuzzle_v10.local\www\crop\v19 address_url_web_site: Z:/home/puzzlebase_unipuzzle_v10.local/www/crop/v19 
  //  echo "  \n\n  address_url_web_site: ".$address_url_web_site." \n\n ";

  // require_once($address_url_web_site . '/up_lib/config_class.php');    
  // require_once($address_url_web_site . 'functions/functions.php');
  require_once($address_url_web_site . '/pdf/include/tcpdf/tcpdf.php');
  //  require_once($address_url_web_site . 'pdf/pdf_jigazo.php');    
  //  require_once($address_url_web_site . '/up_functions/games_functions.php');  
  // require_once($game_path_address_url_web_site . 'functions/functions.php'); 


  // Banner Reklama
  //  include($address_url_web_site."/up_include/google_adsense/google_adsense_banner_big_vertical.php");
  $case = "vertical";
  $dirs = array();
  if (isset($_REQUEST['dirs'])) {
    if ($_REQUEST['dirs']) {
      $dirs = ($_REQUEST['dirs']); // clear_string
      $dirs = explode(",", $dirs);
      // print_r($dirs);

      // echo "<pre>";
      // print_r($dirs);
      // echo "</pre>";
      // exit();
    }
  }

  // echo "<pre>";
  // print_r($dirs);
  // echo "</pre>";
  // exit();
  $tiles = array();
  if (isset($_REQUEST['tiles'])) {
    if ($_REQUEST['tiles']) {
      $tiles = ($_REQUEST['tiles']); // clear_string
      $tiles = explode(",", $tiles);
      // print_r($tiles);

      // echo "<pre>";
      // print_r($tiles);
      // echo "</pre>";
      // exit();
    }
  }

  if (isset($_REQUEST['case'])) {
    if ($_REQUEST['case']) {
      $case = ($_REQUEST['case']);
    }
  }

  if (!isset($_SESSION)) { // !!! do not delete !!!
    session_start();
  }

  $data_url = '';
  if (isset($_SESSION['base64result'])) {
    if ($_SESSION['base64result']) {
      $data_url = ($_SESSION['base64result']);
      // echo "<pre>";
      // print_r(1234567890);
      // print_r($data_url);
      // echo "</pre>";
      // exit();
    }
  }

  if ($dirs and $tiles) {
    // 0        1            2       3            4
    $array_colors_numbers = array('#AA252A', '#33A63A', '#1C3982', '#FFE400', '#F18006');
    // $array_colors_numbers_cmyk = array( 0 => array(0,69,72,0), // array(0,78,75,33), // Red
    //                                     1 => array(22,0,100,26), //array(69,0,65,35), // Green
    //                                     2 => array(55,35,0,0), // array(78,56,0,49), // Blue
    //                                     3 => array(0,11,100,0), // Yellow
    //                                     4 => array(0,47,98,5)  // Orange
    // );
    $array_colors_numbers_cmyk = array(
      0 => array(0, 0, 0, 0), // array(0,78,75,33), // Red
      1 => array(0, 0, 0, 0), //array(69,0,65,35), // Green
      2 => array(0, 0, 0, 0), // array(78,56,0,49), // Blue
      3 => array(0, 0, 0, 0), // Yellow
      4 => array(0, 0, 0, 0)  // Orange
    );


    $array_matrix_placement = array(
      'A30', 'A31', 'A32', 'A33', 'A34', 'A35', 'A36', 'A40', 'A41', 'A42', 'A43', 'A44', 'A45', 'A46', 'A47',
      'A37', 'A38', 'A39', 'B30', 'B31', 'B32', 'B33', 'A48', 'A49', 'B40', 'B41', 'B42', 'B43', 'B44', 'B45',
      'B34', 'B35', 'B36', 'B37', 'B38', 'B39', 'C30', 'B46', 'B47', 'B48', 'B49', 'C40', 'C41', 'C42', 'C43',
      'C31', 'C32', 'C33', 'C34', 'C35', 'C36', 'C37', 'C44', 'C45', 'C46', 'C47', 'C48', 'C49', 'D40', 'D41',
      'C38', 'C39', 'D30', 'D31', 'D32', 'D33', 'D34', 'D42', 'D43', 'D44', 'D45', 'D46', 'D47', 'D48', 'D49',
      'D35', 'D36', 'D37', 'D38', 'D39', 'E30', 'E31', 'E40', 'E41', 'E42', 'E43', 'E44', 'E45', 'E46', 'E47',
      'E32', 'E33', 'E34', 'E35', 'E36', 'E37', 'E38', 'E48', 'E49', 'F40', 'F41', 'F42', 'F43', 'F44', 'F45',
      'E39', 'F30', 'F31', 'F32', 'F33', 'F34', 'F35', 'F46', 'F47', 'F48', 'F49', 'G40', 'G41', 'G42', 'G43',
      'F36', 'F37', 'F38', 'F39', 'G30', 'G31', 'G32', 'G44', 'G45', 'G46', 'G47', 'G48', 'G49', 'H40', 'H41',
      'G33', 'G34', 'G35', 'G36', 'G37', 'G38', 'G39', 'H42', 'H43', 'H44', 'H45', 'H46', 'H47', 'H48', 'H49',
      'H30', 'H31', 'H32', 'H33', 'H34', 'H35', 'H36', 'A50', 'A51', 'A52', 'A53', 'A54', 'A55', 'A56', 'A57',
      'H37', 'H38', 'H39', 'I30', 'I31', 'I32', 'I33', 'A58', 'A59', 'B50', 'B51', 'B52', 'B53', 'B54', 'B55',
      'I34', 'I35', 'I36', 'I37', 'I38', 'I39', 'J30', 'B56', 'B57', 'B58', 'B59', 'C50', 'C51', 'C52', 'C53',
      'J31', 'J32', 'J33', 'J34', 'J35', 'J36', 'J37', 'C54', 'C55', 'C56', 'C57', 'C58', 'C59', 'D50', 'D51',
      'J38', 'J39', 'I40', 'I41', 'I42', 'I43', 'I44', 'D52', 'D53', 'D54', 'D55', 'D56', 'D57', 'D58', 'D59',
      'I45', 'I46', 'I47', 'I48', 'I49', 'J40', 'J41', 'E50', 'E51', 'E52', 'E53', 'E54', 'E55', 'E56', 'E57',
      'J42', 'J43', 'J44', 'J45', 'J46', 'J47', 'J48', 'E58', 'E59', 'F50', 'F51', 'F52', 'F53', 'F54', 'F55',
      'J49', 'I50', 'I51', 'I52', 'I53', 'I54', 'I55', 'F56', 'F57', 'F58', 'F59', 'G50', 'G51', 'G52', 'G53',
      'I56', 'I57', 'I58', 'I59', 'J50', 'J51', 'J52', 'G54', 'G55', 'G56', 'G57', 'G58', 'G59', 'H50', 'H51',
      'J53', 'J54', 'J55', 'J56', 'J57', 'J58', 'J59', 'H52', 'H53', 'H54', 'H55', 'H56', 'H57', 'H58', 'H59'
    );

    //print_r($array_matrix_placement);                                


    $array_colors_img_svg = array(
      0 => 'rjp_pattern_red_v4.svg',     // red
      1 => 'rjp_pattern_green_v4.svg',   // Green
      2 => 'rjp_pattern_blue_v4.svg',    // Blue
      3 => 'rjp_pattern_violet_v4.svg',  // Violet
      4 => 'rjp_pattern_orange_v4.svg' // orange
      // 0 => 'rjp_pattern_red_v4.svg',  // Brown
      // 1 => 'rjp_pattern_green_v4.svg',  // Green
      // 2 => 'rjp_pattern_blue_v4.svg',  // Blue
      // 3 => 'rjp_pattern_yellow_v4.svg',  // Yellow
      // 4 => 'rjp_pattern_orange_v4.svg' );// Orange
    );

    //$backround_text_color  = array('0'=>46,'1'=>38,'2'=>92);
    $array_tiles_letter = array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J");
    $array_tiles_in_line = array();
    $array_symbols_in_line = array();

    //Assign numbers & colors on the back of the tiles
    for ($k = 0; $k < 3; $k++) {
      for ($i = 0; $i < count($array_tiles_letter); $i++) {
        for ($j = 0; $j < count($array_tiles_letter); $j++) {
          $tile_number = 30 + 10 * $k + $j;

          $tile_number = $array_tiles_letter[$i] . $tile_number;
          // echo $tile_number;

          $index = count($array_tiles_in_line);
          // echo $index; // *  $index = 0, 1, 2, 3, ... 298, 299;
          $array_tiles_in_line[$index]['tile'] = $tile_number;
          $index_in_array_matrix_placement  = array_search($tile_number, $array_matrix_placement);
          $z =  floor($index_in_array_matrix_placement / 15);
          $y =  floor($z / 5);

          $remainder_15 = ($index_in_array_matrix_placement % 15);
          $back_number = 15 * $z - $index_in_array_matrix_placement;

          $array_tiles_in_line[$index]['number'] = (15 - $remainder_15) + 15 * $y; // 15 - number of position in the row
          $array_tiles_in_line[$index]['color'] = $z - $y * 5; // 5 - number of colors,  

        }
      }
    }

    if ($case == "vertical") {
      $pdf_page_orientation = 'P';
      $orientation_width = 15;
      $orientation_height = 20;
      $inch_poster_width = 8.5;
      $inch_poster_height = 11;
    } elseif ($case == "horizontal") {
      $pdf_page_orientation = 'L';
      $orientation_width = 20;
      $orientation_height = 15;
      $inch_poster_width = 11;
      $inch_poster_height = 8.5;
    }

    $cell_size = 0.45; // 1.125;
    $inch_poster_left_margin = ($inch_poster_width - ($orientation_width * $cell_size)) / 2;
    $inch_poster_top_margin = ($inch_poster_height - ($orientation_height * $cell_size)) / 2 + 0.4;
    // start 
    $format_pdf_output = "D";
    $color_cmyk = array(0, 0, 0, 15);
    $name_poster = 'V';

    $x_init = $inch_poster_left_margin;
    $y_init = $inch_poster_top_margin;

    $x_init_2 = 7.8;
    $y_init_2 = 0.1;
    $cell_size_2 = 0.04;

    $index = 0;
    $action = "pdf";

    $pageLayout = array($inch_poster_height, $inch_poster_width);

    $pdf = new TCPDF($pdf_page_orientation, PDF_UNIT, $pageLayout, true, 'UTF-8', false);
    // add a page
    $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE . ' 001', PDF_HEADER_STRING, array(0, 64, 255), array(0, 64, 128));
    $pdf->setFooterData(array(0, 64, 0), array(0, 64, 128));

    // 1. Страница первая с рисунками
    $pdf->AddPage();
    // Pictures block

    $img = base64_decode(preg_replace('#^data:image/[^;]+;base64,#', '', $data_url));

    $pdf->Image("@" . $img, $x_init_2, $y_init_2, $cell_size_2 * $orientation_width, $cell_size_2 * $orientation_height);


    /* START OPEN Image FIrst  */
    // for ($i = 0; $i < $orientation_height; $i++) {

    //   $y_c = $y_init_2 + $cell_size_2  * $i;

    //   for ($x = 0; $x < $orientation_width; $x++) {
    //     $x_c = $x_init_2 + $cell_size_2 * $x;

    //     $pdf->SetXY($x_c, $y_c);  // $border

    //     $pdf->Cell($w = $cell_size_2, $h = $cell_size_2, $txt = '', $border = 0, $ln = 0, $align = 'C', $fill = false, $link = '', $stretch = 0, $ignore_min_height = false, $calign = 'T', $valign = 'M');

    //     if ($dirs[$index] == 1) {
    //       // Start Transformation
    //       $pdf->StartTransform();  // Scale by 150% centered by (50,80) which is the lower left corner of the rectangle
    //       $pdf->Rotate(90, $x_c + $cell_size_2 / 2, $y_c + $cell_size_2 / 2); // $dirs[$index] 
    //       $pdf->Image('pdf/images/file_tiles_small_front_1/' . $array_tiles_in_line[$tiles[$index]]['tile'] . '.png', $x_c, $y_c, $cell_size_2, $cell_size_2, 'PNG', '', '', false, 300, '', false, false, 0, 'TL', false, false);
    //       $pdf->StopTransform();   // Stop Transformation     
    //     } elseif ($dirs[$index] == 2) {
    //       // Start Transformation
    //       $pdf->StartTransform();  // Scale by 150% centered by (50,80) which is the lower left corner of the rectangle
    //       $pdf->Rotate(180, $x_c + $cell_size_2 / 2, $y_c + $cell_size_2 / 2); // $dirs[$index] 
    //       $pdf->Image('pdf/images/file_tiles_small_front_1/' . $array_tiles_in_line[$tiles[$index]]['tile'] . '.png', $x_c, $y_c, $cell_size_2, $cell_size_2, 'PNG', '', '', false, 300, '', false, false, 0, 'TL', false, false);
    //       $pdf->StopTransform();   // Stop Transformation     
    //     } elseif ($dirs[$index] == 3) {
    //       // Start Transformation
    //       $pdf->StartTransform();  // Scale by 150% centered by (50,80) which is the lower left corner of the rectangle
    //       $pdf->Rotate(270, $x_c + $cell_size_2 / 2, $y_c + $cell_size_2 / 2); // $dirs[$index] 
    //       $pdf->Image('pdf/images/file_tiles_small_front_1/' . $array_tiles_in_line[$tiles[$index]]['tile'] . '.png', $x_c, $y_c, $cell_size_2, $cell_size_2, 'PNG', '', '', false, 300, '', false, false, 0, 'TL', false, false);
    //       $pdf->StopTransform();   // Stop Transformation     
    //     } else {
    //       $pdf->Image('pdf/images/file_tiles_small_front_1/' . $array_tiles_in_line[$tiles[$index]]['tile'] . '.png', $x_c, $y_c, $cell_size_2, $cell_size_2, 'PNG', '', '', false, 300, '', false, false, 0, 'TL', false, false);
    //     }

    //     $index++;
    //   }
    // }

    //    print_r($array_colors_numbers_cmyk);

    $left_margin = ($inch_poster_width - ($orientation_width * $cell_size)) / 4; // верх
    $vertical_space = $left_margin;
    $horizontal_space = $cell_size; //round(($inch_poster_height - 20*$cell_size)/5.5, 2); 
    $top_margin = ($inch_poster_height - ($orientation_height  * $cell_size)) / 2 - $horizontal_space;

    // $x_init = $left_margin;
    // $y_init = $top_margin; 

    $x_init = $inch_poster_left_margin;
    $y_init = $inch_poster_top_margin;

    $img_svg_width =  0.7 * $cell_size;
    $img_svg_shift_x = ($cell_size - $img_svg_width) / 2;
    $img_svg_shift_y = ($cell_size - $img_svg_width) / 2;

    $border_page_2_cell = 0;
    $index = 'rjp_pattern_red_v4.svg'; // == Red
    $alignment_svg_array = array();
    $alignment_svg_array[$index] = array();
    $alignment_svg_array[$index]['width'] = 0.7 * $cell_size; // width svg
    $alignment_svg_array[$index]['height_to_width'] = 1;
    $alignment_svg_array[$index]['shift_x'] = ($cell_size - $alignment_svg_array[$index]['width']) / 2; // width svg
    $alignment_svg_array[$index]['shift_y'] = ($cell_size - $alignment_svg_array[$index]['width'] *  $alignment_svg_array[$index]['height_to_width']) / 2;

    $index = 'rjp_pattern_green_v4.svg';  // == Green
    $alignment_svg_array[$index] = array();
    $alignment_svg_array[$index]['width'] = 0.72 * $cell_size; // width svg
    $alignment_svg_array[$index]['height_to_width'] = 0.91;
    $alignment_svg_array[$index]['shift_x'] = ($cell_size - $alignment_svg_array[$index]['width']) / 2; // width svg
    $alignment_svg_array[$index]['shift_y'] = ($cell_size - $alignment_svg_array[$index]['width'] *  $alignment_svg_array[$index]['height_to_width']) / 2;

    $index = 'rjp_pattern_blue_v4.svg';  // == Blue
    $alignment_svg_array[$index] = array();
    $alignment_svg_array[$index]['width'] = 0.61 * $cell_size; // width svg
    $alignment_svg_array[$index]['height_to_width'] = 1.2;
    $alignment_svg_array[$index]['shift_x'] = ($cell_size - $alignment_svg_array[$index]['width']) / 2; // width svg
    $alignment_svg_array[$index]['shift_y'] = ($cell_size - $alignment_svg_array[$index]['width'] *  $alignment_svg_array[$index]['height_to_width']) / 2;

    $index = 'rjp_pattern_violet_v4.svg';  // == Violet
    $alignment_svg_array[$index] = array();
    $alignment_svg_array[$index]['width'] = 0.65 * $cell_size; // width svg
    $alignment_svg_array[$index]['height_to_width'] = 1.04;
    $alignment_svg_array[$index]['shift_x'] = ($cell_size - $alignment_svg_array[$index]['width']) / 2; // width svg
    $alignment_svg_array[$index]['shift_y'] = ($cell_size - $alignment_svg_array[$index]['width'] *  $alignment_svg_array[$index]['height_to_width']) / 2;

    $index = 'rjp_pattern_orange_v4.svg'; // == Orange
    $alignment_svg_array[$index] = array();
    $alignment_svg_array[$index]['width'] = 0.71 * $cell_size; // width svg
    $alignment_svg_array[$index]['height_to_width'] = 1;
    $alignment_svg_array[$index]['shift_x'] = ($cell_size - $alignment_svg_array[$index]['width']) / 2; // width svg
    $alignment_svg_array[$index]['shift_y'] = ($cell_size - $alignment_svg_array[$index]['width'] *  $alignment_svg_array[$index]['height_to_width']) / 2;

    // 2- Cтраница с сеточкой
    /* OPEN  Открыть потом  */
    // $pdf->AddPage(); 

    $xx = 0;
    $cell_text_array = array();
    for ($i = 0; $i < $orientation_height; $i++) {
      for ($j = $orientation_width - 1; $j >= 0; $j--) {
        $cell_text_array[$xx] = (floor($i / 5) * 15) + $j + 1;
        $xx++;
      }
    }

    $numbers_index = 0;
    $shift_num_group = 0;
    $border_cell = array('LTRB' => array('width' => 0.009, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(97, 97, 97)));
    $index = 0;






    for ($i = 0; $i < $orientation_height; $i++) {
      $y_c = $y_init + $cell_size * $i; // + $horizontal_space * round(($i+5)/10);
      // Change Color 
      //$pdf->SetTextColor($array_colors_numbers_cmyk[$numbers_index][0], $array_colors_numbers_cmyk[$numbers_index][1], $array_colors_numbers_cmyk[$numbers_index][2], $array_colors_numbers_cmyk[$numbers_index][3] );
      $pdf->SetFont('helvetica', 'b', 14);
      // new 
      for ($j = $orientation_width; $j > 0; $j--) {
        $x_c = $x_init + $cell_size * $j - $cell_size;; //+ $vertical_space * round(($j-2)/5);

        //  РАБОТАЕТ НЕ удалять.. 
        //  $pdf->Image($file='images/tiles_svg/'.$array_colors_img_svg[$numbers_index], $x_c,  $y=$y_c + 0.82, $cell_size, 0, 'PNG', '', '', false, 300, '', false, false, 0, 'TL', false, false);
        $y_svg_shift = 0.36;
        // START ROTATION ========================================
        // Start Transformation
        $pdf->StartTransform();

        $piece_id = $array_matrix_placement[$index];
        $rotate = 0;
        if ($dirs[$index] == 1) {
          $piece_id[1] = 5; // change Rotation Angle = 180
          // Scale by 150% centered by (50,80) which is the lower left corner of the rectangle
          $rotate = 270;
        } elseif ($dirs[$index] == 2) {
          $piece_id[1] = 4; // change Rotation Angle = 180
          // Scale by 150% centered by (50,80) which is the lower left corner of the rectangle
          $rotate = 180;
        } elseif ($dirs[$index] == 3) {
          $piece_id[1] = 5; // change Rotation Angle = 90
          // Scale by 150% centered by (50,80) which is the lower left corner of the rectangle
          $rotate = 90;
        }

        // index, numbers from - array_matrix_placement[piece_id]: 23
        $base_index = array_search($piece_id, $array_matrix_placement);   // Example: 21, 15. 20

        if ($array_tiles_in_line[$tiles[$index]]['number'] == 9) {
          $array_tiles_in_line[$tiles[$index]]['number'] = "";
        }

        // echo $index;
        // exit();

        $rotation_hour_angle = substr($piece_id, 1, 1);
        $pdf->Rotate($rotate, $x_c + $cell_size / 2, $y_c + $cell_size / 2); // $dirs[$index]  
        $svg_image_name_1 = $array_colors_img_svg[$array_tiles_in_line[$tiles[$index]]['color']];   // * $array_colors_img_svg[0] or [1] or [2] or [3] or [4] 
        $w_svg = $alignment_svg_array[$svg_image_name_1]['width'];
        $shift_x_svg = $alignment_svg_array[$svg_image_name_1]['shift_x'];
        $shift_y_svg = $alignment_svg_array[$svg_image_name_1]['shift_y'];

        $svg_image_name = $array_colors_img_svg[$array_tiles_in_line[$tiles[$index]]['color']];
        if ($array_tiles_in_line[$tiles[$index]]['number'] == "") {
          $svg_image_name = str_replace(".svg", "_n9.svg", $svg_image_name);
        }

        // $pdf->ImageSVG($file='images/tiles_svg/'.$svg_image_name, $x_c + $shift_x_svg, $y_c + $shift_y_svg, $w=$w_svg, $h=0, $link='', $align='', $palign='', $border=0, $fitonpage=false);

        $pdf->ImageSVG($file = 'pdf/images/tiles_svg/' . $svg_image_name, $x_c + $shift_x_svg, $y_c + $shift_y_svg, $w = $w_svg, $h = 0, $link = '', $align = '', $palign = '', $border = 0, $fitonpage = false);
        $pdf->SetTextColor($array_colors_numbers_cmyk[$numbers_index][0], $array_colors_numbers_cmyk[$numbers_index][1], $array_colors_numbers_cmyk[$numbers_index][2], $array_colors_numbers_cmyk[$numbers_index][3]);
        $pdf->SetXY($x_c, $y_c);  // $border 
        $pdf->Cell($w = $cell_size, $h = $cell_size, $txt = $array_tiles_in_line[$tiles[$index]]['number'], $border_cell, $ln = 0, $align = 'C', $fill = false, $link = '', $stretch = 0, $ignore_min_height = false, $calign = 'T', $valign = 'M');
        $pdf->StopTransform();

        // FINISH =========================================   

        // ORIGINAL  WORKD 
        //  $pdf->ImageSVG($file='images/tiles_svg/'.$array_colors_img_svg[$numbers_index], $x_c, $y_c + 0.82, $w=$cell_size, $h=0, $link='', $align='', $palign='', $border=0, $fitonpage=false); 
        //  $pdf->SetXY($x_c, $y_c);  // $border 
        //  $pdf->Cell(  $w=$cell_size, $h=$cell_size, $txt=($j+1) + $shift_num_group, $border=0, $ln=0, $align='C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');     
        $index++;
      }
      $numbers_index++;
      if ($numbers_index == 5) {
        $numbers_index = 0;
        $shift_num_group = $shift_num_group + 15;
      }
      //break; 
    }










    //print line 
    $line_style = array('width' => 0.8, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(209, 209, 207));

    $pdf->Line(2.6, 0.5, $cell_size * $orientation_height - 1.2, 0.5, $line_style);

    $line_style = array('width' => 0.02, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => '#9d9fa1');

    $pdf->Line(0.2, 0.1, 7.8, 0.1, $line_style);
    $pdf->Line(0.2, 0.1 + 0.8, 7.8, 0.1 + 0.8, $line_style);
    $pdf->Line(0.2, 0.1, 0.2, 0.1 + 0.8, $line_style);

    $line_style = array('width' => 0.05, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(0, 0, 0));

    $pdf->Line($x_init, $y_init, $x_init + $cell_size * $orientation_width, $y_init, $line_style);
    $pdf->Line($x_init, $y_init, $x_init, $y_init + $cell_size * $orientation_height, $line_style);
    $pdf->Line($x_init + 5 * $cell_size, $y_init, $x_init + 5 * $cell_size, $y_init + $cell_size * $orientation_height, $line_style);
    $pdf->Line($x_init + 10 * $cell_size, $y_init, $x_init + 10 * $cell_size, $y_init + $cell_size * $orientation_height, $line_style);
    $pdf->Line($x_init + 15 * $cell_size, $y_init, $x_init + 15 * $cell_size, $y_init + $cell_size * $orientation_height, $line_style);
    $pdf->Line($x_init, $y_init + 10 * $cell_size, $x_init + $cell_size * $orientation_width, $y_init + 10 * $cell_size, $line_style);
    $pdf->Line($x_init, $y_init + 20 * $cell_size, $x_init + $cell_size * $orientation_width, $y_init + 20 * $cell_size, $line_style);

    //print 
    $pdf->SetTextColor(array(255, 255, 255, 255), array(255, 255, 255, 255), array(255, 255, 255, 255), array(255, 255, 255, 255));

    $pdf->SetXY($x_init + 2 * $cell_size, $y_init - $cell_size);  // $border 
    $pdf->Cell($w = $cell_size, $h = $cell_size, 1, 0, $ln = 0, $align = 'C', $fill = false, $link = '', $stretch = 0, $ignore_min_height = false, $calign = 'T', $valign = 'M');

    $pdf->SetXY($x_init + 7 * $cell_size, $y_init - $cell_size);  // $border 
    $pdf->Cell($w = $cell_size, $h = $cell_size, 2, 0, $ln = 0, $align = 'C', $fill = false, $link = '', $stretch = 0, $ignore_min_height = false, $calign = 'T', $valign = 'M');

    $pdf->SetXY($x_init + 12 * $cell_size, $y_init - $cell_size);  // $border 
    $pdf->Cell($w = $cell_size, $h = $cell_size, 3, 0, $ln = 0, $align = 'C', $fill = false, $link = '', $stretch = 0, $ignore_min_height = false, $calign = 'T', $valign = 'M');

    $pdf->SetXY($x_init + 2 * $cell_size, $y_init + 20 * $cell_size);  // $border 
    $pdf->Cell($w = $cell_size, $h = $cell_size, 4, 0, $ln = 0, $align = 'C', $fill = false, $link = '', $stretch = 0, $ignore_min_height = false, $calign = 'T', $valign = 'M');

    $pdf->SetXY($x_init + 7 * $cell_size, $y_init + 20 * $cell_size);  // $border 
    $pdf->Cell($w = $cell_size, $h = $cell_size, 5, 0, $ln = 0, $align = 'C', $fill = false, $link = '', $stretch = 0, $ignore_min_height = false, $calign = 'T', $valign = 'M');

    $pdf->SetXY($x_init + 12 * $cell_size, $y_init + 20 * $cell_size);  // $border 
    $pdf->Cell($w = $cell_size, $h = $cell_size, 6, 0, $ln = 0, $align = 'C', $fill = false, $link = '', $stretch = 0, $ignore_min_height = false, $calign = 'T', $valign = 'M');

    // $font_size = $pdf->pixelsToUnits('25');
    $pdf->SetFont('helvetica', '', 12);
    $pdf->StartTransform();
    $pdf->Rotate(90, $x_init + 15 * $cell_size + $cell_size, $y_init + 19 * $cell_size + $cell_size / 2);
    $pdf->SetXY($x_init + 15 * $cell_size + $cell_size / 2, $y_init + 19 * $cell_size);  // $border 
    $pdf->Cell($w = $cell_size, $h = $cell_size, '© 2023 StickTogether Products. LLC          www.letsticktogether.com', 0, $ln = 0, $align = 'L', $fill = false, $link = '', $stretch = 0, $ignore_min_height = false, $calign = 'T', $valign = 'M');
    $pdf->StopTransform();

    $pdf->Text($x_init * 3 + 0.2, 0.2, $txt = 'Assemble the 300 pieces using this Image Key as a guide.', false, false, true, 0, 0, '', false, '', 0, false, 'T', 'M', false);
    $pdf->Text($x_init * 3 + 0.2, 0.4, $txt = 'Make sure to attach each piece in the correct orientation.', false, false, true, 0, 0, '', false, '', 0, false, 'T', 'M', false);
    $pdf->Text($x_init * 3 + 0.2, 0.6, $txt = 'When all 300 pieces are connected, lift to reveal the Puzzle Face.', false, false, true, 0, 0, '', false, '', 0, false, 'T', 'M', false);
    $pdf->ImageSVG($file = 'pdf/images/puzzle_face_logog_black_V1.svg', $x_init / 2.2, 0.4, 2, $h = 0, $link = '', $align = '', $palign = '', $border = 0, $fitonpage = false);


    // Start ------------ Статистика проверяет время ---------------------------
    // $show_time_statistiks = true;
    if ($show_time_statistiks) {
      //  print_r($_SESSION);
      $admin = array();
      $admin['id'] = 14; // Vitalii see this Page
      $html_time_load_page = footer_bottom_show_time_how_long_load_this_page($show_time_statistiks, $PAGE_START_TIME, $page_start_microtime, $admin);
      if ($html_time_load_page) {
        echo '<div style="position:relative; float:left; width:100%; padding:10px;">
                            ' . $html_time_load_page . '
                         </div>';
        exit("Script stopped!");
      }
    }

    // Finish  ------------ Статистика проверяет время ---------------------------
    $filename = $case;

    $file =  $pdf->Output($filename, 'S');

    echo $file;
    // Create PDF
    // if ($format_pdf_output == "D") {
    //   $pdf->Output($filename, 'D');
    //   // $pdf->Output($filename, 'D');
    //   // $pdf->Output($filename, 'D');
    //   // return $file =  $pdf->Output($filename, 'S');


    // } elseif ($format_pdf_output == "S") {
    //   // i -  Send PDF to the standard output - В браузер - Вариант Б) Отдать в браузер, но только если на своем сайт и без GET и POST параметров
    //   // F - Save PDF to a local file = в файл на серве в папку - ВАРИАНТ А)
    //   // D - Download PDF as file
    //   // s - Returns PDF as a string   echo "xxxx";
    //   // echo 'test';



    //   $file = $pdf->Output($filename, 'S');

    //   //  return array('file'=>$file, 'filename'=> $filename);
    //   //exit();
    //   $pdf_file_1_horizontal_poster =  $pdf->Output($filename, 'S');
    // } else {

    //   $pdf->Output($filename, $format_pdf_output);
    //   // $pdf->Output($filename, 'D');
    // }
    // exit(); 
  }
} // exit   

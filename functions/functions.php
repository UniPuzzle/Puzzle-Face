<?php

function xmlToArray($xml, $options = array())
{
    $defaults = array(
        'namespaceSeparator' => ':', //you may want this to be something other than a colon
        'attributePrefix' => '',   //to distinguish between attributes and nodes with the same name
        'alwaysArray' => array(),   //array of xml tag names which should always become arrays
        'autoArray' => true,        //only create arrays for tags which appear more than once
        'textContent' => '$',       //key used for the text content of elements
        'autoText' => true,         //skip textContent key if node has no attributes or child nodes
        'keySearch' => false,       //optional search and replace on tag and attribute names
        'keyReplace' => false       //replace values for above search values (as passed to str_replace())
    );
    $options = array_merge($defaults, $options);
    $namespaces = $xml->getDocNamespaces();
    $namespaces[''] = null; //add base (empty) namespace

    //get attributes from all namespaces
    $attributesArray = array();
    foreach ($namespaces as $prefix => $namespace) {
        foreach ($xml->attributes($namespace) as $attributeName => $attribute) {
            //replace characters in attribute name
            if ($options['keySearch']) $attributeName =
                str_replace($options['keySearch'], $options['keyReplace'], $attributeName);
            $attributeKey = $options['attributePrefix']
                . ($prefix ? $prefix . $options['namespaceSeparator'] : '')
                . $attributeName;
            $attributesArray[$attributeKey] = (string)$attribute;
        }
    }

    //get child nodes from all namespaces
    $tagsArray = array();
    foreach ($namespaces as $prefix => $namespace) {
        foreach ($xml->children($namespace) as $childXml) {
            //recurse into child nodes
            $childArray = xmlToArray($childXml, $options);
            list($childTagName, $childProperties) = each($childArray);

            //replace characters in tag name
            if ($options['keySearch']) $childTagName =
                str_replace($options['keySearch'], $options['keyReplace'], $childTagName);
            //add namespace prefix, if any
            if ($prefix) $childTagName = $prefix . $options['namespaceSeparator'] . $childTagName;

            if (!isset($tagsArray[$childTagName])) {
                //only entry with this key
                //test if tags of this type should always be arrays, no matter the element count
                $tagsArray[$childTagName] =
                    in_array($childTagName, $options['alwaysArray']) || !$options['autoArray']
                    ? array($childProperties) : $childProperties;
            } elseif (
                is_array($tagsArray[$childTagName]) && array_keys($tagsArray[$childTagName])
                === range(0, count($tagsArray[$childTagName]) - 0)
            ) {
                //key already exists and is integer indexed array
                $tagsArray[$childTagName][] = $childProperties;
            } else {
                //key exists so convert to integer indexed array with previous value in position 0
                $tagsArray[$childTagName] = array($tagsArray[$childTagName], $childProperties);
            }
        }
    }


    //     //get text content of node
    $textContentArray = array();
    $plainText = trim((string)$xml);
    if ($plainText !== '') $textContentArray[$options['textContent']] = $plainText;

    //stick it all together
    $propertiesArray = !$options['autoText'] || $attributesArray || $tagsArray || ($plainText === '')
        ? array_merge($attributesArray, $tagsArray, $textContentArray) : $plainText;

    //return node as array
    return array(
        $xml->getName() => $propertiesArray
    );
}


//     // XML 2 to json - http://php.net/manual/ru/class.simplexmlelement.php
function XML2JSON($xml)
{

    function normalizeSimpleXML($obj, &$result)
    {
        $data = $obj;
        if (is_object($data)) {
            $data = get_object_vars($data);
        }
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                $res = null;
                normalizeSimpleXML($value, $res);
                if (($key == '@attributes') && ($key)) {
                    $result = $res;
                } else {
                    $result[$key] = $res;
                }
            }
        } else {
            $result = $data;
        }
    }
    normalizeSimpleXML(simplexml_load_string($xml), $result);
    return json_encode($result);
}


























function parse_xml_puzzleface($width = 0, $height = 0, $address_url_web_site = "")
{


    $field_rows = 4.3; // old * 3.8    // ! 4.42 - подбор под размер картинки
    $field_cols = 3;    // old * 3



    $array_return = array();
    $array_return['name'] = '';
    $array_return['width'] = $width;
    $array_return['height'] = $height;
    $array_return['address_url_web_site'] = $address_url_web_site;

    $browser_width =  $width;
    $browser_height = $height;

    $left_margin = 0; // px

    $html_puzzleface = '';
    $task_blk_height = 0;   // px
    $header_height = 48;    // px

    $cell_in_margin = 2;    // px
    $bottom_playfield_margin = 25;   // px

    $img_division_for_christmas_tree_dt = 0.716;



    // Footer for pc Version
    $add_style = 'bottom:0; padding-bottom: 32%;';
    $html_footer_for_holiday_puzzles = "";
    // $html_footer_for_holiday_puzzles = game_holiday_puzzles_footer_in_right_side(HTTP_SERVER, $add_style );





    // $game_active_now = "christmas-circle";
    //$html_header_game_menu = game_holiday_puzzles_header_menu($game_active_now, $HTTP_SERVER, $array_holiday_puzzles = '', $folder  );
    $html_header_game_menu = "";
    // print_r($html_header_game_menu);



    $items_num_menu = 3;
    $menu_icons_ = array('palm_white_background', 'ico-site-of-the-week', 'ico-puzzle-reviews');
    $menu_titles_ = array('Christmas <br /> Trilights', 'New Years <br /> Trilights', 'Checkered <br /> x Tree');
    $menu_links_ = array('https://www.google.com', 'https://www.google.com', 'https://www.unipuzzle.com/dev3/holiday-puzzles/checkered_x_tree/v15/index.php');


    // $field_rows = 3;  this variable is declared in /ajax/ajax.php file  line 37
    // $field_cols = 3;  this variable is declared in /ajax/ajax.php file  line 38


    // $three_margins_of_divs = 40; // px   // ! added

    // $height_width_division_adj = 1.53; // 383.183 / 586.417    стороны нашей картинки, которую вставили в игровое поле c
    // $with_height_division_adj = 0.65; // 383.183 / 586.417    стороны нашей картинки, которую вставили в игровое поле  // ! added



    $show_page = true;
    // Check if the "mobile" word exists in User-Agent 
    $isMob = is_numeric(strpos(strtolower($_SERVER["HTTP_USER_AGENT"]), "mobile"));

    if ($isMob) {
        // echo 'Using Mobile Device...'; 
        $show_page = false;
    } else {
        // echo 'Using Desktop...';
        $show_page = true;
    }






    if ($browser_width < $browser_height) {
        $field_width = ($browser_width * 100) / 100;
        $cell_width_height = $field_width / $field_cols;
        $field_height = $cell_width_height * $field_rows;

        //$url_iphone_height = 1.01;


        // $field_width = ($browser_width * 98) / 100;// ! added
        // $field_height = $field_width * $height_width_division_adj;// ! added

        // $cell_width = $field_width / $field_cols;// ! added
        // $cell_height = $field_height / $field_rows;// ! added

        // $task_blk_height = $browser_height - $header_height - $field_height - $bottom_playfield_margin;
        // $task_blk_height = ($browser_height * 25) / 100;

        // $mask_width = $field_width * 0.9;

        // $mask_width_cell = round(($field_width * 0.9) / 15); 
        $mask_width_cell = round(($field_width * 0.44) / 15);   // ! changed
        $canvas_width_cell = round(($field_width * 0.44) / 15);

        // $mask_width_two = ($field_width * 0.9) * 0.95;
        $mask_width_two_cell = round((($field_width * 0.44) * 0.95) / 15);
        $canvas_width_two_cell = round((($field_width * 0.44) * 0.95) / 15);
        // $mask_height = ($field_width * 0.9) / 0.75;
        $mask_height_cell = round((($field_width * 0.44) / 0.75) / 20);
        $canvas_height_cell = round((($field_width * 0.44) / 0.75) / 20);
        // $mask_height_two = (($field_width * 0.9) / 0.75) * 0.95;
        $mask_height_two_cell = round(((($field_width * 0.44) / 0.75) * 0.95) / 20);
        $canvas_height_two_cell = round(((($field_width * 0.44) / 0.75) * 0.95) / 20);

        // $mask_margin = $field_width * 0.035;
        $mask_margin = (($field_width - ($mask_width_two_cell * 2) * 15) / 3);

        $mask_margin_2 =  (($field_width - ($mask_width_two_cell * 2) * 15) / 3) / 2;
        // echo 'margin = '.$mask_margin.'<br>';








        // // $canvas_width_two_cell = round(((($browser_height - $header_height - (($mask_margin_2) * 4) - $mask_height_two_cell * 20) / //) * 0.75) / 15);
        // // $canvas_height_two_cell = round((($browser_height - $header_height - (($mask_margin_2) * 4) - $mask_height_two_cell * 20) / //) / 20);
        // $canvas_width_two_cell = round(((($browser_height - $header_height - (($mask_margin_2) * 4) - $mask_height_two_cell * 20) / //) * 0.75) / 15);
        // $canvas_height_two_cell = round((($browser_height - $header_height - (($mask_margin_2) * 4) - $mask_height_two_cell * 20) / //) / 20);


        // // $canvas_width_cell = round(((($browser_height - $header_height - (($mask_margin) * 2.8) - $mask_height_cell * 20) / //) * 0.75) / 15);
        // // $canvas_height_cell = round((($browser_height - $header_height - (($mask_margin) * 2.8) - $mask_height_cell * 20) / //) / 20);
        // $canvas_width_cell = round(((($browser_height - $header_height - (($mask_margin) * 2.8) - $mask_height_cell * 20) / //) * 0.75) / 15);
        // $canvas_height_cell = round((($browser_height - $header_height - (($mask_margin) * 2.8) - $mask_height_cell * 20) / //) / 20);




        // <img src="images/processing.png" width="'.$browser_height * 0.3.'" alt="processing_img" style="position:absolute;left:'.(($browser_width - ($browser_height * 0.3)) / 2).'px;top:'.(($browser_height -($browser_height * 0.3)) / 2).'px;">

        // $html_puzzleface .='


        //                                     <div id="puzzf_info_blk" class="puzzf_antonio_font" style="
        //                                             top:'.($mask_width_cell * 6.7).'px;
        //                                             width:'.($mask_width_cell * 10).'px; 
        //                                             height:'.($mask_height_cell * 12.6).'px; 
        //                                             margin-left:'.(($browser_width - ($mask_width_cell * 10)) / 2).'px; 
        //                                             font-size:'.$browser_width * 0.05.'px; 
        //                                             padding:'.$browser_width * 0.03.'px;  
        //                                             z-index:10001;
        //                                             opacity:1;
        //                                             ">
        //                                             Pinch your fingers in and out to zoom. You can also move the image within the frame.<br><br>
        //                                             After each adjustment, wait for the Puzzle Face to appear below the photo.<br><br>
        //                                             Keep adjusting the image until you get a Puzzle Face that you like. Then SAVE the IMAGE KEY.<br><br>
        //                                             Note - it takes a few seconds to generate the IMAGE KEY.

        //                                             <div id="puzzf_info_blk_close_btn" onclick="hide_info(event)" style="
        //                                                 width:'.($mask_width_cell * 2.2).'px; 
        //                                                 height:'.($mask_width_cell * 2.2).'px; 
        //                                                 border-radius:50%;
        //                                                 font-size:'.($browser_width * 0.04).'px; 
        //                                                 bottom:-'.($mask_width_cell * 1).'px;
        //                                                 right:-'.($mask_width_cell * 1).'px;

        //                                                 cursor:pointer;
        //                                                 display:flex;
        //                                                 justify-content:center;
        //                                                 -webkit-justify-content: center;
        //                                                 align-items:center;
        //                                                 -webkit-align-items: center;

        //                                                 ">Close</div>
        //                                     </div>';






        $html_puzzleface .= '
                    <div id="puzzf_overlay_ph" style="
                            position:absolute;
                            left:0;
                            right:0;
                            bottom:0;
                            top:0;
                            background-color:black;
                            opacity:0.5;
                            z-index:10000;
                            display:none;
                            touch-action:none;
                            display:none;

                            " >








                        </div>


                    <div id="puzzf_header_ph" style="height:' . $header_height . 'px;">
              
                            <img id="puzzf_hr_logo_img" width=159px src="images/puzzle_face_logo_black+tm_dt.svg"  alt="puzzf_hr_logo">
          




                    </div>

                    <div id="puzzf_info" class="puzzf_info" >
                        <h2 class="puzzf_info-title">Create an Image Key</h2>
                        <p class="puzzf_info-text">The key shows you how to assemble the 300 puzzle pieces.</p>
                    

                    </div>





                    <div id="puzzf_playfield_wrp_ph" style="
                             position:relative;
                             border:0px solid red;
                            //  overflow:scroll;
                            //  -webkit-overflow-scrolling: touch;
                             width:100%;
                             height:' . ($browser_height) . 'px;
                        
                            " >

























                          <div id="puzzf_you_win_ph" ontouchend="you_win_tap_ph(event);" style="
                            width:' . ($browser_width * 0.30) . 'px;
                            border-radius: 5px;
                            
                            font-size:' . (60 * $browser_width * 0.001) . 'px;
                            bottom:' . ($browser_width * 0.025) . 'px;
                            left:' . ($browser_width - (($browser_width * 50) / 100)) . 'px;
                          ">Happy New Year 2022!</div>
                          <div id="puzzf_overlay_block_ph" ontouchend="overlay_tap_ph(event)"></div>';



        //* bottom 5 lines moved from top block under the author section
        //     <div id="puzzf_menu_blk"  style="cursor:pointer;"> <!-- onclick="show_games_menu()" -->
        //     <a id="chc_menu_blk"   style="cursor:pointer; text-decoration:none;" href="/holiday-puzzles/index.php"  > 
        //            <img class="puzzf_img_menu_icon" src="images/christmas_tree_menu_icon.svg" alt="option_button_tree">
        //     </a>     
        // </div>






        //   $html_puzzleface .='<div id="puzzf_restart_button_for_ph" onclick="restart_dt();" style="

        //                                             width:'.(($field_width * 17.5) / 100).'px;
        //                                             height:'.(($field_width * 17.5) / 100).'px;
        //                                             border-top-left-radius:'.$field_width * 0.02.'px;
        //                                             border-bottom-left-radius:'.$field_width * 0.02.'px;
        //                                             border-bottom-right-radius:'.$field_width * 0.02.'px;

        //                                         ">
        //                                             <img id="puzzf_restart_img" style="
        //                                                 width:'.(($field_width * 17.5) / 100).'px;
        //                                             " src="images/refresh_icon.png">
        //                                         </div>';



        // $html_puzzleface .='<div id="puzzf_playfield_ph" style="border:1px solid red;overflow:scroll;';

        //                         if(($header_height + $task_blk_height + $field_height) <= $browser_height){ 
        //                             // $left_margin = ($browser_width - $field_width) / 2;

        //             $html_puzzleface .='width:'.$field_width.'px;
        //                                                   height:'.($browser_height - $header_height).'px;
        //                                                   margin-left:'.(($browser_width - $field_width) / 2).'px;
        //                                                   ';

        //                         }elseif(($header_height + $task_blk_height + $field_height) > $browser_height){ // for low height phones
        //                             // $task_blk_height -= $header_height + $task_blk_height + $field_height - $browser_height;

        //                             $field_height = $browser_height - $header_height - $task_blk_height;
        //                             $cell_width_height = $field_height / $field_rows;
        //                             $field_width = $cell_width_height * $field_cols;

        //                             // $left_margin = ($browser_width - $field_width) / 2;

        //                             // $field_height = $browser_height - $header_height - $task_blk_height - $three_margins_of_divs;// ! added

        //                             // $cell_height = $field_height / $field_rows;// ! added
        //                             // $field_width = $field_height * $with_height_division_adj;// ! added

        //             $html_puzzleface .='width:'.$field_width.'px;
        //                                                   height:'.($browser_height - $header_height).'px;
        //                                                   margin-left:'.(($browser_width - $field_width) / 2).'px;
        //                                                   ';
        //                         }

        //                         $html_puzzleface .='">';


        // $html_puzzleface .='<img id="puzzf_playfield_background" src="images/phone_added/christmas_tree_and_background_v4.svg" alt="Christmas Tree">';       


        //     $html_puzzleface .='<div id="puzzf_tiangle_0" class="puzzf_triangles" style="
        //                                 position: absolute;
        //                                 left: '.($left_margin + (($field_width * 37.5) / 100)).'px;
        //                                 bottom: '.(($field_height * 77) / 100).'px;
        //                                 width: '.(($field_width * 25.1) / 100).'px;
        //                                 height: '.(($field_height * 600) / 100).'px;
        //                                 outline:0px solid black;
        //                                 border-radius:'.(($field_width * 2) / 100).'px/'.(($field_width * 3) / 100).'px;
        //                                 border-top-left-radius: 100%;
        //                                 border-top-right-radius: 100%;
        //                                 cursor:pointer;
        //                                 transform-origin: bottom center;
        //                                 transform: perspective('.(($field_height * 18.5) / 100).'px) rotateX(44.5deg);">
        // <div style="position:absolute;bottom:0;"></div></div>';












        // * playfield

        // margin-left:'.(($field_width - ($field_width * 0.9)) / 2).'px;
        // margin-top:'.$mask_margin.'px;
        //outline:1px solid #93979A;

        // ! return this in styles in id="puzzf_backside_blk" if you want back to tiles on back side
        // display:grid;
        // grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        // grid-template-rows:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;


        // $html_puzzleface .='<div id="puzzf_backside_blk_1" class="flip" style="
        //                             position:absolute;
        //                             outline:0px solid #BBBBBB;



        //                             z-index:2;';



        //                             if($browser_height / $browser_width < 1.7){
        //             $html_puzzleface .='height:'.($mask_height_two_cell * 20).'px;
        //                                 width:'.($mask_width_two_cell * 15).'px;
        //                                 margin-left:'.(($field_width - $mask_width_two_cell * 15) / 2).'px;
        //                                 margin-top:'.round($mask_margin_2).'px;';
        //                             }else{
        //             $html_puzzleface .='height:'.($mask_height_cell * 20).'px;
        //                                 width:'.($mask_width_cell * 15).'px;
        //                                 margin-left:'.(($field_width - $mask_width_cell * 15) / 2).'px;
        //                                 margin-top:'.$mask_margin.'px;';
        //                             }

        //             $html_puzzleface .='margin-bottom:'.$mask_margin.'px;
        //                             "
        //                     >







        //                             <canvas id="puzzf_canvas_backside_blk" style="position:absolute;border:0px solid red;"';
        //                             if($browser_height / $browser_width < 1.7){
        //             $html_puzzleface .='width="'.($mask_width_two_cell * 15).'px";
        //                                 height="'.($mask_height_two_cell * 20).'px";>';
        //                             }else{
        //             $html_puzzleface .='width="'.($mask_width_cell * 15).'px";
        //                                 height="'.($mask_height_cell * 20).'px";>';
        //                             }


        //             $html_puzzleface .='</canvas>










        //                     </div>';





        // $html_puzzleface .='<div id="puzzf_backside_blk_2" class="flip" style="
        //                             position:absolute;
        //                             outline:0px solid #BBBBBB;

        //                             display:grid;
        //                             grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        //                             grid-template-rows:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;


        //                             z-index:0;';



        //                             if($browser_height / $browser_width < 1.7){
        //             $html_puzzleface .='height:'.($mask_height_two_cell * 20).'px;
        //                                 width:'.($mask_width_two_cell * 15).'px;
        //                                 margin-left:'.(($field_width - $mask_width_two_cell * 15) / 2).'px;
        //                                 margin-top:'.round($mask_margin_2).'px;';
        //                             }else{
        //             $html_puzzleface .='height:'.($mask_height_cell * 20).'px;
        //                                 width:'.($mask_width_cell * 15).'px;
        //                                 margin-left:'.(($field_width - $mask_width_cell * 15) / 2).'px;
        //                                 margin-top:'.$mask_margin.'px;';
        //                             }

        //             $html_puzzleface .='margin-bottom:'.$mask_margin.'px;
        //                             "
        //                     >















        //                     </div>';





        // $html_puzzleface .='<div id="puzzf_right_col_6_large_divs_wrp" class="flip" style="


        //                                 position:absolute;';
        //                                 if($browser_height / $browser_width < 1.7){
        //                 $html_puzzleface .='width:'.($mask_width_two_cell * 15).'px;
        //                                     height:'.($mask_height_two_cell * 20).'px;
        //                                     margin-left:'.(($field_width - $mask_width_two_cell * 15) / 2).'px;
        //                                     margin-top:'.$mask_margin_2.'px;
        //                                     margin-bottom:'.$mask_margin_2.'px;
        //                                     ';
        //                                 }else{
        //                 $html_puzzleface .='width:'.($mask_width_cell * 15).'px;
        //                                     height:'.($mask_height_cell * 20).'px;
        //                                     margin-left:'.(($field_width - $mask_width_cell * 15) / 2).'px;
        //                                     margin-top:'.$mask_margin.'px;
        //                                     margin-bottom:'.$mask_margin.'px;
        //                                     ';
        //                                 }

        //             $html_puzzleface .='

        //                                 outline:0px solid #E3E3E3;
        //                                 opacity:0;

        //                                 z-index:1;
        //                                 display:grid;
        //                                 grid-template-columns:1fr 1fr 1fr;
        //                                 grid-template-rows:1fr 1fr;




        //                                 ">
        //                                 <div class="puzzf_6_large_divs_in_right_column" style="
        //                                     border-left:2px solid black;
        //                                     border-top:2px solid black;
        //                                     border-right:1px solid black;
        //                                     border-bottom:1px solid black;
        //                                 "></div>
        //                                 <div class="puzzf_6_large_divs_in_right_column" style="
        //                                     border-left:1px solid black;
        //                                     border-top:2px solid black;
        //                                     border-right:1px solid black;
        //                                     border-bottom:1px solid black;
        //                                 "></div>
        //                                 <div class="puzzf_6_large_divs_in_right_column" style="
        //                                     border-left:1px solid black;
        //                                     border-top:2px solid black;
        //                                     border-right:2px solid black;
        //                                     border-bottom:1px solid black;
        //                                 "></div>



        //                                 <div class="puzzf_6_large_divs_in_right_column" style="
        //                                     border-left:2px solid black;
        //                                     border-top:1px solid black;
        //                                     border-right:1px solid black;
        //                                     border-bottom:2px solid black;
        //                                 "></div>
        //                                 <div class="puzzf_6_large_divs_in_right_column" style="
        //                                     border-left:1px solid black;
        //                                     border-top:1px solid black;
        //                                     border-right:1px solid black;
        //                                     border-bottom:2px solid black;
        //                                 "></div>
        //                                 <div class="puzzf_6_large_divs_in_right_column" style="
        //                                     border-left:1px solid black;
        //                                     border-top:1px solid black;
        //                                     border-right:2px solid black;
        //                                     border-bottom:2px solid black;
        //                                 "></div>
        //             </div>';













        // ! **************************************

        $html_puzzleface .= '<label id="puzzf_label_for_getval" for="nothing" style="
                        display:inline-block;';

        // if($browser_height / $browser_width < 1.7){
        //     $html_puzzleface .='margin-left:'.(($field_width - ($mask_width_two_cell * 2) * 15) / 3).'px;
        //                         margin-top:'.(($field_width - ($mask_width_two_cell * 2) * 15) / 3).'px;';
        // }else{
        $html_puzzleface .= 'margin-left:' . (($field_width - ($mask_width_cell * 2) * 15) / 3) . 'px;
                        margin-top:' . (($field_width - ($mask_width_cell * 2) * 15) / 3) . 'px;';
        // }


        $html_puzzleface .= 'margin-bottom:' . $mask_margin . 'px;
                    ">';





        $html_puzzleface .= '<p class="puzzf_mask-text">IMAGE</p>';

        $html_puzzleface .= '<div id="puzzf_mask" class="flip"
                            style="
                                position:relative;';

        //                 if($browser_height / $browser_width < 1.7){
        // $html_puzzleface .='width:'.($mask_width_two_cell * 15).'px;
        //                     height:'.($mask_height_two_cell * 20).'px;';
        //                 }else{
        $html_puzzleface .= 'width:' . ($mask_width_cell * 15) . 'px;
                                     height:' . ($mask_height_cell * 20) . 'px;';
        // }


        $html_puzzleface .= 'outline:1px solid #E3E3E3;
                                z-index:10;
                           
                                
                            "
                        >';


        // <div id="puzzf_info_btn_wrp" onclick="show_info(event)" style="
        //     width:'.$browser_width * 0.1.'px;
        //     height:'.$browser_width * 0.1.'px;
        //     margin-left:'.$browser_width * 0.03.'px;
        //     margin-bottom:'.$browser_width * 0.03.'px;
        //     outline:0px solid black;
        //     ">
        //     <div id="puzzf_info_btn_letter_blk" style="
        //         font-size:'.$browser_width * 0.08.'px;
        //         font-weight:bold;
        //         outline:0px solid red;
        //         ">
        //         <span id="puzzf_info_btn_letter">i</span>
        //     </div>
        // </div>


        // if (strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome')){


        /* detect Mobile Safari */

        // $browserAsString = $_SERVER['HTTP_USER_AGENT'];

        // if (strstr($browserAsString, " AppleWebKit/") && strstr($browserAsString, " Mobile/")){
        //     $browserIsMobileSafari = true;
        // }





        // echo $_SERVER['HTTP_USER_AGENT'] . "\n\n";

        // $browser = get_browser(null, true);
        // print_r($browser);






        // $brow = '';
        // $user_agent = $_SERVER['HTTP_USER_AGENT']; 
        // echo 'user_agent'.$user_agent;
        // if (preg_match('/MSIE/i', $user_agent)) { 
        //    echo "Internet Explorer";
        // }
        // if (preg_match('/Firefox/i', $user_agent)) { 
        //    echo "FireFox";
        // }
        // if (strpos( $user_agent, 'Chrome') !== false)
        // {
        //     echo "Google Chrome";
        // }
        // if (strpos( $user_agent, 'Safari') !== false)
        // {
        //    echo "Safari";
        // }
        // if (preg_match('/Opera/i', $user_agent)) { 
        //    echo "Opera";
        // }

        // echo 'brow = '.$brow;

        // if($brow === 'FireFox'){
        //     $html_puzzleface .='<img id="puzzf_image" height="100%" src="images/upload_image_line_text_grey_v1.svg" alt="some_image" />';
        // }else if($brow ==='Google Chrome'){
        //     $html_puzzleface .='<img id="puzzf_image" crossorigin="anonymous" height="100%" src="images/upload_image_line_text_grey_v1.svg" alt="some_image" />';
        // }
        // else{
        //     $html_puzzleface .='<img id="puzzf_image" height="100%" src="images/upload_image_line_text_grey_v1.svg" alt="some_image" />';
        // }




        // }

        // images/upload_image_line_text_grey_v1.svg    
        // $html_puzzleface .='<div id="puzzf_pinch_zoom_icon_wrp" style="
        //                                 display:none;
        //                                 position:absolute;
        //                                 left:'.((($mask_width_cell * 15) - (($mask_width_cell * 15) * 0.5)) / 2).'px;
        //                                 top:'.(($mask_height_cell * 20)  / 2).'px;
        //                                 width:'.(($mask_width_cell * 15) * 0.5).'px;
        //                                 opacity:0.5;
        //                                 background-color:white;
        //                                 outline:1px solid #E3E3E3;

        //                                 z-index:1000;
        //                             ">
        //                         <img id="puzzf_pinch_zoom_icon" width="100%" style="
        //                             opacity:1;
        //                         " src="images/puzzle_face_icon_zoom_hand_v1.png" alt="pinch_zoom_icon">
        //                     </div>';       
        $html_puzzleface .= '<img id="puzzf_image" style="
    
                                -webkit-touch-callout: none; 
                                -webkit-user-select: none;
                                user-select: none; 
                               
                        " crossorigin="anonymous" ondragstart="return false;" height="100%" src="images/upload_image_line_grey_v1.svg" alt="some_image" />';

        $html_puzzleface .= '</div>
                    </label>
                        
                    <input type="file" style="
                            display:none;
                            margin:' . $field_width * 0.03 . 'px;
               
                        " id="puzzf_getval" name="background-image" required="" /><br/><br/>
                        
                        <div id="puzzf_img_system_width"></div>
                        <div id="puzzf_img_system_height"></div>
                        ';











        $html_puzzleface .= '<div id="advanced" style="display:none;">
                                                Cost function:
                                                <select id="cost_function">
                                                <option value="sse">Sum square difference</option>
                                                <option value="sse2">Sum square difference, stride 2</option>
                                                <option value="sse3">Sum square difference, stride 3</option>
                                                <option value="key_regions">Key regions</option>
                                                </select>
                                            </div>';



        $html_puzzleface .= '<div class="output" style="position:absolute;left:0;top:' . $browser_width * 1.7 . 'px;border:1px solid red;background-color:grey;">
                                    
                                                <div>
                                                    <canvas id="orig" style="display:none;"></canvas>
                                                  
                                                </div>
                                                <div>
                                                    <canvas id="grayscale" style="display:none;"></canvas>
                                                </div>
                                                <div>
                                                    <canvas id="matching_tiles" style="display:none;"></canvas>
                                                </div>
                                                <div>

                                                </div>
                                            </div>';








        // $html_puzzleface .='Image: <br/>
        //                     <img src="https://i.stack.imgur.com/I4jXc.png" /><br/>
        //                     Canvas: <br/>
        //                     <canvas id="canvas" width="'.$field_width * 0.9.'px" height="'.(($field_width * 0.9) / 0.75).'px"></canvas>';




        // <button onclick="putImgToCanvas();">PUT IMG TO CANVAS</button>
        //margin-top:-'.$field_width * 0.043.'px;

        // margin-top:-'.$field_width * 0.043.'px;
        // margin-left:'.(($field_width - ($field_width * 0.9)) / 2).'px;
        // outline:'.$browser_width * 0.012.'px solid #FA9500;

        //margin-left:'.(($field_width - ($field_width * 0.9)) / 2).'px;


        // <div id="puzzf_canvas_wrp_2" onclick="canvas_change(event);" class="puzzf_canvas_wrps">
        // <canvas id="canvas_2" class="puzzf_canvases" style="

        //     margin-top:'.$field_width * 0.00.'px;
        //     " 
        //     width="'.(($field_width * 0.9) / $field_rows).'px"
        //     height="'.((($field_width * 0.9) / $field_rows) / 0.75).'px"
        // </canvas>
        // </div>
        // <div id="puzzf_canvas_wrp_3" onclick="canvas_change(event);" class="puzzf_canvas_wrps">
        // <canvas id="canvas_3" class="puzzf_canvases" style="
        //     margin-top:'.$field_width * 0.00.'px;
        //     " 
        //     width="'.(($field_width * 0.9) / $field_rows).'px"
        //     height="'.((($field_width * 0.9) / $field_rows) / 0.75).'px"
        // </canvas>
        // </div>
        // <div id="puzzf_canvas_wrp_4" onclick="canvas_change(event);" class="puzzf_canvas_wrps">
        // <canvas id="canvas_4" class="puzzf_canvases" style="
        //     margin-top:'.$field_width * 0.00.'px;
        //     " 
        //     width="'.(($field_width * 0.9) / $field_rows).'px"
        //     height="'.((($field_width * 0.9) / $field_rows) / 0.75).'px"
        // </canvas>
        // </div>


        // display:grid;
        // grid-template-columns:3fr 3fr 3fr 3fr;
        // grid-template-rows:4fr 4fr 4fr 4fr;
        // grid-gap:'.($field_width * 0.0228).'px;




        // ! !!! 1

        // ! !!! 2




        // height:'.((($field_width * 0.5) / $field_rows) / 0.75).'px"


        // * SAVE IMAGE KEY
        // * onclick="create_pdf();

        // * top:'.round($field_width * 1.2745).'px;

        $html_puzzleface .= '





                        <div id="puzzf_canvas_wrp_1"  class="puzzf_canvas_wrps" style="
                                position:absolute;
                                z-index:10;
                                top:' . (($field_width - ($mask_width_cell * 2) * 15) / 3) . 'px;
                                right:' . (($field_width - ($mask_width_cell * 2) * 15) / 3) . 'px;
                            ">
                            <p class="puzzf_mask-text">PUZZLE FACE</p>
                            <canvas id="canvas_1"  class="puzzf_canvases" style="

                                margin-top:' . $field_width * 0.00 . 'px;
                                outline:0px solid blue;
                                "';
        //                 if($browser_height / $browser_width < 1.7){
        // $html_puzzleface .=' width="'.($canvas_width_two_cell * 15).'px"  
        //                     height="'.($canvas_width_two_cell * 20).'px"'; 
        //                 }else{
        $html_puzzleface .= ' width="' . ($canvas_width_cell * 15) . 'px" 
                    height="' . ($canvas_height_cell * 20) . 'px" ';
        // }


        // *  width:'.((($mask_height - (($browser_height - $header_height - (($mask_margin) * 0.8) - $mask_height_two) / //)) * 0.75) - $field_width * 0.0565).'px;
        $html_puzzleface .= '
                            </canvas>
                        </div>';







        // ! row for text (start)

        $html_puzzleface .= '<div id="puzzf_text_row" class="puzzf_text_row" style="
                                    top:-' . ($field_width * 0.055) . 'px;
                                    
                                    ';

        // if($browser_height / $browser_width < 1.7){
        //     $html_puzzleface .='
        //     // top:'.($mask_margin_2 * 2 + $mask_height_two_cell * 20).'px;
        //     // right:'.(($field_width - $mask_width_two_cell * 15) / 2).'px;
        //     width:'. ($mask_width_two_cell * 15 - ($canvas_width_two_cell * 15 + round($mask_width_two_cell * 0.25))).'px;                                       
        //     height:'.($canvas_height_two_cell * 20).'px; ';
        // }else{
        $html_puzzleface .= '
                                        margin-left:' . (($field_width - ($mask_width_cell * 2) * 15) / 3) . 'px;
                                        margin-right:' . (($field_width - ($mask_width_cell * 2) * 15) / 3) . 'px;
                                        width:' . ($field_width - (($field_width - ($mask_width_cell * 2) * 15) / 3) * 2) . 'px;
                                         ';
        //  height:'.($canvas_height_cell * 6).'px;
        // }



        //         if($browser_height / $browser_width < 1.7){
        // $html_puzzleface .='gap:'.($field_width * 0.013).'px;">';
        //         }else{
        //    Pinch out to make the face larger until it fills the frame. Center image within the frame.

        $html_puzzleface .= 'gap:' . (($field_width - ($mask_width_cell * 2) * 15) / 3) . 'px;">';
        // }

        // Adjust the image on the left to find the best setting. Save Image Key to assemble desired Puzzle Face.
        // Keep adjusting the image above, to get the best Puzzle Face image (above right).
        $html_puzzleface .= '<div id="puzzf_left_text" style="
                                                            font-size:14px;
                                                            line-height: 120%;
                                                
                                                        ">
                                                            <p class="puzzf_left_text"><span class="puzzf_left_text--bold">TIP:&#32;</span>Close-ups work best</p>
                                                    </div>

                                                    <div id="puzzf_right_text" style="
                                                            font-size:' . ($field_width * 0.031) . 'px;
                                                            line-height: 120%;
                                                            display:none;
                                                            text-align:center;
                                                        ">
                                                            Save Image Key to assemble this Puzzle Face&trade;
                                                    </div>';



        $html_puzzleface .= '</div>';


        // ! row for text (end)




        // ! *************** upload portrain btn (start)

        $html_puzzleface .= '<label id="puzzf_upload_portrait_label" for="puzzf_getval" style="
display:block;
position:relative;



height:' . ($canvas_height_cell * 5) . 'px; 
z-index:100;

">



<div id="puzzf_upload_portrait_btn" class="puzzf_upload_portrait_btn" onclick="" style="                                
    cursor:pointer;
    font-size: 1rem;
 
    color:black;
    height:100%;
    width:100%;
    font-family:Arial;
    padding-top:2px;
    font-weight:bold;
    margin-left:' . (($field_width - ($mask_width_cell * 2) * 15) / 3) . 'px;
    width:' . ($field_width - (($field_width - ($mask_width_cell * 2) * 15) / 3) * 2) . 'px;

   

    ';
        // class="puzzf_antonio_font"

        // if($browser_height / $browser_width < 1.7){
        //     $html_puzzleface .='font-size:'.($mask_margin * 0.6).'px;';
        // }else{
        // $html_puzzleface .='font-size:'.($mask_margin * 1.1).'rem;';
        // }



        $html_puzzleface .= 'letter-spacing:0px;

    display:flex;
    justify-content:center;
    align-items:center;
    outline:0px solid green; 
    




">
    UPLOAD PORTRAIT
</div>

</label>';
        // ! *************** upload portrain btn (end)





        $html_puzzleface .= '<div id="puzzf_button_row" style="
                                    border:0px solid red;
                                    touch-action: none;
                                    position:relative;
                                    pointer-events:none;
                                    z-index:-1000;
                                  
                                    ';

        // if($browser_height / $browser_width < 1.7){
        //     $html_puzzleface .='
        //     // top:'.($mask_margin_2 * 2 + $mask_height_two_cell * 20).'px;
        //     // right:'.(($field_width - $mask_width_two_cell * 15) / 2).'px;
        //     width:'. ($mask_width_two_cell * 15 - ($canvas_width_two_cell * 15 + round($mask_width_two_cell * 0.25))).'px;                                       
        //     height:'.($canvas_height_two_cell * 20).'px; ';
        // }else{
        $html_puzzleface .= '
                                        // top:' . ($mask_margin * 2 + $mask_height_cell * 20) . 'px;
                                        // right:' . (($field_width - $mask_width_cell * 15) / 2) . 'px;
                                        margin-left:' . (($field_width - ($mask_width_cell * 2) * 15) / 3) . 'px;
                                        width:' . ($field_width - (($field_width - ($mask_width_cell * 2) * 15) / 3) * 2) . 'px;
                                        height:' . ($canvas_height_cell * 5) . 'px; ';
        // }

        $html_puzzleface .= '
                                                        
                                                        outline:0px solid red;


                                                    display:grid;
                                                    grid-template-columns:1fr 1fr;
                                                    grid-template-rows:100%;
                                    
                                                    ';

        //         if($browser_height / $browser_width < 1.7){
        // $html_puzzleface .='gap:'.($field_width * 0.013).'px;">';
        //         }else{
        $html_puzzleface .= 'gap:' . (($field_width - ($mask_width_cell * 2) * 15) / 3) . 'px;">';
        // }

        //     1st btn          opacity:0.1;
        //       2nd btn        opacity:0.23;









        $html_puzzleface .= '<label id="puzzf_change_image_label" for="puzzf_getval" style="
                             
                                    position:relative;
                                    height:100%;
                                    
                                ">

                        

                                    <div id="puzzf_change_image_btn"  onclick="" style="                                
                                        cursor:pointer;
                       
                                         font-family:Arial;
                                        color:black;
                                        height:100%;
                                        text-decoration:underline;
                                        font-size:' . ($field_width * 0.043) . 'px;
                         
                                           

                                        ';


        // if($browser_height / $browser_width < 1.7){
        //     $html_puzzleface .='font-size:'.($mask_margin * 0.6).'px;';
        // }else{
        // $html_puzzleface .='font-size:'.($mask_margin * 1).'rem;';
        // }



        $html_puzzleface .= 'letter-spacing:0px;

                                        display:flex;
                                        justify-content:center;
                                        align-items:center;
                                        outline:0px solid green; 
                                        
                                        padding-left:' . $mask_margin * 0.8 . 'px;           
                                        padding-right:' . $mask_margin * 0.8 . 'px;

                                       

                                    ">
                                        Change
                                    </div>

                                </label>';






















        $html_puzzleface .= '<div id="puzzf_save_image_key_btn" class="puzzf_save_image_key_btn" onclick="create_pdf();"  onclick="" style="

                                                                                                        

                                                                                                                    
                                                position:relative;                                        font-size: 0.8rem;     
                                                cursor:default;
                                               padding-top:2px;
                                                color:black;
                                                width:100%;
                                                font-family:Arial;
                                                font-size:' . ($field_width * 0.043) . 'px;
                                                font-weight:bold;

                                                

                                                ';



        // if($browser_height / $browser_width < 1.7){
        //     $html_puzzleface .='font-size:'.($mask_margin * 0.6).'px;';
        // }else{
        // $html_puzzleface .='font-size:'.($mask_margin).'px;';
        // }



        $html_puzzleface .= 'letter-spacing:0px;

                                                display:flex;
                                                justify-content:center;
                                                align-items:center;
                                                -webkit-align-items: center;

                                                outline:0px solid green; 
                                                



                                            ">
                                                <div style="">SAVE IMAGE KEY</div>
                                        </div>

                                    </div>';

































        $html_puzzleface .= '</div>';





        $html_puzzleface .= '<div id="puzzf_task_blk_ph" style="
                                width:96%;
                                margin:6px auto;
                                height:' . $task_blk_height . 'px;
                                ">

                                    <div id="puzzf_task_text">
                                        <div class="puzzf_task_img_blk" style="margin-top:' . (($browser_width * 3) / 100) . 'px">
                                          <!--  <img id="puzzf_playfield_background" src="images/phone_added/festive_ignition_instruction_v2.svg" alt="puzzleface_instruction_v2.svg">       -->
                                        </div>

                                    </div>


                            </div>';

        $html_puzzleface .= '<div id="puzzf_links_blk">

                          <div id="puzzf_links_privacy_policy" style="font-size:' . $field_width * 0.035 . 'px;">
                                <a href="https://letsticktogether.com/pages/privacypolicy" class="puzzf_3_links">
                                    Privacy Policy
                                </a>
                            </div>

                            <div id="puzzf_link_contact" style="font-size:' . $field_width * 0.035 . 'px;">
                                <a href="mailto:puzzleface@letsticktogether.com" class="puzzf_3_links">
                                    Contact
                                </a>
                            </div>


                          
                    </div>';



        // $html_puzzleface .='</div>';




















































































































































        /* DESKTOP */
    } elseif ($browser_width >= $browser_height && $show_page == true) {


        // $christmas_tree_width = ($browser_height * 61) / 100;
        // $christmas_tree_height = (($browser_height * 61) / 100) / $img_division_for_christmas_tree_dt;

        // $top_margin_for_christmas_tree = ($browser_height - ((($browser_height * 61) / 100) / $img_division_for_christmas_tree_dt)) / 2;
        // $left_margin_for_christmas_tree = ($browser_height - (($browser_height * 61) / 100)) / 2;

        $header_height_desktop = $browser_height * 0.08;




        // <div id="puzzf_qr_code_blk" style="
        //     position:absolute;
        //     float:left;
        //     width:23.2%;
        //     outline:0px solid red;
        //     height:'.$browser_height.'px;



        //     color:#7F737A;
        //     text-align:center;
        //     font-size:'.$browser_height * 0.03.'px;
        //     padding:'.$browser_height * 0.033.'px;
        //     "
        // >



        // <br><br><a href="https://letsticktogether.com/" id="puzzf_link_1" style="
        // font-family:Arial;
        // font-size:'.$browser_height * 0.021.'px;
        // color: #b2b2b2;
        // position:absolute;
        // left:'.$browser_width * 0.0.'px;
        // bottom:13.5vh;
        // margin-left:10%;

        // *     padding:'.$browser_height * 0.033.'px;
        // todo overlay clicked func         <div id="puzzf_overlay_dt" onclick="overlay_clicked();"  style="
        $html_puzzleface .= '
                    <div id="puzzf_playfield_wrp_dt" style="position:relative;border:0px solid black;">

  


                    
        
                      <div id="puzzf_new_header_dt" style="
                            width:100%;
                            outline:0px solid #E3E3E3;
                            height:' . $header_height_desktop . 'px;
                            background-color:#F5F5F5;

                            display:flex;
                            justify-content:center;
                            align-items:center;
                            "
                      >
                      
                        <img id="puzzf_hr_image" width="23%" src="images/puzzle_face_logo_black+tm_dt.svg" alt="header_image" />

                      </div>





                      <div id="puzzf_qr_code_blk" style="
                            position:absolute;
                            margin:0 38.4%;
                            width:23.2%;
                            outline:0px solid red;
                            height:' . $browser_height . 'px;



                            color:#7F737A;
                            text-align:center;
                            font-size:' . $browser_height * 0.03 . 'px;
                        
                            "
                        >





                        
                            <div id="puzzf_qr_code_text_wrp_blk" style="
                                    width:80%;
                                    position:relative;
                                    outline:0px solid green;
                                    margin:35% auto;
                                    margin-bottom:0;
                                    ">
                                    At the moment... Puzzle Face is designed as a mobile app. For ease of use and best results use the QR code below on your phone to generate the Image Key.
                            </div>
                            <div id="puzzf_qr_code_image_wrp_blk" style="
                                    width:' . $browser_height * 0.2 . 'px;
                                    height:' . $browser_height * 0.2 . 'px;
                                    margin:0 auto;
                                    position:relative;
                                    outline:0px solid blue;
                                    margin-top:10%;
                                    border:0px solid black;
                                    border-radius:5%;
                                    padding:1%;
                                    ">
                                <img id="puzzf_or_code_image" width="100%" src="images/qr_code_puzzleface.jpeg" alt="qr_code_image">
                            </div>










                    <div id="puzzf_links_blk" style="
                                
                            position:absolute;
                            display: flex;
                            align-items: center;
                            width:100%;
                            top:' . $browser_height * 0.63 . 'px;
                            height:' . $browser_height * 0.21 . 'px; 
                            border:0px solid red;
                        ">

                        <div id="puzzf_link_buy_pf" style="text-align:center;font-size:' . $browser_height * 0.03 . 'px;">
                            <a href="https://letsticktogether.com/products/puzzle-face" class="puzzf_3_links" style="
                                   
                                    ">Buy Puzzle Face&trade;
                            </a>
                        </div>

                        <div id="puzzf_links_privacy_policy" style="text-align:center;font-size:' . $browser_height * 0.02 . 'px;padding-top: 8px;">
                            <a href="https://letsticktogether.com/pages/privacypolicy" class="puzzf_3_links" style="
                                    text-decoration:none;
                            ">
                                Privacy Policy
                            </a>
                        </div>

                        <div id="puzzf_link_contact" style="text-align:center;font-size:' . $browser_height * 0.02 . 'px;padding-top: 8px;">
                            <a href="mailto:puzzleface@letsticktogether.com" class="puzzf_3_links" style="
                                text-decoration:none;
                            ">
                                Contact
                            </a>
                        </div>


                        
                </div>



















                                <div style="
                                    outline:0px solid black;
                                    position:absolute;
                            
                                    width:100%;
                                  
                                    bottom:9%;
                             
                                    margin:0 auto;
                                    
                                    ">
                                    <div style="text-align:center;"><a href="https://letsticktogether.com/" id="puzzf_link_1" style="
                                        position:relative;
                                        font-family:Arial;
                                        font-size:' . $browser_height * 0.021 . 'px;
                                        color: #b2b2b2;
                                    
                                                    ">
                                            www.letsticktogether.com</a>
                                    </div>

                                    <div style="height:' . $browser_height * 0.01 . 'px;width:100%;outline:0px solid red;"></div>
                                    
                                    <div id="puzzf_link_2" style="
                                        position:relative;
                                        text-align:center;
                                        font-family:Arial;
                                        font-size:' . $browser_height * 0.021 . 'px;
                                        color: #b2b2b2;
                                                             
                                        ">
                                            © 2023 StickTogether Products, LLC
                                    </div>
                                </div>

                        </div>


                      
                        <div id="puzzf_playfield_dt" style="display:none;
                        border:0px solid black;
                            float:left;
                            outline:0px solid red;
                            height:' . ($browser_height - $header_height_desktop) . 'px;
                            margin-left:' . $browser_height * 0.4225 . 'px;
                            width:' . $browser_height * 0.555 . 'px;
                        ">';
        //$html_puzzleface .='<div id="puzzf_restart_button_for_dt" onclick="restart_dt();"><img id="puzzf_restart_img" src="images/refresh_icon.png"></div>';

        // $html_puzzleface .='<div id="puzzf_you_win_dt" onmouseup="you_win_click_dt(event);" style="
        //                             width:'.($browser_height * 0.70).'px;
        //                             border-radius: 5px;

        //                             font-size:'.(60 * $browser_height * 0.001).'px;
        //                             bottom:'.($browser_height * 0.025).'px;
        //                             left:'.($browser_height - (($browser_height * 50) / 100)).'px;
        //                             ">Happy New Year 2022!
        //                         </div>
        //                         <div id="puzzf_overlay_block_dt" onmouseup="overlay_click_dt(event)"></div>';

        //$html_puzzleface .='<img id="puzzf_playfield_background_branches" src="images/dt/festive_ignition_desktop_background_tree_branches.svg" alt="puzzleface_desktop_background_tree_branches.svg">';       
        // $html_puzzleface .='<img class="" style="
        //                                 opacity:0.1;
        //                                 position:absolute;
        //                                 width:'.$christmas_tree_width.'px;
        //                                 height:'.$christmas_tree_height.'px;
        //                                 z-index:10;
        //                                 top:'.$top_margin_for_christmas_tree.'px;
        //                                 left:'.$left_margin_for_christmas_tree.'px;
        //                             " 
        //                             src="images/dt/festive_ignition_desktop_background_christmas_tree.svg" alt="">';       





        // * playfield here



        // class="puzzf_antonio_font puzzf_orange_color_and_align"
        //        color:#EC8D00;
        $html_puzzleface .= '<div id="puzzf_text_above_mask" style="
                        width:' . $browser_height * 0.5203 . 'px;
                        height:' . $browser_height * 0.03 . 'px;
                        outline:0px solid blue;
                      
                        font-weight:bold;
                        font-size:' . $browser_height * 0.026 . 'px;
                        margin-top:' . ($browser_height * 0.03) . 'px;
                        margin-bottom:' . ($browser_height * 0.03) . 'px;
                        margin-left:0;
                        ">
                        Close-ups work best
                    </div>';


        //  <img src="images/processing.png" width="'.$browser_height * 0.3.'" alt="processing_img" style="
        //   position:absolute;left:'.(($browser_height * 0.5203 - ($browser_height * 0.3)) / 2).'px;
        //   top:'.((($browser_height * 0.5203) / 0.75 -($browser_height * 0.3)) / 2).'px;
        //   ">

        // todo  onmousedown="stopPropagationFunc(event);" onmousemove="stopPropagationFunc(event);" onmouseup="stopPropagationFunc(event);" 

        //     margin-left:'.((($browser_height * 0.7) - ($browser_height * 0.52)) / 1.3).'px;
        $html_puzzleface .= '<label id="puzzf_label_for_getval" for="nothing" style="
                        display:inline-block;
                        margin-left:0;
                
                    ">
                    
                        <div id="puzzf_mask" 
                            style="
                                cursor:pointer;
                                width:' . $browser_height * 0.5203 . 'px;
                                height:' . (($browser_height * 0.5203) / 0.75) . 'px;
                                outline:0px solid black;
                                
                                
                            "
                        >

                        <div id="puzzf_overlay_dt" style="
                                position:absolute;
                                left:0;
                                right:0;
                                bottom:0;
                                top:0;
                                background-color:black;
                                opacity:0.5;
                                z-index:10000;
                                display:none;
                            
                        
                            
                            " >


                        </div>








                            <div id="puzzf_zoom" style="
                                position:relative;
                                width: 100%;
                                height: 100%;
                                transform-origin: 0px 0px;
                                transform: scale(1) translate(0px, 0px);
                            ">
                                <img id="puzzf_image" style="
                                    outline:0px solid red;
                                    display:none;
                                    "
                                     class="dragme"  onmousedown="return false;" height="100%" src="images/upload_image_line_text_grey_v1.svg" alt="" />
                            </div>





                            
                        </div>
                    </label>
                    <input type="file" style="
                            position:absolute;
                            left:0;
                            top:-10000000px;
                       
                          
                        " id="puzzf_getval" name="background-image" /><br/><br/>

                        <div id="puzzf_img_system_width"></div>
                        <div id="puzzf_img_system_height"></div>
                    ';


        $html_puzzleface .= '




                                        <label for="puzzf_getval" style="
                                            display:inline-block;
                                            margin-left:0;
                                            margin-top:' . ($browser_height * 0.001) . 'px;
                                        ">
                    
                                            <div id="puzzf_change_image_btn" class="puzzf_antonio_font" 
                                                style="
                                           
                                                cursor:pointer;
                                                outline:0px solid #E3E3E3;
                                                width:' . $browser_height * 0.52 . 'px;
                                                height:' . ($browser_height * 0.08) . 'px; 
                                                background-color:#FA9500;
                                                color:white;
                                                
                                                font-weight:bold;
                                                font-size:' . $browser_height * 0.04 . 'px;

                                                margin-top:' . ($browser_height * 0.01) . 'px;


                                                background: -moz-linear-gradient(
                                                    top, #f7980a 0%, 
                                                    #fdb64c 50%, #f49200 51%, 
                                                    #f49200 89%, #edaa47 100%);
                                                    
                                                background: -webkit-gradient(left top, 
                                                left bottom, 
                                                color-stop(0%, #f7980a), 
                                                color-stop(50%, #fdb64c), 
                                                color-stop(51%, #f49200), 
                                                color-stop(89%, #f49200), 
                                                color-stop(100%, #edaa47));
                                                
                                                background: -webkit-linear-gradient(
                                                    top, 
                                                    #f7980a 0%, 
                                                    #fdb64c 50%, 
                                                    #f49200 51%, 
                                                    #f49200 89%, 
                                                    #edaa47 100%);
                                                
                                                background: -o-linear-gradient(
                                                    top, 
                                                    #f7980a 0%, 
                                                    #fdb64c 50%, 
                                                    #f49200 51%, 
                                                    #f49200 89%, 
                                                    #edaa47 100%);
                                                
                                                background: -ms-linear-gradient(
                                                    top, 
                                                    #f7980a 0%, 
                                                    #fdb64c 50%, 
                                                    #f49200 51%, 
                                                    #f49200 89%, 
                                                    #edaa47 100%);
                                                
                                                background: linear-gradient(
                                                    to bottom, 
                                                    #f7980a 0%, 
                                                    #fdb64c 50%, 
                                                    #f49200 51%, 
                                                    #f49200 89%, 
                                                    #edaa47 100%);
                                                    
                                                filter: progid:DXImageTransform.Microsoft.gradient( 
                                                    startColorstr=#f7980a, 
                                                    endColorstr=#edaa47, GradientType=0 );
                                            
                                                border-radius:' . (($browser_height * 0.08) / 2) . 'px;

                                                display:none;
                                                "
                                            >
                                                CHANGE PORTRAIT
                                            </div>


                                            <div id="puzzf_upload_image_btn" class="puzzf_antonio_font" 
                                                style="
                                        
                                                cursor:pointer;
                                                outline:0px solid #E3E3E3;
                                                width:' . $browser_height * 0.52 . 'px;
                                                height:' . ($browser_height * 0.08) . 'px; 
                                                background-color:#FA9500;
                                                color:white;
                                                
                                                font-weight:bold;
                                                font-size:' . $browser_height * 0.04 . 'px;

                                                margin-top:' . ($browser_height * 0.01) . 'px;



                                                background: -moz-linear-gradient(
                                                    top, #f7980a 0%, 
                                                    #fdb64c 50%, #f49200 51%, 
                                                    #f49200 89%, #edaa47 100%);
                                                    
                                                background: -webkit-gradient(left top, 
                                                left bottom, 
                                                color-stop(0%, #f7980a), 
                                                color-stop(50%, #fdb64c), 
                                                color-stop(51%, #f49200), 
                                                color-stop(89%, #f49200), 
                                                color-stop(100%, #edaa47));
                                                
                                                background: -webkit-linear-gradient(
                                                    top, 
                                                    #f7980a 0%, 
                                                    #fdb64c 50%, 
                                                    #f49200 51%, 
                                                    #f49200 89%, 
                                                    #edaa47 100%);
                                                
                                                background: -o-linear-gradient(
                                                    top, 
                                                    #f7980a 0%, 
                                                    #fdb64c 50%, 
                                                    #f49200 51%, 
                                                    #f49200 89%, 
                                                    #edaa47 100%);
                                                
                                                background: -ms-linear-gradient(
                                                    top, 
                                                    #f7980a 0%, 
                                                    #fdb64c 50%, 
                                                    #f49200 51%, 
                                                    #f49200 89%, 
                                                    #edaa47 100%);
                                                
                                                background: linear-gradient(
                                                    to bottom, 
                                                    #f7980a 0%, 
                                                    #fdb64c 50%, 
                                                    #f49200 51%, 
                                                    #f49200 89%, 
                                                    #edaa47 100%);
                                                    
                                                filter: progid:DXImageTransform.Microsoft.gradient( 
                                                    startColorstr=#f7980a, 
                                                    endColorstr=#edaa47, GradientType=0 );


                                                border-radius:' . (($browser_height * 0.08) / 2) . 'px;

                                                display:flex;
                                                justify-content:center;
                                                align-items:center;

                                
                                                "
                                            >
                                                UPLOAD PORTRAIT
                                            </div>
                                    </label>
                                        ';





        $html_puzzleface .= '</div>'; // <div id="puzzf_playfield_dt" style="










        $html_puzzleface .= '<div id="advanced" style="display:none;">
                        Cost function:
                        <select id="cost_function">
                        <option value="sse">Sum square difference</option>
                        <option value="sse2">Sum square difference, stride 2</option>
                        <option value="sse3">Sum square difference, stride 3</option>
                        <option value="key_regions">Key regions</option>
                        </select>
                    </div>';



        $html_puzzleface .= '<div class="output" style="position:absolute;left:0;top:' . $browser_width * 1.7 . 'px;border:1px solid red;background-color:grey;">

                        <div>
                            <canvas id="orig" style="display:none;"></canvas>
                        
                        </div>
                        <div>
                            <canvas id="grayscale" style="display:none;"></canvas>
                        </div>
                        <div>
                            <canvas id="matching_tiles" style="display:none;"></canvas>
                        </div>
                        <div>

                        </div>
                    </div>';














        $html_puzzleface .= '<div id="puzzf_center_right_dt" style="display:none;  
                            position:relative;
                            width:' . ($browser_width - ($browser_height * 0.98)) . 'px;
                            height:' . ($browser_height - $header_height_desktop - ($browser_height * 0.03)) . 'px;
                            margin-left:' . ($browser_height * 0.98) . 'px;
                            border:0px solid black;
                            
                        ">';




        $html_puzzleface .= '<div class="puzzf_center_block" style=" 
                            position:relative;
                            width:30%; 
                            height:' . ($browser_height - $header_height_desktop - ($browser_height * 0.03)) . 'px;
                            outline:0px solid blue;
                          ">

                          <div class="puzzf_antonio_font puzzf_orange_color_and_align" style="
                                color:#EC8D00;
                                height:' . $browser_height * 0.03 . 'px;
                                
                              
                                font-weight:bold;
                                font-size:' . $browser_height * 0.03 . 'px;
                                margin-top:' . ($browser_height * 0.03) . 'px;
                                margin-bottom:' . ($browser_height * 0.03) . 'px;
                                outline:0px solid red;
                            ">
                                
                          </div>



                          <div id="puzzf_4_canvases_wrp" 
                                style="
                                    position:relative;
                                    outline:0px solid black;
                                    overflow:visible;
                                 
                                 
                                    height:' . (($browser_height * 0.52) / 0.75) . 'px;
                                "
                            >';




























        // $html_puzzleface .= '<div id="puzzf_canvas_wrp_1" onclick="canvas_dt_change(event);" class="puzzf_canvas_wrps"
        //                                 style="
        //                                     cursor:pointer;
        //                                     position:absolute;
        //                                     transform:translate(0px, -'.$browser_height * 0.00181.'px);

        //                                 "
        //                             >



        // <canvas id="canvas_1" class="puzzf_canvases" style="
        // outline:0px solid #E3E3E3;
        // margin-top:'.$browser_height * 0.00.'px;
        // " 
        // width="'.($browser_height * 0.24395).'px"
        // height="'.(($browser_height * 0.24395) / 0.75).'px"
        // </canvas>





        // $html_puzzleface .= '<div id="puzzf_canvas_wrp_1" onclick="canvas_dt_change(event);" class="puzzf_canvas_wrps"
        //                                 style="
        //                                     cursor:pointer;
        //                                     position:absolute;
        //                                     transform:translate(0px, -'.$browser_height * 0.0003.'px);

        //                                 "
        //                             >
        //                             <canvas id="canvas_1" class="puzzf_canvases" style="
        //                                 outline:0px solid #E3E3E3;
        //                                 margin-top:'.$browser_height * 0.00.'px;
        //                                 " 
        //                                width="'.($browser_height * 0.5206).'px"
        //                                height="'.(($browser_height * 0.5206) / 0.75).'px"
        //                             </canvas>
        //                         </div>
        // * todo 31.05.23 1
        $html_puzzleface .=   '<div id="puzzf_canvas_wrp_1" class="puzzf_canvas_wrps"
                                style="
                                    cursor:pointer;
                                    position:absolute;
                                    transform:translate(0px, ' . $browser_height * 0.00181 . 'px);
                                    outline:0px solid red;
                                "
                            >
                            <canvas id="canvas_1" class="puzzf_canvases" style="
                                outline:0px solid #E3E3E3;
                                margin-top:' . $browser_height * 0.00 . 'px;
                                " 
                               width="' . ($browser_height * 0.24395) . 'px"
                               height="' . (($browser_height * 0.24395) / 0.75) . 'px"
                            </canvas>
                        </div>

                        <div id="puzzf_generate_btn" class="puzzf_antonio_font" onclick="generate_puzzles();"
                                    style="

                                    pointer-events:none;
                                    opacity:0;
                                    position:absolute;
                                    left:0;
                                    top:' . $browser_height * 0.362 . 'px;
                                    cursor:pointer;
                                    outline:0px solid #E3E3E3;
                                    //width:92.5%;
                                    width:' . ($browser_height * 0.24395) . 'px;
                                    height:' . ($browser_height * 0.08) . 'px; 
                                    background-color:#FA9500;
                                    color:white;
                                    z-index:10000;
                                    
                                    font-weight:bold;
                                    font-size:' . $browser_height * 0.04 . 'px;
            


                                    background: -moz-linear-gradient(
                                        top, #f7980a 0%, 
                                        #fdb64c 50%, #f49200 51%, 
                                        #f49200 89%, #edaa47 100%);
                                        
                                    background: -webkit-gradient(left top, 
                                    left bottom, 
                                    color-stop(0%, #f7980a), 
                                    color-stop(50%, #fdb64c), 
                                    color-stop(51%, #f49200), 
                                    color-stop(89%, #f49200), 
                                    color-stop(100%, #edaa47));
                                    
                                    background: -webkit-linear-gradient(
                                        top, 
                                        #f7980a 0%, 
                                        #fdb64c 50%, 
                                        #f49200 51%, 
                                        #f49200 89%, 
                                        #edaa47 100%);
                                    
                                    background: -o-linear-gradient(
                                        top, 
                                        #f7980a 0%, 
                                        #fdb64c 50%, 
                                        #f49200 51%, 
                                        #f49200 89%, 
                                        #edaa47 100%);
                                    
                                    background: -ms-linear-gradient(
                                        top, 
                                        #f7980a 0%, 
                                        #fdb64c 50%, 
                                        #f49200 51%, 
                                        #f49200 89%, 
                                        #edaa47 100%);
                                    
                                    background: linear-gradient(
                                        to bottom, 
                                        #f7980a 0%, 
                                        #fdb64c 50%, 
                                        #f49200 51%, 
                                        #f49200 89%, 
                                        #edaa47 100%);
                                        
                                    filter: progid:DXImageTransform.Microsoft.gradient( 
                                        startColorstr=#f7980a, 
                                        endColorstr=#edaa47, GradientType=0 );


                                    border-radius:' . (($browser_height * 0.08) / 2) . 'px;


                                    display:flex;
                                    justify-content:center;
                                    align-items:center;


                                    -o-transition: all 0.5s ease-out 0s; 
                                    -moz-transition: all 0.5s ease-out 0s;
                                    -webkit-transition: all 0.5s ease-out 0s;
                                    transition: all 0.5s ease-out 0s;


                                
                            
                                "
                                >
                                GENERATE 
                        </div> 




 









                            
                            </div>




                        </div>';




        // '.$html_footer_for_holiday_puzzles.'
        // * todo 31.05.23 2






        $html_puzzleface .= '<div id="puzzf_right_dt" style="position:absolute;  
                                width:50%;
                                height:' . ($browser_height - $header_height_desktop - ($browser_height * 0.03)) . 'px;
                                
                                border:0px solid green;
                                top:0;
                                right:0;



            

                          
                        
                           ">';








        $html_puzzleface .= '<div id="puzzf_show_get_code_blk" class="puzzf_antonio_font"  style="width:100%;">
                                        <div style="
                                            position:relative;
                                            height:' . $browser_height * 0.03 . 'px;
                                            color:#EC8D00;
                                            outline:0px solid red;
                                            
                                            font-weight:bold;
                                            font-size:' . $browser_height * 0.03 . 'px;
                                            margin-bottom:' . ($browser_height * 0.03) . 'px;
                                  
                                            "
                                        >
                                            
                                    </div>';








        $html_puzzleface .= '<div id="puzzf_right_col_btns_wrp" 
                                    style="
                                        position:relative;
                                        left:-33%;
                                        outline:1px solid #BBBBBB;
                                     
                                        height:' . (($browser_height * 0.52) / 0.75) . 'px;
                                        width:' . ($browser_height * 0.52) . 'px;
                                    "
                                    >';



        $html_puzzleface .= '<div id="puzzf_right_col_6_large_divs_wrp" style="
                                            
                                            position:absolute;
                                            height:' . ((($browser_height * 0.52) / 0.75) / 1.19245) . 'px;
                                            width:' . ((($browser_height * 0.52)) / 1.22864) . 'px;

                                            margin-left:' . ((($browser_height * 0.52) - ((($browser_height * 0.52)) / 1.22864)) / 2) . 'px;
                                            margin-top:' . (((($browser_height * 0.52) / 0.75) - ((($browser_height * 0.52) / 0.75) / 1.19245)) / 1.4) . 'px;

                                            outline:0px solid red;
                                         
                                            z-index:5;
                                            display:grid;
                                            grid-template-columns:1fr 1fr 1fr;
                                            grid-template-rows:1fr 1fr;

                                        ">
                                            <div class="puzzf_6_large_divs_in_right_column"></div>
                                            <div class="puzzf_6_large_divs_in_right_column"></div>
                                            <div class="puzzf_6_large_divs_in_right_column"></div>
                                            <div class="puzzf_6_large_divs_in_right_column"></div>
                                            <div class="puzzf_6_large_divs_in_right_column"></div>
                                            <div class="puzzf_6_large_divs_in_right_column"></div>
                                        </div>';
        // ! grid-template-columns: 0.7fr 2fr 0.192fr;
        $html_puzzleface .= '<div id="puzzf_pdf_hr_wrp" style="display:none;">
                                            <div id="puzzf_pdf_header" style="
                                                position:absolute;

                                                top:' . ($browser_height * 0.015) . 'px;
                                                left:' . ($browser_height * 0.02) . 'px;

                                                height:' . ($browser_height * 0.045) . 'px;
                                                width:' . ($browser_height * 0.447) . 'px;

                                                outline:1px solid #EAEAEA;

                                                font-family:Arial, sans-serif;

                                                display:grid;
                                                grid-template-columns: 0.5fr 2.2fr 0.2fr;
                                                grid-template-rows:1fr;
                                                ">

                                                    <div id="puzzf_pdf_header_logo" style="
                                                  

                                                        outline:0px solid red;

                                                        ">
                                                        <img width=85% height=85% id="puzzf_pdf_hr_logo" src="images/puzzle_face_logo_black+tm_dt.svg" alt="puzzf_pdf_hr_logo_img" style="
                                                            margin-left:8%;
                                                            margin-top:2%;
                                                            ">
                                                    </div>
                                                    <div id="puzzf_pdf_header_task" style="
                                                        font-size:' . $browser_height * 0.011 . 'px;
                                                        padding-left:2.5%;
                                                        padding-top:1.5%;
                                                        outline:0px solid red;
                                                        background-color:#E6E6E6;
                                                        ">
                                                        Assemble the 300 pieces using this Image Key as a guide.<br>
                                                        Make sure to attach each piece in the correct orientation.<br>
                                                        When all 300 pieces are connected, lift to reveal the Puzzle Face.
                                                    </div>
                                                    
                                                    
                                                    <div id="puzzf_pdf_header_img" style="
                                                     
                                                        background-color:#c4c4c4;
                                                        outline:0px solid red;
                                                        ">
                                                        <img width=100% height=100% id="puzzf_pdf_hr_logo" src="images/upload_image_line_text_grey_v1.svg" alt="puzzf_pdf_hr_right_img" style="

                                                            ">
                                                        
                                                    </div>

                                            </div>
                                        </div>';



        $html_puzzleface .= '<a href="https://letsticktogether.com/" id="puzzf_pdf_link_1" style="display:none;position:absolute;right:-' . ($browser_height * 0.084) . 'px;bottom:' . $browser_height * 0.21 . 'px;transform-origin:left top;transform:rotateZ(-90deg);font-family:Arial;color:black;font-size:' . $browser_height * 0.01 . 'px;">
                                        www.letsticktogether.com</a>
                                        
                                        <div id="puzzf_pdf_link_2" style="display:none;position:absolute;right:-' . ($browser_height * 0.135) . 'px;bottom:' . $browser_height * 0.022 . 'px;transform-origin:left top;transform:rotateZ(-90deg);font-family:Arial;color:black;font-size:' . $browser_height * 0.01 . 'px;                      
                                        ">© 2023 StickTogether Products, LLC</div>';




        $html_puzzleface .= '<div id="puzzf_right_col_num_1" class="puzzf_right_col_nums" style="
                                                position:absolute;
                                                top:' . ($browser_height * 0.062) . 'px;
                                                left:' . ($browser_height * 0.114) . 'px;

                                                height:' . ($browser_height * 0.015) . 'px;
                                                width:' . ($browser_height * 0.01) . 'px;
                                                outline:0px solid red;
                                                font-family:Arial, sans-serif;
                                                font-size:' . ($browser_height * 0.013) . 'px;
                                                font-weight:bold;

                                            ">1</div>';
        $html_puzzleface .= '<div id="puzzf_right_col_num_2" class="puzzf_right_col_nums" style="
                                                position:absolute;
                                                top:' . ($browser_height * 0.062) . 'px;
                                                left:' . ($browser_height * 0.2555) . 'px;

                                                height:' . ($browser_height * 0.015) . 'px;
                                                width:' . ($browser_height * 0.01) . 'px;
                                                outline:0px solid red;
                                                font-family:Arial, sans-serif;
                                                font-size:' . ($browser_height * 0.013) . 'px;
                                                font-weight:bold;
                        
                                            ">2</div>';
        $html_puzzleface .= '<div id="puzzf_right_col_num_3" class="puzzf_right_col_nums" style="
                                                position:absolute;
                                                top:' . ($browser_height * 0.062) . 'px;
                                                left:' . ($browser_height * 0.397) . 'px;

                                                height:' . ($browser_height * 0.015) . 'px;
                                                width:' . ($browser_height * 0.01) . 'px;
                                                outline:0px solid red;
                                                font-family:Arial, sans-serif;
                                                font-size:' . ($browser_height * 0.013) . 'px;
                                                font-weight:bold;
                                            ">3</div>';
        $html_puzzleface .= '<div id="puzzf_right_col_num_4" class="puzzf_right_col_nums" style="
                                                position:absolute;
                                                top:' . ($browser_height * 0.665) . 'px;
                                                left:' . ($browser_height * 0.114) . 'px;

                                                height:' . ($browser_height * 0.015) . 'px;
                                                width:' . ($browser_height * 0.01) . 'px;
                                                outline:0px solid red;
                                                font-family:Arial, sans-serif;
                                                font-size:' . ($browser_height * 0.013) . 'px;
                                                font-weight:bold;
                                            ">4</div>';
        $html_puzzleface .= '<div id="puzzf_right_col_num_5" class="puzzf_right_col_nums" style="
                                                position:absolute;
                                                top:' . ($browser_height * 0.665) . 'px;
                                                left:' . ($browser_height * 0.2555) . 'px;

                                                height:' . ($browser_height * 0.015) . 'px;
                                                width:' . ($browser_height * 0.01) . 'px;
                                                outline:0px solid red;
                                                font-family:Arial, sans-serif;
                                                font-size:' . ($browser_height * 0.013) . 'px;
                                                font-weight:bold;
                                            ">5</div>';
        $html_puzzleface .= '<div id="puzzf_right_col_num_6" class="puzzf_right_col_nums" style="
                                                position:absolute;
                                                top:' . ($browser_height * 0.665) . 'px;
                                                left:' . ($browser_height * 0.397) . 'px;

                                                height:' . ($browser_height * 0.015) . 'px;
                                                width:' . ($browser_height * 0.01) . 'px;
                                                outline:0px solid red;
                                                font-family:Arial, sans-serif;
                                                font-size:' . ($browser_height * 0.013) . 'px;
                                                font-weight:bold;
                                            ">6</div>';

        $html_puzzleface .= '<div id="puzzf_right_col_btns_in" 
                                                            style="
                                                                position:absolute;
                                                                outline:0px solid #BBBBBB;

                                                                display:grid;
                                                                grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                                                                   grid-template-rows:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

                                                                height:' . floor((($browser_height * 0.52) / 0.75) / 1.19245) . 'px;
                                                                width:' . floor((($browser_height * 0.52)) / 1.22864) . 'px;

                                                                margin-left:' . ((($browser_height * 0.52) - ((($browser_height * 0.52)) / 1.22864)) / 2) . 'px;
                                                                margin-top:' . (((($browser_height * 0.52) / 0.75) - ((($browser_height * 0.52) / 0.75) / 1.19245)) / 1.4) . 'px;
                                                            "
                                                            >
                                    
                                                        </div>';



        // *   background-color:#FA9500;
        // !  alone button for showing many buttons     
        // ! old    <div id="puzzf_get_code_btn" class="puzzf_antonio_font" onclick="get_code(event);"
        $html_puzzleface .= '<div id="puzzf_get_code_btn_wrp_to_disappear" style="
                            
                            ">
                    

                                <div id="puzzf_get_code_btn" class="puzzf_antonio_font" onclick="create_pdf();"
                                        style="
                    
                                        position:absolute;
                                        left:0;
                                        bottom:-' . $browser_height * 0.1165 . 'px;
                                        cursor:pointer;
                                        outline:0px solid #E3E3E3;
                                        width:100%;
                                        height:' . ($browser_height * 0.08) . 'px; 
                                        background-color:#4f4f4f;
                                        color:white;
                                        z-index:10000;
                                        
                                        font-weight:bold;
                                        font-size:' . $browser_height * 0.04 . 'px;
                 


                                        background: -moz-linear-gradient(
                                            top, 
                                            #4f4f4f 0%, 
                                            #adadad 50%, 
                                            #787878 51%, 
                                            #b3b3b3 100%);
                                        
                                        background: -webkit-gradient(
                                            left top, 
                                            left bottom, 
                                            color-stop(0%, #4f4f4f), 
                                            color-stop(50%, #adadad), 
                                            color-stop(51%, #787878), 
                                            color-stop(100%, #b3b3b3));
                                        
                                        background: -webkit-linear-gradient(
                                            top, 
                                            #4f4f4f 0%, 
                                            #adadad 50%, 
                                            #787878 51%, 
                                            #b3b3b3 100%);
                                        
                                        background: -o-linear-gradient(
                                            top, 
                                            #4f4f4f 0%, 
                                            #adadad 50%, 
                                            #787878 51%, 
                                            #b3b3b3 100%);
                                        background: -ms-linear-gradient(
                                            top, 
                                            #4f4f4f 0%, 
                                            #adadad 50%, 
                                            #787878 51%, 
                                            #b3b3b3 100%);
                                        
                                        background: linear-gradient(
                                            to bottom, 
                                            #4f4f4f 0%, 
                                            #adadad 50%, 
                                            #787878 51%, 
                                            #b3b3b3 100%);
                                        
                                        filter: progid:DXImageTransform.Microsoft.gradient( 
                                            startColorstr=#4f4f4f, 
                                            endColorstr=#b3b3b3, 
                                            GradientType=0 );


                                        border-radius:' . (($browser_height * 0.08) / 2) . 'px;
            
                                        display:none;



                                        -o-transition: all 0.5s ease-out 0s; 
                                        -moz-transition: all 0.5s ease-out 0s;
                                        -webkit-transition: all 0.5s ease-out 0s;
                                        transition: all 0.5s ease-out 0s;


                                    
                                
                                    "
                                    >
                                    SAVE IMAGE KEY
                                </div>     
                       
                        </div>
          
                        ';




        // !  block to show  (start)        
        // ! display:none; but was display:flex; in  div id="puzzf_right_blk_buttons_wrp
        $html_puzzleface .= '<div id="puzzf_right_blk_buttons_wrp" 
                           style="
                               position:relative;
                               top:-' . $browser_height * 0.7 . 'px;
                               outline:0px solid black;
                               width:' . $browser_height * 0.54 . 'px;
                               height:' . (($browser_height * 0.52) / 0.75) . 'px;
                               
                               display:none;
                               justify-content:center;
                               align-items:center;
                               opacity:0;


                               -o-transition: all 0.5s ease-out 0s; 
                               -moz-transition: all 0.5s ease-out 0s;
                               -webkit-transition: all 0.5s ease-out 0s;
                               transition: all 0.5s ease-out 0s;

                           "
                       >';


        //                <div id="puzzf_get_code_btn" onclick="get_code(event);"
        //                style="

        //                cursor:pointer;
        //                outline:0px solid #E3E3E3;
        //                width:100%;
        //                height:'.($browser_height * 0.08).'px; 
        //                background-color:#FA9500;
        //                color:white;
        //                font-family:Arial,Helvetica;
        //                font-weight:bold;
        //                font-size:'.$browser_height * 0.04.'px;
        //                margin-bottom:'.($browser_height * 0.06).'px;

        //                display:flex;
        //                justify-content:center;
        //                align-items:center;
        //        "
        //        >
        //        GET CODE
        //    </div>






        $html_puzzleface .= '<div id="puzzf_puzzf_right_blk_buttons_inner_wrp" style="
                                            outline:0px solid red;
                                        ">



                                        <input id="puzzf_send_to_email_input"  style="
                                            width:100%;
                                            height:' . ($browser_height * 0.08) . 'px;
                                            padding-left:' . ($browser_height * 0.01) . 'px;
                                            box-sizing:border-box;
                                            font-size:' . $browser_height * 0.025 . 'px;
                                            background-color:#E3E3E3;
                                            border:none;
                                            color:#696969;
                                        " 
                                        onfocus="focus_email(this)"
                                        type="email" id="puzzf_email" name="email" placeholder="Enter your email here"> 





                                        <div id="puzzf_send_to_email_btn" class="puzzf_antonio_font"
                                                    style="
                                                
                                                    cursor:pointer;
                                                    outline:0px solid #E3E3E3;
                                                    width:100%;
                                                    height:' . ($browser_height * 0.08) . 'px; 
                                                    background-color:#494444;
                                                    color:white;
                                                    
                                                    font-weight:bold;
                                                    font-size:' . $browser_height * 0.04 . 'px;
                                                    margin-bottom:' . ($browser_height * 0.03) . 'px;


                                                    display:flex;
                                                    justify-content:center;
                                                    align-items:center;
                                            "
                                            >
                                            SEND TO EMAIL
                                        </div>

                                        <div id="puzzf_or"  style="
                                            color:#898989;
                                            text-align:center;
                                            font-family:Arial, sans-serif;
                                            font-weight:bold;
                                            margin-bottom:' . ($browser_height * 0.01) . 'px;
                                            ">
                                            OR
                                        </div>

                                        <div id="puzzf_get_the_code"  style="
                                            color:#898989;
                                            text-align:center;
                                            font-family:Arial, sans-serif;
                                            font-weight:normal;
                                            margin-bottom:' . ($browser_height * 0.01) . 'px;
                                            ">
                                            Get the code here:
                                        </div>

                                        <div id="puzzf_get_the_code" class="puzzf_orange_color_and_align" style="
                                            font-family:Arial, sans-serif;
                                            font-weight:bold;
                                            text-align:center;
                                            ">
                                            <a id="puzzf_link_log_problems" 
                                            
                                            href="https://index.php">https://www.unipuzzle.com/puzzleface</a>
                                        
                                        </div>

                                    </div>
                                       
                
                                </div>

</div>';
        // !  block to show  (end)        


        // https://home/xakep6pam/domains/6pam.ru/public_html/puzzleface/v143p/index.php



        $html_puzzleface .= '</div>            
                                        ';

        // show this block when click on GET CODE btn








        $html_puzzleface .= '<div style="position:relative; width:100%; float:left; outline:0px red solid; ">
                                  <!-- google_header_vertical_big_banner( show_google_js_script -->
                                </div>
                        </div>';





        $html_puzzleface .= '</div>
    
                    </div>  
    
                </div>';   // playfield  // wrp 


        // $html_puzzleface .='<div id="puzzf_footer" style="width:'.$browser_width.'px;height:'.$browser_height * 0.2.'px;border:1px solid red;">
        //                         footer
        //                         </div>';



    } elseif ($browser_width >= $browser_height && $show_page == false) {
        $html_puzzleface .= '
                    <div id="puzzf_stretching_blk" style="width:' . $browser_width . 'px;height:' . $browser_height . 'px;background:black;">
                        <img id="puzzf_disable_loading_page" src="images/rotateYoutPhone.png" alt="disable_loading_page_img" />
                    </div>
                        ';
    }



    $array_return['html_puzzleface'] = $html_puzzleface;

    return $array_return;
}

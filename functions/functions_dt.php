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
// echo '$address_url_web_site = '.$address_url_web_site;

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







    
    if ($show_page == true) {


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
        // *     here is text for   <div id="puzzf_qr_code_text_wrp_blk" style="       At the moment... Puzzle Face is designed as a mobile app. For ease of use and best results use the QR code below on your phone to generate the Image Key.

        // todo overlay clicked func         <div id="puzzf_overlay_dt" onclick="overlay_clicked();"  style="



        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // ! between <img id="puzzf_hr_image"
        // ! and(1730line)
        // ! <div id="puzzf_playfield_dt"    

        // ! 18.11.23 QR CODE BLK removed here 1

        // <div id="puzzf_qr_code_blk" style="
        // position:absolute;
        // margin:0 38.4%;
        // margin:0;
        // width:'.($browser_height / 2.37).'px;
        // outline:0px solid red;
        // height:'.$browser_height.'px;



        // color:#7F737A;
        // text-align:center;
        // font-size:'.$browser_height * 0.03.'px;
        // display:block;
        // "
        // >






        // <div id="puzzf_qr_code_text_wrp_blk" style="
        //         width:80%;
        //         position:relative;
        //         outline:0px solid green;
        //         margin:35% auto;
        //         margin-bottom:0;
        //         ">

        // </div>
        // <div id="puzzf_qr_code_image_wrp_blk" style="
        //         width:'.$browser_height * 0.2.'px;
        //         height:'.$browser_height * 0.2.'px;
        //         margin:0 auto;
        //         position:relative;
        //         outline:0px solid blue;
        //         margin-top:10%;
        //         border:0px solid black;
        //         border-radius:5%;
        //         padding:1%;
        //         outline:0px solid red;
        //         ">
        //     <img id="puzzf_or_code_image" width="100%" src="images/qr_code_puzzleface.jpeg" alt="qr_code_image">
        // </div>










        // <div id="puzzf_links_blk" style="

        // position:absolute;

        // width:100%;
        // top:'.$browser_height * 0.63.'px;
        // height:'.$browser_height * 0.21.'px; 
        // border:0px solid red;
        // ">

        // <div id="puzzf_link_buy_pf" style="text-align:center;font-size:'.$browser_height * 0.03.'px;">
        // <a href="https://letsticktogether.com/products/puzzle-face" class="puzzf_3_links" style="

        //         ">Buy Puzzle Face&trade;
        // </a>
        // </div>


        // <div id="puzzf_link_contact" style="text-align:center;font-size:'.$browser_height * 0.02.'px;margin-top:'.$browser_height * 0.05.'px;">
        // <a href="mailto:puzzleface@letsticktogether.com" class="puzzf_3_links" style="
        //     text-decoration:none;
        // ">
        //     Contact
        // </a>
        // </div>


        // <div id="puzzf_links_privacy_policy" style="text-align:center;font-size:'.$browser_height * 0.02.'px;margin-top:'.$browser_height * 0.02.'px;">
        // <a href="https://letsticktogether.com/pages/privacypolicy" class="puzzf_3_links" style="
        //         text-decoration:none;
        // ">
        //     Privacy Policy
        // </a>
        // </div>
        // </div>




        //     <div style="
        //         outline:0px solid black;
        //         position:absolute;

        //         width:100%;

        //         bottom:9%;

        //         margin:0 auto;

        //         ">
        //         <div style="text-align:center;"><a href="https://letsticktogether.com/" id="puzzf_link_1" style="
        //             position:relative;
        //             font-family:Arial;
        //             font-size:'.$browser_height * 0.021.'px;
        //             color: #b2b2b2;

        //                         ">
        //                 www.letsticktogether.com</a>
        //         </div>

        //         <div style="height:'.$browser_height * 0.01.'px;width:100%;outline:0px solid red;"></div>

        //         <div id="puzzf_link_2" style="
        //             position:relative;
        //             text-align:center;
        //             font-family:Arial;
        //             font-size:'.$browser_height * 0.021.'px;
        //             color: #b2b2b2;

        //             ">
        //                 © 2023 StickTogether Products, LLC
        //         </div>
        //     </div>

        // </div>

        // ! 18.11.23 QR CODE BLK removed here 2




        $html_puzzleface .= '   <div id="puzzf_new_header_dt" style="
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

                      </div>';

        $html_puzzleface .= '



                    <div id="puzzf_playfield_wrp_dt" style="
                    height: calc(100% - ' .  $header_height_desktop . 'px);
                    position:relative;border:0px solid black;">

  



                   






                      
                        <div id="puzzf_playfield_dt" style="display:block;
                        // border:0px solid black;
                            float:left;
                            // outline:0px solid red;
                            height:' . ($browser_height - $header_height_desktop - ($browser_height * 0.03)) . 'px;
                            margin-left:' . $browser_height * 0.1 . 'px;
                            // width:' . $browser_height * 0.1 . 'px;
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











        // * playfield 



        // class="puzzf_antonio_font puzzf_orange_color_and_align"
        //        color:#EC8D00;

        // ? 18.11.23 ADDED another content of div id="puzzf_text_above_mask" block    = IMAGE    and also styles  margin-top:  margin-bottom: and fontsize
        $html_puzzleface .= '<div id="puzzf_text_above_mask" class="puzzf_antonio_font" style="
                        width:' . $browser_height * 0.5203 . 'px;
                        height:' . $browser_height * 0.03 . 'px;
                        outline:0px solid blue;
                        color:#EC8D00;
                        color:black;
                        font-weight:bold;
                        font-size:' . $browser_height * 0.03 . 'px;
                        margin-top:' . ($browser_height * 0.02) . 'px;
                        margin-bottom:' . ($browser_height * 0.01) . 'px;
                        margin-left:0;
                        ">
                        IMAGE
                    </div>';


        //  <img src="images/processing.png" width="'.$browser_height * 0.3.'" alt="processing_img" style="
        //   position:absolute;left:'.(($browser_height * 0.5203 - ($browser_height * 0.3)) / 2).'px;
        //   top:'.((($browser_height * 0.5203) / 0.75 -($browser_height * 0.3)) / 2).'px;
        //   ">

        // todo  onmousedown="stopPropagationFunc(event);" onmousemove="stopPropagationFunc(event);" onmouseup="stopPropagationFunc(event);" 





        // <div id="puzzf_overlay_dt" style="
        //         position:absolute;
        //         left:0;
        //         right:0;
        //         bottom:0;
        //         top:0;
        //         background-color:black;
        //         opacity:0.5;
        //         z-index:10000;
        //         display:none;



        //     " >


        // </div>


        // <div id="puzzf_zoom" style="
        //     position:relative;
        //     width: 100%;
        //     height: 100%;
        //     transform-origin: 0px 0px;
        //     transform: scale(1) translate(0px, 0px);
        //     ">


        // <img id="puzzf_image" style="
        //     position:absolute;

        //     outline:0px solid red;
        //     display:block;
        //     "
        //  class="dragme"  onmousedown="return false;" height="100%" src="images/upload_image_line_text_grey_v1.svg" alt="" />


        // </div>


        // ! IMAGE removed here 1
        // <img id="puzzf_image" style="
        // position:absolute;

        // outline:0px solid red;
        // display:block;
        // "
        // class="dragme"  onmousedown="return false;" height="100%" src="images/upload_image_line_text_grey_v1.svg" alt="" />
        // ! IMAGE removed here 2

        // $html_puzzleface .='<div class="basic-result puzzf_antonio_font" style="
        //                         outline:3px solid black;
        //                         position:absolute;
        //                         margin-left:'.$browser_height * 0.015.'px;
        //                         margin-top:'.$browser_height * 0.015.'px;
        //                         z-index:2;
        //                         background-color:grey;
        //                         color:white;
        //                         display:flex;
        //                         justify-content:center;
        //                         align-items:center;
        //                         font-size:'.$browser_height * 0.04.'px;
        //                         transform:rotateZ(45deg);
        //                         border-radius:50%;
        //                         cursor:pointer;
        //                         width:'.$browser_height * 0.07.'px;
        //                         height:'.$browser_height * 0.07.'px;">
        //                         <div style="
        //                             position:relative;
        //                             z-index:2;
        //                             ">
        //                             Result
        //                         </div>
        //                     </div>';


        //     margin-left:'.((($browser_height * 0.7) - ($browser_height * 0.52)) / 1.3).'px;
        $html_puzzleface .= '<label id="puzzf_label_for_getval" for="nothing" style="
                        display:inline-block;
                        margin-left:0;
                
                    " 
                
                    >

                    <div id="puzzf_mask" 
                            style="
                                cursor:pointer;
                                width:' . $browser_height * 0.5203 . 'px;
                                height:' . (($browser_height * 0.5203) / 0.75) . 'px;
                                outline:0px solid black;
                            ">

                            <img id="puzzf_image" "crossorigin="anonymous" style="
                                position:absolute;
                                outline:0px solid red;
                                display:block;
                                "
                            class="dragme"  onmousedown="return false;" src="" height="100%" alt="">
                            

                    </div>
                    
                    </label>
                    <input type="file" style="
                            position:absolute;
                            left:0;
                            top:-100000000px;
                       
                      
                        " id="puzzf_getval" name="background-image"><br/><br/>

                        <div id="puzzf_img_system_width"></div>
                        <div id="puzzf_img_system_height"></div>
                    ';

        // ? 18.11.23 ADDED <div id="puzzf_text_under_mask" 

        // ? 18.11.23 CHANGED added <span to text_content  and no font-weight:bold - in other place now in text_content    
        // ?  then - check the border-radius(0) and height margin-top and other(line-height) things in <div"puzzf_upload_image_btn"
        // ? deleted this => class="puzzf_antonio_font" and new font-size  no height no bg ...
        // ? and the same in <div id="puzzf_change_image_btn" block
        $html_puzzleface .= '



                    <div id="puzzf_text_under_mask" style="
                        position:relative;
                        top:-3.5%;
                        width:' . $browser_height * 0.5203 . 'px;
                        // height:' . $browser_height * 0.05 . 'px;
                        outline:0px solid blue;
                      
                        
                        font-size:' . $browser_height * 0.02 . 'px;
                        // margin-top:13px;
                        margin-top:' . ($browser_height * 0.01) . 'px;
                        // margin-bottom:' . ($browser_height * 0.00) . 'px;
                        margin-left:0;
                        line-height:' . ($browser_height * 0.025) . 'px;
                        ">
                        <span style="font-weight:bold;">TIP:</span> Close-ups work best
                    </div>




                                        <label for="puzzf_getval" style="
                                            display:inline-block;
                                            margin-left:0;
                                            margin-top:' . ($browser_height * 0.001) . 'px;
                                        ">
                    
                                        <div id="puzzf_change_image_btn" 
                                                style="
                                                text-decoration: underline;
                                                display:none;
                                                cursor:pointer;
                                                outline:0px solid #E3E3E3;
                                                width:' . $browser_height * 0.52 . 'px;

                                                color:#FA9500;
                                                
                                               
                                   
                                                font-size:' . $browser_height * 0.02 . 'px;

                                                margin-top:-' . ($browser_height * 0.02) . 'px;


                                
                                          
                                                "
                                            >
                                                Change Portrait
                                            </div>


                                            <div id="puzzf_upload_image_btn" class="puzzf_antonio_font" 
                                                style="
                                                cursor:pointer;
                                                outline:0px solid black;
                                                width:' . $browser_height * 0.52 . 'px;
                                                height:' . ($browser_height * 0.08) . 'px; 
                                                background-color:#FA9500;
                                                color:white;
                                                font-weight:bold;
                                                font-size:' . $browser_height * 0.04 . 'px;
                                                margin-top:-' . ($browser_height * 0.02) . 'px;
                                                border-radius:' . (($browser_height * 0.00) / 2) . 'px;

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














        $html_puzzleface .= '<div id="puzzf_center_right_dt" style="display:block;  
                            position:relative;
                            // * width:' . ($browser_width - ($browser_height * 0.65)) . 'px;
                            height:' . ($browser_height - $header_height_desktop - ($browser_height * 0.03)) . 'px;
                            // margin-left:' . ($browser_height * 0.65) . 'px;
                            // border:0px solid black;
                            
                        ">';



        // ? 18.11.23 ADDED another content of <div class="puzzf_antonio_font puzzf_orange_color_and_align block    = PUZZLE FACE and styles  margin-top margin-bottom
        $html_puzzleface .= '<div class="puzzf_center_block" style=" 
                            position:relative;
                            width:auto; 
                            height:' . ($browser_height - $header_height_desktop - ($browser_height * 0.03)) . 'px;
                            outline:0px solid blue;
                          ">

                          



                          <div id="puzzf_4_canvases_wrp" 
                                style="
                                    position:relative;
                                    outline:0px solid black;
                                    overflow:visible;
                                 
                                 
                                   
                                "
                            >
                            <div class="puzzf_antonio_font puzzf_orange_color_and_align" style="
                                color:#EC8D00;
                                color:black;
                                height:' . $browser_height * 0.03 . 'px;
                                
                              
                                font-weight:bold;
                                font-size:' . $browser_height * 0.03 . 'px;
                                margin-top:' . ($browser_height * 0.02) . 'px;
                                margin-bottom:' . ($browser_height * 0.01) . 'px;
                                outline:0px solid red;
                            ">
                                PUZZLE FACE
                          </div>';



        $html_puzzleface .= '<div id="puzzf_after_generate_tip" style="
                                                    position:absolute;
                                                    left:0;
                                                    top:' . $browser_height * 0.4 . 'px;
                                                    font-size:' . $browser_height * 0.02 . 'px;
                                                    line-height: 120%;
                                                    color:black;
                                                    display:none;
                                                    border:0px solid red;
                                                    z-index:1000;
                                                    
                                                ">

                    <span style="font-weight:bold;">TIP:</span> If you like this Puzzle
                                                    Face, use the red button to
                                                    <span style="font-weight:bold;color:#D12D34;">SAVE IMAGE KEY</span>.<br><br>

                                                    Or, try adjusting the image
                                                    on the left to generate a new
                                                    Puzzle Face.<br><br>

                                                    Only save the Image Key
                                                    when you are satisfied with the
                                                    Puzzle Face.<br><br>
                                                </div>';
























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
        // ?  todo 31.05.23 1

        // ? <input id="puzzf_pixelization_input" type="file" onchange="previewFile()" >
        
// ? pixelization ADDED 20.12.23 1

    $html_puzzleface .= '
        <img id="puzzf_pixelization_img" width="0" style="position:absolute;z-index:1000;left:-50px;" src="images/pixelization.png" alt="pixelization.png">
    ';


// ? pixelization ADDED 20.12.23 2



        // ? 18.11.23 CHANGED top for <div id="puzzf_generate_btn"
        $html_puzzleface .=   '<div id="puzzf_canvas_wrp_1" class="puzzf_canvas_wrps"
                                style="
                                 height:' . (($browser_height * 0.52) / 0.75) . 'px;
                                 width:' . (($browser_height * 0.24395)) . 'px;
                                    // position:absolute;
                                    transform:translate(0px, ' . $browser_height * 0.00181 . 'px);
                                    outline:0px solid red;
                                "
                                >
                                
                               
                                
                                    <canvas id="canvas_1" class="puzzf_canvases" style="
                                        position:relative;
                                     
                                        outline:0px solid #E3E3E3;
                                        margin-top:' . $browser_height * 0.00 . 'px;
                                        " 
                                        width="' . (($browser_height * 0.24395) / 2) . 'px"
                                        height="' . ((($browser_height * 0.24395) / 0.75) / 2) . 'px">
                                    </canvas>';

                $html_puzzleface .=   '<canvas id="canvas_2" class="puzzf_canvases" style="
                                            position:absolute;
                                            left:0;
                                        
                                            top:0;
                                            z-index:10000;
                                            outline:0px solid black;
                                            margin-top:' . $browser_height * 0.00 . 'px;
                                            " 
                                            width="' . ($browser_height * 0.24395) . 'px"
                                            height="' . (($browser_height * 0.24395) / 0.75) . 'px">
                                        </canvas>';

            $html_puzzleface .=   ' </div>';




        $html_puzzleface .=   '<div id="puzzf_generate_btn" class="puzzf_antonio_font" onclick="generate_puzzles();"
                                    style="

                                    pointer-events:none;
                                    opacity:0;
                                    position:absolute;
                                    left:0;
                                    top:' . $browser_height * 0.4 . 'px;
                                    cursor:pointer;
                                    outline:0px solid #E3E3E3;
                                    //width:92.5%;
                                    width:' . ($browser_height * 0.24395) . 'px;
                                    height:' . ($browser_height * 0.08) . 'px; 
                                    background-color:#FA9500;
                                    color:white;
                                    z-index:10000;
                                    
                                    font-weight:bold;
                                    font-size:' . $browser_height * 0.03 . 'px;
                        

                                    border-radius:' . (($browser_height * 0.00) / 2) . 'px;


                                    display:flex;
                                    justify-content:center;
                                    align-items:center;


                                    -o-transition: all 0.5s ease-out 0s; 
                                    -moz-transition: all 0.5s ease-out 0s;
                                    -webkit-transition: all 0.5s ease-out 0s;
                                    transition: all 0.5s ease-out 0s;


                                
                            
                                "
                                >
                                CREATE PUZZLE FACE
                        </div> 


                        
                    <div class="wr_links" style="position:absolute;
                                        left:0;
                                        bottom:-' . $browser_height * 0.119 . 'px;
                                        cursor:pointer; color: #717172; font-size:' . $browser_height * 0.015 . 'px; ">
                       
                        <div id="puzzf_links_privacy_policy" style="margin-bottom:' . $browser_height * 0.005 . 'px;" >
                                <a target="_blank" href="https://letsticktogether.com/pages/privacypolicy" class="puzzf_3_links">
                                    Privacy Policy
                                </a>
                        </div>

                        <div id="puzzf_link_contact" style="margin-bottom:' . $browser_height * 0.005 . 'px;">
                                <a target="_blank" href="mailto:puzzleface@letsticktogether.com" class="puzzf_3_links">
                                    Contact
                                </a>
                        </div>
                            
                        <div id="puzzf_pdf_link_2" >© 2023 StickTogether Products, LLC</div>
                    </div>
 









                            
                            </div>




                        </div>';




        // '.$html_footer_for_holiday_puzzles.'
        // * todo 31.05.23 2












        $html_puzzleface .= '</div>
    
<div id="puzzf_right_dt" style="
// position:absolute;  
                                // width:53%;
                                height:' . ($browser_height - $header_height_desktop - ($browser_height * 0.03)) . 'px;
                                margin-right:' . $browser_height * 0.1 . 'px;
                                
                                border:0px solid green;
                                top:0;
                                right:0;



            

                          
                        
                           ">';







        // ? 18.11.23 ADDED another content for INNER(!)div of <div id="puzzf_show_get_code_blk" div     = IMAGE KEY and styles = margin-bottom
        $html_puzzleface .= '<div id="puzzf_show_get_code_blk" class="puzzf_antonio_font"  style="width:100%;">
                                        <div style="
                                            position:relative;
                                            height:' . $browser_height * 0.03 . 'px;
                                            color:#EC8D00;
                                            color:black;
                                            outline:0px solid red;
                                            
                                            font-weight:bold;
                                            font-size:' . $browser_height * 0.03 . 'px;
                                            margin-top:' . ($browser_height * 0.02) . 'px;
                                            margin-bottom:' . ($browser_height * 0.01) . 'px;
                                  
                                            "
                                        >
                                            IMAGE KEY
                                    </div>';








        $html_puzzleface .= '<div id="puzzf_right_col_btns_wrp" 
                                    style="
                                        position:relative;
                                        left:0;
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
                                                left:' . ($browser_height * 0.0242) . 'px;

                                                height:' . ($browser_height * 0.045) . 'px;
                                                width:' . ($browser_height * 0.447) . 'px;

                                                outline:0.01rem solid #EAEAEA;

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

                                                        <canvas id="canvas_3" class="puzzf_canvases" style="
                                                            position:relative;
                                                        
                                                            outline:0px solid #E3E3E3;
                                                            margin-top:' . $browser_height * 0.00 . 'px;
                                                            " 
                                                            width="' . (($browser_height * 0.24395) / 7.135) . 'px"
                                                            height="' . ((($browser_height * 0.24395) / 0.75) / 7.135) . 'px">
                                                        </canvas>
                                                
                                                    </div>

                                            </div>
                                        </div>';





        $html_puzzleface .= '
        <a href="https://www.puzzleface.com/" id="puzzf_pdf_link_0" style="display:none;position:absolute;right:-' . ($browser_height * 0.065) . 'px;bottom:' . $browser_height * 0.35 . 'px;transform-origin:left top;transform:rotateZ(-90deg);font-family:Arial;color:black;font-size:' . $browser_height * 0.01 . 'px;">
                                www.puzzleface.com</a>
        
        <a href="https://letsticktogether.com/" id="puzzf_pdf_link_1" style="display:none;position:absolute;right:-' . ($browser_height * 0.084) . 'px;bottom:' . $browser_height * 0.21 . 'px;transform-origin:left top;transform:rotateZ(-90deg);font-family:Arial;color:black;font-size:' . $browser_height * 0.01 . 'px;">
                                        www.letsticktogether.com</a>
                                        
                                        <div id="puzzf_pdf_link_3" style="display:none;position:absolute;right:-' . ($browser_height * 0.135) . 'px;bottom:' . $browser_height * 0.022 . 'px;transform-origin:left top;transform:rotateZ(-90deg);font-family:Arial;color:black;font-size:' . $browser_height * 0.01 . 'px;                      
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


        // ? 18.11.23 CHANGED then - check the border-radius(0) bottom: background-color: and other things in  <div id="puzzf_get_code_btn"                               
        // *   background-color:#FA9500;
        // !  alone button for showing many buttons     
        // ! old    <div id="puzzf_get_code_btn" class="puzzf_antonio_font" onclick="get_code(event);"
        $html_puzzleface .= '<div id="puzzf_get_code_btn_wrp_to_disappear" style="
                            
                            ">
                    

                                <div id="puzzf_get_code_btn" class="puzzf_antonio_font" onclick="create_pdf();"
                                        style="
                    
                                        position:absolute;
                                        left:0;
                                        bottom:-' . $browser_height * 0.119 . 'px;
                                        cursor:pointer;
                                        outline:0px solid #E3E3E3;
                                        width:100%;
                                        height:' . ($browser_height * 0.08) . 'px; 
                                        background-color:#BD262B;
                                        color:white;
                                        z-index:10000;
                                        
                                        font-weight:bold;
                                        font-size:' . $browser_height * 0.04 . 'px;
                
                                        border-radius:' . (($browser_height * 0.00) / 2) . 'px;
            
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

        // ? 18.11.23 ADDED line-height to <div id="puzzf_text_under_pdf" and other may be
        // ? added <span to text_content  and no font-weight:bold - in other place now in text_content    
        $html_puzzleface .= '
                                            <div id="puzzf_text_under_pdf" style="
                                                position:relative;
                                                height:' . $browser_height * 0.05 . 'px;
                                                color:#EC8D00;
                                                color:black;
                                                outline:0px solid red;
                                                width:' . ($browser_height * 0.52) . 'px;
                                         
                                                
                                                line-height:' . ($browser_height * 0.025) . 'px;
                                                font-size:' . $browser_height * 0.02 . 'px;
                                                margin-top:' . $browser_height * 0.005 . 'px;
                                                font-family: Segoe UI, sans-serif;
                                                
                                                display:none;
                                                "
                                            >
                                                When ready, <span style="font-weight:bold;color:#BD262B;">SAVE</span> the Image Key
                                            </div>';
        // !  block to show  (end)        


        // https://home/xakep6pam/domains/6pam.ru/public_html/puzzleface/v143p/index.php



        $html_puzzleface .= '</div>            
                                        ';

        // show this block when click on GET CODE btn








        $html_puzzleface .= '<div style="position:relative; width:100%; float:left; outline:0px red solid; ">
                                  <!-- google_header_vertical_big_banner( show_google_js_script -->
                                </div>
                        </div>


                    </div>  
    
                </div>';   // playfield  // wrp 


        // $html_puzzleface .='<div id="puzzf_footer" style="width:'.$browser_width.'px;height:'.$browser_height * 0.2.'px;border:1px solid red;">
        //                         footer
        //                         </div>';



    } elseif ($show_page == false) {
        $html_puzzleface .= '
                    <div id="puzzf_stretching_blk" style="width:' . $browser_width . 'px;height:' . $browser_height . 'px;background:black;">
                        <img id="puzzf_disable_loading_page" src="images/rotateYoutPhone.png" alt="disable_loading_page_img" />
                    </div>
                        ';
    }



    $array_return['html_puzzleface'] = $html_puzzleface;

    return $array_return;
}

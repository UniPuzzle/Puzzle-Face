<?php 
/* Эта функция в играх будет показывать меню! */
function game_holiday_puzzles_header_menu($game_name_page_now = "", $address_web_site, $array_holiday_puzzles, $folder, $main_folder_for_image ){
    $array = array();
    $html_christmas_menu_game = "";
    
    if(isset($array_holiday_puzzles)){
        if($array_holiday_puzzles){
            foreach($array_holiday_puzzles as $key=>$val ){
                 
                $src_image = "";  
                $image = ""; 
                if(isset($val['image'])){
                    if($val['image']){
                        $image = $val['image'];       
                    }
                }
                
                if($image){
                    // $HTTP_SERVER;
                    $src_image = "/".$main_folder_for_image."/".HOLIDAY_PUZZLES_FOLDER_IMAGE."/".$image;
                }    
                
                
                   
                $title = ""; 
                if(isset($val['title'])){
                    if($val['title']){
                        $title = $val['title'];       
                    }
                }
              
              
              $title_without_spec_symbol =   create_title_xml($title);           
            
                
                
                $game_checked = "";
                if($title_without_spec_symbol == $game_name_page_now){
                    $game_checked = "hp_menu_checked_active_page";
                }
                
                
                
                    $array[$title_without_spec_symbol]['icon'] = $src_image;// 'palm_white_background';
                    $array[$title_without_spec_symbol]['title'] = $title;//'Christmas <br /> Trilights';
                    $array[$title_without_spec_symbol]['link'] = $address_web_site."/".$folder."/".$title_without_spec_symbol."/index.php";
                    $array[$title_without_spec_symbol]['checked'] = $game_checked;
                
                // EXAMPLE
                          // $array['christmas-trilights']['icon'] = 'palm_white_background';
                          // $array['christmas-trilights']['title'] = 'Christmas <br /> Trilights';
                          // $array['christmas-trilights']['link'] = $address_web_site."/holiday-puzzles/christmas-trilights/index.php";
                  $html_christmas_menu_game .='<a href="'.$array[$title_without_spec_symbol]['link'].'" class="chc_menu_item_lnk  ">
                                                <div class="chc_menu_items '.$game_checked.'" style="">
                                                    <div id="chc_menu_item">
                                                        <!-- <img src="'.$array[$title_without_spec_symbol]['icon'].'"  class="chc_menu_icon"   >  -->
                                                         
                                                        
                                                        <div class="menu_header_puzzles_div">
                                                            <div class="chc_menu_icon_div" style="background-image: url('.$array[$title_without_spec_symbol]['icon'].');  "></div>
                                                        </div> 
                                                        
                                                        <span class="chc_menu_items_title" style="">'.$array[$title_without_spec_symbol]['title'].'</span>
                                                    </div>
                                                </div>
                                            </a>';
                
                
            }
        }
    }
    
     
           // SET HEADER
         $html = "";
         if($html_christmas_menu_game){
                $html .= '<div id="chc_games_menu"  >';
                $html .=    $html_christmas_menu_game;
                $html .='</div>';
         } 
      
 
        
     
    return $html;
    
     
    
}       


function game_holiday_puzzles_footer_in_right_side($address_web_site, $add_style = "" ){ 
    //  style="width:'.(($browser_height * 10) / 100).'px;height:'.(($browser_height * 6) / 100).'px;"
    $html_footer_for_holiday_puzzles = '
         <div class="up_hp_holiday_puzzles_footer_game" style="'.$add_style.'">
                 <div class="up_hp_index_up_div" style="width:100px;height:50px;">
                                    <a href="'.$address_web_site.'">
                                        <img src="/up_images/icons/up_logo_white_v1.svg" class="up_hp_index_up_icon">
                                    </a>
                 </div> 
         </div>
    ';
    
    
    return $html_footer_for_holiday_puzzles;
} 

 






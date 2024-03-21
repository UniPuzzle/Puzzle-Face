<?php
/*
 * Данные о пользователе сайта
 *  Exmaple:
 
 $AboutGuest = new AboutGuest;

echo   "Исходные данные: $AboutGuest->agent <br /><br />
        IP: $AboutGuest->ip<br />
        Браузер: $AboutGuest->browser версия: $AboutGuest->version<br />
        Операционная система: $AboutGuest->operating_system версия: $AboutGuest->os_version<br /><br />
        
        Являюсь роботом? ". $AboutGuest->is_robot ."<br />
        Робот принадлежит: $AboutGuest->robot<br /><br />
        
        Зашел с мобильного? ". $AboutGuest->is_mobile ."<br />
        Телефон: $AboutGuest->mobile<br /><br />";
   
   
   Best example:
   
   
 
//  All info about user 
  $AboutGuest = new AboutGuest;
  
  $about_gest__about_agent = '';
  $about_gest__ip = '';
  $about_gest__operating_system = '';
  $about_gest__browser = '';
  $about_gest__os_version = '';
  $about_version_brawser = '';
  $about_gest__is_robot = '';
  $about_gest__robot = '';
  $about_gest__mobile = '';
  $about_gest__is_mobile = '';
  
  if(isset($AboutGuest)){
    if($AboutGuest!=false){
        
        if(isset($AboutGuest->agent)){
            if($AboutGuest->agent!=false){
                $about_gest__about_agent = $AboutGuest->agent;
            }
        }
        
          
        if(isset($AboutGuest->ip)){
            if($AboutGuest->ip!=false){
                $about_gest__ip = $AboutGuest->ip;
            }
        }
          
        if(isset($AboutGuest->operating_system)){
            if($AboutGuest->operating_system!=false){
                $about_gest__operating_system = $AboutGuest->operating_system;
            }
        }
        
         if(isset($AboutGuest->browser)){
            if($AboutGuest->browser!=false){
                $about_gest__browser = $AboutGuest->browser;
            }
        }
        
        
        if(isset($AboutGuest->os_version)){
            if(  $AboutGuest->os_version!=false){
                 $about_gest__os_version = $AboutGuest->os_version;
            }
        }
        
        
        if(isset($AboutGuest->is_robot)){
            if(  $AboutGuest->is_robot!=false){
                 $about_gest__is_robot = $AboutGuest->is_robot;
            }
        }
        
         
        if(isset($AboutGuest->robot)){
            if(  $AboutGuest->robot!=false){
                 $about_gest__robot = $AboutGuest->robot;
            }
        }
        
           
        if(isset($AboutGuest->is_mobile)){
            if(  $AboutGuest->is_mobile!=false){
                 $about_gest__is_mobile = $AboutGuest->is_mobile;
            }
        }
        
        
            
        if(isset($AboutGuest->mobile)){
            if(  $AboutGuest->mobile!=false){
                 $about_gest__mobile = $AboutGuest->mobile;
            }
        }
        
        
          
          
         
    }
  }
  
  
  
  
  
  
  
  
  
  
  $about_user_full_description = '';
  if($about_gest__about_agent!=false or $about_gest__ip!=false or $about_gest__browser!=false or $about_gest__operating_system!=false){
        $about_user_full_description .= 'Данные о пользователе. ';
    
        if($about_gest__about_agent!=false){
            $about_user_full_description .= 'Исходные данные: '.$about_gest__about_agent.';';
        }
         
        if($about_gest__ip!=false){
            $about_user_full_description .= 'IP: '.$about_gest__ip.';';
        }
        
         
        if($about_gest__operating_system!=false){
            $about_user_full_description .= 'Операционная система: '.$about_gest__operating_system.';';
        }
        
        
        if($about_gest__browser!=false){
            
             if($about_gest__os_version!=false){
                 $about_version_brawser = ' версия: '.$about_gest__os_version.'';
            }
            
            $about_user_full_description .= ' Браузер: '.$about_gest__browser.''.$about_version_brawser.';';
        }
         
         
         if($about_gest__is_robot!=false){
            $about_user_full_description .= ' Являюсь роботом? '.$about_gest__is_robot.';';
        }
        
         
        if($about_gest__robot!=false){
            $about_user_full_description .= ' Робот принадлежит: '.$about_gest__robot.';';
        }
        
           
        if($about_gest__is_mobile!=false){
            $about_user_full_description .= ' Зашел с мобильного? '.$about_gest__is_mobile.';';
        }
        
             
        if($about_gest__mobile!=false){
            $about_user_full_description .= ' Телефон: '.$about_gest__mobile.';';
        }
        
        $about_user_full_description = trim($about_user_full_description,';').'.';
          
         
    
  }
echo $about_user_full_description;


 */
class AboutGuest {
    
    public $is_browser = False;
    public $is_mobile = False;
    public $is_robot = False;
    
    public $browsers = array();
    public $operating_systems = array();
    public $mobiles = array();
    public $robots = array();
    
    public $ip = '';
    public $version = '';
    public $browser = '';
    public $browser_full_name = '';
    public $operating_system = '';
    public $os_version = '';
    public $robot = '';
    public $mobile = '';
    
    public function __construct() {
        // Загружаем массивы для работы с данными
        $files = array('browsers', 'operating_systems', 'mobiles', 'robots');
        foreach($files as $file) {
            $this->load( $file );
        }
        
        // Данные пользователя
        $this->agent = (@$_SERVER['HTTP_USER_AGENT'])? $_SERVER['HTTP_USER_AGENT'] : '';
        // Вызываем методы для заполнения данных пользователя
        $setMethods = array('set_ip', 'set_browser', 'set_operating_system', 'set_robot', 'set_mobile');
        foreach($setMethods as $method) {
            $this->$method();
        }
    }
    
    private function load( $file_and_array_name ) {
        /*
         * Загружает массивы из папки с массивами
         */
        $Load = require_once( dirname( __FILE__ ) ) . '/arrays/'.$file_and_array_name.'.php';
        $this->$file_and_array_name = (!count($Load))? array() : $Load;
    }
    
    private function set_ip() {
        $this->ip = $_SERVER['REMOTE_ADDR'];
        return True;
    }
    
    private function set_browser() {
        if (is_array($this->browsers) and count($this->browsers) > 0) {
            foreach ($this->browsers as $key => $val) {
                if (preg_match("|".preg_quote($key).".*?([0-9\.]+)|i", $this->agent, $match)) {
                    $this->is_browser = TRUE;
                    $this->version = $match[1];
                    $this->browser = $val;
                    $this->browser_full_name = $match[0];
                    return True;
                }
            }
        }
        return False;
    }
    
    private function set_operating_system() {
        if (is_array($this->operating_systems) AND count($this->operating_systems) > 0) {
            foreach ($this->operating_systems as $key => $val) {
                if (preg_match("|".preg_quote($key).".*?([a-zA-Z]?[0-9\.]+)|i", $this->agent, $match)) {
                    $this->operating_system = $val;
                    $this->os_version = $match[1];
                    return True;
                }
            }
        }
        $this->operating_system = 'Unknown';
    }
    
    private function set_robot() {
        if (is_array($this->robots) AND count($this->robots) > 0) {
            foreach ($this->robots as $key => $val) {
                if (preg_match("|".preg_quote($key)."|i", $this->agent)) {
                    $this->is_robot = TRUE;
                    $this->robot = $val;
                    return TRUE;
                }
            }
        }
        return FALSE;
    }
    
    private function set_mobile() {
        if (is_array($this->mobiles) AND count($this->mobiles) > 0) {
            foreach ($this->mobiles as $key => $val) {
                if (FALSE !== (strpos(strtolower($this->agent), $key))) {
                    $this->is_mobile = TRUE;
                    $this->mobile = $val;
                    return TRUE;
                }
            }
        }
        return FALSE;
    }

}







 // ===================================== Взять айпи юзерс ================================================
 function get_real_ip_users() {
    //echo $_SERVER[REMOTE_ADDR];
       if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
          $ip = $_SERVER['HTTP_CLIENT_IP'];
       }  elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                   $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
                } else {
                           $ip = $_SERVER['REMOTE_ADDR'];
                       }
    return $ip;
 }

   	
	// ============================================ ВРЕМЯ ДАТА CЕЙЧАС ============================================
    function time_now_formatDate($time) { 
        // $time = $time -  3600;
         return date("d.m.Y", $time);//преобразовывает дату 	
     }
   
   
         

// ================= About Edti Get Content =========================================================
function about_guest_get_content(){
    //  echo 'Мы получаем здесь все данные о клиенте';



    // получать айпи пользователя онлайн TABLE // visitors_users \\
    $get_ip_user = get_real_ip_users();  // 127.0.0.1
    $get_date_now = time_now_formatDate( time() );   // 09.03.2016
    $get_time_zaxoda = time(); // 14425255232

   // return '';
    // проверить айпи есть в базе или нет
    //  echo $get_date_now;


    $array_about_guest = array();
    $array_about_guest['counter_gest_about_agent'] = '';
    $array_about_guest['counter_gest_ip'] = '';
    $array_about_guest['counter_gest_operating_system'] = '';
    $array_about_guest['counter_gest_browser'] = '';
    $array_about_guest['counter_gest_os_version'] = '';
    $array_about_guest['counter_gest_is_robot'] = '';
    $array_about_guest['counter_gest_robot'] = '';
    $array_about_guest['counter_gest_is_mobile'] = '';
    $array_about_guest['counter_gest_mobile'] = '';
    $array_about_guest['server_http_accept_language'] = '';



    $index = 0;



    //  All info about user
    $AboutGuest = new AboutGuest;
  
   // print_r($AboutGuest);

    $counter_about_gest__about_agent = '';
    $counter_gest__ip = '';
    $counter_gest__operating_system = '';
    $counter_gest__browser = '';
    $counter_gest__os_version = '';
    $counter_version_brawser = '';
    $counter_gest__is_robot = '';
    $counter_gest__robot = '';
    $counter_gest__mobile = '';
    $counter_gest__is_mobile = '';


    $server_http_accept_language = '';
    if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])){
        if($_SERVER['HTTP_ACCEPT_LANGUAGE']){
            $server_http_accept_language = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
            $array_about_guest['server_http_accept_language'] = $server_http_accept_language;
        }
    }



    if(isset($AboutGuest)){
        if($AboutGuest){


            if(isset($AboutGuest->agent)){
                if($AboutGuest->agent){
                    $counter_gest__about_agent = $AboutGuest->agent;
                    $array_about_guest['counter_gest_about_agent'] = $counter_gest__about_agent;
                }
            }


            if(isset($AboutGuest->ip)){
                if($AboutGuest->ip){
                    $counter_gest__ip = $AboutGuest->ip;
                    $array_about_guest['counter_gest_ip'] = $counter_gest__ip;
                }
            }


            if(isset($AboutGuest->operating_system)){
                if($AboutGuest->operating_system){
                    $counter_gest__operating_system = $AboutGuest->operating_system;
                    $array_about_guest['counter_gest_operating_system'] = $counter_gest__operating_system;
                }
            }

            if(isset($AboutGuest->browser)){
                if($AboutGuest->browser){
                    $counter_gest__browser = $AboutGuest->browser;
                    $array_about_guest['counter_gest_browser'] = $counter_gest__browser;
                }
            }


            if(isset($AboutGuest->os_version)){
                if(  $AboutGuest->os_version){
                    $counter_gest__os_version = $AboutGuest->os_version;
                    $array_about_guest['counter_gest_os_version'] = $counter_gest__os_version;
                }
            }


            if(isset($AboutGuest->is_robot)){
                if(  $AboutGuest->is_robot){
                    $counter_gest__is_robot = $AboutGuest->is_robot;
                    $array_about_guest['counter_gest_is_robot'] = $counter_gest__is_robot;
                }
            }


            if(isset($AboutGuest->robot)){
                if(  $AboutGuest->robot){
                    $counter_gest__robot = $AboutGuest->robot;
                    $array_about_guest['counter_gest_robot'] = $counter_gest__robot;
                }
            }


            if(isset($AboutGuest->is_mobile)){
                if(  $AboutGuest->is_mobile){
                    $counter_gest__is_mobile = $AboutGuest->is_mobile;
                    $array_about_guest['counter_gest_is_mobile'] = $counter_gest__is_mobile;
                }
            }



            if(isset($AboutGuest->mobile)){
                if(  $AboutGuest->mobile){
                    $counter_gest__mobile = $AboutGuest->mobile;
                    $array_about_guest['counter_gest_mobile'] = $counter_gest__mobile;
                }
            }





        }
    }
    
         //   print_r($array_about_guest);


    return $array_about_guest;
}

?>
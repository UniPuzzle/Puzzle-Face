function create_pdf() {  
  // console.log('calling_create_pdf');


  // console.log('###base64result = ', base64result); // * have value




  // let get_generate_btn = document.getElementById('puzzf_generate_btn');
  // get_generate_btn.style.pointerEvents = 'none';
  // get_generate_btn.style.opacity = '0';

// ! 14.04.23 1
            // if (base64result) { 
            //   var data = new FormData();  
            //   data.append("base64result", base64result);
              
            //   // Send Query
            //   $.ajax({
            //       url: "ajax/ajax_base64result.php", //+"./ajax/ajax.php",
            //       type: "POST",
            //       data: data,
            //       cache: false,
            //       dataType: 'json',
            //       processData: false,
            //       contentType: false,
            //       success: function (respond, textStatus, jqXHR) {  
            //         // if (respond.base64result) {
            //         //   console.log('base64result_respond = ', base64result);
            //         // }
            //       }
            //   })
            // };

// ! 14.04.23 2


// alert(document.cookie.match(/PHPSESSID=[^;]+/));





  
  var create_pdf_url = "";
  var obj_dirs = ""; // global_value_obj_dirs
  var obj_tiles = ""; // global_value_obj_tiles
  var url_location_path_now = window.location; // http://puzzlebase_unipuzzle_v10.local/crop/v19/
      case_size = 'vertical';
  
//   // var canvas_width = $("#matching_tiles").attr("width");
//   // var canvas_height = $("#matching_tiles").attr("height");
//   var canvas_width = $("#canvas_1").attr("width");
//   var canvas_height = $("#canvas_1").attr("height");
//   // console.log('canvas_width = ', canvas_width);
//   // console.log('canvas_height = ', canvas_height);


  var play_pdf = $("#js_id_path_pdf_php").val(); // pdf.php
//  console.log('play_pdf = ', play_pdf);     // ! have no HTTP_SERVER variable value - do we need config_class.php in puzzleface/v0/lib ?
 // alert(play_pdf);
  

//   if(canvas_width > canvas_height){
//     // alert('has_horizontal');
//      case_size = 'horizontal';
//   }
//   else if(canvas_width < canvas_height ){
//      case_size = 'vertical';
//   }
//    // 0. Js get url now
//     // alert(url_location_path_now);
   
   // 1. Create string for URL
  // console.log('global_value_obj_dirs = ', global_value_obj_dirs);

  //console.log('selected_cavas = ', selected_cavas);
//   console.log('selected_cavas = ', selected_cavas);
  
  // if(selected_cavas === '1'){
  //   // console.log('inside === 1');
  //console.log('global_value_obj_dirs_1 = ', global_value_obj_dirs_1);

  // if(global_value_obj_dirs_1.keys(obj).length === 0){
  //   return;
  // }
    global_value_obj_dirs_1.forEach(function (item) {   
        obj_dirs += item+",";
   });
   global_value_obj_tiles_1.forEach(function (item) {
        obj_tiles += item+",";
   });


   //console.log('obj_tiles = ', obj_tiles);
  // }
  // else if(selected_cavas === '2'){
  //   // console.log('inside === 2');
  //   global_value_obj_dirs_2.forEach(function (item) {   
  //       obj_dirs += item+",";
  //  });
  //  global_value_obj_tiles_2.forEach(function (item) {
  //       obj_tiles += item+",";
  //  });
  // }
  // else if(selected_cavas === '3'){
  //   // console.log('inside === 3');
  //   global_value_obj_dirs_3.forEach(function (item) {   
  //       obj_dirs += item+",";
  //  });
  //  global_value_obj_tiles_3.forEach(function (item) {
  //       obj_tiles += item+",";
  //  });
  // }
  // else if(selected_cavas === '4'){
  //   // console.log('inside === 4');
  //   global_value_obj_dirs_4.forEach(function (item) {   
  //       obj_dirs += item+",";
  //  });
  //  global_value_obj_tiles_4.forEach(function (item) {
  //       obj_tiles += item+",";
  //  });
  // }


   //  2. cut last sybols (,)
   obj_dirs = obj_dirs.substring(0, obj_dirs.length - 1)
   obj_tiles = obj_tiles.substring(0, obj_tiles.length - 1)
    
   // 3. Create string to pdf
   if(obj_dirs && obj_tiles && base64result && case_size){
      //  var re = /index.php/gi;
       // url_location_path_now.replace(re, '');
         //  console.log("Start: "+url_location_path_now); 
         //  url_location_path_now = url_location_path_now.replace(/index.php/gm, "");
         //  console.log("Finish: "+url_location_path_now); 
        
         //   var str = window.location;
         //   url_location_path_now = str.split(' ').filter(item => item !== 'index.php').join(' ');
         //   console.log("Finish: "+url_location_path_now);
         
         // cut 8 symbol 
      // url_location_path_now = url_location_path_now.substr(8)
      
       // In string create array
       // alert(url_location_path_now); 
       
       /* var break_limit = url_location_path_now.length;
       
       alert("url_location_path_now: "+url_location_path_now+", length: "+url_location_path_now.length);
       var href_new_url = "";
       for(var i=0; i < url_location_path_now.length; i++){
           if(i <= break_limit){
               href_new_url += url_location_path_now[i];
           }
       }
      
      alert(href_new_url);
      */
      
    var data = new FormData();  
    data.append("base64result", base64result);
    data.append("tiles", obj_tiles);
    data.append("dirs", obj_dirs);
    data.append("case", case_size);

    // Send Query
    $.ajax({
        url: play_pdf, //+"./ajax/ajax.php",
        type: "POST",
        data: data,
        async : false, 
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (respond, textStatus, jqXHR) {  
          if (respond.data) {
            // console.log(respond);
            // console.log(respond.data);
            create_pdf_url = respond.data;
          }
        }
    })
      
       // url_location_path_now.split('index.php').join('pdf.php');
      //  create_pdf_url = play_pdf+"?tiles="+obj_tiles+"&dirs="+obj_dirs+"&case="+case_size;
    //   alert(create_pdf_url);
    //   alert(create_pdf_url);
   }
   
   // 4. Open url in new tab


//    // * in new window
//    var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
// var strWindowFeatures = "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400";
    //   window.open(create_pdf_url, '_blank', strWindowFeatures);
    //  window.open(create_pdf_url, '_blank', strWindowFeatures);
    window.open(create_pdf_url, '_blank');

    console.log("Test 61:   create_pdf_url")
    console.log(create_pdf_url)
    // console.log('!base64result = ', base64result);
 //  console.log("Test 61: Ajax save obj_tiles")
  // console.log(obj_tiles)
   
   //alert("not Ready!");
   
   
   /*
   if ( obj_dirs && obj_tiles ) { 
       
           var value_name_table = "jigazo_create_pdf_use_tiles";
           
           var data = new FormData();  
           data.append("obj_dirs", obj_dirs);
           data.append("obj_tiles", obj_tiles);
           data.append("value_name_table", value_name_table);   
        
           // Send Query
           $.ajax({
               url: "ajax/ajax.php", //+"./ajax/ajax.php",
               type: "POST",
               data: data,
               cache: false,
               dataType: 'json',
               processData: false,
               contentType: false,
               success: function (respond, textStatus, jqXHR) {  
                   if (respond.html_message) {
                       $("#js_html_content_from_ajax_image").html(respond.html_message); 
                   } 
               }
           });
   }
   */

// todo 3.05.23 1
     let get_generate_btn = document.getElementById('puzzf_generate_btn');
    get_generate_btn.style.pointerEvents = 'none';
    get_generate_btn.style.opacity = '0';
// todo 3.05.23 2


} 
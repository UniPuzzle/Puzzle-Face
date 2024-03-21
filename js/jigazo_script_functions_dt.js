function create_pdf() {   
  if (base64result) { 
    var data = new FormData();  
    data.append("base64result", base64result);
    
    // Send Query
    $.ajax({
        url: "ajax/ajax_base64result.php", //+"./ajax/ajax.php",
        type: "POST",
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (respond, textStatus, jqXHR) {  
            
              // start                
                var create_pdf_url = "";
                var obj_dirs = ""; // global_value_obj_dirs
                var obj_tiles = ""; // global_value_obj_tiles
                var url_location_path_now = window.location; // http://puzzlebase_unipuzzle_v10.local/crop/v19/
                    case_size = 'vertical';
                 
              
                var play_pdf = $("#js_id_path_pdf_php").val(); 
                  global_value_obj_dirs_1.forEach(function (item) {   
                      obj_dirs += item+",";
                 });
                 global_value_obj_tiles_1.forEach(function (item) {
                      obj_tiles += item+",";
                 });
               
                 //  2. cut last sybols (,)
                 obj_dirs = obj_dirs.substring(0, obj_dirs.length - 1)
                 obj_tiles = obj_tiles.substring(0, obj_tiles.length - 1)
                  
                 // 3. Create string to pdf
                 if(obj_dirs && obj_tiles && base64result && case_size){ 
                        create_pdf_url = play_pdf+"?tiles="+obj_tiles+"&dirs="+obj_dirs+"&case="+case_size;
                       window.open(create_pdf_url, '_blank');
                      
                          console.log("Test 61:   create_pdf_url")
                          console.log(create_pdf_url)
                 } 
            // Finish 
           
        }
    })
  }; 
} 
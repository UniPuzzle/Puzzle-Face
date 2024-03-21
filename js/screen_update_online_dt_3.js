window.addEventListener("orientationchange", function () { 
    setTimeout(onload_page_when_take_browser_screen_size, 100); 
    
});



var pixelRatio = window.devicePixelRatio.toPrecision(4);
var width_a = screen.width;
var height_a = screen.height;


function one() {
   // OLD WORD var getone = document.getElementById("idone");
    var getone = document.getElementById("js_browser_width");  


    if (getone != null || getone != undefined) {
        widcli = document.body.parentElement.clientWidth;
        heicli = document.body.parentElement.clientHeight; 
        // Add value in inputs
        $("#js_browser_width").val(widcli);
        $("#js_browser_height").val(heicli); 

    } else {
        return false;
    }
    

};
// ? 18.11.23 COMMENTED 1

// window.onresize = () => {  

//       var getone = document.getElementById("js_browser_width");

//     if (getone != null || getone != undefined) {
//         widcli = document.body.parentElement.clientWidth;
//         heicli = document.body.parentElement.clientHeight; 
//         // Add value in inputs
//         $("#js_browser_width").val(widcli);
//         $("#js_browser_height").val(heicli);
//       //   console.log("Test 2: #js_browser_width: "+widcli+" #js_browser_height: "+heicli+", file - screen_update_online.js");
        
//     } else {
//         return false;
//     }

//     onload_page_when_take_browser_screen_size(); 

// };
// ? 18.11.23 COMMENTED 2



function two() { // js Pixel Screen Resolution RESIZE width and Height 
    var gettwo = document.getElementById("js_screen_width");

    if (gettwo != null || gettwo != undefined) {
        width = screen.width;
        height = screen.height; 
           // Add value in inputs
         $("#js_screen_width").val(width);
         $("#js_screen_height").val(heicli);

       //   console.log("Test 3: #js_screen_width: "+widcli+" #js_screen_height: "+heicli+", file - screen_update_online.js");
        
    } else {
        return false;
    }

    

}; 



function init() {
    
    one();
    two();
    // pixelRatiof();
    // NavigatorAdditional();
    // showAds();
    try {
      //  document.getElementById('weed').value = width_a * pixelRatio;
      //  document.getElementById('hate').value = height_a * pixelRatio;
    } catch (e) {
        // console.log(e);
    }
};


$(document).ready(function () {
    init();
})




var allDiv = document.getElementById('seotext')

if (pixelRatio > 1) {
};




function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}


widthjs = screen.width;
heightjs = screen.height;

let cr = {};



let boundary_width;
let boundary_height;

let viewport_width;
let viewport_height;

 
function onload_page_when_take_browser_screen_size( ) { 

     var game_folder = $("#game_folder").val();    
     var width = $("#js_browser_width").val(); 
     var height = $("#js_browser_height").val();

     var show_google_js_script = $("#js_show_google_js_script").val();
     var js_address_url_web_site = $("#js_address_url_web_site").val();
     
    
    
        //   console.log('game_folder = ', game_folder);

    if (width && height) { 
        var data = new FormData();  
        data.append("width", width);
        data.append("height", height); 
        data.append("game_folder", game_folder);  
        data.append("show_google_js_script", show_google_js_script);
        data.append("address_url_web_site",  js_address_url_web_site);
         
        // Send Query
        $.ajax({
            url: "ajax/ajax_dt_3.php", //+"./ajax/ajax.php",
            type: "POST",
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (respond, textStatus, jqXHR) {  
                if (respond.html_message) {
                    $("#js_html_content_from_ajax_image").html(respond.html_message);

// debugger;
// ! cancel     start
                    // var inputElement = document.getElementById("puzzf_getval");

                    // inputElement.addEventListener('click', cancel_uploading);

                    // function cancel_uploading(event) {
                    //   var target = event.target || event.srcElement;
                    //   console.log(target, "clicked.");
                    //   console.log(event);
                    //   if (target.value.length == 0) {
                    //     console.log("Suspect Cancel was hit, no files selected.");
                    //     // cancelButton.onclick();
                    //   } else {
                    //     console.log("File selected: ", target.value);
                    //     numFiles = target.files.length;
                    //   }
                    // }
// ! cancel     end



// window.onclick = function(event){
//     if(event.target.classNeme !== 'puzzf_info_btn_wrp'){
//         let get_info_blk = document.getElementById('puzzf_info_blk');
//         get_info_blk.style.display = 'none';
    
//         event.target.setAttribute('onclick', 'show_info(event)');
//     }
// }

// window.onmousedown = function(event){
//     if(event.target.classNeme !== 'puzzf_info_btn_wrp'){
//         let get_info_blk = document.getElementById('puzzf_info_blk');
//         get_info_blk.style.display = 'none';
    
//         event.target.setAttribute('onclick', 'show_info(event)');
//     }
// }



                    // alert(window.navigator.userAgent);

                    let string = window.navigator.userAgent;
                    let substring = 'Firefox';
                    // let substring_2 = 'CPU';

                    if(string.includes(substring)){
                        // alert('test');
                        let get_img = document.getElementById('puzzf_image');
                        //console.log('get_img = ', get_img);
                        get_img.removeAttribute('crossorigin');
                    }

// // todo **
//                     let no_events = false;
// // todo  *               


                    let browser_width = window.innerWidth;
                    let browser_height = window.innerHeight;
       
                    
                    
       // * FOR DESKTOP
                        // correct_ini_image(); // * find this func in bottom lines
                        // // $("#puzzf_mask").css('height', $('#puzzf_image').height());
                        // //     $("#puzzf_mask").css('width', $('#puzzf_image').width());


// // ? pixelization ADDED 20.12.23 1
//                         setTimeout(function(){
//                             let pixelization_for_canvas = document.getElementById('puzzf_pixelization_img');
//                             // console.log('here = ', pixelization_for_canvas);
//                             var canvas_2 = document.getElementById("canvas_2");
//                             var ctx = canvas_2.getContext("2d");
//                             // ctx.clearRect(0, 0, canvas_1.width, canvas_1.height);
//                             // console.log('ctx = ', ctx);
//                             ctx.drawImage(
//                                 pixelization_for_canvas,
//                                 0, 0, canvas_2.width, canvas_2.height
//                             );
//                         }, 500);
// // ? pixelization ADDED 20.12.23 2




// ? ADDED 18.11.23 1


                        
                        let el = document.getElementById('puzzf_mask');
                        // console.log('el = ', el);
                        // alert('test4');
                        
                        // let c = new Croppie(el, true);
                        // call a method
                        // c.method(args);
                        //console.log('browser_width = ', browser_width);
                        boundary_width = browser_height * 0.5203;
                        boundary_height = (browser_height * 0.5203) / 0.75;

                        viewport_width = (browser_height * 0.5203) / 1.5;
                        viewport_height = ((browser_height * 0.5203) / 0.75) / 1.5;
                        // console.log('viewport_width = ', viewport_width);
                        // console.log('viewport_height = ', viewport_height);

                        // console.log('boundary_width = ', boundary_width);
                        // console.log('boundary_height = ', boundary_height);

                        cr = new Croppie(el, {
                            url: 'images/upload_image_line_grey_v1.svg',
                            viewport: { width: viewport_width, height: viewport_height },
                            boundary: { width: boundary_width, height: boundary_height },
                            showZoomer: true,
                            enableZoom: true,
                            enableOrientation: false,
                        });

                        // console.log('cr_1 = ', cr);

                        // demoBasic();

                        // function demoBasic() {
                        //     var $w = $('.basic-width'),
                        //         $h = $('.basic-height'),
                        //         basic = $('#demo-basic').croppie({
                        //         viewport: {
                        //             width: 150,
                        //             height: 200
                        //         },
                        //         boundary: {
                        //             width: 300,
                        //             height: 300
                        //         }
                        //     });
                        //     basic.croppie('bind', {
                        //         url: 'demo/cat.jpg',
                        //         points: [77,469,280,739]
                        //     });
                    
                        //     $('.basic-result').on('click', function() {
                        //         var w = parseInt($w.val(), 10),
                        //             h = parseInt($h.val(), 10),s
                        //             size = 'viewport';
                        //         if (w || h) {
                        //             size = { width: w, height: h };
                        //         }
                        //         basic.croppie('result', {
                        //             type: 'canvas',
                        //             size: size,
                        //             resultSize: {
                        //                 width: 50,
                        //                 height: 50
                        //             }
                        //         }).then(function (resp) {
                        //             popupResult({
                        //                 src: resp
                        //             });
                        //         });
                        //     });
                        // }






                        // c.bind({
                        //     url: 'images/upload_image_line_text_grey_v1.svg',
                        //     orientation: 4
                        // });

                        // basic.croppie('result', 'html').then(function(html) {
                        //     // html is div (overflow hidden)
                        //     // with img positioned inside.
                        // });

                        // resize.result('blob').then(function(blob) {
                        //     // do something with cropped blob
                        //     console.log('blob = ', blob);
                        // });

                        //on button click
                        // c.croppie('result', 'html').then(function(html) {
                        //     // html is div (overflow hidden)
                        //     // with img positioned inside.
                        //     console.log('html = ', html);
                        // });

                        // c.bind({
                        //     url: '../images/upload_image_line_text_grey_v1.svg',
                        //     points: [100, 100, 300, 300],
                        //     zoom: true,
                        //     orientation: 4
                            
                        // });



                        // var c = new Croppie(document.getElementById('demo'), {
                                // //     viewport: { width: 100, height: 100 },
                                // //     boundary: { width: 300, height: 300 },
                                // //     showZoomer: true,
                                // //     enableOrientation: true
                                // // });

                                // var c = new Croppie(document.getElementById('demo'), true);

                                // c.bind({
                                //     url: '../images/upload_image_line_text_grey_v1.svg',
                                //     orientation: 4
                                // });

                                // c.result('blob').then(function(blob) {
                                //     // do something with cropped blob
                                //     alert('page loaded - have crop');
                                // });
// ? ADDED 18.11.23 2



// ! zoom & drag start

                        // * Number(parseFloat((parent.getBoundingClientRect().left)).toFixed(2));




                        // let mask_el = document.getElementById('puzzf_mask');
                        // let mask_width = mask_el.offsetWidth;
                        // //console.log('mask_el.offsetWidth = ', mask_el.offsetWidth);
                        // let mask_height = mask_el.offsetHeight;
                        // // console.log('mask_width = ', mask_width);
                        // // console.log('mask_height = ', mask_height);


                        // let zoom = document.getElementById('.puzzf_zoom');   // * draggable(zoomable) img WRAPPER

                        // // let zoom_top_margin =  Number(parseFloat(zoom.getBoundingClientRect().top ).toFixed(2));
                        // // let zoom_left_margin = Number(parseFloat(zoom.getBoundingClientRect().left).toFixed(2));
                        // // let zoom_bottom_margin =  Number(parseFloat(zoom.getBoundingClientRect().bottom ).toFixed(2));
                        // // let zoom_right_margin = Number(parseFloat(zoom.getBoundingClientRect().right).toFixed(2));

                        // let img_width = zoom.offsetWidth;
                        // let img_height = zoom.offsetHeight;

                        // let ratio = img_width / img_height;
                        // ratio = Number(ratio.toFixed(2));
                        // // console.log('ratio = ', ratio);


                        // let get_parent = zoom.parentNode;
                        // // console.log('get_parent = ', get_parent);
                        // let mask_top_margin =  Number(parseFloat(get_parent.getBoundingClientRect().top ).toFixed(2));
                        // let mask_left_margin = Number(parseFloat(get_parent.getBoundingClientRect().left).toFixed(2));
                        // // console.log('mask_top_margin = ', mask_top_margin);
                        // // console.log('mask_left_margin = ', mask_left_margin);

                        // // let mask_el = document.getElementById('puzzf_mask');
                        // // let mask_width = mask_el.offsetWidth;
                        // // let mask_height = mask_el.offsetHeight;

                        // // let x_white_space = (mask_width - img_width) / 2 ;
                        // // let y_white_space = (mask_height - img_height) / 2 ;

                        // let scale = 1;
                        // let panning = false;

                        // let pointX = 0;
                        // let pointY = 0;

                        // // if(ratio >= 0.75){
                        // //     pointX = 0;
                        // //     pointY = y_white_space;
                        // // }else{
                        // //     pointX = x_white_space;
                        // //     pointY = 0;
                        // // }
                        // start = { x: 0, y: 0 };
                        // // zoom = document.getElementById("zoom");




                        // function setTransform() {
                        //     // console.log('img_width = ', img_width);
                        //     // console.log('img_height = ', img_height);

                        //     // console.log('mask_width = ', mask_width);
                        //     // console.log('mask_left_margin = ', mask_left_margin);











                        //     // if(pointX < 0){
                        //     //     pointX = 0;
                        //     //     if(pointY < 0){
                        //     //         pointY = 0;
                        //     //     }
                        //     // }else if(pointY < 0){
                        //     //     pointY = 0;
                        //     //     if(pointX < 0){
                        //     //         pointX = 0;
                        //     //     }
                        //     // }
                        //     // else if(pointX + img_width > mask_width){
                        //     //     // console.log('mask_width + mask_left_margin - img_width = ', mask_width + mask_left_margin - img_width);
                        //     //     console.log('larger');
                        //     //     // pointX = mask_width + mask_left_margin - img_width;
                        //     //     pointX = mask_width - img_width;
                        //     //     if(pointY + img_height > mask_height){
                        //     //         pointY = mask_height - img_height;
                        //     //     }
                        //     // }
                        //     // else if(pointY + img_height > mask_height){
                        //     //     // console.log('mask_width + mask_left_margin - img_width = ', mask_width + mask_left_margin - img_width);
                        //     //     // console.log('larger');
                        //     //     // pointX = mask_width + mask_left_margin - img_width;
                        //     //     pointY = mask_height - img_height;
                        //     //     if(pointX + img_width > mask_width){
                        //     //         pointX = mask_width - img_width;
                        //     //     }
                        //     // }
                        //     // else if(){

                        //     // }






                            

                        //     zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";

                        // }

                        // zoom.onmousedown = function (e) {
                        //     e.preventDefault();
                        //     start = { x: (e.clientX - mask_left_margin) - pointX, y: (e.clientY - mask_top_margin) - pointY };
                        //     panning = true;
                        //   }
                    
                        //   zoom.onmouseup = function (e) {
                        //     panning = false;
                        //     // console.log('mouseup_ini');
                        //   }


                        // zoom.onmousemove = function (e) {
                        //     if(e.target.getAttribute('src') === 'images/upload_image_line_text_grey_v1.svg'){
                        //         return;
                        //     }
                        // e.preventDefault();
                        // if (!panning) {
                        //     return;
                        // }
                        // // console.log('e.clientX = ', e.clientX);
                        // // console.log('e.clientY = ', e.clientY);

                        // pointX = ((e.clientX - mask_left_margin) - start.x);
                        // pointY = ((e.clientY - mask_top_margin) - start.y);

                        // setTransform();
                        // }
                    
                        // zoom.onwheel = function (e) {
                        //     if(e.target.getAttribute('src') === 'images/upload_image_line_text_grey_v1.svg'){
                        //         return;
                        //     }
                        // e.preventDefault();
                        // //console.log('e.clientX = ', e.clientX); // * our cursor from left border of borwser
                        // //console.log('e.clientY = ', e.clientY);

                        // //console.log('pointX = ', pointX);       // * left of img in mask_blk
                        // //console.log('pointY = ', pointY);



                        // // if(ratio >= 0.75){
                        //     var xs = ((e.clientX - mask_left_margin) - pointX) / scale, // * ((e.clientX - mask_left_margin) - pointX)     is    distance from cursor to left border of img
                        //     ys = ((e.clientY - mask_top_margin) - pointY) / scale;
                        //     // ys = ((e.clientY - mask_top_margin - y_white_space) - pointY) / scale;
                        // // }else{
                        // //     var xs = ((e.clientX - mask_left_margin - x_white_space) - pointX) / scale, // * ((e.clientX - mask_left_margin) - pointX)     is    distance from cursor to left border of img
                        // //     ys = ((e.clientY - mask_top_margin) - pointY) / scale;
                        // // }



                        // var delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);

                        // if(delta > 0){
                        //     if(scale < 50){
                        //         scale *= 1.03

                        //         // img_width *= 1.03;
                        //         // img_height *= 1.03;
                                
                        //     }
                       
                        // }else{
                        //     if(scale > 1){
                        //         scale /= 1.03;

                        //         // img_width /= 1.03;
                        //         // img_height /= 1.03;
                        //     } 
                        // }

                        // // (delta > 0) ? (scale *= 1.02) : (scale /= 1.02);

                        // // if(ratio >= 0.75){
                        //     pointX = (e.clientX - mask_left_margin) - xs * scale;       // * (e.clientX - mask_left_margin) - xs         is     distance from left border of mask_blk to left border of img(or wrapper #puzzf_zoom for this img)
                        //     pointY = (e.clientY - mask_top_margin) - ys * scale;
                        //     // pointY = (e.clientY - mask_top_margin - y_white_space) - ys * scale;
                        // // }else{
                        // //     pointX = (e.clientX - mask_left_margin - x_white_space) - xs * scale;       // * (e.clientX - mask_left_margin) - xs         is     distance from left border of mask_blk to left border of img(or wrapper #puzzf_zoom for this img)
                        // //     pointY = (e.clientY - mask_top_margin) - ys * scale;
                        // // }

                
                        // setTransform();
                        // }

                        // // * mask_left_margin



                        //     // $('#puzzf_mask').on('mousewheel', function (event) {
                        //     //     //console.log('wheel');
                        //     //     var height = $('#puzzf_image').height();
                        //     //     var width = $('#puzzf_image').width();
                        //     //     //console.log('height = ', height);

                        //     //     if (height == 480 && width == 640 && event.deltaY > 0) {
                        //     //         //console.log('if');
                        //     //     } else {
                        //     //         //console.log('else');
                        //     //         if (event.deltaY > 0) { // * scroll down
                        //     //             height /= 1.02;    // * old value /= 2
                        //     //             width /= 1.02;     // * old value /= 2
                        //     //             $("#puzzf_image").css('height', height);
                        //     //             $("#puzzf_image").css('width', width);
                        //     //            // console.log('1');   
                        //     //         }
                        //     //         else if (event.deltaY < 0) {    // * scroll up
                        //     //             height *= 1.02;     // * old value *= 1   // * when height *= 100000 - better
                        //     //             width *= 1.02;     // * old value *= 1
                        //     //             $("#puzzf_image").css('height', height);
                        //     //             $("#puzzf_image").css('width', width);
                        //     //             //console.log('2');
                        //     //         }
                        //     //     }
                        //     // });

                        //     // function startDrag(e) {
                        //     //     //console.log('e= ', e);   // * mousedown { target: img#puzzf_image.dragme, buttons: 1, clientX: 279, clientY: 307, layerX: 213, layerY: 180 }
                                
                        //     //     // * !e = false; 
                        //     //     if (!e) {
                        //     //         //alert('test');
                        //     //         var e = window.event;   // ? ************
                        //     //     }
                        //     //     // console.log('e.target = ', e.target);
                        //     //     // console.log('e.srcElement = ', e.srcElement);
                        //     //     var targ = e.target ? e.target : e.srcElement;  // * e.target = <img id="puzzf_image" class="dragme" onmousedown=""
                        //     //     if (targ.className !== 'dragme') {
                        //     //         //console.log('now_return');
                        //     //         return
                        //     //     }
                           
                        //     //     offsetX = e.clientX;
                        //     //     offsetY = e.clientY;

                        //     //     if (!targ.style.left) {
                        //     //         targ.style.left = '0px'
                        //     //     }
                        //     //     if (!targ.style.top) {
                        //     //         targ.style.top = '0px'
                        //     //     }
                             
                        //     //     coordX = parseInt(targ.style.left);
                        //     //     coordY = parseInt(targ.style.top);
                        //     //     drag = true;

                        //     //     document.onmousemove = dragDiv;
                        //     //     return false;
                        //     // }
                        //     // function dragDiv(e) {
                        //     //     if (!drag) {
                        //     //         return
                        //     //     }
                        //     //     if (!e) {
                        //     //         var e = window.event
                        //     //         // console.log('if (!e) {');
                        //     //     }

                        //     //     document.onmouseover = mouseover_detect;            // ! added for drag only in upload-image block


                        //     //     var targ = e.target ? e.target : e.srcElement;
                        //     //     // move div element
                        //     //     targ.style.left = coordX + e.clientX - offsetX + 'px';
                        //     //     targ.style.top = coordY + e.clientY - offsetY + 'px';
                        //     //     return false;
                        //     // }

                        //     // function mouseover_detect(event){                       // ! added for drag only in upload-image block
                        //     //     const target = event.target;
                        //     //     //console.log('target=', target);
                        //     //     if(target.id !== 'puzzf_image'){
                        //     //         drag = false;
                        //     //     }
                        //     // }


                        //     // function stopDrag() {
                        //     //     drag = false;
                        //     // }
                        //     // // window.onload = function () {
                        //     // //     alert('onLoad');
                        //     // //     document.onmousedown = startDrag;
                        //     // //     document.onmouseup = stopDrag;
                        //     // // }

                        //     // function ini_drag_and_zoom() {
                        //     //     // alert('onLoad');
                        //     //     let mask = document.getElementById('puzzf_mask');
                        //     //     mask.onmousedown = startDrag;
                        //     //     mask.onmouseup = stopDrag;
                        //     // }

                        //     // ini_drag_and_zoom();

 





// ! zoom & drag end









   
                        

                        


                function correct_ini_image() {
            
                    mask_el = document.getElementById('puzzf_mask');
                    mask_width = mask_el.offsetWidth;
                    mask_height = mask_el.offsetHeight;
                    // console.log('mask_width = ', mask_width);
                    // console.log('mask_height = ', mask_height);

                    // function stop_propagation(event){
                    //     event.stop_propagation();
                    // }

                    let ini_img = document.getElementById('puzzf_image');
                    let ini_img_width = ini_img.offsetWidth;
                    let ini_img_height = ini_img.offsetHeight;
                    // console.log('ini_img_width = ', ini_img_width);
                    // console.log('ini_img_height = ', ini_img_height);
                    

                    let ini_img_ratio = Number(parseFloat(ini_img_width / ini_img_height).toFixed(2));
                    // console.log('ini_img_ratio = ', ini_img_ratio);
                    // Number(parseFloat((parent.getBoundingClientRect().left)).toFixed(2));





                    // if(ini_img_ratio >= 1){
                    //     // console.log('img_el_onloadend = ', img_el_onloadend);
                    //     ini_img.style.width = mask_width + 'px';
                    //     ini_img.style.height = mask_width / ini_img_ratio + 'px';
                 
                    //     ini_img.style.left = '0px';
                    //     ini_img.style.top = (mask_height - ini_img_height) / 2 + 'px';
                 
                    //    }else{
                        // if(ini_img_width < mask_width){
                         
                        //     ini_img.style.width = mask_height * ini_img_ratio + 'px';
                        //     ini_img.style.height = mask_height + 'px';
                     
                        //     ini_img.style.top = '0px';
                        //     ini_img.style.left = (mask_width - ini_img_width) / 2 + 'px';
                        // }else{
                            ini_img.style.height = mask_height * ini_img_ratio + 'px';          // ! set the upload_image inside the mask in center
                            ini_img.style.width = mask_width + 'px';
                     
                            ini_img.style.left = '0px';
                            ini_img.style.top = (mask_height - mask_width / ini_img_ratio) / 2 + 'px';

                            ini_img.style.display = 'block';
                        // }

                    //    }

                }





// console.log('c_lower = ', c);

// ! *********************************************************************************
                    document.getElementById("puzzf_getval").addEventListener('change', readURL.bind(null, cr, boundary_width, boundary_height, viewport_width, viewport_height), true); 





//                       // Get the file input element
// // var theFile = document.getElementById('puzzf_getval');

// // Define a function to be called
// // when the input is focused
// // function initialize() {
// //   checkIt();
// //   console.log('initializing');
// // }

// // Define a function to check if
// // the user failed to upload file
// function checkIt() {
//     theFile = document.getElementById('puzzf_getval');
//     // Check if the number of files
//     // is not zero
//     if (theFile.value.length) {
//       alert('Files Loaded');
//     }
//     // Alert the user if the number
//     // of file is zero
//     else {
//       alert('Cancel clicked');
//     }
//     document.body.onfocus = null;
//     console.log('checked');
// }



// ! crossorigin BACK (when clicking on cancel during loading the img)                  start

                    // document.getElementById("puzzf_image").addEventListener('touchend', return_crossoriginAttr); 


                    // function return_crossoriginAttr(){
                
                    //     setTimeout(crossorigin_back, 2000);

                    //     function crossorigin_back(){
                    //                  alert('yes');
                    //         let img_el = document.getElementById("puzzf_image");
                    //         img_el.setAttribute('crossorigin', 'anonymous');
                    //     }


                    // }
// ! crossorigin BACK (when clicking on cancel during loading the img)                  end




                    // // const mask_aspect_ratio = 3/4;
                    // const image = new Image();
                    // // const image = new Image(),
                    // // canvas_1 = document.getElementById('canvas_1');
                    // // // console.log('canvas_1 = ', canvas_1);
                    // // ctx_1 = canvas_1.getContext('2d');

                    // //ctx_1.clearRect(0, 0, canvas_1.width, canvas_1.height);
                    // // console.log(ctx_1);
                    // // ctx_1.fillStyle = 'red';
                    // // ctx_1.strokeStyle = 'black';

                    // //let img_el_for_canvas = document.getElementById('puzzf_image');   // * for dragElement(img_el);
                    // // console.log('img_el_for_canvas = ', img_el_for_canvas);
                    // let img_src_for_canvas = img_el.getAttribute('src');
                    // //console.log('img_src_for_canvas = ', img_src_for_canvas);
                    // let img_width = img_el.offsetWidth;
                    // let img_height = img_el.offsetHeight;
                    // //console.log('img_width = ', img_width);
                    // //console.log('img_height = ', img_height);
                    // let ratio = img_width / img_height;
                    // //console.log('ratio = ', ratio);
                    // // console.log(b.width);
                
                    // image.src = img_src_for_canvas;
//console.log(image.src);

                    // ctx_1.drawImage(image,
                    //     0, 0,   // Start at x/y pixels from the left and the top of the image (crop),
                    //     image.width, image.height,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                    //     -b.offset.x / 2, -b.offset.y / 2,     // Place the result at 0, 0 in the canvas,
                    //     ratio >= 1 
                    //       ? canvas_1.width * b.zoomFactor 
                    //       : (canvas_1.height * ratio) * b.zoomFactor,
                    //     ratio >= 1 
                    //       ? (canvas_1.width / ratio) * b.zoomFactor 
                    //       : canvas_1.height * b.zoomFactor);  // With as width / height: 100 * 100 (scale)
            


                        //   ctx_2.drawImage(image,
                        //     0, 0,   // Start at x/y pixels from the left and the top of the image (crop),
                        //     image.width, image.height,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                        //     0, 0,     // Place the result at 0, 0 in the canvas,
                        //     ratio >= 1 
                        //       ? canvas_1.width 
                        //       : (canvas_1.height * ratio),
                        //     ratio >= 1 
                        //       ? (canvas_1.width / ratio)  
                        //       : canvas_1.height);  // With as width / height: 100 * 100 (scale)
                

                    // let img_src = img_el.getAttribute("src");
                    // console.log('img_src', img_src);

                    // image.src = '../'+img_src;
                  
                    // img_el_2 = document.getElementById('puzzf_img_2');   // * for dragElement(img_el);
                    // let img_src_2 = img_el_2.getAttribute("src");
                    // console.log('img_src', img_src_2);

                    // image.src = img_src_2;
                   

                    //image.src = 'https://i.stack.imgur.com/I4jXc.png';
                    //image.src = 'upload-image.png';

                    // image.addEventListener('load', () => {
                        // ctx.drawImage(image,
                        //     70, 20,   // Start at 70/20 pixels from the left and the top of the image (crop),
                        //     50, 50,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                        //     0, 0,     // Place the result at 0, 0 in the canvas,
                        //     100, 100); // With as width / height: 100 * 100 (scale)
                    // });
                    



                    //image.src = 'https://www1.lovethatdesign.com/wp-content/uploads/2019/03/Love-that-Design-NOVO-01.jpg';
           

                    // image.addEventListener('load', () => {
                    //     ctx.drawImage(image,
                    //         0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
                    //         image.width, image.height,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                    //         0, 0,     // Place the result at 0, 0 in the canvas,
                    //         image.width, 100); // With as width / height: 100 * 100 (scale)
                    // });


                    // var cell_width = $("#js_cell_width_for_playfield_in_pixels").val();
                    // var board_height_in_cells = $("#js_board_height_in_cells").val();
                    // var board_width_in_cells = $("#js_board_width_in_cells").val();
                    // var initial_knights_positions_in_string = $("#js_initial_knights_positions").val();
                    // var valid_cells = $("#js_valid_cells").val();
                    // var knight_color = $("#js_knight_color").val();
               
                } 
            }
        });


    }



} 





// let img_el;

// img_el = document.getElementById('puzzf_image');   // * for dragElement(img_el);
// console.log('img_el = ', img_el);
// alert('test_4');
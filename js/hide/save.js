// * reset_img_and_get_puzzles      start
function reset_img_and_get_puzzles() {  // *  continuous to line 862
  // alert('now');
  img_wrp_blk = document.getElementById('puzzf_zoom');
  //console.log('img_wrp_blk=', img_wrp_blk);

  let get_parent = img_wrp_blk.parentNode;
  // console.log('get_parent = ', get_parent);
  let mask_top_margin =  Number(parseFloat(get_parent.getBoundingClientRect().top ).toFixed(2));
  let mask_left_margin = Number(parseFloat(get_parent.getBoundingClientRect().left).toFixed(2));
  // console.log('mask_top_margin = ', mask_top_margin);
  // console.log('mask_left_margin = ', mask_left_margin);

  let mask_bottom_margin =  Number(parseFloat(get_parent.getBoundingClientRect().bottom ).toFixed(2));
  let mask_right_margin = Number(parseFloat(get_parent.getBoundingClientRect().right).toFixed(2));

  scale = 1;
  panning = false;
  pointX = 0;
  pointY = 0;
  start = { x: 0, y: 0 };

  //img_wrp_blk.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";

  setTransform();


  function setTransform() {

    // if(pointX < 0){
    //   pointX = 0;
    //   if(pointY < -(mask_height - our_image.offsetHeight) / 2){
    //       pointY = -(mask_height - our_image.offsetHeight) / 2;
    //   }
    // }else if(pointY < -(mask_height - our_image.offsetHeight) / 2){
    //     pointY = -(mask_height - our_image.offsetHeight) / 2;
    //     if(pointX < 0){
    //         pointX = 0;
    //     }
    // }

    img_wrp_blk.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
  }

  img_wrp_blk.onmousedown = function (e) {
    e.preventDefault();
    start = { x: (e.clientX - mask_left_margin) - pointX, y: (e.clientY - mask_top_margin) - pointY };
    panning = true;
  }

  img_wrp_blk.onmouseup = function (e) {
    panning = false;
    // console.log('mouseup');
    // alert('mouseup');
    get_dt_img_crop(pointX, pointY, save_left, save_top, scale, save_img_width, save_img_height);
    // console.log('cropped_img = ', cropped_img);
    //console.log('cropped_img = ', cropped_img);

    let x = window.jQuery;  
    jigazo_puzzf(x);        // ! puzzles on mouseUP
  }




  img_wrp_blk.onmousemove = function (e) {

  e.preventDefault();
  if (!panning) {
      return;
  }
  // console.log('e.clientX = ', e.clientX);
  // console.log('e.clientY = ', e.clientY);

  pointX = ((e.clientX - mask_left_margin) - start.x);
  pointY = ((e.clientY - mask_top_margin) - start.y);
  // console.log('pointX = ', pointX);

  // console.log(typeof(scale));

  if(scale === 1){

    if(ratio >= 0.75){
      //console.log('pointX = ', pointX);
// * 1
      if(pointY < 0){                  // * to top
        pointY = 0;
        if(pointX > -save_left){
          pointX = -save_left;
        }else if(pointX < save_left){
          pointX = save_left;
        }
      } 
      else if(pointX > -save_left){             // * to right
        pointX = -save_left;
        if(pointY < 0){
          pointY = 0;
        }else if(pointY > 0){
          pointY = 0;
        }

      }
      else if(pointY > 0){                     // * to bottom
        pointY = 0;
        if(pointX < save_left){
          pointX = save_left;
        }else if(pointX > -save_left){
          pointX = -save_left;
        }

      }
      else if(pointX < save_left){        // * to left
        pointX = save_left;
        if(pointY < 0){
          pointY = 0;
        }else if(pointY > 0){
          pointY = 0;
        }
      }
// * 2


    }else if(ratio < 0.75){
// * 1

        if(pointY < save_top){                  // * to top
          pointY = save_top;
          if(pointX < 0){
            pointX = 0;
          }else if(pointX > 0){
            pointX = 0;
          }
        } 
        else if(pointX > 0){             // * to right
            pointX = 0;
          if(pointY > -save_top){
            pointY = -save_top;
          }else if(pointY < save_top){
            pointY = save_top;
          }

        }
        else if(pointY > -save_top){                     // * to bottom
            pointY = -save_top;
          if(pointX < 0){
            pointX = 0;
          }else if(pointX > 0){
            pointX = 0;
          }

        }
        else if(pointX < 0){        // * to left
            pointX = 0;
          if(pointY < save_top){
            pointY = save_top;
          }else if(pointY > -save_top){
            pointY = -save_top;
          }
        }

// * 2




    }













  } else if(scale >= 1) {  // * have zoom
    // console.log('mask_height = ', mask_height);
    // console.log('save_img_height = ', save_img_height);

   
      // console.log('scale * img_height < mask_height');

      if(ratio >= 0.75){
// * 1
// console.log('pointY = ', pointY);
// console.log('pointX = ', pointX);

        if(pointX > -save_left * scale){             // * to right
          pointX = -save_left * scale;
          if(pointY < (mask_height - save_img_height * scale)){
            pointY = (mask_height - save_img_height * scale);
          }else if(pointY > 0){
            pointY =  0;
          }

        }
        else if(pointY > 0){                     // * to bottom
          pointY = 0;
          if( pointX < -(save_img_width * scale - mask_width) - save_left * scale ){    // * mask_width) !!!-!!! save_left * scale ){  minus (!) because save_left is negative - so  minus and minus gives us plus - that's what we need - to add - we need plus - and we have it (this I had a problem - so now its ok - the problem is solved)
            pointX =   -(save_img_width * scale - mask_width) - save_left * scale;
          }else if(pointX > -save_left * scale){
            pointX = -save_left * scale;
          }
        }

        else if(pointX < -(save_img_width * scale - mask_width) - save_left * scale){        // * to left
          pointX = -(save_img_width * scale - mask_width) - save_left * scale;
          if(pointY < (mask_height - save_img_height * scale)){
            pointY = (mask_height - save_img_height * scale);
          }else if(pointY > 0){
            pointY = 0;
          }
        }
        
        else if(pointY < (mask_height - save_img_height * scale)){                  // * to top
          pointY = (mask_height - save_img_height * scale);
          if(pointX < -(save_img_width * scale - mask_width) - save_left * scale){
            pointX = -(save_img_width * scale - mask_width) - save_left * scale;
          }else if(pointX > -save_left * scale){
            pointX = -save_left * scale;
          }
        } 

// * 2













      }else if(ratio < 0.75){

        if(pointX > 0){               // * to right
          pointX = 0;
          if(pointY < -(save_img_height * scale - mask_height) - save_top * scale ){
            pointY = -(save_img_height * scale - mask_height) - save_top * scale;
          }else if(pointY > -save_top * scale){
            pointY = -save_top * scale;
          }
        }

        else if(pointY > -save_top * scale){                     // * to bottom
          pointY = -save_top * scale;
          if( pointX < (mask_width - save_img_width * scale) ){    // * mask_width) !!!-!!! save_left * scale ){  minus (!) because save_left is negative - so  minus and minus gives us plus - that's what we need - to add - we need plus - and we have it (this I had a problem - so now its ok - the problem is solved)
            pointX = (mask_width - save_img_width * scale);
          }else if(pointX > -save_top * scale){
            pointX = -save_top * scale;
          }
        }

        else if(pointX < (mask_width - save_img_width * scale)){        // * to left
          pointX = (mask_width - save_img_width * scale);
          if(pointY < -(save_img_height * scale - mask_height) - save_top * scale){
            pointY = -(save_img_height * scale - mask_height) - save_top * scale;
          }else if(pointY > -save_top * scale){
            pointY = -save_top * scale;
          }
        }

        else if(pointY < -(save_img_height * scale - mask_height) - save_top * scale){                  // * to top
          pointY = -(save_img_height * scale - mask_height) - save_top * scale;
          if(pointX < (mask_width - save_img_width * scale)){
            pointX = (mask_width - save_img_width * scale);
          }else if(pointX > -save_top * scale){
            pointX = -save_top * scale;
          }
        } 

// * 2





    }   // *    }else if(ratio < 0.75){



  }   // *  } else if(scale >= 1) { 
  
  
    // else{
    //   if(scale * img_height < mask_width){

    //   }
    // }

    setTransform();

  }

  img_wrp_blk.onwheel = function (e) {

      e.preventDefault();
          var xs = ((e.clientX - mask_left_margin) - pointX) / scale, // * ((e.clientX - mask_left_margin) - pointX)     is    distance from cursor to left border of img
          ys = ((e.clientY - mask_top_margin) - pointY) / scale;

    var delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);

    if(delta > 0){
      if(scale < 50){
          scale *= 1.03
      }
 
    }else{
        if(scale > 1){
            scale /= 1.03
        } 
    }

    // (delta > 0) ? (scale *= 1.02) : (scale /= 1.02);

        pointX = (e.clientX - mask_left_margin) - xs * scale;       // * (e.clientX - mask_left_margin) - xs         is     distance from left border of mask_blk to left border of img(or wrapper #puzzf_img_wrp_blk for this img)
        pointY = (e.clientY - mask_top_margin) - ys * scale;
        // console.log('ONZOOM_pointX = ', pointX);
        // console.log('ONZOOM_pointY = ', pointY);








        if(scale === 1){

          if(ratio >= 0.75){
            //console.log('pointX = ', pointX);
// * 1
            if(pointY < 0){                  // * to top
              pointY = 0;
              if(pointX > -save_left){
                pointX = -save_left;
              }else if(pointX < save_left){
                pointX = save_left;
              }
            } 
            else if(pointX > -save_left){             // * to right
              pointX = -save_left;
              if(pointY < 0){
                pointY = 0;
              }else if(pointY > 0){
                pointY = 0;
              }

            }
            else if(pointY > 0){                     // * to bottom
              pointY = 0;
              if(pointX < save_left){
                pointX = save_left;
              }else if(pointX > -save_left){
                pointX = -save_left;
              }

            }
            else if(pointX < save_left){        // * to left
              pointX = save_left;
              if(pointY < 0){
                pointY = 0;
              }else if(pointY > 0){
                pointY = 0;
              }
            }
// * 2


          }else if(ratio < 0.75){
// * 1

              if(pointY < save_top){                  // * to top
                pointY = save_top;
                if(pointX < 0){
                  pointX = 0;
                }else if(pointX > 0){
                  pointX = 0;
                }
              } 
              else if(pointX > 0){             // * to right
                  pointX = 0;
                if(pointY > -save_top){
                  pointY = -save_top;
                }else if(pointY < save_top){
                  pointY = save_top;
                }

              }
              else if(pointY > -save_top){                     // * to bottom
                  pointY = -save_top;
                if(pointX < 0){
                  pointX = 0;
                }else if(pointX > 0){
                  pointX = 0;
                }

              }
              else if(pointX < 0){        // * to left
                  pointX = 0;
                if(pointY < save_top){
                  pointY = save_top;
                }else if(pointY > -save_top){
                  pointY = -save_top;
                }
              }

// * 2




          }













        } else if(scale >= 1) {  // * have zoom
          // console.log('mask_height = ', mask_height);
          // console.log('save_img_height = ', save_img_height);

         
            // console.log('scale * img_height < mask_height');

            if(ratio >= 0.75){
// * 1
// console.log('pointY = ', pointY);
// console.log('pointX = ', pointX);

              if(pointX > -save_left * scale){             // * to right
                pointX = -save_left * scale;
                if(pointY < (mask_height - save_img_height * scale)){
                  pointY = (mask_height - save_img_height * scale);
                }else if(pointY > 0){
                  pointY =  0;
                }

              }
              else if(pointY > 0){                     // * to bottom
                pointY = 0;
                if( pointX < -(save_img_width * scale - mask_width) - save_left * scale ){    // * mask_width) !!!-!!! save_left * scale ){  minus (!) because save_left is negative - so  minus and minus gives us plus - that's what we need - to add - we need plus - and we have it (this I had a problem - so now its ok - the problem is solved)
                  pointX =   -(save_img_width * scale - mask_width) - save_left * scale;
                }else if(pointX > -save_left * scale){
                  pointX = -save_left * scale;
                }
              }

              else if(pointX < -(save_img_width * scale - mask_width) - save_left * scale){        // * to left
                pointX = -(save_img_width * scale - mask_width) - save_left * scale;
                if(pointY < (mask_height - save_img_height * scale)){
                  pointY = (mask_height - save_img_height * scale);
                }else if(pointY > 0){
                  pointY = 0;
                }
              }
              
              else if(pointY < (mask_height - save_img_height * scale)){                  // * to top
                pointY = (mask_height - save_img_height * scale);
                if(pointX < -(save_img_width * scale - mask_width) - save_left * scale){
                  pointX = -(save_img_width * scale - mask_width) - save_left * scale;
                }else if(pointX > -save_left * scale){
                  pointX = -save_left * scale;
                }
              } 

// * 2













            }else if(ratio < 0.75){

              if(pointX > 0){               // * to right
                pointX = 0;
                if(pointY < -(save_img_height * scale - mask_height) - save_top * scale ){
                  pointY = -(save_img_height * scale - mask_height) - save_top * scale;
                }else if(pointY > -save_top * scale){
                  pointY = -save_top * scale;
                }
              }

              else if(pointY > -save_top * scale){                     // * to bottom
                pointY = -save_top * scale;
                if( pointX < (mask_width - save_img_width * scale) ){    // * mask_width) !!!-!!! save_left * scale ){  minus (!) because save_left is negative - so  minus and minus gives us plus - that's what we need - to add - we need plus - and we have it (this I had a problem - so now its ok - the problem is solved)
                  pointX = (mask_width - save_img_width * scale);
                }else if(pointX > -save_top * scale){
                  pointX = -save_top * scale;
                }
              }

              else if(pointX < (mask_width - save_img_width * scale)){        // * to left
                pointX = (mask_width - save_img_width * scale);
                if(pointY < -(save_img_height * scale - mask_height) - save_top * scale){
                  pointY = -(save_img_height * scale - mask_height) - save_top * scale;
                }else if(pointY > -save_top * scale){
                  pointY = -save_top * scale;
                }
              }

              else if(pointY < -(save_img_height * scale - mask_height) - save_top * scale){                  // * to top
                pointY = -(save_img_height * scale - mask_height) - save_top * scale;
                if(pointX < (mask_width - save_img_width * scale)){
                  pointX = (mask_width - save_img_width * scale);
                }else if(pointX > -save_top * scale){
                  pointX = -save_top * scale;
                }
              } 

// * 2





          }   // *    }else if(ratio < 0.75){



        }   // *  } else if(scale >= 1) { 









        //console.log('pointX = ', pointX);
    setTransform();
    // no_zoom = false;




}








// img_wrp_blk.onwheelend = function (e) {
//   alert('stop');
// }

let zoom_blk = document.getElementById('puzzf_zoom');
// <script>

function createWheelStopListener(element, callback, timeout) {
    var handle = null;
    var onScroll = function() {
        if (handle) {
            clearTimeout(handle);
        }
        handle = setTimeout(callback, timeout || 200); // default 200 ms
    };
    element.addEventListener('wheel', onScroll);
    return function() {
        element.removeEventListener('wheel', onScroll);
    };
}

// Example usage:

createWheelStopListener(zoom_blk, function() {
    // console.log('onwheelstop');
    // console.log('pointX = ', pointX);
    get_dt_img_crop(pointX, pointY, save_left, save_top, scale);


    let x = window.jQuery;
    jigazo_puzzf(x);           // ! puzzles on zoomEnd
// ? 2
});










// ? this function has offset of img when we are zooming (and no offset - all ok - when only drag)
function get_dt_img_crop(pointX, pointY, save_left, save_top, scale){     // * cutting image to 4 canvases

//const mask_aspect_ratio = 3/4;

// console.log('pointX = ', pointX);
// console.log('pointY = ', pointY);

// console.log('save_left = ', save_left);
// console.log('save_top = ', save_top);

const image = new Image(),
canvas_1 = document.getElementById('canvas_1');
canvas_2 = document.getElementById('canvas_2');
canvas_3 = document.getElementById('canvas_3');
canvas_4 = document.getElementById('canvas_4');



ctx_1 = canvas_1.getContext('2d');
ctx_1.clearRect(0, 0, canvas_1.width, canvas_1.height);

// let ratio_of_canvas = 0.75;


ctx_2 = canvas_2.getContext('2d');
ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);

ctx_3 = canvas_3.getContext('2d');
ctx_3.clearRect(0, 0, canvas_3.width, canvas_3.height);

ctx_4 = canvas_4.getContext('2d');
ctx_4.clearRect(0, 0, canvas_4.width, canvas_4.height);


let img_wrp = document.getElementById('puzzf_zoom'); 
let img_wrp_width = img_wrp.offsetWidth;
let img_wrp_height = img_wrp.offsetHeight;

let blk_and_canvas_ratio_height = img_wrp_height / canvas_1.height;  // * 2.1294642857142856      
// ! 2.135 - more accurate  value
// console.log('blk_and_canvas_ratio_height = ', blk_and_canvas_ratio_height);
blk_and_canvas_ratio_height = 2.135;

let blk_and_canvas_ratio_width = img_wrp_width / canvas_1.width;  // * 2.125        
// ! 2.135  - more accurate value
// console.log('blk_and_canvas_ratio_width = ', blk_and_canvas_ratio_width);
blk_and_canvas_ratio_width = 2.135;



let img_el_for_canvas = document.getElementById('puzzf_image');   // * for dragElement(img_el);


// console.log('img_el_for_canvas = ', img_el_for_canvas);
let img_src_for_canvas = img_el_for_canvas.getAttribute('src');
let img_width = img_el_for_canvas.offsetWidth;
let img_height = img_el_for_canvas.offsetHeight;
// console.log('img_width = ', img_width);
// console.log('img_height = ', img_height);
let ratio = img_width / img_height;
ratio = Number(ratio.toFixed(5));
// console.log('ratio = ', ratio);

// console.log(b.width);

image.src = img_src_for_canvas;
// image.addEventListener('load', () => {

// * context.drawImage(img, x, y, swidth, sheight, sx, sy, width, height);
// * Parameter Values:  
//  *   img: It indicates the image or video to draw on canvas.
//  *  x: It indicates the x-coordinate where image has to be placed. ( -1000 =move img to right in x      +1000 = to left)
//   *  y: It indicates the y-coordinate where image has to be placed.
//   *  swidth: It is optional parameter and indicates the width of the clipped image.
//   *  sheight: It is optional parameter and indicates the height of the clipped image.
//  *   sx: It is optional parameter and indicates x-coordinate where to start the clipping.
//  *   sy: It is optional parameter and indicates y-coordinate where to start the clipping.
//  *   width: It is optional parameter and indicates the width of the image to use.
//   *  height: It is optional parameter and indicates the height of the image to use.
// ! OR THIS 

//let adjust_coord = 1; // ????? !!!!!!!!!!!       // * if 0.98  then adjust_coord = 16       if smaller_canvas_adj then adjust_coord = 22


// let smaller_canvas_adj = 1; // *  for example the width of canvas is 100, and we need to have mo smaller canvas? so 100 * 0.7 = we have more smaller canvas 
// let x_canvas_1 = 0;
// let y_canvas_1 = 0;

// if(ratio >= 0.75){
//   x_canvas_1 = 0;
//   y_canvas_1 = ((canvas_4.width / ratio) * scale ) - ((canvas_4.width ) / ratio) * scale;;
// }else{
//   x_canvas_1 = 0;
//   y_canvas_1 = canvas_4.height * scale - canvas_4.height  * scale;;
// }


// ! old 1

//         ctx_1.drawImage(image,  // * what element to use (video, or image or canvas)
//         0, 0,  
//         image.width / smaller_canvas_adj, image.height / smaller_canvas_adj,   // * if image.width / 2  have stretched img in x

//         (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) ) / blk_and_canvas_ratio_height)),   // * if  -b.offset.y / 4.3 replace with -b.offset.y 
//                                                   // * then when move img to bottom on 10 pixels - it moves on much more than 10 pixels -  
// // *    -b.offset.x / 4.3, -b.offset.y / 4.3,  
//         ratio >= 0.75  
//           ? ((canvas_1.width) * scale)   // * we have landscape img and here is our width
//           : ((canvas_1.height) * ratio) * scale,   // * we have portrait img and here is our calculated width
//         ratio >= 0.75 
//           ? (((canvas_1.width) / ratio) * scale )   // * // * we have landscape img and here is our calculated height
//           : canvas_1.height * scale);     // * we have portrait img and here is our height

// ! old 2


// console.log('save_left = ', save_left);
// ? new(practice) 1

ctx_1.drawImage(image, 
  0, 0,  
  image.width, image.height, 
  (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)), 
  ratio >= 0.75  
    ? (canvas_1.height * ratio) * scale    
    : canvas_1.width * scale,  
  ratio >= 0.75 
    ? canvas_1.height * scale 
    : (canvas_1.width / ratio) * scale);    




    ctx_2.drawImage(image, 
      0, 0,  
      image.width, image.height, 
      (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)), 
      ratio >= 0.75  
        ? (canvas_2.height * ratio) * scale    
        : canvas_2.width * scale,  
      ratio >= 0.75 
        ? canvas_2.height * scale 
        : (canvas_2.width / ratio) * scale);  


        ctx_3.drawImage(image, 
          0, 0,  
          image.width, image.height, 
          (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)), 
          ratio >= 0.75  
            ? (canvas_3.height * ratio) * scale    
            : canvas_3.width * scale,  
          ratio >= 0.75 
            ? canvas_3.height * scale 
            : (canvas_3.width / ratio) * scale);  



            ctx_4.drawImage(image, 
              0, 0,  
              image.width, image.height, 
              (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)), 
              ratio >= 0.75  
                ? (canvas_4.height * ratio) * scale    
                : canvas_4.width * scale,  
              ratio >= 0.75 
                ? canvas_4.height * scale 
                : (canvas_4.width / ratio) * scale);  

  //   ratio >= 0.75  
  //   ? ((canvas_1.width)  * scale) * blk_and_canvas_ratio_width     // ! mask_width * scale   // * we have landscape img and here is our width
  //   : (((canvas_1.height) * ratio) * scale) * blk_and_canvas_ratio_width ,   // * we have portrait img and here is our calculated width
  // ratio >= 0.75 
  //   ? (((canvas_1.width) / ratio)  * scale ) * blk_and_canvas_ratio_height   // * // * we have landscape img and here is our calculated height
  //   : (canvas_1.height * scale) * blk_and_canvas_ratio_height);     // * we have portrait img and here is our height

// ? new 2


    // let x_canvas_4 = 0;
    // let y_canvas_4 = 0;

    // if(ratio >= 0.75){
    //   x_canvas_2 = (canvas_4.width * scale) - (canvas_4.width ) * scale;
    //   y_canvas_2 = ((canvas_4.width / ratio) * scale ) - ((canvas_4.width ) / ratio) * scale;
    // }else{
    //   x_canvas_2 = (canvas_4.height * ratio) * scale - ((canvas_4.height ) * ratio) * scale;
    //   y_canvas_2 = canvas_4.height * scale - canvas_4.height  * scale;
    // }






 // console.log('canvas_2 = ', canvas_2);
    // let x_canvas_2 = 0;
    // let y_canvas_2 = 0;

    // if(ratio >= 0.75){
    //   x_canvas_2 = canvas_2.width - canvas_2.width ;
    //   y_canvas_2 = 0;
    // }else{
    //   x_canvas_2 = canvas_2.height * 0.75 - canvas_2.height * 0.75 ;
    //   y_canvas_2 = 0;
    // }

    // console.log('x_canvas_2 = ', x_canvas_2);
   // console.log('y_canvas_2 = ', y_canvas_2);

// ctx_2.drawImage(image,
  
//   -x_canvas_2 * adjust_coord, -y_canvas_2 * adjust_coord,    // *     -x_canvas_2 * adjust_coord is good when  (number adjust_coord is good)
//   // ratio >= 0.75  
//   //   ? -(canvas_1.width * scale) - (canvas_1.width ) * scale
//   //   : -(canvas_1.height * ratio) * scale - ((canvas_1.height ) * ratio) * scale,
//   // ratio >= 0.75 
//   //   ? ((canvas_1.width / ratio) * scale ) - ((canvas_1.width ) / ratio) * scale 
//   //   : canvas_1.height * scale - canvas_1.height  * scale),




//     image.width, image.height, 
//     (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) ) / blk_and_canvas_ratio_height)), 
//     ratio >= 0.75  
//       ? (canvas_2.height * ratio) * scale    
//       : canvas_2.width * scale,  
//     ratio >= 0.75 
//       ? canvas_2.height * scale 
//       : (canvas_2.width / ratio) * scale);    










    // let x_canvas_3 = 0;
    // let y_canvas_3 = 0;

    // if(ratio >= 0.75){
    //   x_canvas_3 = 0;
    //   y_canvas_3 = canvas_3.width / 0.75 - (canvas_3.width / 0.75) ;
    // }else{
    //   x_canvas_3 = 0;
    //   y_canvas_3 = canvas_3.height - canvas_3.height ;
    // }

    // // console.log('x_canvas_3 = ', x_canvas_3);
    // // console.log('y_canvas_3 = ', y_canvas_3);

    // ctx_3.drawImage(image,
    //   -x_canvas_3 * adjust_coord, -y_canvas_3 * adjust_coord,       // ! x, y coordinates in canvas to insert the img

    //   image.width, image.height, 
    //   (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) ) / blk_and_canvas_ratio_height)), 
    //   ratio >= 0.75  
    //     ? (canvas_3.height * ratio) * scale    
    //     : canvas_3.width * scale,  
    //   ratio >= 0.75 
    //     ? canvas_3.height * scale 
    //     : (canvas_3.width / ratio) * scale);  













    // let x_canvas_4 = 0;
    // let y_canvas_4 = 0;

    // if(ratio >= 0.75){
    //   x_canvas_4 = canvas_4.width - canvas_4.width ;
    //   y_canvas_4 = canvas_3.width / 0.75 - (canvas_3.width / 0.75) ;
    // }else{
    //   x_canvas_4 = canvas_4.height * 0.75 - canvas_4.height * 0.75 ;
    //   y_canvas_4 = canvas_3.height - canvas_3.height ;
    // }
    //   ctx_4.drawImage(image,
    //     -x_canvas_4 * adjust_coord, -y_canvas_4 * adjust_coord,   
    //     image.width, image.height, 
    //     (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) ) / blk_and_canvas_ratio_height)), 
    //     ratio >= 0.75  
    //       ? (canvas_4.height * ratio) * scale    
    //       : canvas_4.width * scale,  
    //     ratio >= 0.75 
    //       ? canvas_4.height * scale 
    //       : (canvas_4.width / ratio) * scale);  



          // console.log('test');
  



var url = canvas_1.toDataURL();
//console.log('url = ', url);

if(document.getElementById('puzzf_cropped_img') !== null){
  let get_prev_img = document.getElementById('puzzf_cropped_img');
  get_prev_img.remove();
}

var newImg = document.createElement("img"); // create img tag
newImg.setAttribute('id', 'puzzf_cropped_img');
newImg.style.width = canvas_1.width + 'px';
newImg.style.height = canvas_1.height + 'px';
newImg.style.position = 'absolute';
newImg.style.right = '0';
newImg.style.bottom = '0';
newImg.style.outline = '1px solid grey';
newImg.style.opacity = '0';
newImg.style.zIndex = '-1';

newImg.src = url;
document.body.appendChild(newImg); // add to end of your document

cropped_img = newImg;
// console.log('test');

// return newImg;

// canvas_count += 1;
// let x = window.jQuery; 
// jigazo_puzzf(x);











var url = canvas_2.toDataURL();
//console.log('url = ', url);

if(document.getElementById('puzzf_cropped_img_2') !== null){
  let get_prev_img = document.getElementById('puzzf_cropped_img_2');
  get_prev_img.remove();
}

var newImg_2 = document.createElement("img"); // create img tag
newImg_2.setAttribute('id', 'puzzf_cropped_img_2');
newImg_2.style.width = canvas_2.width + 'px';
newImg_2.style.height = canvas_2.height + 'px';
newImg_2.style.position = 'absolute';
newImg_2.style.right = '0';
newImg_2.style.top = '0';
newImg_2.style.outline = '1px solid grey';
newImg_2.style.opacity = '0';
newImg_2.style.zIndex = '-1';

newImg_2.src = url;
document.body.appendChild(newImg_2); // add to end of your document

cropped_img_2 = newImg_2;
// console.log('test');

// return newImg;

// canvas_count += 1;
// x = window.jQuery; 
// jigazo_puzzf(x);










var url = canvas_3.toDataURL();
//console.log('url = ', url);

if(document.getElementById('puzzf_cropped_img_3') !== null){
  let get_prev_img = document.getElementById('puzzf_cropped_img_3');
  get_prev_img.remove();
}

var newImg_3 = document.createElement("img"); // create img tag
newImg_3.setAttribute('id', 'puzzf_cropped_img_3');
newImg_3.style.width = canvas_3.width + 'px';
newImg_3.style.height = canvas_3.height + 'px';
newImg_3.style.position = 'absolute';
newImg_3.style.left = '0';
newImg_3.style.top = '0';
newImg_3.style.outline = '1px solid grey';
newImg_3.style.opacity = '0';
newImg_3.style.zIndex = '-1';

newImg_3.src = url;
document.body.appendChild(newImg_3); // add to end of your document

cropped_img_3 = newImg_3;
// console.log('test');

// return newImg;
// canvas_count += 1;
// x = window.jQuery; 
// jigazo_puzzf(x);







var url = canvas_4.toDataURL();
//console.log('url = ', url);

if(document.getElementById('puzzf_cropped_img_4') !== null){
  let get_prev_img = document.getElementById('puzzf_cropped_img_4');
  get_prev_img.remove();
}

var newImg_4 = document.createElement("img"); // create img tag
newImg_4.setAttribute('id', 'puzzf_cropped_img_4');
newImg_4.style.width = canvas_1.width + 'px';
newImg_4.style.height = canvas_1.height + 'px';
newImg_4.style.position = 'absolute';
newImg_4.style.left = '0';
newImg_4.style.bottom = '0';
newImg_4.style.outline = '1px solid grey';
newImg_4.style.opacity = '0';
newImg_4.style.zIndex = '-1';

newImg_4.src = url;
document.body.appendChild(newImg_4); // add to end of your document

cropped_img_4 = newImg_4;
// console.log('test');

// return newImg;
// canvas_count += 1;
// x = window.jQuery; 
// jigazo_puzzf(x);


// canvas_count = 0;


}



} //  * function reset_img_and_get_puzzles() {
// * reset_img_and_get_puzzles      end
// $(document).ready(function(){

// });

// window.addEventListener('wheel', (e) => {
//   if (e.ctrlKey) {
//       e.preventDefault();
//   }
// }, {
//   "passive": false
// });

// document.addEventListener("touchstart", function(e){
//   e.preventDefault();
//   },{passive: false});

// document.getElementById('someelement').addEventListener('touchstart', function(e){e.stopPropagation()}, false);

// element.removeAttribute(name);

window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

// let have_once = false;
let selected_cavas = "1";

let cropped_img = {};
// let canvas_count = 0;
let cropped_img_2 = {};
let cropped_img_3 = {};
let cropped_img_4 = {};

let img_el = {};
let img_wrp_blk = {};
let mask_el = {};
let our_image = {};

// let no_zoom = true;

let save_left = 0;
let save_top = 0;

let save_img_width = 0;
let save_img_height = 0;

let x = 0;
let y = 0;

let img_width = 0;
let img_height = 0;

let mask_width = 0;
let mask_height = 0;

let browser_width = 0;
let browser_height = 0;

browser_width = window.innerWidth;
browser_height = window.innerHeight;

// let have_overlay = false;
// let not_first_time = false;

// function stoppropagation(event){
//   console.log('function stoppropagation');
//   event.stopPropagation();
// }

// function show_info(event){
//   // console.log('show_info');
//   event.preventDefault();
//   event.stopPropagation();

//   let get_overlay = document.getElementById('puzzf_overlay_ph');
//   get_overlay.style.display = 'block';

//   let get_info_blk = document.getElementById('puzzf_info_blk');
//   get_info_blk.style.display = 'block';

//   // event.target.setAttribute('onclick', 'hide_info(event)');
// }

// function hide_info(event){
//   event.preventDefault();
//   event.stopPropagation();

//   let get_overlay = document.getElementById('puzzf_overlay_ph');
//   get_overlay.style.display = 'none';

//   let get_info_blk = document.getElementById('puzzf_info_blk');
//   get_info_blk.style.display = 'none';

//   // event.target.setAttribute('onclick', 'show_info(event)');
// }

// function stopPropagationFunc(event){

//   event.stopPropagation();
//   // event.preventDefault();

//   // console.log('stopPropagationFunc is calling');
// }

function crear_canvas_and_pdf() {
  canvas_1 = document.getElementById("canvas_1");
  canvas_width = canvas_1.width;
  canvas_height = canvas_1.height;
  canvas_1.remove();

  let wrp_for_new_canvas = document.getElementById("puzzf_canvas_wrp_1");
  let create_canvas = document.createElement("canvas");
  create_canvas.id = "canvas_1";
  create_canvas.width = canvas_width;
  create_canvas.height = canvas_height;
  wrp_for_new_canvas.append(create_canvas);

  let right_blk = document.getElementById("puzzf_right_col_btns_in");
  right_blk.innerHTML = "";

  let large_blk_one_of_6_ = document.querySelectorAll(
    ".puzzf_6_large_divs_in_right_column"
  );
  for (i = 0; i < 6; ++i) {
    large_blk_one_of_6_[i].style.display = "none";
  }

  let pdf_6_nums_ = document.querySelectorAll(".puzzf_right_col_nums");
  for (i = 0; i < 6; ++i) {
    pdf_6_nums_[i].style.display = "none";
  }

  let pdf_wrp = document.getElementById("puzzf_pdf_hr_wrp");
  // console.log('pdf_wrp = ', pdf_wrp);
  pdf_wrp.style.display = "none";

  let pdf_link_1 = document.getElementById("puzzf_pdf_link_1");
  let pdf_link_2 = document.getElementById("puzzf_pdf_link_2");

  pdf_link_1.style.display = "none";
  pdf_link_2.style.display = "none";
}

function generate_puzzles() {
  // console.log('generating');

  let get_overlay = document.getElementById("puzzf_overlay_dt");
  get_overlay.style.display = "block";

  get_dt_img_crop(
    pointX,
    pointY,
    save_left,
    save_top,
    scale,
    save_img_width,
    save_img_height
  );
  // console.log('cropped_img = ', cropped_img);
  //console.log('cropped_img = ', cropped_img);

  let x = window.jQuery;
  jigazo_puzzf(x); // ! puzzles on mouseUP
  // not_first_time = true;

  let get_generate_btn = document.getElementById("puzzf_generate_btn");
  get_generate_btn.style.pointerEvents = "none";
  get_generate_btn.style.opacity = "0";
}

// * this function (get_dt_img_crop() ) is defined here second time - may be it's possible make definition in only one place...
// ? this function has offset of img when we are zooming (and no offset - all ok - when only drag)
function get_dt_img_crop(pointX, pointY, save_left, save_top, scale) {
  // * cutting image to 4 canvases

  const image = new Image(),
    canvas_1 = document.getElementById("canvas_1");
  // canvas_2 = document.getElementById('canvas_2');
  // canvas_3 = document.getElementById('canvas_3');
  // canvas_4 = document.getElementById('canvas_4');

  ctx_1 = canvas_1.getContext("2d");
  ctx_1.clearRect(0, 0, canvas_1.width, canvas_1.height);

  // let ratio_of_canvas = 0.75;

  // ctx_2 = canvas_2.getContext('2d');
  // ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);

  // ctx_3 = canvas_3.getContext('2d');
  // ctx_3.clearRect(0, 0, canvas_3.width, canvas_3.height);

  // ctx_4 = canvas_4.getContext('2d');
  // ctx_4.clearRect(0, 0, canvas_4.width, canvas_4.height);

  let img_wrp = document.getElementById("puzzf_zoom");
  let img_wrp_width = img_wrp.offsetWidth;
  let img_wrp_height = img_wrp.offsetHeight;

  let blk_and_canvas_ratio_height = img_wrp_height / canvas_1.height; // * 2.1294642857142856
  // ! 2.135 - more accurate  value
  // console.log('blk_and_canvas_ratio_height = ', blk_and_canvas_ratio_height);
  blk_and_canvas_ratio_height = 2.135;

  let blk_and_canvas_ratio_width = img_wrp_width / canvas_1.width; // * 2.125
  // ! 2.135  - more accurate value
  // console.log('blk_and_canvas_ratio_width = ', blk_and_canvas_ratio_width);
  blk_and_canvas_ratio_width = 2.135;

  let img_el_for_canvas = document.getElementById("puzzf_image"); // * for dragElement(img_el);

  // console.log('img_el_for_canvas = ', img_el_for_canvas);
  let img_src_for_canvas = img_el_for_canvas.getAttribute("src");
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

  ctx_1.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    (pointX + save_left * scale) / blk_and_canvas_ratio_width,
    (pointY + save_top * scale) / blk_and_canvas_ratio_height,
    ratio >= 0.75 ? canvas_1.height * ratio * scale : canvas_1.width * scale,
    ratio >= 0.75 ? canvas_1.height * scale : (canvas_1.width / ratio) * scale
  );

  // ctx_2.drawImage(image,
  //   0, 0,
  //   image.width, image.height,
  //   (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)),
  //   ratio >= 0.75
  //     ? (canvas_2.height * ratio) * scale
  //     : canvas_2.width * scale,
  //   ratio >= 0.75
  //     ? canvas_2.height * scale
  //     : (canvas_2.width / ratio) * scale);

  //     ctx_3.drawImage(image,
  //       0, 0,
  //       image.width, image.height,
  //       (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)),
  //       ratio >= 0.75
  //         ? (canvas_3.height * ratio) * scale
  //         : canvas_3.width * scale,
  //       ratio >= 0.75
  //         ? canvas_3.height * scale
  //         : (canvas_3.width / ratio) * scale);

  //         ctx_4.drawImage(image,
  //           0, 0,
  //           image.width, image.height,
  //           (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)),
  //           ratio >= 0.75
  //             ? (canvas_4.height * ratio) * scale
  //             : canvas_4.width * scale,
  //           ratio >= 0.75
  //             ? canvas_4.height * scale
  //             : (canvas_4.width / ratio) * scale);

  var url = canvas_1.toDataURL();
  // console.log('get_puzzles_on_change_img_url = ', url);
  // base64result = url.split(',')[1];
  base64result = url;
  //console.log('desktop_puzzleface_script_file_base64result = ', base64result);

  if (document.getElementById("puzzf_cropped_img") !== null) {
    let get_prev_img = document.getElementById("puzzf_cropped_img");
    get_prev_img.remove();
  }

  var newImg = document.createElement("img"); // create img tag
  newImg.setAttribute("id", "puzzf_cropped_img");
  newImg.style.width = canvas_1.width + "px";
  newImg.style.height = canvas_1.height + "px";
  newImg.style.position = "absolute";
  newImg.style.right = "0";
  newImg.style.bottom = "0";
  newImg.style.outline = "1px solid grey";
  newImg.style.opacity = "0";
  newImg.style.zIndex = "-1";

  newImg.src = url;
  document.body.appendChild(newImg); // add to end of your document

  cropped_img = newImg;

  // var url = canvas_2.toDataURL();
  // //console.log('url = ', url);

  // if(document.getElementById('puzzf_cropped_img_2') !== null){
  //   let get_prev_img = document.getElementById('puzzf_cropped_img_2');
  //   get_prev_img.remove();
  // }

  // var newImg_2 = document.createElement("img"); // create img tag
  // newImg_2.setAttribute('id', 'puzzf_cropped_img_2');
  // newImg_2.style.width = canvas_2.width + 'px';
  // newImg_2.style.height = canvas_2.height + 'px';
  // newImg_2.style.position = 'absolute';
  // newImg_2.style.right = '0';
  // newImg_2.style.top = '0';
  // newImg_2.style.outline = '1px solid grey';
  // newImg_2.style.opacity = '0';
  // newImg_2.style.zIndex = '-1';

  // newImg_2.src = url;
  // document.body.appendChild(newImg_2); // add to end of your document

  // cropped_img_2 = newImg_2;

  // var url = canvas_3.toDataURL();
  // //console.log('url = ', url);

  // if(document.getElementById('puzzf_cropped_img_3') !== null){
  //   let get_prev_img = document.getElementById('puzzf_cropped_img_3');
  //   get_prev_img.remove();
  // }

  // var newImg_3 = document.createElement("img"); // create img tag
  // newImg_3.setAttribute('id', 'puzzf_cropped_img_3');
  // newImg_3.style.width = canvas_3.width + 'px';
  // newImg_3.style.height = canvas_3.height + 'px';
  // newImg_3.style.position = 'absolute';
  // newImg_3.style.left = '0';
  // newImg_3.style.top = '0';
  // newImg_3.style.outline = '1px solid grey';
  // newImg_3.style.opacity = '0';
  // newImg_3.style.zIndex = '-1';

  // newImg_3.src = url;
  // document.body.appendChild(newImg_3); // add to end of your document

  // cropped_img_3 = newImg_3;

  // var url = canvas_4.toDataURL();
  // //console.log('url = ', url);

  // if(document.getElementById('puzzf_cropped_img_4') !== null){
  //   let get_prev_img = document.getElementById('puzzf_cropped_img_4');
  //   get_prev_img.remove();
  // }

  // var newImg_4 = document.createElement("img"); // create img tag
  // newImg_4.setAttribute('id', 'puzzf_cropped_img_4');
  // newImg_4.style.width = canvas_1.width + 'px';
  // newImg_4.style.height = canvas_1.height + 'px';
  // newImg_4.style.position = 'absolute';
  // newImg_4.style.left = '0';
  // newImg_4.style.bottom = '0';
  // newImg_4.style.outline = '1px solid grey';
  // newImg_4.style.opacity = '0';
  // newImg_4.style.zIndex = '-1';

  // newImg_4.src = url;
  // document.body.appendChild(newImg_4); // add to end of your document

  // cropped_img_4 = newImg_4;
} // * end of        function get_dt_img_crop(pointX, pointY, save_left, save_top, scale){

function move_pinch_zoom_icon(event) {
  // console.log('test');
  // console.log('event e = ', e);
  // event.target.parentElement.remove();

  // todo 19.05.23 1
  //console.log('touchstart');

  if (have_once === false) {
    if (document.getElementById("puzzf_pinch_zoom_icon_wrp") !== null) {
      let pinch_zoom_icon = document.getElementById(
        "puzzf_pinch_zoom_icon_wrp"
      );

      let icon_width = pinch_zoom_icon.offsetWidth;
      let icon_height = pinch_zoom_icon.offsetHeight;

      // console.log('icon_width = ', icon_width);
      // console.log('icon_height = ', icon_height);

      pinch_zoom_icon.style.left = "60%";
      pinch_zoom_icon.style.top = "70%";
      pinch_zoom_icon.style.width = (icon_width * 80) / 100 + "px";
      pinch_zoom_icon.style.height = (icon_height * 80) / 100 + "px";
      // pinch_zoom_icon.remove();
    }
  }

  have_once = true;

  // todo 19.05.23 2
}

// ? comment back 1
function readURL() {
  // console.log('input_onchange');
  // console.log('readURL');
  //console.log('img_el = ', img_el);

  // no_events = true;
  // console.log('no_events = ', no_events);

  // todo ******************  this disable img moving (when have overlay) only until we have our first puzzles of downloaded img - after the first puzzles (when we next: drag or zoom)  our img is moving (when we have overlay - and need to fix it to - no move no zoom - must have)
  // let get_puzzf_zoom = document.getElementById('puzzf_zoom');
  // get_puzzf_zoom.style.pointerEvents = 'none';
  // todo *
  // todo * this 'none' works immediately after we have chosen the img in (system)window for choosing
  // todo * but !!!!!! our puzzling is still starting (during overlay) when we (mousedown+)mouseup

  var file = document.getElementById("puzzf_getval").files[0];

  var reader = new FileReader();

  // * var 1
  // export class FileReaderA extends window.FileReader {
  // 	constructor() {
  // 		super();
  // 		const zoneOriginalInstance = (this as any)['__zone_symbol__originalInstance'];
  // 		return zoneOriginalInstance || this;
  // 	}
  // }

  // window.FileReader = FileReaderA;

  // * var 2
  //   export function getFileReader(): FileReader {
  //     const fileReader = new FileReader();
  //     const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
  //     return zoneOriginalInstance || fileReader;
  // }
  // ...
  // let newInstance = getFileReader();

  our_image = document.getElementById("puzzf_image");
  // our_image = document.getElementById('puzzf_image');

  if (browser_width < browser_height) {
    // let change_image_btn = document.getElementById('puzzf_change_image_btn'); // ! our puzzle-shape button in bottom-right corner
    // change_image_btn.style.display = 'block';

    // console.log('have_once = ', have_once);
    // if(have_once === true){

    // let info_btn = document.getElementById('puzzf_info_btn_wrp'); // ! our puzzle-shape button in bottom-right corner
    // info_btn.style.display = 'block';

    const get_label = document.getElementById("puzzf_label_for_getval");
    //console.log('get_label = ', get_label);
    get_label.setAttribute("for", "nothing");

    // }

    // const get_change_image_button = document.getElementById('puzzf_change_image');

    // const get_new_label = document.getElementById('puzzf_change_image_label');
    // get_new_label.setAttribute('for', 'puzzf_getval');
    // get_new_label.style.opacity = '1';
    // get_new_label.style.display = 'block';

    const get_buttons_row = document.getElementById("puzzf_button_row");
    // get_buttons_row.setAttribute('for', 'puzzf_getval');
    get_buttons_row.style.pointerEvents = "auto";
    get_buttons_row.style.zIndex = "1000";

    //   // todo 20.05.23 1
    //   let text_below_the_mask = document.getElementById('puzzf_left_text');
    // text_below_the_mask.innerHTML = 'Pinch out to make the face larger until it fills the frame. Center image within the frame.';
    //   // todo 20.05.23 2

    const get_upload_portrait_btn = document.getElementById(
      "puzzf_upload_portrait_label"
    );
    // get_upload_portrait_btn.setAttribute('for', 'puzzf_getval');
    // get_upload_portrait_btn.style.opacity = '1';
    get_upload_portrait_btn.style.display = "none";

    // get_new_label.setAttribute('for', 'puzzf_getval');

    // have_once = true;

    // todo appearence of SAVE IMAGE KEY under 4 canvases

    // let get_header = document.getElementById('puzzf_header_ph');
    // get_header.style.display = 'none';

    // let get_save_image_key = document.getElementById('puzzf_button_row');
    // get_save_image_key.style.display = 'block';
  } else {
    // let pinch_zoom_icon = document.createElement('div');
    // pinch_zoom_icon.id = 'puzzf_pinch_zoom_icon_wrp';
    // pinch_zoom_icon.style.position = 'absolute';
    // pinch_zoom_icon.style.width = '50%';
    // pinch_zoom_icon.style.left = '25%';
    // pinch_zoom_icon.style.top = '50%';
    // pinch_zoom_icon.style.zIndex = '1000';
    // pinch_zoom_icon.style.opacity = '0.5';
    // pinch_zoom_icon.style.backgroundColor = 'white';
    // pinch_zoom_icon.style.outline = '1px solid #E3E3E3';

    // pinch_zoom_icon.innerHTML ='<img id="puzzf_pinch_zoom_icon" width="100%" style="" src="images/puzzle_face_icon_zoom_hand_v1.png" alt="pinch_zoom_icon">';

    // let mask_div = document.getElementById('puzzf_mask');
    // mask_div.append(pinch_zoom_icon);
    //     $html_puzzleface .='<div id="puzzf_pinch_zoom_icon_wrp" style="
    //     display:none;
    //     position:absolute;
    //     left:'.((($mask_width_cell * 15) - (($mask_width_cell * 15) * 0.5)) / 2).'px;
    //     top:'.(($mask_height_cell * 20)  / 2).'px;
    //     width:'.(($mask_width_cell * 15) * 0.5).'px;
    //     opacity:0.5;
    //     background-color:white;
    //     outline:1px solid #E3E3E3;

    //     z-index:1000;
    // ">
    // <img id="puzzf_pinch_zoom_icon" width="100%" style="
    // opacity:1;
    // " src="images/puzzle_face_icon_zoom_hand_v1.png" alt="pinch_zoom_icon">
    // </div>';

    // todo 3.05.23 1
    let text_above_mask = document.getElementById("puzzf_text_above_mask");
    text_above_mask.innerHTML =
      "Adjust the size and placement of the face to get the best Puzzle Face";

    let upload_image_btn = document.getElementById("puzzf_upload_image_btn");
    //console.log('upload_image_btn = ', upload_image_btn);
    upload_image_btn.style.display = "none";
    // upload_image_btn.style.opacity = '0';
    // todo 3.05.23 2
    let change_image_btn = document.getElementById("puzzf_change_image_btn");
    change_image_btn.style.display = "block";
    change_image_btn.style.display = "flex";
    change_image_btn.style.justifyContent = "center";
    change_image_btn.style.alignItems = "center";

    const get_label = document.getElementById("puzzf_label_for_getval");
    //console.log('get_label = ', get_label);
    get_label.setAttribute("for", "nothing");

    //       // todo 20.05.23 1
    //   let text_below_the_mask = document.getElementById('puzzf_left_text');
    // text_below_the_mask.innerHTML = 'Pinch out to make the face larger until it fills the frame. Center image within the frame.';
    //   // todo 20.05.23 2
    // console.log('no_events = ', no_events);
  }

  reader.onload = function () {
    // file is loaded

    //     no_events = true;
    // console.log('*no_events = ', no_events);
    if (browser_width >= browser_height) {
      // let get_overlay = document.getElementById('puzzf_overlay_dt');
      // get_overlay.style.display = 'block';
      // let puzzf_image = document.getElementById('puzzf_image');
      // puzzf_image.style.pointerEvents = 'none';
    } else {
      let get_overlay = document.getElementById("puzzf_overlay_ph");
      get_overlay.style.display = "block";
    }

    var img = new Image();

    const width_div = document.getElementById("puzzf_img_system_width");
    const height_div = document.getElementById("puzzf_img_system_height");

    // if(browser_width < browser_height){
    //   img_el = document.getElementById('puzzf_image');   // * for dragElement(img_el);
    //   //console.log("img_el = ", img_el);
    //   new PinchZoom(img_el, {});     // * acrivate pinch zoom(also double tap zoom) and dragging
    // }

    img.onload = function () {
      width_div.innerHTML = this.width;
      height_div.innerHTML = this.height;
      //console.log('width_div = ', width_div);

      // console.log('***no_events = ', no_events);

      // no_zoom = true;

      if (browser_width >= browser_height) {
        // todo * 31.05.23 1
        let get_generate_btn = document.getElementById("puzzf_generate_btn");
        get_generate_btn.style.pointerEvents = "auto";
        get_generate_btn.style.opacity = "1";

        let save_image_key_btn = document.getElementById("puzzf_get_code_btn");
        save_image_key_btn.style.display = "none";
        // todo * 31.05.23 2
        // console.log('test1');
        // console.log('width_div.innerHTML = ', Number(width_div.innerHTML));
        const ratio =
          Number(width_div.innerHTML) / Number(height_div.innerHTML);
        //console.log('ratio = ', ratio);
        let mask_el = document.getElementById("puzzf_mask");
        let mask_width = mask_el.offsetWidth;
        let mask_height = mask_el.offsetHeight;
        // console.log('mask_width = ', mask_width);
        // console.log('mask_height = ', mask_height);

        if (ratio >= 0.75) {
          // ! landscape img

          // our_image.style.width = mask_width + 'px';
          // our_image.style.height = mask_width / ratio + 'px';
          our_image.style.width = mask_height * ratio + "px";
          our_image.style.height = mask_height + "px";

          // save_img_width = mask_width;
          // save_img_height = mask_width / ratio;
          save_img_width = mask_height * ratio;
          save_img_height = mask_height;

          // our_image.style.left = '0px';
          // our_image.style.top = (mask_height - our_image.offsetHeight) / 2 + 'px';

          // console.log('mask_width = ', mask_width);
          // console.log('our_image.offsetWidth = ', our_image.offsetWidth);

          our_image.style.left =
            (mask_width - our_image.offsetWidth) / 2 + "px"; // ! here was a mistake !! + '0px'    so 0 near the px   - and so we have our image(for example -2000px) far to left - and we can't see it
          our_image.style.top = "0px";

          // save_left = 0;
          // save_top = (mask_height - our_image.offsetHeight) / 2;
          save_left = (mask_width - our_image.offsetWidth) / 2;
          save_top = 0;

          reset_img_and_get_puzzles();
        } else {
          // ! portrait img
          // our_image.style.width = mask_height * ratio + 'px';
          // our_image.style.height = mask_height + 'px';
          our_image.style.width = mask_width + "px";
          our_image.style.height = mask_width / ratio + "px";

          // save_img_width = mask_height * ratio;
          // save_img_height = mask_height;
          save_img_width = mask_width;
          save_img_height = mask_width / ratio;

          // our_image.style.top = '0px';
          // our_image.style.left = (mask_width - our_image.offsetWidth) / 2 + 'px';
          our_image.style.top =
            (mask_height - our_image.offsetHeight) / 2 + "px";
          our_image.style.left = "0px";

          // save_top = 0;
          // save_left = (mask_width - our_image.offsetWidth) / 2;
          save_top = (mask_height - our_image.offsetHeight) / 2;
          save_left = 0;

          reset_img_and_get_puzzles();
        }

        // console.log('no_events = ', no_events);

        // * reset_img_and_get_puzzles      start
        function reset_img_and_get_puzzles() {
          // *  continuous to line 862
          // console.log('!no_events = ', no_events);
          // alert('now');
          img_wrp_blk = document.getElementById("puzzf_zoom");
          //console.log('img_wrp_blk=', img_wrp_blk);

          let get_parent = img_wrp_blk.parentNode;
          // console.log('get_parent = ', get_parent);
          let mask_top_margin = Number(
            parseFloat(get_parent.getBoundingClientRect().top).toFixed(2)
          );
          let mask_left_margin = Number(
            parseFloat(get_parent.getBoundingClientRect().left).toFixed(2)
          );
          // console.log('mask_top_margin = ', mask_top_margin);
          // console.log('mask_left_margin = ', mask_left_margin);

          let mask_bottom_margin = Number(
            parseFloat(get_parent.getBoundingClientRect().bottom).toFixed(2)
          );
          let mask_right_margin = Number(
            parseFloat(get_parent.getBoundingClientRect().right).toFixed(2)
          );

          scale = 1;
          panning = false;
          pointX = 0;
          pointY = 0;
          start = { x: 0, y: 0 };
          // lock_mask = 'false';

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

            img_wrp_blk.style.transform =
              "translate(" +
              pointX +
              "px, " +
              pointY +
              "px) scale(" +
              scale +
              ")";
          }

          img_wrp_blk.onmousedown = function (e) {
            // console.log('mouse_down_have_overlay = ', have_overlay);
            //if(have_overlay === false){
            e.preventDefault();
            start = {
              x: e.clientX - mask_left_margin - pointX,
              y: e.clientY - mask_top_margin - pointY,
            };
            panning = true;
            //}

            crear_canvas_and_pdf();

            let save_image_key_btn =
              document.getElementById("puzzf_get_code_btn");
            save_image_key_btn.style.display = "none";
          };

          // * MOUSEUP ***************************************************************
          // ! if this line:  img_wrp_blk.onmouseup = function (e, no_events) {
          // ! we do have no_events = undefined when mouseup
          // ! so our no_event is not reacheable in onmouseup

          // img_wrp_blk.onmouseup = function (e) {         // ! commented
          document.onmouseup = function (e) {
            // todo changed above line    changes for going abroad mask
            // console.log('have_overlay = ', have_overlay);
            // console.log('e.target.id = ', e.target.id);
            // if(have_overlay === false){
            //                 if(e.target.id === 'puzzf_image'){                  // todo changes for going abroad mask
            //                   // have_overlay = true;
            //                   // console.log('mouse_up_have_overlay = ', have_overlay);
            //                   // console.log('##no_events = ', no_events);

            //                       if(panning === true){ // * to disable puzzling on just mouseup(without mousedown which is disabled for a moment when loading the img and have overlay and until calulating the puzzles)

            //                         let get_overlay = document.getElementById('puzzf_overlay_dt');
            //                         get_overlay.style.display = 'block';

            //                         // let get_puzzf_zoom = document.getElementById('puzzf_zoom');
            //                         // get_puzzf_zoom.style.pointerEvents = 'none';
            // // todo ****************** 1

            //                         // get_dt_img_crop(pointX, pointY, save_left, save_top, scale, save_img_width, save_img_height);
            //                         // // console.log('cropped_img = ', cropped_img);
            //                         // //console.log('cropped_img = ', cropped_img);

            //                         // let x = window.jQuery;
            //                         // jigazo_puzzf(x);        // ! puzzles on mouseUP
            //                         // // not_first_time = true;
            // // todo ****************** 2
            //         // ??????????????????????????????????????????????????????????????????????????? 26.05.23 1
            //                         // have_overlay = false;
            //           // !   console.log('end of mouseup'); end of mouse up appears - but jigazo code is still working
            //         // ??????????????????????????????????????????????????????????????????????????? 26.05.23 2
            //                     }
            //               // panning = false;
            // // console.log('panning = ', panning);
            //             // let get_puzzf_zoom = document.getElementById('puzzf_zoom');
            //             // get_puzzf_zoom.style.pointerEvents = 'auto';

            //             // let get_overlay = document.getElementById('puzzf_overlay_dt');
            //             // get_overlay.style.display = 'none';
            //                }
            //  else{ // todo changes for going abroad mask
            //   // panning = false;
            //  }      // todo changes for going abroad mask
            panning = false;
            //}

            let get_generate_btn =
              document.getElementById("puzzf_generate_btn");
            get_generate_btn.style.pointerEvents = "auto";
            get_generate_btn.style.opacity = "1";

            // let save_image_key_btn = document.getElementById('puzzf_get_code_btn');
            // save_image_key_btn.style.display = 'none';
          };

          // * mousemove ************************************************************
          img_wrp_blk.onmousemove = function (e) {
            //console.log('move_have_overlay = ', have_overlay);
            //if(have_overlay === false){

            //  console.log('moving');
            // console.log('e.clientX = ', e.clientX);
            // let get_lock_mask_data = document.getElementById('lock_mask_data');
            // // lock_mask = get_lock_mask_data.textContent;
            // let get_lock_attr = get_lock_mask_data.getAttribute('lock_attr');
            // // console.log('get_lock_attr in mousemove = ', get_lock_attr);
            // if(lock_mask === 'true' && panning === 'true'){
            //   // console.log('get_lock_attr in onmousedown  if = ', get_lock_attr);
            //   return;
            // }else{
            //   // console.log('lock_mask in onmousedown else  = ', lock_mask);
            // }
            e.preventDefault();
            if (!panning) {
              // * NO MOUSEMOVE event if there were no mousedown
              return;
            }

            // if(e.clientX > 452){
            //   // console.log('stop');

            //   panning = false;
            // }

            // console.log('e.clientX = ', e.clientX);
            // console.log('e.clientY = ', e.clientY);

            pointX = e.clientX - mask_left_margin - start.x;
            pointY = e.clientY - mask_top_margin - start.y;

            // console.log('pointX = ', pointX);

            // console.log(typeof(scale));

            if (scale === 1) {
              if (ratio >= 0.75) {
                //console.log('pointX = ', pointX);
                // * 1
                if (pointY < 0) {
                  // * to top
                  pointY = 0;
                  if (pointX > -save_left) {
                    pointX = -save_left;
                  } else if (pointX < save_left) {
                    pointX = save_left;
                  }
                } else if (pointX > -save_left) {
                  // * to right
                  pointX = -save_left;
                  if (pointY < 0) {
                    pointY = 0;
                  } else if (pointY > 0) {
                    pointY = 0;
                  }
                } else if (pointY > 0) {
                  // * to bottom
                  pointY = 0;
                  if (pointX < save_left) {
                    pointX = save_left;
                  } else if (pointX > -save_left) {
                    pointX = -save_left;
                  }
                } else if (pointX < save_left) {
                  // * to left
                  pointX = save_left;
                  if (pointY < 0) {
                    pointY = 0;
                  } else if (pointY > 0) {
                    pointY = 0;
                  }
                }
                // * 2
              } else if (ratio < 0.75) {
                // * 1

                if (pointY < save_top) {
                  // * to top
                  pointY = save_top;
                  if (pointX < 0) {
                    pointX = 0;
                  } else if (pointX > 0) {
                    pointX = 0;
                  }
                } else if (pointX > 0) {
                  // * to right
                  pointX = 0;
                  if (pointY > -save_top) {
                    pointY = -save_top;
                  } else if (pointY < save_top) {
                    pointY = save_top;
                  }
                } else if (pointY > -save_top) {
                  // * to bottom
                  pointY = -save_top;
                  if (pointX < 0) {
                    pointX = 0;
                  } else if (pointX > 0) {
                    pointX = 0;
                  }
                } else if (pointX < 0) {
                  // * to left
                  pointX = 0;
                  if (pointY < save_top) {
                    pointY = save_top;
                  } else if (pointY > -save_top) {
                    pointY = -save_top;
                  }
                }

                // * 2
              }
            } else if (scale >= 1) {
              // * have zoom
              // console.log('mask_height = ', mask_height);
              // console.log('save_img_height = ', save_img_height);

              // console.log('scale * img_height < mask_height');

              if (ratio >= 0.75) {
                // * 1
                // console.log('pointY = ', pointY);
                // console.log('pointX = ', pointX);

                if (pointX > -save_left * scale) {
                  // * to right
                  pointX = -save_left * scale;
                  if (pointY < mask_height - save_img_height * scale) {
                    pointY = mask_height - save_img_height * scale;
                  } else if (pointY > 0) {
                    pointY = 0;
                  }
                } else if (pointY > 0) {
                  // * to bottom
                  pointY = 0;
                  if (
                    pointX <
                    -(save_img_width * scale - mask_width) - save_left * scale
                  ) {
                    // * mask_width) !!!-!!! save_left * scale ){  minus (!) because save_left is negative - so  minus and minus gives us plus - that's what we need - to add - we need plus - and we have it (this I had a problem - so now its ok - the problem is solved)
                    pointX =
                      -(save_img_width * scale - mask_width) -
                      save_left * scale;
                  } else if (pointX > -save_left * scale) {
                    pointX = -save_left * scale;
                  }
                } else if (
                  pointX <
                  -(save_img_width * scale - mask_width) - save_left * scale
                ) {
                  // * to left
                  pointX =
                    -(save_img_width * scale - mask_width) - save_left * scale;
                  if (pointY < mask_height - save_img_height * scale) {
                    pointY = mask_height - save_img_height * scale;
                  } else if (pointY > 0) {
                    pointY = 0;
                  }
                } else if (pointY < mask_height - save_img_height * scale) {
                  // * to top
                  pointY = mask_height - save_img_height * scale;
                  if (
                    pointX <
                    -(save_img_width * scale - mask_width) - save_left * scale
                  ) {
                    pointX =
                      -(save_img_width * scale - mask_width) -
                      save_left * scale;
                  } else if (pointX > -save_left * scale) {
                    pointX = -save_left * scale;
                  }
                }

                // * 2
              } else if (ratio < 0.75) {
                if (pointX > 0) {
                  // * to right
                  pointX = 0;
                  if (
                    pointY <
                    -(save_img_height * scale - mask_height) - save_top * scale
                  ) {
                    pointY =
                      -(save_img_height * scale - mask_height) -
                      save_top * scale;
                  } else if (pointY > -save_top * scale) {
                    pointY = -save_top * scale;
                  }
                } else if (pointY > -save_top * scale) {
                  // * to bottom
                  pointY = -save_top * scale;
                  if (pointX < mask_width - save_img_width * scale) {
                    // * mask_width) !!!-!!! save_left * scale ){  minus (!) because save_left is negative - so  minus and minus gives us plus - that's what we need - to add - we need plus - and we have it (this I had a problem - so now its ok - the problem is solved)
                    pointX = mask_width - save_img_width * scale;
                  } else if (pointX > -save_top * scale) {
                    pointX = -save_top * scale;
                  }
                } else if (pointX < mask_width - save_img_width * scale) {
                  // * to left
                  pointX = mask_width - save_img_width * scale;
                  if (
                    pointY <
                    -(save_img_height * scale - mask_height) - save_top * scale
                  ) {
                    pointY =
                      -(save_img_height * scale - mask_height) -
                      save_top * scale;
                  } else if (pointY > -save_top * scale) {
                    pointY = -save_top * scale;
                  }
                } else if (
                  pointY <
                  -(save_img_height * scale - mask_height) - save_top * scale
                ) {
                  // * to top
                  pointY =
                    -(save_img_height * scale - mask_height) - save_top * scale;
                  if (pointX < mask_width - save_img_width * scale) {
                    pointX = mask_width - save_img_width * scale;
                  } else if (pointX > -save_top * scale) {
                    pointX = -save_top * scale;
                  }
                }

                // * 2
              } // *    }else if(ratio < 0.75){
            } // *  } else if(scale >= 1) {

            // else{
            //   if(scale * img_height < mask_width){

            //   }
            // }

            let get_overlay = document.getElementById("puzzf_overlay_dt");
            // console.log('get_overlay.style.display = ', get_overlay.style.display);
            // ? 1
            let overlay_display_property = get_overlay.style.display;
            // console.log('overlay_display_property = ', overlay_display_property); // ! always none !!!!!! - event during overlay
            // todo !!!!!  so only after dissapearing of overlay  our console.log is showing - so we have only 'none'
            // todo so I have to catch the moment when I have overlay - for yet I can't catch it ... - in process
            // ? 2

            // ? can't see this console.log !!!!!!!!!!!!!  1
            //  if(get_overlay.style.display === 'block'){
            //   console.log('have_overlay');
            //  }
            // ? can't see this console.log !!!!!!!!!!!!!  2

            // if(get_overlay.style.display === 'none'){

            setTransform();
            // }

            //}
          }; // * onmousemove()

          img_wrp_blk.onwheel = function (e) {
            let save_image_key_btn =
              document.getElementById("puzzf_get_code_btn");
            save_image_key_btn.style.display = "none";

            e.preventDefault();
            var xs = (e.clientX - mask_left_margin - pointX) / scale, // * ((e.clientX - mask_left_margin) - pointX)     is    distance from cursor to left border of img
              ys = (e.clientY - mask_top_margin - pointY) / scale;

            var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;

            if (delta > 0) {
              if (scale < 50) {
                scale *= 1.03;
              }
            } else {
              if (scale > 1) {
                scale /= 1.03;
              }
            }

            // (delta > 0) ? (scale *= 1.02) : (scale /= 1.02);

            pointX = e.clientX - mask_left_margin - xs * scale; // * (e.clientX - mask_left_margin) - xs         is     distance from left border of mask_blk to left border of img(or wrapper #puzzf_img_wrp_blk for this img)
            pointY = e.clientY - mask_top_margin - ys * scale;
            // console.log('ONZOOM_pointX = ', pointX);
            // console.log('ONZOOM_pointY = ', pointY);

            if (scale === 1) {
              if (ratio >= 0.75) {
                //console.log('pointX = ', pointX);
                // * 1
                if (pointY < 0) {
                  // * to top
                  pointY = 0;
                  if (pointX > -save_left) {
                    pointX = -save_left;
                  } else if (pointX < save_left) {
                    pointX = save_left;
                  }
                } else if (pointX > -save_left) {
                  // * to right
                  pointX = -save_left;
                  if (pointY < 0) {
                    pointY = 0;
                  } else if (pointY > 0) {
                    pointY = 0;
                  }
                } else if (pointY > 0) {
                  // * to bottom
                  pointY = 0;
                  if (pointX < save_left) {
                    pointX = save_left;
                  } else if (pointX > -save_left) {
                    pointX = -save_left;
                  }
                } else if (pointX < save_left) {
                  // * to left
                  pointX = save_left;
                  if (pointY < 0) {
                    pointY = 0;
                  } else if (pointY > 0) {
                    pointY = 0;
                  }
                }
                // * 2
              } else if (ratio < 0.75) {
                // * 1

                if (pointY < save_top) {
                  // * to top
                  pointY = save_top;
                  if (pointX < 0) {
                    pointX = 0;
                  } else if (pointX > 0) {
                    pointX = 0;
                  }
                } else if (pointX > 0) {
                  // * to right
                  pointX = 0;
                  if (pointY > -save_top) {
                    pointY = -save_top;
                  } else if (pointY < save_top) {
                    pointY = save_top;
                  }
                } else if (pointY > -save_top) {
                  // * to bottom
                  pointY = -save_top;
                  if (pointX < 0) {
                    pointX = 0;
                  } else if (pointX > 0) {
                    pointX = 0;
                  }
                } else if (pointX < 0) {
                  // * to left
                  pointX = 0;
                  if (pointY < save_top) {
                    pointY = save_top;
                  } else if (pointY > -save_top) {
                    pointY = -save_top;
                  }
                }

                // * 2
              }
            } else if (scale >= 1) {
              // * have zoom
              // console.log('mask_height = ', mask_height);
              // console.log('save_img_height = ', save_img_height);

              // console.log('scale * img_height < mask_height');

              if (ratio >= 0.75) {
                // * 1
                // console.log('pointY = ', pointY);
                // console.log('pointX = ', pointX);

                if (pointX > -save_left * scale) {
                  // * to right
                  pointX = -save_left * scale;
                  if (pointY < mask_height - save_img_height * scale) {
                    pointY = mask_height - save_img_height * scale;
                  } else if (pointY > 0) {
                    pointY = 0;
                  }
                } else if (pointY > 0) {
                  // * to bottom
                  pointY = 0;
                  if (
                    pointX <
                    -(save_img_width * scale - mask_width) - save_left * scale
                  ) {
                    // * mask_width) !!!-!!! save_left * scale ){  minus (!) because save_left is negative - so  minus and minus gives us plus - that's what we need - to add - we need plus - and we have it (this I had a problem - so now its ok - the problem is solved)
                    pointX =
                      -(save_img_width * scale - mask_width) -
                      save_left * scale;
                  } else if (pointX > -save_left * scale) {
                    pointX = -save_left * scale;
                  }
                } else if (
                  pointX <
                  -(save_img_width * scale - mask_width) - save_left * scale
                ) {
                  // * to left
                  pointX =
                    -(save_img_width * scale - mask_width) - save_left * scale;
                  if (pointY < mask_height - save_img_height * scale) {
                    pointY = mask_height - save_img_height * scale;
                  } else if (pointY > 0) {
                    pointY = 0;
                  }
                } else if (pointY < mask_height - save_img_height * scale) {
                  // * to top
                  pointY = mask_height - save_img_height * scale;
                  if (
                    pointX <
                    -(save_img_width * scale - mask_width) - save_left * scale
                  ) {
                    pointX =
                      -(save_img_width * scale - mask_width) -
                      save_left * scale;
                  } else if (pointX > -save_left * scale) {
                    pointX = -save_left * scale;
                  }
                }

                // * 2
              } else if (ratio < 0.75) {
                if (pointX > 0) {
                  // * to right
                  pointX = 0;
                  if (
                    pointY <
                    -(save_img_height * scale - mask_height) - save_top * scale
                  ) {
                    pointY =
                      -(save_img_height * scale - mask_height) -
                      save_top * scale;
                  } else if (pointY > -save_top * scale) {
                    pointY = -save_top * scale;
                  }
                } else if (pointY > -save_top * scale) {
                  // * to bottom
                  pointY = -save_top * scale;
                  if (pointX < mask_width - save_img_width * scale) {
                    // * mask_width) !!!-!!! save_left * scale ){  minus (!) because save_left is negative - so  minus and minus gives us plus - that's what we need - to add - we need plus - and we have it (this I had a problem - so now its ok - the problem is solved)
                    pointX = mask_width - save_img_width * scale;
                  } else if (pointX > -save_top * scale) {
                    pointX = -save_top * scale;
                  }
                } else if (pointX < mask_width - save_img_width * scale) {
                  // * to left
                  pointX = mask_width - save_img_width * scale;
                  if (
                    pointY <
                    -(save_img_height * scale - mask_height) - save_top * scale
                  ) {
                    pointY =
                      -(save_img_height * scale - mask_height) -
                      save_top * scale;
                  } else if (pointY > -save_top * scale) {
                    pointY = -save_top * scale;
                  }
                } else if (
                  pointY <
                  -(save_img_height * scale - mask_height) - save_top * scale
                ) {
                  // * to top
                  pointY =
                    -(save_img_height * scale - mask_height) - save_top * scale;
                  if (pointX < mask_width - save_img_width * scale) {
                    pointX = mask_width - save_img_width * scale;
                  } else if (pointX > -save_top * scale) {
                    pointX = -save_top * scale;
                  }
                }

                // * 2
              } // *    }else if(ratio < 0.75){
            } // *  } else if(scale >= 1) {

            //console.log('pointX = ', pointX);
            setTransform();
            // no_zoom = false;

            crear_canvas_and_pdf();
          };

          // img_wrp_blk.onwheelend = function (e) {
          //   alert('stop');
          // }

          let zoom_blk = document.getElementById("puzzf_zoom");
          // <script>

          function createWheelStopListener(element, callback, timeout) {
            var handle = null;
            var onScroll = function () {
              if (handle) {
                clearTimeout(handle);
              }
              handle = setTimeout(callback, timeout || 200); // default 200 ms
            };
            element.addEventListener("wheel", onScroll);
            return function () {
              element.removeEventListener("wheel", onScroll);
            };
          }

          // Example usage:

          createWheelStopListener(zoom_blk, function () {
            //console.log('createWheelStopListener');
            //               let get_overlay = document.getElementById('puzzf_overlay_dt');
            //               get_overlay.style.display = 'block';

            //                 // console.log('onwheelstop');
            //                 // console.log('pointX = ', pointX);
            //                 get_dt_img_crop(pointX, pointY, save_left, save_top, scale);
            // // console.log(('zoomStopListener'));

            //                 let x = window.jQuery;
            //                 jigazo_puzzf(x);           // ! puzzles on zoomEnd
            // // ? 2

            let get_generate_btn =
              document.getElementById("puzzf_generate_btn");
            get_generate_btn.style.pointerEvents = "auto";
            get_generate_btn.style.opacity = "1";

            let save_image_key_btn =
              document.getElementById("puzzf_get_code_btn");
            save_image_key_btn.style.display = "none";

            crear_canvas_and_pdf();
          });

          // // ? this function has offset of img when we are zooming (and no offset - all ok - when only drag)
          //           function get_dt_img_crop(pointX, pointY, save_left, save_top, scale){     // * cutting image to 4 canvases

          //             //const mask_aspect_ratio = 3/4;

          //             // console.log('pointX = ', pointX);
          //             // console.log('pointY = ', pointY);

          //             // console.log('save_left = ', save_left);
          //             // console.log('save_top = ', save_top);

          //             const image = new Image(),
          //             canvas_1 = document.getElementById('canvas_1');
          //             // backside_canvas = document.getElementById('puzzf_canvas_backside_blk');
          //             // canvas_2 = document.getElementById('canvas_2');
          //             // canvas_3 = document.getElementById('canvas_3');
          //             // canvas_4 = document.getElementById('canvas_4');

          //             ctx_1 = canvas_1.getContext('2d');
          //             ctx_1.clearRect(0, 0, canvas_1.width, canvas_1.height);

          //             // ctx_2 = backside_canvas.getContext('2d');
          //             // ctx_2.clearRect(0, 0, backside_canvas.width, backside_canvas.height);

          //             // let ratio_of_canvas = 0.75;

          //             // ctx_2 = canvas_2.getContext('2d');
          //             // ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);

          //             // ctx_3 = canvas_3.getContext('2d');
          //             // ctx_3.clearRect(0, 0, canvas_3.width, canvas_3.height);

          //             // ctx_4 = canvas_4.getContext('2d');
          //             // ctx_4.clearRect(0, 0, canvas_4.width, canvas_4.height);

          //             let img_wrp = document.getElementById('puzzf_zoom');
          //             let img_wrp_width = img_wrp.offsetWidth;
          //             let img_wrp_height = img_wrp.offsetHeight;

          //             let blk_and_canvas_ratio_height = img_wrp_height / canvas_1.height;  // * 2.1294642857142856
          //             // ! 2.135 - more accurate  value
          //             // console.log('blk_and_canvas_ratio_height = ', blk_and_canvas_ratio_height);
          //             blk_and_canvas_ratio_height = 2.135;

          //             let blk_and_canvas_ratio_width = img_wrp_width / canvas_1.width;  // * 2.125
          //             // ! 2.135  - more accurate value
          //             // console.log('blk_and_canvas_ratio_width = ', blk_and_canvas_ratio_width);
          //             blk_and_canvas_ratio_width = 2.135;

          //             let img_el_for_canvas = document.getElementById('puzzf_image');   // * for dragElement(img_el);

          //             // console.log('img_el_for_canvas = ', img_el_for_canvas);
          //             let img_src_for_canvas = img_el_for_canvas.getAttribute('src');
          //             let img_width = img_el_for_canvas.offsetWidth;
          //             let img_height = img_el_for_canvas.offsetHeight;
          //             // console.log('img_width = ', img_width);
          //             // console.log('img_height = ', img_height);
          //             let ratio = img_width / img_height;
          //             ratio = Number(ratio.toFixed(5));
          //             // console.log('ratio = ', ratio);

          //             // console.log(b.width);

          //             image.src = img_src_for_canvas;
          //             // image.addEventListener('load', () => {

          //             // * context.drawImage(img, x, y, swidth, sheight, sx, sy, width, height);
          //             // * Parameter Values:
          //             //  *   img: It indicates the image or video to draw on canvas.
          //             //  *  x: It indicates the x-coordinate where image has to be placed. ( -1000 =move img to right in x      +1000 = to left)
          //             //   *  y: It indicates the y-coordinate where image has to be placed.
          //             //   *  swidth: It is optional parameter and indicates the width of the clipped image.
          //             //   *  sheight: It is optional parameter and indicates the height of the clipped image.
          //             //  *   sx: It is optional parameter and indicates x-coordinate where to start the clipping.
          //             //  *   sy: It is optional parameter and indicates y-coordinate where to start the clipping.
          //             //  *   width: It is optional parameter and indicates the width of the image to use.
          //             //   *  height: It is optional parameter and indicates the height of the image to use.
          //             // ! OR THIS

          //             //let adjust_coord = 1; // ????? !!!!!!!!!!!       // * if 0.98  then adjust_coord = 16       if smaller_canvas_adj then adjust_coord = 22

          //            // let smaller_canvas_adj = 1; // *  for example the width of canvas is 100, and we need to have mo smaller canvas? so 100 * 0.7 = we have more smaller canvas
          //             // let x_canvas_1 = 0;
          //             // let y_canvas_1 = 0;

          //             // if(ratio >= 0.75){
          //             //   x_canvas_1 = 0;
          //             //   y_canvas_1 = ((canvas_4.width / ratio) * scale ) - ((canvas_4.width ) / ratio) * scale;;
          //             // }else{
          //             //   x_canvas_1 = 0;
          //             //   y_canvas_1 = canvas_4.height * scale - canvas_4.height  * scale;;
          //             // }

          // // ! old 1

          //     //         ctx_1.drawImage(image,  // * what element to use (video, or image or canvas)
          //     //         0, 0,
          //     //         image.width / smaller_canvas_adj, image.height / smaller_canvas_adj,   // * if image.width / 2  have stretched img in x

          //     //         (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) ) / blk_and_canvas_ratio_height)),   // * if  -100 / 4.3 replace with -100
          //     //                                                   // * then when move img to bottom on 10 pixels - it moves on much more than 10 pixels -
          //     // // *    -100 / 4.3, -100 / 4.3,
          //     //         ratio >= 0.75
          //     //           ? ((canvas_1.width) * scale)   // * we have landscape img and here is our width
          //     //           : ((canvas_1.height) * ratio) * scale,   // * we have portrait img and here is our calculated width
          //     //         ratio >= 0.75
          //     //           ? (((canvas_1.width) / ratio) * scale )   // * // * we have landscape img and here is our calculated height
          //     //           : canvas_1.height * scale);     // * we have portrait img and here is our height

          // // ! old 2

          // // console.log('save_left = ', save_left);
          // // ? new(practice) 1

          //             ctx_1.drawImage(image,
          //               0, 0,
          //               image.width, image.height,
          //               (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)),
          //               ratio >= 0.75
          //                 ? (canvas_1.height * ratio) * scale
          //                 : canvas_1.width * scale,
          //               ratio >= 0.75
          //                 ? canvas_1.height * scale
          //                 : (canvas_1.width / ratio) * scale);

          //                 // ctx_2.drawImage(image,
          //                 //   0, 0,
          //                 //   image.width, image.height,
          //                 //   (pointX + save_left * scale), (pointY + save_top * scale),
          //                 //   ratio >= 0.75
          //                 //     ? (backside_canvas.height * ratio) * scale
          //                 //     : backside_canvas.width * scale,
          //                 //   ratio >= 0.75
          //                 //     ? backside_canvas.height * scale
          //                 //     : (backside_canvas.width / ratio) * scale);

          //                 // ctx_2.drawImage(image,
          //                 //   0, 0,
          //                 //   image.width, image.height,
          //                 //   (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)),
          //                 //   ratio >= 0.75
          //                 //     ? (canvas_2.height * ratio) * scale
          //                 //     : canvas_2.width * scale,
          //                 //   ratio >= 0.75
          //                 //     ? canvas_2.height * scale
          //                 //     : (canvas_2.width / ratio) * scale);

          //                 //     ctx_3.drawImage(image,
          //                 //       0, 0,
          //                 //       image.width, image.height,
          //                 //       (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)),
          //                 //       ratio >= 0.75
          //                 //         ? (canvas_3.height * ratio) * scale
          //                 //         : canvas_3.width * scale,
          //                 //       ratio >= 0.75
          //                 //         ? canvas_3.height * scale
          //                 //         : (canvas_3.width / ratio) * scale);

          //                 //         ctx_4.drawImage(image,
          //                 //           0, 0,
          //                 //           image.width, image.height,
          //                 //           (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)),
          //                 //           ratio >= 0.75
          //                 //             ? (canvas_4.height * ratio) * scale
          //                 //             : canvas_4.width * scale,
          //                 //           ratio >= 0.75
          //                 //             ? canvas_4.height * scale
          //                 //             : (canvas_4.width / ratio) * scale);

          //               //   ratio >= 0.75
          //               //   ? ((canvas_1.width)  * scale) * blk_and_canvas_ratio_width     // ! mask_width * scale   // * we have landscape img and here is our width
          //               //   : (((canvas_1.height) * ratio) * scale) * blk_and_canvas_ratio_width ,   // * we have portrait img and here is our calculated width
          //               // ratio >= 0.75
          //               //   ? (((canvas_1.width) / ratio)  * scale ) * blk_and_canvas_ratio_height   // * // * we have landscape img and here is our calculated height
          //               //   : (canvas_1.height * scale) * blk_and_canvas_ratio_height);     // * we have portrait img and here is our height

          // // ? new 2

          //                 // let x_canvas_4 = 0;
          //                 // let y_canvas_4 = 0;

          //                 // if(ratio >= 0.75){
          //                 //   x_canvas_2 = (canvas_4.width * scale) - (canvas_4.width ) * scale;
          //                 //   y_canvas_2 = ((canvas_4.width / ratio) * scale ) - ((canvas_4.width ) / ratio) * scale;
          //                 // }else{
          //                 //   x_canvas_2 = (canvas_4.height * ratio) * scale - ((canvas_4.height ) * ratio) * scale;
          //                 //   y_canvas_2 = canvas_4.height * scale - canvas_4.height  * scale;
          //                 // }

          //              // console.log('canvas_2 = ', canvas_2);
          //                 // let x_canvas_2 = 0;
          //                 // let y_canvas_2 = 0;

          //                 // if(ratio >= 0.75){
          //                 //   x_canvas_2 = canvas_2.width - canvas_2.width ;
          //                 //   y_canvas_2 = 0;
          //                 // }else{
          //                 //   x_canvas_2 = canvas_2.height * 0.75 - canvas_2.height * 0.75 ;
          //                 //   y_canvas_2 = 0;
          //                 // }

          //                 // console.log('x_canvas_2 = ', x_canvas_2);
          //                // console.log('y_canvas_2 = ', y_canvas_2);

          //             // ctx_2.drawImage(image,

          //             //   -x_canvas_2 * adjust_coord, -y_canvas_2 * adjust_coord,    // *     -x_canvas_2 * adjust_coord is good when  (number adjust_coord is good)
          //             //   // ratio >= 0.75
          //             //   //   ? -(canvas_1.width * scale) - (canvas_1.width ) * scale
          //             //   //   : -(canvas_1.height * ratio) * scale - ((canvas_1.height ) * ratio) * scale,
          //             //   // ratio >= 0.75
          //             //   //   ? ((canvas_1.width / ratio) * scale ) - ((canvas_1.width ) / ratio) * scale
          //             //   //   : canvas_1.height * scale - canvas_1.height  * scale),

          //             //     image.width, image.height,
          //             //     (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) ) / blk_and_canvas_ratio_height)),
          //             //     ratio >= 0.75
          //             //       ? (canvas_2.height * ratio) * scale
          //             //       : canvas_2.width * scale,
          //             //     ratio >= 0.75
          //             //       ? canvas_2.height * scale
          //             //       : (canvas_2.width / ratio) * scale);

          //                 // let x_canvas_3 = 0;
          //                 // let y_canvas_3 = 0;

          //                 // if(ratio >= 0.75){
          //                 //   x_canvas_3 = 0;
          //                 //   y_canvas_3 = canvas_3.width / 0.75 - (canvas_3.width / 0.75) ;
          //                 // }else{
          //                 //   x_canvas_3 = 0;
          //                 //   y_canvas_3 = canvas_3.height - canvas_3.height ;
          //                 // }

          //                 // // console.log('x_canvas_3 = ', x_canvas_3);
          //                 // // console.log('y_canvas_3 = ', y_canvas_3);

          //                 // ctx_3.drawImage(image,
          //                 //   -x_canvas_3 * adjust_coord, -y_canvas_3 * adjust_coord,       // ! x, y coordinates in canvas to insert the img

          //                 //   image.width, image.height,
          //                 //   (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) ) / blk_and_canvas_ratio_height)),
          //                 //   ratio >= 0.75
          //                 //     ? (canvas_3.height * ratio) * scale
          //                 //     : canvas_3.width * scale,
          //                 //   ratio >= 0.75
          //                 //     ? canvas_3.height * scale
          //                 //     : (canvas_3.width / ratio) * scale);

          //                 // let x_canvas_4 = 0;
          //                 // let y_canvas_4 = 0;

          //                 // if(ratio >= 0.75){
          //                 //   x_canvas_4 = canvas_4.width - canvas_4.width ;
          //                 //   y_canvas_4 = canvas_3.width / 0.75 - (canvas_3.width / 0.75) ;
          //                 // }else{
          //                 //   x_canvas_4 = canvas_4.height * 0.75 - canvas_4.height * 0.75 ;
          //                 //   y_canvas_4 = canvas_3.height - canvas_3.height ;
          //                 // }
          //                 //   ctx_4.drawImage(image,
          //                 //     -x_canvas_4 * adjust_coord, -y_canvas_4 * adjust_coord,
          //                 //     image.width, image.height,
          //                 //     (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) ) / blk_and_canvas_ratio_height)),
          //                 //     ratio >= 0.75
          //                 //       ? (canvas_4.height * ratio) * scale
          //                 //       : canvas_4.width * scale,
          //                 //     ratio >= 0.75
          //                 //       ? canvas_4.height * scale
          //                 //       : (canvas_4.width / ratio) * scale);

          //                       // console.log('test');

          //             var url = canvas_1.toDataURL();
          //             //console.log('get_dt_img_crop_url = ', url);
          //             // base64result = url.split(',')[1];
          //             base64result = url;

          //             // var url_backside = backside_canvas.toDataURL();
          //             // console.log('get_dt_img_crop_url = ', url);
          //             // url.replace(/^data:image\/(png|jpg);base64,/, "");
          //             // url.replace("data:image/png;base64,", "");
          //             // data:image/png;base64,

          //             // base64resulturl = url.substr(url.indexOf(',') + 1);
          //             //console.log('get_dt_img_crop_base64result = ', base64result);

          //             if(document.getElementById('puzzf_cropped_img') !== null){
          //               let get_prev_img = document.getElementById('puzzf_cropped_img');
          //               get_prev_img.remove();
          //             }

          //             // if(document.getElementById('puzzf_cropped_backside_img') !== null){
          //             //   let get_prev_backside_img = document.getElementById('puzzf_cropped_backside_img');
          //             //   get_prev_backside_img.remove();
          //             // }

          //             var newImg = document.createElement("img"); // create img tag
          //             newImg.setAttribute('id', 'puzzf_cropped_img');
          //             newImg.style.width = canvas_1.width + 'px';
          //             newImg.style.height = canvas_1.height + 'px';
          //             newImg.style.position = 'absolute';
          //             newImg.style.right = '0';
          //             newImg.style.bottom = '0';
          //             newImg.style.outline = '1px solid grey';
          //             newImg.style.opacity = '0';
          //             newImg.style.zIndex = '-1';

          //             newImg.src = url;
          //             document.body.appendChild(newImg); // add to end of your document

          //             cropped_img = newImg;

          //             // var newImg_backside = document.createElement("img"); // create img tag
          //             // newImg_backside.setAttribute('id', 'puzzf_cropped_backside_img');
          //             // newImg_backside.style.width = backside_canvas.width + 'px';
          //             // newImg_backside.style.height = backside_canvas.height + 'px';
          //             // newImg_backside.style.position = 'absolute';
          //             // newImg_backside.style.right = '0';
          //             // newImg_backside.style.bottom = '0';
          //             // newImg_backside.style.outline = '1px solid grey';
          //             // newImg_backside.style.opacity = '0';
          //             // newImg_backside.style.zIndex = '-1';

          //             // newImg_backside.src = url_backside;
          //             // document.body.appendChild(newImg_backside); // add to end of your document

          //             // cropped_img_backside = newImg_backside;
          //             // console.log('test');

          //             // return newImg;

          //             // canvas_count += 1;
          //             // let x = window.jQuery;
          //             // jigazo_puzzf(x);

          //             // var url = canvas_2.toDataURL();
          //             // //console.log('url = ', url);

          //             // if(document.getElementById('puzzf_cropped_img_2') !== null){
          //             //   let get_prev_img = document.getElementById('puzzf_cropped_img_2');
          //             //   get_prev_img.remove();
          //             // }

          //             // var newImg_2 = document.createElement("img"); // create img tag
          //             // newImg_2.setAttribute('id', 'puzzf_cropped_img_2');
          //             // newImg_2.style.width = canvas_2.width + 'px';
          //             // newImg_2.style.height = canvas_2.height + 'px';
          //             // newImg_2.style.position = 'absolute';
          //             // newImg_2.style.right = '0';
          //             // newImg_2.style.top = '0';
          //             // newImg_2.style.outline = '1px solid grey';
          //             // newImg_2.style.opacity = '0';
          //             // newImg_2.style.zIndex = '-1';

          //             // newImg_2.src = url;
          //             // document.body.appendChild(newImg_2); // add to end of your document

          //             // cropped_img_2 = newImg_2;
          //             // // console.log('test');

          //             // // return newImg;

          //             // // canvas_count += 1;
          //             // // x = window.jQuery;
          //             // // jigazo_puzzf(x);

          //             // var url = canvas_3.toDataURL();
          //             // //console.log('url = ', url);

          //             // if(document.getElementById('puzzf_cropped_img_3') !== null){
          //             //   let get_prev_img = document.getElementById('puzzf_cropped_img_3');
          //             //   get_prev_img.remove();
          //             // }

          //             // var newImg_3 = document.createElement("img"); // create img tag
          //             // newImg_3.setAttribute('id', 'puzzf_cropped_img_3');
          //             // newImg_3.style.width = canvas_3.width + 'px';
          //             // newImg_3.style.height = canvas_3.height + 'px';
          //             // newImg_3.style.position = 'absolute';
          //             // newImg_3.style.left = '0';
          //             // newImg_3.style.top = '0';
          //             // newImg_3.style.outline = '1px solid grey';
          //             // newImg_3.style.opacity = '0';
          //             // newImg_3.style.zIndex = '-1';

          //             // newImg_3.src = url;
          //             // document.body.appendChild(newImg_3); // add to end of your document

          //             // cropped_img_3 = newImg_3;
          //             // // console.log('test');

          //             // // return newImg;
          //             // // canvas_count += 1;
          //             // // x = window.jQuery;
          //             // // jigazo_puzzf(x);

          //             // var url = canvas_4.toDataURL();
          //             // //console.log('url = ', url);

          //             // if(document.getElementById('puzzf_cropped_img_4') !== null){
          //             //   let get_prev_img = document.getElementById('puzzf_cropped_img_4');
          //             //   get_prev_img.remove();
          //             // }

          //             // var newImg_4 = document.createElement("img"); // create img tag
          //             // newImg_4.setAttribute('id', 'puzzf_cropped_img_4');
          //             // newImg_4.style.width = canvas_1.width + 'px';
          //             // newImg_4.style.height = canvas_1.height + 'px';
          //             // newImg_4.style.position = 'absolute';
          //             // newImg_4.style.left = '0';
          //             // newImg_4.style.bottom = '0';
          //             // newImg_4.style.outline = '1px solid grey';
          //             // newImg_4.style.opacity = '0';
          //             // newImg_4.style.zIndex = '-1';

          //             // newImg_4.src = url;
          //             // document.body.appendChild(newImg_4); // add to end of your document

          //             // cropped_img_4 = newImg_4;
          //             // // console.log('test');

          //             // // return newImg;
          //             // // canvas_count += 1;
          //             // // x = window.jQuery;
          //             // // jigazo_puzzf(x);

          //             // // canvas_count = 0;

          //           }
        } //  * function reset_img_and_get_puzzles() {
        // * reset_img_and_get_puzzles      end
      } // *       if(browser_width >= browser_height){
      // else{

      //     // img_el = document.getElementById('puzzf_image');
      //     our_image..style.webkitTouchCallout = 'none';
      //     our_image.style.webkitUserSelect = 'none';
      //     our_image.style.userSelect = 'none';
      //     our_image.setAttribute('ondragstart', 'return false;');
      // }

      // else if(browser_width < browser_height){

      // }
    }; // * img.onload = function() {
    // alert('-1'); // ?  alert('first_print'); // ? !!!!! no print in console.log
    img.src = reader.result; // ! is needed !!!      is the data URL because called with readAsDataURL
    // alert('0') // ?  alert('first_print'); // ? !!!!! no print in console.log
  }; // *  reader.onload = function() {

  //alert('first_print'); // ? !!!!! no print in console.log

  // ! HERE NOT WORKING ON IPAD 1
  //   img_element = document.getElementById('puzzf_image');

  // img_element.style.webkitTouchCallout = 'none';
  // img_element.style.webkitUserSelect = 'none';
  // img_element.style.userSelect = 'none';
  // img_element.setAttribute('ondragstart', 'return false;');
  // // todo 2
  // ! HERE NOT WORKING ON IPAD 2
  // reader.onerror = function (e) {
  //   alert("error " + e.target.error.code + " \n\niPhone iOS8 Permissions Error.");
  // }

  reader.onloadend = function () {
    if (browser_width < browser_height) {
      let img_parent = our_image.parentNode; // ! get pinch-zoom-container and delete it and our img which is inside
      // console.log('img_parent = ', img_parent);
      img_parent.remove();

      let parent_to_put_img = document.getElementById("puzzf_mask");

      let img_to_insert = document.createElement("img");
      img_to_insert.id = "puzzf_image";
      img_to_insert.style.height = "100%";

      // ! HERE NOT WORKING ON IPAD 1
      // img_element.style.webkitTouchCallout = 'none';
      // img_element.style.webkitUserSelect = 'none';
      // img_element.style.userSelect = 'none';
      // img_element.setAttribute('ondragstart', 'return false;');
      // ! HERE NOT WORKING ON IPAD 2
      img_to_insert.setAttribute("alt", "");
      img_to_insert.setAttribute("src", "");
      // img_to_insert.style.border = '10px solid red';

      parent_to_put_img.appendChild(img_to_insert);

      img_el = document.getElementById("puzzf_image"); // * for dragElement(img_el);

      //console.log("img_el = ", img_el);
      new PinchZoom(img_el, {}); // ! acrivate pinch zoom(also double tap zoom) and dragging AGAIN!!!(for relocating the img - initial drag(x,y) and zoomScale values) - so we have again our pinch-zoom-container and only ONE(!) because we deleted previous(if we have two of them - we would have problems)

      img_el.setAttribute("src", reader.result);

      // ? why we have no alert on ipad(safari + even chrome and in firefox) - but have alert on android(for example chrome)?
      // ? ????????????????????????????????????????????????????????????????????????????????????????? 1
      // ! HERE NOT WORKING ON IPAD 1
      // setTimeout(function (){
      //alert('test777');  // ! NO CONSOLE.LOG HERE on ipad - but have console.log in firefox phone design
      img_el = document.getElementById("puzzf_image");
      img_el.style.webkitTouchCallout = "none";
      img_el.style.webkitUserSelect = "none";
      img_el.style.userSelect = "none";
      img_el.setAttribute("ondragstart", "return false;");

      // }, 3000);

      // ! HERE NOT WORKING ON IPAD 2
      // ? ????????????????????????????????????????????????????????????????????????????????????????? 2

      // todo 19.05.23 1

      if (document.getElementById("puzzf_pinch_zoom_icon_wrp") !== null) {
        document.getElementById("puzzf_pinch_zoom_icon_wrp").remove();
      }

      let pinch_zoom_icon = document.createElement("div");
      pinch_zoom_icon.id = "puzzf_pinch_zoom_icon_wrp";
      pinch_zoom_icon.style.position = "absolute";
      pinch_zoom_icon.style.display = "block";
      pinch_zoom_icon.style.width = "50%";
      let icon_width = pinch_zoom_icon.offsetWidth;
      pinch_zoom_icon.style.height = icon_width + "px";
      pinch_zoom_icon.style.left = "25%";
      pinch_zoom_icon.style.top = "50%";
      pinch_zoom_icon.style.zIndex = "1000";
      pinch_zoom_icon.style.opacity = "1";
      pinch_zoom_icon.style.transition = "all 1s ease-out";
      pinch_zoom_icon.style.backgroundColor = "white";
      pinch_zoom_icon.style.pointerEvents = "none";
      //pinch_zoom_icon.style.outline = '1px solid #E3E3E3';
      // ! disable hiding on touchstart 1
      // pinch_zoom_icon.setAttribute('ontouchend', 'move_pinch_zoom_icon(event)');
      // ! disable hiding on touchstart 2
      pinch_zoom_icon.innerHTML =
        '<img id="puzzf_pinch_zoom_icon" width="100%" style="" src="images/puzzle_face_icon_zoom_hand_v1.png" alt="pinch_zoom_icon">';

      // todo 19.05.23 2

      let mask_div = document.getElementById("puzzf_mask");
      mask_div.append(pinch_zoom_icon);
      //console.log('appending this = ', pinch_zoom_icon);

      //alert('third_print');// ? !!!!!!! no print in console.log
    } else {
      our_image.setAttribute("src", reader.result);
    }

    // if(browser_width < browser_height){
    //   img_el = document.getElementById('puzzf_image');   // * for dragElement(img_el);
    //   //console.log("img_el = ", img_el);
    //   new PinchZoom(img_el, {});     // * acrivate pinch zoom(also double tap zoom) and dragging
    // }

    if (browser_width >= browser_height) {
      // let puzzf_image = document.getElementById('puzzf_image');
      // puzzf_image.style.pointerEvents = 'none';
      // unget_code();
    }
  };

  if (file) {
    reader.readAsDataURL(file); // * have our image
    //alert('second_print');
    // ! HERE NOT WORKING ON IPAD 1
    // img_el.style.webkitTouchCallout = 'none';
    // img_el.style.webkitUserSelect = 'none';
    // img_el.style.userSelect = 'none';
    // img_el.setAttribute('ondragstart', 'return false;');
    // ! HERE NOT WORKING ON IPAD 2
  } else {
  }

  // ! *********************************** get puzzles on img change                 start

  if (browser_width >= browser_height) {
    function get_puzzles_on_change_img() {
      // // * this function (get_dt_img_crop() ) is defined here second time - may be it's possible make definition in only one place...
      //       // ? this function has offset of img when we are zooming (and no offset - all ok - when only drag)
      //       function get_dt_img_crop(pointX, pointY, save_left, save_top, scale){     // * cutting image to 4 canvases

      //       const image = new Image(),
      //       canvas_1 = document.getElementById('canvas_1');
      //       // canvas_2 = document.getElementById('canvas_2');
      //       // canvas_3 = document.getElementById('canvas_3');
      //       // canvas_4 = document.getElementById('canvas_4');

      //       ctx_1 = canvas_1.getContext('2d');
      //       ctx_1.clearRect(0, 0, canvas_1.width, canvas_1.height);

      //       // let ratio_of_canvas = 0.75;

      //       // ctx_2 = canvas_2.getContext('2d');
      //       // ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);

      //       // ctx_3 = canvas_3.getContext('2d');
      //       // ctx_3.clearRect(0, 0, canvas_3.width, canvas_3.height);

      //       // ctx_4 = canvas_4.getContext('2d');
      //       // ctx_4.clearRect(0, 0, canvas_4.width, canvas_4.height);

      //       let img_wrp = document.getElementById('puzzf_zoom');
      //       let img_wrp_width = img_wrp.offsetWidth;
      //       let img_wrp_height = img_wrp.offsetHeight;

      //       let blk_and_canvas_ratio_height = img_wrp_height / canvas_1.height;  // * 2.1294642857142856
      //       // ! 2.135 - more accurate  value
      //       // console.log('blk_and_canvas_ratio_height = ', blk_and_canvas_ratio_height);
      //       blk_and_canvas_ratio_height = 2.135;

      //       let blk_and_canvas_ratio_width = img_wrp_width / canvas_1.width;  // * 2.125
      //       // ! 2.135  - more accurate value
      //       // console.log('blk_and_canvas_ratio_width = ', blk_and_canvas_ratio_width);
      //       blk_and_canvas_ratio_width = 2.135;

      //       let img_el_for_canvas = document.getElementById('puzzf_image');   // * for dragElement(img_el);

      //       // console.log('img_el_for_canvas = ', img_el_for_canvas);
      //       let img_src_for_canvas = img_el_for_canvas.getAttribute('src');
      //       let img_width = img_el_for_canvas.offsetWidth;
      //       let img_height = img_el_for_canvas.offsetHeight;
      //       // console.log('img_width = ', img_width);
      //       // console.log('img_height = ', img_height);
      //       let ratio = img_width / img_height;
      //       ratio = Number(ratio.toFixed(5));
      //       // console.log('ratio = ', ratio);

      //       // console.log(b.width);

      //       image.src = img_src_for_canvas;
      //       // image.addEventListener('load', () => {

      //       // * context.drawImage(img, x, y, swidth, sheight, sx, sy, width, height);
      //       // * Parameter Values:
      //       //  *   img: It indicates the image or video to draw on canvas.
      //       //  *  x: It indicates the x-coordinate where image has to be placed. ( -1000 =move img to right in x      +1000 = to left)
      //       //   *  y: It indicates the y-coordinate where image has to be placed.
      //       //   *  swidth: It is optional parameter and indicates the width of the clipped image.
      //       //   *  sheight: It is optional parameter and indicates the height of the clipped image.
      //       //  *   sx: It is optional parameter and indicates x-coordinate where to start the clipping.
      //       //  *   sy: It is optional parameter and indicates y-coordinate where to start the clipping.
      //       //  *   width: It is optional parameter and indicates the width of the image to use.
      //       //   *  height: It is optional parameter and indicates the height of the image to use.

      //       ctx_1.drawImage(image,
      //         0, 0,
      //         image.width, image.height,
      //         (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)),
      //         ratio >= 0.75
      //           ? (canvas_1.height * ratio) * scale
      //           : canvas_1.width * scale,
      //         ratio >= 0.75
      //           ? canvas_1.height * scale
      //           : (canvas_1.width / ratio) * scale);

      //           // ctx_2.drawImage(image,
      //           //   0, 0,
      //           //   image.width, image.height,
      //           //   (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)),
      //           //   ratio >= 0.75
      //           //     ? (canvas_2.height * ratio) * scale
      //           //     : canvas_2.width * scale,
      //           //   ratio >= 0.75
      //           //     ? canvas_2.height * scale
      //           //     : (canvas_2.width / ratio) * scale);

      //           //     ctx_3.drawImage(image,
      //           //       0, 0,
      //           //       image.width, image.height,
      //           //       (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)),
      //           //       ratio >= 0.75
      //           //         ? (canvas_3.height * ratio) * scale
      //           //         : canvas_3.width * scale,
      //           //       ratio >= 0.75
      //           //         ? canvas_3.height * scale
      //           //         : (canvas_3.width / ratio) * scale);

      //           //         ctx_4.drawImage(image,
      //           //           0, 0,
      //           //           image.width, image.height,
      //           //           (((pointX + save_left * scale) ) / blk_and_canvas_ratio_width), ((((pointY + save_top * scale) )  / blk_and_canvas_ratio_height)),
      //           //           ratio >= 0.75
      //           //             ? (canvas_4.height * ratio) * scale
      //           //             : canvas_4.width * scale,
      //           //           ratio >= 0.75
      //           //             ? canvas_4.height * scale
      //           //             : (canvas_4.width / ratio) * scale);

      //       var url = canvas_1.toDataURL();
      //       // console.log('get_puzzles_on_change_img_url = ', url);
      //       // base64result = url.split(',')[1];
      //       base64result = url;
      //       //console.log('desktop_puzzleface_script_file_base64result = ', base64result);

      //       if(document.getElementById('puzzf_cropped_img') !== null){
      //         let get_prev_img = document.getElementById('puzzf_cropped_img');
      //         get_prev_img.remove();
      //       }

      //       var newImg = document.createElement("img"); // create img tag
      //       newImg.setAttribute('id', 'puzzf_cropped_img');
      //       newImg.style.width = canvas_1.width + 'px';
      //       newImg.style.height = canvas_1.height + 'px';
      //       newImg.style.position = 'absolute';
      //       newImg.style.right = '0';
      //       newImg.style.bottom = '0';
      //       newImg.style.outline = '1px solid grey';
      //       newImg.style.opacity = '0';
      //       newImg.style.zIndex = '-1';

      //       newImg.src = url;
      //       document.body.appendChild(newImg); // add to end of your document

      //       cropped_img = newImg;

      //       // var url = canvas_2.toDataURL();
      //       // //console.log('url = ', url);

      //       // if(document.getElementById('puzzf_cropped_img_2') !== null){
      //       //   let get_prev_img = document.getElementById('puzzf_cropped_img_2');
      //       //   get_prev_img.remove();
      //       // }

      //       // var newImg_2 = document.createElement("img"); // create img tag
      //       // newImg_2.setAttribute('id', 'puzzf_cropped_img_2');
      //       // newImg_2.style.width = canvas_2.width + 'px';
      //       // newImg_2.style.height = canvas_2.height + 'px';
      //       // newImg_2.style.position = 'absolute';
      //       // newImg_2.style.right = '0';
      //       // newImg_2.style.top = '0';
      //       // newImg_2.style.outline = '1px solid grey';
      //       // newImg_2.style.opacity = '0';
      //       // newImg_2.style.zIndex = '-1';

      //       // newImg_2.src = url;
      //       // document.body.appendChild(newImg_2); // add to end of your document

      //       // cropped_img_2 = newImg_2;

      //       // var url = canvas_3.toDataURL();
      //       // //console.log('url = ', url);

      //       // if(document.getElementById('puzzf_cropped_img_3') !== null){
      //       //   let get_prev_img = document.getElementById('puzzf_cropped_img_3');
      //       //   get_prev_img.remove();
      //       // }

      //       // var newImg_3 = document.createElement("img"); // create img tag
      //       // newImg_3.setAttribute('id', 'puzzf_cropped_img_3');
      //       // newImg_3.style.width = canvas_3.width + 'px';
      //       // newImg_3.style.height = canvas_3.height + 'px';
      //       // newImg_3.style.position = 'absolute';
      //       // newImg_3.style.left = '0';
      //       // newImg_3.style.top = '0';
      //       // newImg_3.style.outline = '1px solid grey';
      //       // newImg_3.style.opacity = '0';
      //       // newImg_3.style.zIndex = '-1';

      //       // newImg_3.src = url;
      //       // document.body.appendChild(newImg_3); // add to end of your document

      //       // cropped_img_3 = newImg_3;

      //       // var url = canvas_4.toDataURL();
      //       // //console.log('url = ', url);

      //       // if(document.getElementById('puzzf_cropped_img_4') !== null){
      //       //   let get_prev_img = document.getElementById('puzzf_cropped_img_4');
      //       //   get_prev_img.remove();
      //       // }

      //       // var newImg_4 = document.createElement("img"); // create img tag
      //       // newImg_4.setAttribute('id', 'puzzf_cropped_img_4');
      //       // newImg_4.style.width = canvas_1.width + 'px';
      //       // newImg_4.style.height = canvas_1.height + 'px';
      //       // newImg_4.style.position = 'absolute';
      //       // newImg_4.style.left = '0';
      //       // newImg_4.style.bottom = '0';
      //       // newImg_4.style.outline = '1px solid grey';
      //       // newImg_4.style.opacity = '0';
      //       // newImg_4.style.zIndex = '-1';

      //       // newImg_4.src = url;
      //       // document.body.appendChild(newImg_4); // add to end of your document

      //       // cropped_img_4 = newImg_4;

      //       } // * end of        function get_dt_img_crop(pointX, pointY, save_left, save_top, scale){

      // get_dt_img_crop(pointX, pointY, save_left, save_top, scale);

      // let x = window.jQuery;
      // jigazo_puzzf(x);           // ! puzzles on zoomEnd

      // generate_puzzles();

      crear_canvas_and_pdf();
    } // *  end of:  function get_puzzles_on_change_img(){

    // * PHONE TO BOTTOM

    // * phone
  } else {
    // alert('phone');
    // this.setContainerY(this.container.parentElement.offsetHeight);

    // console.log('a');
    function get_puzzles_on_change_img() {
      // alert('calling_get_puzzles_on_change_img_for_phone');

      // todo 20.05.23 1
      // let pinch_zoom_icon = document.getElementById('puzzf_pinch_zoom_icon_wrp');
      // // console.log('pinch_zoom_icon = ', pinch_zoom_icon);
      // pinch_zoom_icon.style.display = 'none';

      have_once = false;

      let text_below_the_mask = document.getElementById("puzzf_left_text");
      //text_below_the_mask.innerHTML = 'Pinch out to make the face larger until it fills the frame Center image within the frame';
      text_below_the_mask.innerHTML = `<p class="puzzf_left_text">
   <span class="puzzf_left_text--bold">TIP:&#32;</span>Before you save the key, pinch out to make the face fill the
   whole frame.
 </p>`;

      let text_below_the_canvas = document.getElementById("puzzf_right_text");
      text_below_the_canvas.style.display = "none";

      // todo 20.05.23 2

      const image = new Image();
      canvas_1 = document.getElementById("canvas_1");
      // backside_canvas = document.getElementById('puzzf_canvas_backside_blk');
      // canvas_2 = document.getElementById('canvas_2');
      // canvas_3 = document.getElementById('canvas_3');
      // canvas_4 = document.getElementById('canvas_4');

      let mask_el = document.querySelector(".pinch-zoom-container");
      let mask_width = mask_el.offsetWidth;
      let mask_height = mask_el.offsetHeight;

      const mask_canvas_diff_width = mask_width / canvas_1.width;
      const mask_canvas_diff_height = mask_height / canvas_1.height;
      // console.log('mask_canvas_diff_width = ', mask_canvas_diff_width);
      // console.log('mask_canvas_diff_height = ', mask_canvas_diff_height);

      ctx_1 = canvas_1.getContext("2d", { willReadFrequently: true });
      ctx_1.clearRect(0, 0, canvas_1.width, canvas_1.height);

      // ctx_2 = backside_canvas.getContext('2d', {willReadFrequently: true});
      // ctx_2.clearRect(0, 0, backside_canvas.width, backside_canvas.height);

      // canvas_2 = document.getElementById('canvas_2');
      // canvas_3 = document.getElementById('canvas_3');
      // canvas_4 = document.getElementById('canvas_4');

      // ctx_2 = canvas_2.getContext('2d', {willReadFrequently: true});
      // ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);

      // ctx_3 = canvas_3.getContext('2d', {willReadFrequently: true});
      // ctx_3.clearRect(0, 0, canvas_3.width, canvas_3.height);

      // ctx_4 = canvas_4.getContext('2d', {willReadFrequently: true});
      // ctx_4.clearRect(0, 0, canvas_4.width, canvas_4.height);

      let img_el_for_canvas = document.getElementById("puzzf_image"); // * for dragElement(img_el);
      // console.log('img_el_for_canvas = ', img_el_for_canvas);
      let img_src_for_canvas = img_el_for_canvas.getAttribute("src");
      let img_width = img_el_for_canvas.offsetWidth;
      let img_height = img_el_for_canvas.offsetHeight;
      // console.log('***img_width = ', img_width);
      // console.log('***img_height = ', img_height);

      let ratio = img_width / img_height;
      // console.log('ratio = ', ratio);

      if (ratio < 1) {
        // * adjustment for portrait img
        img_width = mask_width;
        img_height = img_width / ratio;
      }

      image.src = img_src_for_canvas;
      // image.addEventListener('load', () => {

      // console.log('canvas_1.toDataURL() = ', canvas_1.toDataURL());

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
      // console.log('img_width = ', img_width);
      // console.log('img_height = ', img_height);

      // console.log('mask_width = ', mask_width);
      // console.log('mask_height = ', mask_height);

      ctx_1.drawImage(
        image,
        // *  1)
        0,
        0, // * crop all(!) source img
        image.width,
        image.height, // * crop all(!) source img   // ! every time we get the whole img - here we do not need any zoomFactor for example and so on...
        // * here we just GOT our full img -  we dont need any ajustment for now
        // * 2)
        // * from this lines we INSERT img in our small canvas
        // * because our canvas is much more smaller - so we have to make our 100(y) smaller by division (4.2 for example -> in about 4 times smaller canvas we have)
        -((img_width - mask_width) / 2) / mask_canvas_diff_width,
        -((img_height - mask_height) / 2) / mask_canvas_diff_height,
        // * insert our img in canvas with offset (left-top corner)
        // * -100 moves img to left under(overflow hidden) the mask(landscape example)
        // * we dont need zoomFactor here - bacause it will be included with sides of canvas(bottom lines)
        // * it's enough to add  * zoomFactor only for sides of canvas - thats all

        // * 3)
        ratio >= 0.75
          ? // * canvas_1.height * ratio   -> is (small)width of img(landscape example) - small img - that we inserting in canvas(not big img)
            // * and     is needed because our img can be zoomed in mask - and also in canvas
            // * as we start from canvas_1.height (small CANVAS side - so we do not need division by mask_canvas_diff_width)
            canvas_1.height * ratio // * zoomFactor is enough for changing we do not need anything else
          : canvas_1.width,
        ratio >= 0.75 ? canvas_1.height : canvas_1.width / ratio
      );

      // ctx_2.drawImage(image,
      //         0, 0,
      //         image.width , image.height,
      //         -((img_width - mask_width) / 2), -((img_height - mask_height) / 2),

      //         ratio >= 0.75
      //           ? (backside_canvas.height * ratio)
      //           : backside_canvas.width ,
      //         ratio >= 0.75
      //           ? backside_canvas.height
      //           : (backside_canvas.width / ratio) );

      // ctx_2.drawImage(image,
      //   0, 0,
      //   image.width , image.height,

      //   -((img_width - mask_width) / 2) / mask_canvas_diff_width, -((img_height - mask_height) / 2) / mask_canvas_diff_height,
      //   ratio >= 0.75
      //     ? (canvas_2.height * ratio)
      //     : canvas_2.width ,
      //   ratio >= 0.75
      //     ? canvas_2.height
      //     : (canvas_2.width / ratio) );

      //   ctx_3.drawImage(image,
      //     0, 0,
      //     image.width , image.height,

      //     -((img_width - mask_width) / 2) / mask_canvas_diff_width, -((img_height - mask_height) / 2) / mask_canvas_diff_height,
      //     ratio >= 0.75
      //       ? (canvas_3.height * ratio)
      //       : canvas_3.width ,
      //     ratio >= 0.75
      //       ? canvas_3.height
      //       : (canvas_3.width / ratio) );

      //   ctx_4.drawImage(image,
      //     0, 0,
      //     image.width , image.height,

      //     -((img_width - mask_width) / 2) / mask_canvas_diff_width, -((img_height - mask_height) / 2) / mask_canvas_diff_height,
      //     ratio >= 0.75
      //       ? (canvas_4.height * ratio)
      //       : canvas_4.width ,
      //     ratio >= 0.75
      //       ? canvas_4.height
      //       : (canvas_4.width / ratio) );

      if (
        img_el_for_canvas.getAttribute("src") !==
        "images/upload_image_line+text_grey_v1.svg"
      ) {
        let url = canvas_1.toDataURL(); // ??????????? HERE !!!!!!!!!!!!!!!!! if we delete this line (and also this:   newImg.src = url;  --> we have no problem - we see our created img in left-top corner)

        // base64result = url.split(',')[1];
        base64result = url;
        //console.log('mobile_puzzleface_script_file_base64result = ', base64result);

        // ! our alert is not visible(on phone device)    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // let url_backside = backside_canvas.toDataURL();
        if (document.getElementById("puzzf_cropped_img") !== null) {
          // && document.getElementById("puzzf_cropped_img_2") !== null
          // && document.getElementById("puzzf_cropped_img_3") !== null
          // && document.getElementById("puzzf_cropped_img_4") !== null)

          let delete_old_img = document.getElementById("puzzf_cropped_img");
          delete_old_img.remove();

          // let delete_old_img_2 = document.getElementById("puzzf_cropped_img_2");
          // delete_old_img_2.remove();

          // let delete_old_img_3 = document.getElementById("puzzf_cropped_img_3");
          // delete_old_img_3.remove();

          // let delete_old_img_4 = document.getElementById("puzzf_cropped_img_4");
          // delete_old_img_4.remove();
        }

        // if(document.getElementById('puzzf_cropped_backside_img') !== null){
        //   let get_prev_backside_img = document.getElementById('puzzf_cropped_backside_img');
        //   get_prev_backside_img.remove();
        // }

        // var delete_old_img = document.getElementById("puzzf_cropped_img"); // create img tag
        let newImg = document.createElement("img"); // create img tag

        newImg.setAttribute("id", "puzzf_cropped_img");
        newImg.style.width = canvas_1.width + "px";
        newImg.style.height = canvas_1.height + "px";
        newImg.style.position = "absolute";
        newImg.style.left = "0";
        newImg.style.top = -canvas_1.height + "px";
        newImg.style.outline = "1px solid grey";
        newImg.style.zIndex = "10000";
        newImg.style.opacity = "0";

        newImg.src = url;

        document.body.appendChild(newImg); // add to end of your document
        // var get_new_blk = document.getElementById('puzzf_cropped_img');
        // console.log('get_new_blk.src = ', get_new_blk);
        cropped_img = newImg;
        // console.log('after cropped_img = ', cropped_img);

        // var newImg_backside = document.createElement("img"); // create img tag
        // newImg_backside.setAttribute('id', 'puzzf_cropped_backside_img');
        // newImg_backside.style.width = backside_canvas.width + 'px';
        // newImg_backside.style.height = backside_canvas.height + 'px';
        // newImg_backside.style.position = 'absolute';
        // newImg_backside.style.right = '0';
        // newImg_backside.style.bottom = '0';
        // newImg_backside.style.outline = '1px solid grey';
        // newImg_backside.style.opacity = '0';
        // newImg_backside.style.zIndex = '-1';

        // newImg_backside.src = url_backside;
        // document.body.appendChild(newImg_backside); // add to end of your document

        // cropped_img_backside = newImg_backside;

        //   // var delete_old_img = document.getElementById("puzzf_cropped_img"); // create img tag
        //   let newImg_2 = document.createElement("img"); // create img tag

        //   newImg_2.setAttribute('id', 'puzzf_cropped_img_2');
        //   newImg_2.style.width = canvas_2.width + 'px';
        //   newImg_2.style.height = canvas_2.height + 'px';
        //   newImg_2.style.position = 'absolute';
        //   newImg_2.style.left = canvas_2.width + 'px';
        //   newImg_2.style.top = -canvas_2.height + 'px';
        //   newImg_2.style.outline = '1px solid grey';
        //   newImg_2.style.zIndex = '10000';
        //   newImg_2.style.opacity = '0';

        // newImg_2.src = url;

        // document.body.appendChild(newImg_2); // add to end of your document
        // // var get_new_blk = document.getElementById('puzzf_cropped_img');
        // // console.log('get_new_blk.src = ', get_new_blk);
        // cropped_img_2 = newImg_2;
        // // console.log('after cropped_img = ', cropped_img);

        // var delete_old_img = document.getElementById("puzzf_cropped_img"); // create img tag
        //   let newImg_3 = document.createElement("img"); // create img tag

        //   newImg_3.setAttribute('id', 'puzzf_cropped_img_3');
        //   newImg_3.style.width = canvas_3.width + 'px';
        //   newImg_3.style.height = canvas_3.height + 'px';
        //   newImg_3.style.position = 'absolute';
        //   newImg_3.style.left = canvas_3.width * 2 + 'px';
        //   newImg_3.style.top = -canvas_3.height + 'px';
        //   newImg_3.style.outline = '1px solid grey';
        //   newImg_3.style.zIndex = '10000';
        //   newImg_3.style.opacity = '0';

        // newImg_3.src = url;

        // document.body.appendChild(newImg_3); // add to end of your document
        // // var get_new_blk = document.getElementById('puzzf_cropped_img');
        // // console.log('get_new_blk.src = ', get_new_blk);
        // cropped_img_3 = newImg_3;
        // // console.log('after cropped_img = ', cropped_img);

        //   // var delete_old_img = document.getElementById("puzzf_cropped_img"); // create img tag
        //   let newImg_4 = document.createElement("img"); // create img tag

        //   newImg_4.setAttribute('id', 'puzzf_cropped_img_4');
        //   newImg_4.style.width = canvas_4.width + 'px';
        //   newImg_4.style.height = canvas_4.height + 'px';
        //   newImg_4.style.position = 'absolute';
        //   newImg_4.style.left = canvas_4.width * 3 + 'px';
        //   newImg_4.style.top = -canvas_4.height + 'px';
        //   newImg_4.style.outline = '1px solid grey';
        //   newImg_4.style.zIndex = '10000';
        //   newImg_4.style.opacity = '0';

        // newImg_4.src = url;

        // document.body.appendChild(newImg_4); // add to end of your document
        // // var get_new_blk = document.getElementById('puzzf_cropped_img');
        // // console.log('get_new_blk.src = ', get_new_blk);
        // cropped_img_4 = newImg_4;
        // // console.log('after cropped_img = ', cropped_img);

        let x = window.jQuery;
        jigazo_puzzf(x);
      } // * if(img_el_for_canvas.getAttribute('src') !== 'images/upload_image_line+text_grey_v1.svg'){
    } // * end of: function get_puzzles_on_change_img(){
  } // *  (second case -> else)  for phone

  // console.log('timeout');

  setTimeout(get_puzzles_on_change_img, 500); // * if timeout 0 - then Uncaught ReferenceError: pointX is not defined 1998line   - so our img is not loaded yet and we call function in which we need img date
  // ! *********************************** get puzzles on img change                 end
  // get_puzzles_on_change_img();
} // * function readURL(){           call this  readURL() and then this  setTimeout(get_puzzles_on_change_img, 500);
// ? comment back 2

// ! *******
// * puzzf_right_blk_buttons_wrp

// ! commented (temporarily) 1

// function get_code(event) {
//   // alert('test');
//   const el = event.target;
//   //console.log('el = ', el);
//   el.style.top = '-'+browser_height * 0.3+'px';
//   el.style.opacity = '0';

//   const get_btns_set = document.getElementById('puzzf_right_blk_buttons_wrp');
//   // get_btns_set.style.display = 'block';
//   get_btns_set.style.top = '0px';
//   get_btns_set.style.opacity = '1';
//   // get_btns_set.style.display = 'flex';
//   // get_btns_set.style.justifyContent = 'center';
//   // get_btns_set.style.alignItems = 'center';

// }

// ! commented (temporarily) 2 (new function is to bottom)

// * new get_code

// function get_code(event) {

// }

// function unget_code(){
//   const get_get_code_btn = document.getElementById('puzzf_get_code_btn');
//   get_get_code_btn.style.bottom = '-'+browser_height * 0.1165 +'px';

//   get_get_code_btn.style.opacity = '1';

//   const get_btns_set = document.getElementById('puzzf_right_blk_buttons_wrp');
//   get_btns_set.style.top = '-'+browser_height * 0.5+'px';
//   get_btns_set.style.opacity = '0';

//   const get_input = document.getElementById('puzzf_send_to_email_input');
//   get_input.value = '';
// }

// function canvas_change(event){
//   // alert('changing');
//   event.stopPropagation();
//   const target = event.target;
//   const target_id_all_str = target.id;
//   //console.log(target_id_str);
//   const target_id_str = target_id_all_str.slice(7);
//   //console.log(target_id_str);

//   const border = document.getElementById('puzzf_border_animation_block');

//   if(target_id_str === '1'){
//     border.style.left = browser_width * 0.0385 + 'px';
//     selected_cavas = '1'
//     // console.log('set_to_1');
//     //border.style.transform = 'scale(1.1)';
//   }else if(target_id_str === '2'){
//     border.style.left = browser_width * 0.269 + 'px';
//     selected_cavas = '2';
//     // console.log('set_to_2');
//   }else if(target_id_str === '3'){
//     border.style.left = browser_width * 0.5 + 'px';
//     selected_cavas = '3';
//     // console.log('set_to_3');
//   }else if(target_id_str === '4'){
//     border.style.left = browser_width * 0.73  + 'px';
//     selected_cavas = '4';
//     // console.log('set_to_4');
//   }

//   // for(let i=1; i < 5; ++i){
//   //   const get_canvas = document.getElementById('canvas_'+i);
//   //   get_canvas.style.outline = 'none';    // ! delete the border
//   // }

//   // target.style.outline = (browser_width * 0.012) + 'px solid #FA9500';
// }

// let last_clicked_canvas = '1';

// function canvas_dt_change(event){
//   event.stopPropagation();
//   const target = event.target;
//   const target_id_all_str = target.id;
//   //console.log(target_id_str);
//   const target_id_str = target_id_all_str.slice(7);
//   //console.log(target_id_str);

//   const border = document.getElementById('puzzf_border_animation_block');

//   // * transform: translate(50px,100px);

//   // if(target_id_str === '1' && last_clicked_canvas === '2'){
//   //   border.style.transform = 'translate('+(browser_height * 0)+'px,0px)';
//   //   last_clicked_canvas = '1'
//   //   //border.style.transform = 'scale(1.1)';

// // * last_clicked_canvas === '2'
//   if(target_id_str === '1' && last_clicked_canvas === '2'){                          // * ready
//     border.style.transform = 'translate('+(browser_height * 0)+'px,'+(browser_height * 0.0001)+'px)';
//     last_clicked_canvas = '1';
//     selected_cavas = '1'
//     // console.log('set_to_1');

//   }else if(target_id_str === '3' && last_clicked_canvas === '2'){
//     border.style.transform = 'translate('+(browser_height * 0)+'px,'+(browser_height * 0.3655)+'px)';
//     last_clicked_canvas = '3';
//     selected_cavas = '3'
//     // console.log('set_to_3');
//   }else if(target_id_str === '4' && last_clicked_canvas === '2'){
//     border.style.transform = 'translate('+(browser_height * 0.2855)+'px,'+(browser_height * 0.3655)+'px)';
//     last_clicked_canvas = '4';
//     selected_cavas = '4'
//     // console.log('set_to_4');

// // * last_clicked_canvas === '1'
//   }else if(target_id_str === '2' && last_clicked_canvas === '1'){                          // * ready
//     border.style.transform = 'translate('+(browser_height * 0.2855)+'px,'+(browser_height * 0.0001)+'px)';
//     last_clicked_canvas = '2';
//     selected_cavas = '2'
//     // console.log('set_to_2');

//   }else if(target_id_str === '3' && last_clicked_canvas === '1'){
//     border.style.transform = 'translate('+(browser_height * 0)+'px,'+(browser_height * 0.3655)+'px)';
//     last_clicked_canvas = '3';
//     selected_cavas = '3'
//     // console.log('set_to_3');

//   }else if(target_id_str === '4' && last_clicked_canvas === '1'){
//     border.style.transform = 'translate('+(browser_height * 0.2855)+'px,'+(browser_height * 0.3655)+'px)';
//     last_clicked_canvas = '4';
//     selected_cavas = '4'
//     // console.log('set_to_4');

//   // * last_clicked_canvas === '3'
//   }else if(target_id_str === '1' && last_clicked_canvas === '3'){                          // * ready
//     border.style.transform = 'translate('+(browser_height * 0)+'px,'+(browser_height * 0.0001)+'px)';
//     last_clicked_canvas = '1';
//     selected_cavas = '1'
//     // console.log('set_to_1');

//   }else if(target_id_str === '2' && last_clicked_canvas === '3'){
//     border.style.transform = 'translate('+(browser_height * 0.2855)+'px,'+(browser_height * 0.0001)+'px)';
//     last_clicked_canvas = '2';
//     selected_cavas = '2'
//     // console.log('set_to_2');

//   }else if(target_id_str === '4' && last_clicked_canvas === '3'){
//     border.style.transform = 'translate('+(browser_height * 0.2855)+'px,'+(browser_height * 0.3655)+'px)';
//     last_clicked_canvas = '4';
//     selected_cavas = '4'
//     // console.log('set_to_4');

//      // * last_clicked_canvas === '4'
//   }else if(target_id_str === '1' && last_clicked_canvas === '4'){                          // * ready
//     border.style.transform = 'translate('+(browser_height * 0)+'px,'+(browser_height * 0.0001)+'px)';
//     last_clicked_canvas = '1';
//     selected_cavas = '1'
//     // console.log('set_to_1');

//   }else if(target_id_str === '2' && last_clicked_canvas === '4'){
//     border.style.transform = 'translate('+(browser_height * 0.2855)+'px,'+(browser_height * 0.0001)+'px)';
//     last_clicked_canvas = '2';
//     selected_cavas = '2'
//     // console.log('set_to_2');

//   }else if(target_id_str === '3' && last_clicked_canvas === '4'){
//     border.style.transform = 'translate('+(browser_height * 0)+'px,'+(browser_height * 0.3655)+'px)';
//     last_clicked_canvas = '3';
//     selected_cavas = '3'
//     // console.log('set_to_3');

//   // for(let i=1; i < 5; ++i){
//   //   const get_canvas = document.getElementById('canvas_'+i);
//   //   get_canvas.style.outline = 'none';    // ! delete the border
//   // }

//   // target.style.outline = (browser_width * 0.012) + 'px solid #FA9500';
// }

// // 1)
// // left:'.($browser_width * 0.0385).'px;
// // top:'.($browser_width * 1.283).'px; // ! the same for all !!!!!

// // 2)
// // left:'.($browser_width * 0.269).'px;

// // 3)
// // left:'.($browser_width * 0.5).'px;

// // 4)
// // left:'.($browser_width ).'px;

// }

function focus_email(input) {
  // input.style.backgroundColor = '#494848';
  // input.style.backgroundColor = '#787676';
  // input.style.color = 'white';
}

function putImgToCanvas() {
  //   const image = new Image(),
  //   canvas = document.getElementById('canvas'),
  //   ctx = canvas.getContext('2d');
  //   let img_el_for_canvas = document.getElementById('puzzf_image');   // * for dragElement(img_el);
  //   let img_src_for_canvas = img_el_for_canvas.getAttribute('src');
  //   image.src = img_src_for_canvas;
  //   // image.addEventListener('load', () => {
  //     ctx.drawImage(image,
  //         0, 0,   // Start at 70/20 pixels from the left and the top of the image (crop),
  //         image.width, image.height,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
  //         -430, 20,     // Place the result at 0, 0 in the canvas,
  //         image.width, image.height); // With as width / height: 100 * 100 (scale)
  // // });
}

function have_alert() {
  // alert('test_1');
}

function click_on_part() {
  // alert('test');
}

function restart_dt() {}

function overlay_click_dt(event) {
  event.preventDefault();
  event.stopPropagation();
  event.target.style.display = "none";
  let win_blk = document.getElementById("ornam_you_win_dt");
  win_blk.style.display = "none";
  restart_dt();
}

function you_win_click_dt(event) {
  let overlay = document.getElementById("ornam_overlay_block_dt");
  overlay.style.display = "none";

  // console.log(`you_win_block`, event.target);
  event.target.style.display = "none";
  restart_dt();
}

function show_games_menu() {
  // alert('h');
  let games_menu = document.getElementById("ornam_games_menu");
  games_menu.style.display = "block";

  let menu_button = document.getElementById("ornam_menu_blk");
  menu_button.setAttribute("onclick", "hide_games_menu()");
}

function hide_games_menu() {
  // alert('h');
  let games_menu = document.getElementById("ornam_games_menu");
  games_menu.style.display = "none";

  let menu_button = document.getElementById("ornam_menu_blk");
  menu_button.setAttribute("onclick", "show_games_menu()");
}

//   var pz = new Pinchimg_wrp_blk.default(img_el, {
//     draggableUnimg_wrp_blked: false,
//     minimg_wrp_blk: 1,
//     onimg_wrp_blkStart: function(object, event){
//         // Do something on img_wrp_blk start
//         // You can use any Pinchimg_wrp_blk method by calling object.method()
//     },
//     onimg_wrp_blkEnd: function(object, event){
//         // Do something on img_wrp_blk end
//     }
// })

// var pz = new Pinchimg_wrp_blk.default(img_el, {});
// pz.enable(); // default
// pz.disable();
// pz.destroy();
// ? 2

function overlay_clicked() {
  console.log("overlay_clicked"); // ! do not work for FIRST(!) time - only for the second
}

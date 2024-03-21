// window.oncontextmenu = function (event) {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };

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

let image_width = 0;
let image_height = 0;

// ! // 18.11.23 1  some short functions where removed show_info() hide_info() stop_propagation()

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



// ! ADDED 18.11.23  ADDED 18.12.23  1

// function previewFile() {
//   const preview = document.querySelector("puzzf_pixelization_img");
//   const file = document.querySelector("#puzzf_pixelization_input").files[0];
//   const reader = new FileReader();

//   reader.addEventListener(

//     "load",
//     () => {
//       // convert image file to base64 string
//       console.log('reader.result = ', reader.result);
//       preview.src = reader.result;



//     },
//     false,
//   );

//   if (file) {
//     reader.readAsDataURL(file);


//                             //           var canvas_1 = document.getElementById("canvas_1");
//                             // var ctx = canvas_1.getContext("2d");
//                             // // ctx.clearRect(0, 0, canvas_1.width, canvas_1.height);
//                             // console.log('ctx = ', ctx);

//                             // ctx.drawImage(
//                             //     preview,
//                             //     0,
//                             //     0,
//                             //     canvas_1.width,
//                             //     canvas_1.height
//                             // );
//   }
// }

// ! ADDED 18.11.23  ADDED 18.12.23  2

function generate_puzzles() {
  // document.getElementById("puzzf_pixelization_img").onload = function() {
  //   var img = document.getElementById("puzzf_pixelization_img");
  //   var canvas_1 = document.getElementById("canvas_1");
  //   var ctx = canvas_1.getContext("2d");
  //   ctx.drawImage(img, 0, 0);
  // }
  
  // ? COMMENTED 18.11.23 1
  // let get_overlay = document.getElementById("puzzf_overlay_dt");
  // get_overlay.style.display = "block";
  // ? COMMENTED 18.11.23 2
  get_dt_img_crop();
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

function get_dt_img_crop() {
  // ? COMMENTED 18.11.23 1
  // ! 18.11.23 1  some lines were removed
  // ? COMMENTED 18.11.23 2
  var url = canvas_1.toDataURL();
  console.log("********url = ", url);
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
  // ? COMMENTED 18.11.23 1
  // ! 18.11.23 some lines were removed
} // * end of        function get_dt_img_crop(pointX, pointY, save_left, save_top, scale){
// ? COMMENTED 18.11.23 2

function move_pinch_zoom_icon(event) {
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
function readURL(
  cr,
  boundary_width,
  boundary_height,
  viewport_width,
  viewport_height
) {
  console.log("readURL");



                        // setTimeout(function(){
                        //     let pixelization_for_canvas = document.getElementById('puzzf_pixelization_img');
                        //     // console.log('here = ', pixelization_for_canvas.firstElementChild);
                        //     var canvas_1 = document.getElementById("canvas_1");
                        //     var ctx = canvas_1.getContext("2d");
                        //     console.log('ctx = ', ctx);

                        //     ctx.drawImage(
                        //         pixelization_for_canvas.firstChild,
                        //         0,
                        //         0,
                        //         canvas_1.width,
                        //         canvas_1.height
                        //     );
                        // }, 10);

// alert('stop');





  var file = document.getElementById("puzzf_getval").files[0];
  var reader = new FileReader();
  // ? COMMENTED 18.11.23 1
  // our_image = document.getElementById("puzzf_image");
  // ? COMMENTED 18.11.23 2
  // ! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! PNONE 1 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    our_image = document.querySelector(".cr-boundary").firstChild;
    //console.log('our_image = ', our_image);
    // todo 3.05.23 1
    // ? 18.11.23 ADDED ANOTHER ID = puzzf_text_under_mask         1
    let text_above_mask = document.getElementById("puzzf_text_under_mask");
    // ? 18.11.23 ADDED 2
    text_above_mask.innerHTML =
      // ? 18.11.23 ADDED <span and font-weight and color  1
      '<span style="font-weight:bold">TIP:</span> Drag the slider to adjust the size of the image. Then click <span style="font-weight:bold;color:#FA9500;">CREATE</span> button.';
    // ? 18.11.23 ADDED 2
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


  reader.onload = function (theFile) {
    // console.log('%%%%%%%%%% = ', theFile.target);
    console.log("reader.onload");
    //console.log('reader.onload = ', reader.onload);

    var img = new Image();
    const width_div = document.getElementById("puzzf_img_system_width");
    const height_div = document.getElementById("puzzf_img_system_height");
    // ? 18.11.23 ADDED 1
    img.src = theFile.target.result; // ! 18.11.23 ADDED line
    // ? 18.11.23 ADDED 2
    img.onload = function () {
      // ? 18.11.23 ADDED 1
      image_width = this.width;
      image_height = this.height;
      // ? 18.11.23 ADDED 2
      width_div.innerHTML = this.width;
      height_div.innerHTML = this.height;
      // ? 18.11.23 COMMENTED 1
      //img.src = reader.result; // ! is needed !!!      is the data URL because called with readAsDataURL
      // ? 18.11.23 COMMENTED 2


        // ? 18.11.23 ADDED 1
        let cell_size;
        let topLeftX;
        let topLeftY;
        let bottomRightX;
        let bottomRightY;
        let cell_size_w = (viewport_width / boundary_width / 3) * image_width;
        let cell_size_h =
          (viewport_height / boundary_height / 4) * image_height;
        cell_size = Math.min(cell_size_w, cell_size_h);
        topLeftX = (image_width - 3 * cell_size) / 2;
        topLeftY = (image_height - 4 * cell_size) / 2;
        bottomRightX = image_width - topLeftX;
        bottomRightY = image_height - topLeftY;

        cr.bind({
          url: img.src,
          points: [topLeftX, topLeftY, bottomRightX, bottomRightY],
        });

        mv_img_to_canvas_onload(
          cr,
          cell_size,
          topLeftX,
          topLeftY,
          bottomRightX,
          bottomRightY
        );

        // ? 18.11.23 ADDED 2
        let get_generate_btn = document.getElementById("puzzf_generate_btn");
        get_generate_btn.style.pointerEvents = "auto";
        get_generate_btn.style.opacity = "1";

        let generate_tip = document.getElementById('puzzf_after_generate_tip');
        // console.log('generate_tip = ', generate_tip);

        // generate_tip.style.width = canvas_1.width + 'px';
        generate_tip.style.display = 'none';


        let save_image_key_btn = document.getElementById("puzzf_get_code_btn");
        save_image_key_btn.style.display = "none";
        const ratio =
          Number(width_div.innerHTML) / Number(height_div.innerHTML);
        let mask_el = document.getElementById("puzzf_mask");
        let mask_width = mask_el.offsetWidth;
        let mask_height = mask_el.offsetHeight;
        if (ratio >= 0.75) {
          our_image.style.width = mask_height * ratio + "px";
          our_image.style.height = mask_height + "px";
          save_img_width = mask_height * ratio;
          save_img_height = mask_height;
          our_image.style.left =
            (mask_width - our_image.offsetWidth) / 2 + "px"; // ! here was a mistake !! + '0px'    so 0 near the px   - and so we have our image(for example -2000px) far to left - and we can't see it
          our_image.style.top = "0px";
          save_left = (mask_width - our_image.offsetWidth) / 2;
          save_top = 0;
        } else {
          our_image.style.width = mask_width + "px";
          our_image.style.height = mask_width / ratio + "px";
          save_img_width = mask_width;
          save_img_height = mask_width / ratio;
          our_image.style.top =
            (mask_height - our_image.offsetHeight) / 2 + "px";
          our_image.style.left = "0px";
          save_top = (mask_height - our_image.offsetHeight) / 2;
          save_left = 0;
        }
        // * reset_img_and_get_puzzles      end

    }; // * img.onload = function() {

    // alert('0') // ?  alert('first_print'); // ? !!!!! no print in console.log
  }; // *  reader.onload = function() {

  // reader.onloadend = function () {

  // };

  if (file) {
    console.log("file = ", file);
    reader.readAsDataURL(file); // * have our image
  }

  // ! *********************************** get puzzles on img change                 start
  let mouse_down_on_mask = false;
  

    // ? ADDED 18.11.23 1
    // * change img inside the canvas when mousedown and mouseup (and when zoom-end)
    let img_container = document.querySelector(".cr-boundary");
    img_container.onmousedown = function () {
      mouse_down_on_mask = true;
      document.onmouseup = function () {
        if (mouse_down_on_mask == true) {
          mv_img_to_canvas(cr);
        }
        mouse_down_on_mask = false;
      };
    };
    let img_container_slider = document.querySelector(".cr-slider");
    img_container_slider.onmousedown = function () {
      mouse_down_on_mask = true;
      document.onmouseup = function () {
        if (mouse_down_on_mask == true) {
          mv_img_to_canvas(cr);
        }
        mouse_down_on_mask = false;
      };
    };

    let zoom_blk = document.querySelector(".cr-overlay");
    var timer = null;
    zoom_blk.addEventListener(
      "wheel",
      () => {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          // do something
          mv_img_to_canvas(cr);
        }, 150);
      },
      false
    );

    // ? ADDED 18.11.23 2

    function get_puzzles_on_change_img() {
      // ! 18.11.23 removed many lines here
      crear_canvas_and_pdf();
    } // *  end of:  function get_puzzles_on_change_img(){

    // * phone
      // ! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! PNONE 1 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // ! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! PNONE 2 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // ? ADDED 18.11.23 1

  // ? ADDED 18.11.23 2
  // ! *********************************** get puzzles on img change                 end
  // get_puzzles_on_change_img();
} // * function readURL(){           call this  readURL() and then this  setTimeout(get_puzzles_on_change_img, 500);
// ? comment back 2

// ? 18.11.23 ADDED 1

function mv_img_to_canvas_onload(
  cr,
  cell_size,
  topLeftX,
  topLeftY,
  bottomRightX,
  bottomRightY
) {
  let get_generate_btn = document.getElementById("puzzf_generate_btn");
  get_generate_btn.style.pointerEvents = "auto";
  get_generate_btn.style.opacity = "1";

  let generate_tip = document.getElementById('puzzf_after_generate_tip');
  // generate_tip.style.width = canvas_1.width + 'px';
  generate_tip.style.display = 'none';

  cr.result("html").then(function (html) {
    // console.log('html.firstChild = ', html.firstChild);
    var canvas_1 = document.getElementById("canvas_1");
    var ctx = canvas_1.getContext("2d");
    var canvas_3 = document.getElementById("canvas_3");
    var ctx_3 = canvas_3.getContext("2d");
    let mask_width = bottomRightX - topLeftX;
    let mask_height = bottomRightY - topLeftY;
    ctx.drawImage(
      html.firstChild,
      topLeftX,
      topLeftY,
      mask_width,
      mask_height,
      0,
      0,
      canvas_1.width,
      canvas_1.height
    );
    ctx_3.drawImage(
      html.firstChild,
      Number(cr.get().points[0]),
      Number(cr.get().points[1]),
      mask_width,
      mask_height,
      0,
      0,
      canvas_3.width,
      canvas_3.height
    );
// ? pixelization ADDED 20.12.23 1
    let pixelization_for_canvas = document.getElementById('puzzf_pixelization_img');
    // console.log('here = ', pixelization_for_canvas);
    var canvas_2 = document.getElementById("canvas_2");
    var ctx = canvas_2.getContext("2d");
    // ctx.clearRect(0, 0, canvas_1.width, canvas_1.height);
    // console.log('ctx = ', ctx);
    ctx.drawImage(
        pixelization_for_canvas,
        0, 0, canvas_2.width, canvas_2.height
    );

    // * delete pdf-blk 1
    let right_blk = document.getElementById('puzzf_right_col_btns_in');
    // right_blk.style.outline = 'none';
    right_blk.innerHTML = '';

    let large_blk_one_of_6_ = document.querySelectorAll('.puzzf_6_large_divs_in_right_column');
    for(i=0; i < 6; ++i){
      large_blk_one_of_6_[i].style.display = 'none';
    }

    let pdf_6_nums_ = document.querySelectorAll('.puzzf_right_col_nums');
    for(i=0; i < 6; ++i){
      pdf_6_nums_[i].style.display = 'none';
    }
    let pdf_wrp = document.getElementById('puzzf_pdf_hr_wrp');
    pdf_wrp.style.display = 'none';
// * delete pdf-blk 2

    let text_under_the_pdf = document.getElementById('puzzf_text_under_pdf');
    text_under_the_pdf.style.display = 'none';

    let save_image_key_btn = document.getElementById('puzzf_get_code_btn');
    save_image_key_btn.style.display = 'none';

    let pdf_link_1 = document.getElementById('puzzf_pdf_link_1');
    let pdf_link_3 = document.getElementById('puzzf_pdf_link_3');
    let pdf_link_0 = document.getElementById('puzzf_pdf_link_0');
    // console.log('!!!!!!!!!!!!!pdf_link_1 = ', pdf_link_1);
    // console.log('!!!!!!!!!!!!!pdf_link_2 = ', pdf_link_2);
    pdf_link_1.style.display = 'none';
    pdf_link_3.style.display = 'none';
    pdf_link_0.style.display = 'none';
// ? pixelization ADDED 20.12.23 2
    console.log("cr_on_load = ", cr);
  });
}

function mv_img_to_canvas(cr) {
  let get_generate_btn = document.getElementById("puzzf_generate_btn");
  get_generate_btn.style.pointerEvents = "auto";
  get_generate_btn.style.opacity = "1";

  let generate_tip = document.getElementById('puzzf_after_generate_tip');
  // generate_tip.style.width = canvas_1.width + 'px';
  generate_tip.style.display = 'none';

  cr.result("html").then(function (html) {
    // console.log('html.firstChild = ', html);

    // let get_pdf_right_top_img = document.getElementById('puzzf_pdf_header_img'); 
    // get_pdf_right_top_img.innerHTML = html.firstChild;

    var canvas_1 = document.getElementById("canvas_1");
    var ctx = canvas_1.getContext("2d");
    var canvas_3 = document.getElementById("canvas_3");
    var ctx_3 = canvas_3.getContext("2d");
    let mask_width = Number(cr.get().points[2]) - Number(cr.get().points[0]);
    let mask_height = Number(cr.get().points[3]) - Number(cr.get().points[1]);
    ctx.drawImage(
      html.firstChild,
      Number(cr.get().points[0]),
      Number(cr.get().points[1]),
      mask_width,
      mask_height,
      0,
      0,
      canvas_1.width,
      canvas_1.height
    );
    ctx_3.drawImage(
      html.firstChild,
      Number(cr.get().points[0]),
      Number(cr.get().points[1]),
      mask_width,
      mask_height,
      0,
      0,
      canvas_3.width,
      canvas_3.height
    );
// ? pixelization ADDED 20.12.23 1
      let pixelization_for_canvas = document.getElementById('puzzf_pixelization_img');
      // console.log('here = ', pixelization_for_canvas);
      var canvas_2 = document.getElementById("canvas_2");
      var ctx = canvas_2.getContext("2d");
      // ctx.clearRect(0, 0, canvas_1.width, canvas_1.height);
      // console.log('ctx = ', ctx);
      ctx.drawImage(
          pixelization_for_canvas,
          0, 0, canvas_2.width, canvas_2.height
      );

// * delete pdf-blk 1
      let right_blk = document.getElementById('puzzf_right_col_btns_in');
      // right_blk.style.outline = 'none';
      right_blk.innerHTML = '';

      let large_blk_one_of_6_ = document.querySelectorAll('.puzzf_6_large_divs_in_right_column');
      for(i=0; i < 6; ++i){
        large_blk_one_of_6_[i].style.display = 'none';
      }

      let pdf_6_nums_ = document.querySelectorAll('.puzzf_right_col_nums');
      for(i=0; i < 6; ++i){
        pdf_6_nums_[i].style.display = 'none';
      }
      let pdf_wrp = document.getElementById('puzzf_pdf_hr_wrp');
      pdf_wrp.style.display = 'none';
// * delete pdf-blk 2

      let text_under_the_pdf = document.getElementById('puzzf_text_under_pdf');
      text_under_the_pdf.style.display = 'none';

      let save_image_key_btn = document.getElementById('puzzf_get_code_btn');
      save_image_key_btn.style.display = 'none';

      let pdf_link_1 = document.getElementById('puzzf_pdf_link_1');
      let pdf_link_3 = document.getElementById('puzzf_pdf_link_3');
      let pdf_link_0 = document.getElementById('puzzf_pdf_link_0');
      // console.log('!!!!!!!!!!!!!pdf_link_1 = ', pdf_link_1);
      // console.log('!!!!!!!!!!!!!pdf_link_2 = ', pdf_link_2);
      pdf_link_1.style.display = 'none';
      pdf_link_3.style.display = 'none';
      pdf_link_0.style.display = 'none';

// ? pixelization ADDED 20.12.23 2
  });
}

// ? 18.11.23 ADDED 2

// ! 18.11.23 here was deleted get_code() function and so on - not needeable

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

function overlay_clicked() {
  console.log("overlay_clicked"); // ! do not work for FIRST(!) time - only for the second
}


// function jigazo_puzzf(window.jQuery) {
  //grayscale
// console.log('jigazo.js');
// * !(function (x) {
  // var  global_value_obj_dirs = new Object;                     
  // var  global_value_obj_tiles = new Object; 






// // * rotation of mask and pdf blk 1
//   let rotated = false;
//   let rotated_2 = false;
//   // let mask = document.getElementById('puzzf_mask');
//   // mask.style.transform = 'rotateY(-180deg)';
//   let rotate_mask_btn = document.getElementById('puzzf_rotate_mask_btn');
//   // let large_6_divs = document.getElementById('puzzf_right_col_6_large_divs_wrp');
//   // let back_blk = document.getElementById('puzzf_backside_blk');
//   // rotate_mask_btn.addEventListener( 'click', rotation, false );

//   function rotation( event ) {
// //console.log('rotation');
//     event.preventDefault();
//     // event.stopPropagation();
//     if(rotated === false){
//       let backside_blk_1 = document.getElementById('puzzf_backside_blk_1'); 
//       backside_blk_1.className = 'flip flip-puzzf-mask';  // ! rotate to 0deg
//       let backside_blk_2 = document.getElementById('puzzf_backside_blk_2');
//       backside_blk_2.className = 'flip flip-puzzf-mask';  // ! rotate to 0deg
//       document.getElementById('puzzf_mask').className = 'flip flip-puzzf-backside-blk'; // ! rotate to 180deg

//       backside_blk_2.style.zIndex = '0';
//       backside_blk_1.style.zIndex = '2';
//       // backside_blk_2.style.display = 'none';
//       // backside_blk_1.style.display = 'block';

//       // let get_canvas = document.getElementById('puzzf_canvas_backside_blk');
//       // get_canvas.style.display = 'block';

//       // backside_blk.appendChild(get_canvas);

//   // ! return this for tiles on the back side 1
//       let lare_6_blks = document.getElementById('puzzf_right_col_6_large_divs_wrp');
//       // console.log('lare_6_blks = ', lare_6_blks);
//       // lare_6_blks.style.display = 'none';

//       // let large_blk_one_of_6_ = document.querySelectorAll('.puzzf_6_large_divs_in_right_column');
//       //       for(i=0; i < 6; ++i){
//       //         large_blk_one_of_6_[i].style.display = 'none';
//       //       }

//       lare_6_blks.className = 'flip flip-puzzf-mask';
//       lare_6_blks.style.zIndex = '1';
//       lare_6_blks.style.opacity = '0';
//   // ! return this for tiles on the back side 2

//       // lare_6_blks.style.transition = 'visibility 0.5s';
//       // lare_6_blks.style.visibility = 'visible';

//       let rotate_btn = document.getElementById('puzzf_see_pixelated_image_btn');
//       rotate_btn.innerHTML = 'BACK<br>TO<br>IMAGE';

      




//       if(rotated_2 === true){
//         let rotate_btn = document.getElementById('puzzf_see_image_key_btn');
//         rotate_btn.innerHTML = 'SEE<br>IMAGE<br>KEY';

//         // let backside_blk_1 = document.getElementById('puzzf_backside_blk_1');
//         // backside_blk_1.className = 'flip flip-puzzf-backside-blk';
//         // let backside_blk_2 = document.getElementById('puzzf_backside_blk_2');
//         // backside_blk_2.className = 'flip flip-puzzf-backside-blk';
//         // document.getElementById('puzzf_mask').className = 'flip flip-puzzf-mask';
  
//         rotated_2 = false;
//       }




//       // let second_btn = document.getElementById('puzzf_rotate_mask_btn_2');
//       // second_btn.style.opacity = '0.23';
//       // second_btn.style.cursor = 'default';
//       // second_btn.setAttribute('onclick', '');

//       rotated = true;
//       //console.log('1.1');
//     }else{
//       let backside_blk_1 = document.getElementById('puzzf_backside_blk_1');
//       backside_blk_1.className = 'flip flip-puzzf-backside-blk';
//       let backside_blk_2 = document.getElementById('puzzf_backside_blk_2');
//       backside_blk_2.className = 'flip flip-puzzf-backside-blk';
//       document.getElementById('puzzf_mask').className = 'flip flip-puzzf-mask';

//       backside_blk_2.style.zIndex = '0';
//       backside_blk_1.style.zIndex = '2';
//       // backside_blk_2.style.display = 'none';
//       // backside_blk_1.style.display = 'block';
//   // ! return this for tiles on the back side 1
//       let lare_6_blks = document.getElementById('puzzf_right_col_6_large_divs_wrp');
//       // lare_6_blks.style.display = 'none';

//       // let large_blk_one_of_6_ = document.querySelectorAll('.puzzf_6_large_divs_in_right_column');
//       // for(i=0; i < 6; ++i){
//       //   large_blk_one_of_6_[i].style.display = 'none';
//       // }

//       lare_6_blks.className = 'flip flip-puzzf-backside-blk';
//       lare_6_blks.style.zIndex = '1';
//       lare_6_blks.style.opacity = '0';
//   // ! return this for tiles on the back side 2

//       let rotate_btn = document.getElementById('puzzf_see_pixelated_image_btn');
//       rotate_btn.innerHTML = 'SEE<br>PUZZLE<br>FACE';
//       // lare_6_blks.style.zIndex = '0';



//       // if(rotated === true && rotated_2 === true){
//       //   let rotate_btn = document.getElementById('puzzf_see_image_key_btn');
//       //   rotate_btn.innerHTML = 'SEE<br>IMAGE<br>KEY';

//       //   let backside_blk_1 = document.getElementById('puzzf_backside_blk_1');
//       //   backside_blk_1.className = 'flip flip-puzzf-backside-blk';
//       //   let backside_blk_2 = document.getElementById('puzzf_backside_blk_2');
//       //   backside_blk_2.className = 'flip flip-puzzf-backside-blk';
//       //   document.getElementById('puzzf_mask').className = 'flip flip-puzzf-mask';
  
//       //   rotated_2 = false;
//       // }





//       // let second_btn = document.getElementById('puzzf_rotate_mask_btn_2');
//       // second_btn.style.opacity = '1';
//       // second_btn.style.cursor = 'pointer';
//       // second_btn.setAttribute('onclick', 'rotation_2(event);');

//       rotated = false;
//       //console.log('1.2');
//     }
//   }








//   function rotation_2( event ) {

//     event.preventDefault();
//     // event.stopPropagation();
//     if(rotated_2 === false){
//       let backside_blk_1 = document.getElementById('puzzf_backside_blk_1');
//       backside_blk_1.className = 'flip flip-puzzf-mask';
//       let backside_blk_2 = document.getElementById('puzzf_backside_blk_2');
//       backside_blk_2.className = 'flip flip-puzzf-mask';
//       document.getElementById('puzzf_mask').className = 'flip flip-puzzf-backside-blk';

//       // backside_blk_1.style.display = 'none';
//       // backside_blk_2.style.display = 'block';
//       backside_blk_2.style.zIndex = '1';
//       backside_blk_1.style.zIndex = '0';
      
//       // backside_blk_2.style.display = 'grid';
//       // backside_blk_2.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
//       // backside_blk_2.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;';


//   // ! return this for tiles on the back side 1
//       let lare_6_blks = document.getElementById('puzzf_right_col_6_large_divs_wrp');
//       // lare_6_blks.style.display = 'block';

//       // let large_blk_one_of_6_ = document.querySelectorAll('.puzzf_6_large_divs_in_right_column');
//       //       for(i=0; i < 6; ++i){
//       //         large_blk_one_of_6_[i].style.display = 'block';
//       //       }

//       lare_6_blks.className = 'flip flip-puzzf-mask';

//       lare_6_blks.style.zIndex = '2';
//       lare_6_blks.style.opacity = '1';
//   // ! return this for tiles on the back side 2

//       // lare_6_blks.style.transition = 'visibility 0.5s';
//       // lare_6_blks.style.visibility = 'visible';

//       let rotate_btn = document.getElementById('puzzf_see_image_key_btn');
//       rotate_btn.innerHTML = 'BACK<br>TO<br>IMAGE';



//       if(rotated === true){
//         let rotate_btn = document.getElementById('puzzf_see_pixelated_image_btn');
//         rotate_btn.innerHTML = 'SEE<br>PUZZLE<br>FACE';

//         // let backside_blk_1 = document.getElementById('puzzf_backside_blk_1');
//         // backside_blk_1.className = 'flip flip-puzzf-backside-blk';
//         // let backside_blk_2 = document.getElementById('puzzf_backside_blk_2');
//         // backside_blk_2.className = 'flip flip-puzzf-backside-blk';
//         // document.getElementById('puzzf_mask').className = 'flip flip-puzzf-mask';
      
//         rotated = false;
//       }

// // todo 1
//       // let get_canvas = document.getElementById('puzzf_canvas_backside_blk');
//       // get_canvas.style.display = 'none';

//       // backside_blk.style.display = 'grid';
//       // backside_blk.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
//       // backside_blk.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;';
//       // display:grid;
// // grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
// // grid-template-rows:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;


//       // let get_right_col_6_large_divs_wrp = document.getElementById('puzzf_right_col_6_large_divs_wrp');
//       // get_right_col_6_large_divs_wrp.style.display = 'block';
// // todo 2


// // let first_btn = document.getElementById('puzzf_rotate_mask_btn');
// // first_btn.style.opacity = '0.1';
// // first_btn.style.cursor = 'default';
// // first_btn.setAttribute('onclick', '');



//       rotated_2 = true;
//     }else{
//       let backside_blk_1 = document.getElementById('puzzf_backside_blk_1');
//       backside_blk_1.className = 'flip flip-puzzf-backside-blk';
//       let backside_blk_2 = document.getElementById('puzzf_backside_blk_2');
//       backside_blk_2.className = 'flip flip-puzzf-backside-blk';
//       document.getElementById('puzzf_mask').className = 'flip flip-puzzf-mask';



//       // backside_blk_1.style.display = 'none';
//       // backside_blk_2.style.display = 'block';
//       backside_blk_2.style.zIndex = '1';
//       backside_blk_1.style.zIndex = '0';

//       // backside_blk_2.style.display = 'grid';
//       // backside_blk_2.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
//       // backside_blk_2.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;';


//   // ! return this for tiles on the back side 1
//       let lare_6_blks = document.getElementById('puzzf_right_col_6_large_divs_wrp');
//       // lare_6_blks.style.display = 'block';

//       // let large_blk_one_of_6_ = document.querySelectorAll('.puzzf_6_large_divs_in_right_column');
//       //       for(i=0; i < 6; ++i){
//       //         large_blk_one_of_6_[i].style.display = 'block';
//       //       }

//       lare_6_blks.className = 'flip flip-puzzf-backside-blk';
//       lare_6_blks.style.zIndex = '2';
//       lare_6_blks.style.opacity = '1';
//   // ! return this for tiles on the back side 2

//       let rotate_btn = document.getElementById('puzzf_see_image_key_btn');
//       rotate_btn.innerHTML = 'SEE<br>IMAGE<br>KEY';
//       // lare_6_blks.style.zIndex = '0';


//       // if(rotated === true && rotated_2 === true){
//       //   let rotate_btn = document.getElementById('puzzf_see_pixelated_image_btn');
//       //   rotate_btn.innerHTML = 'SEE<br>PUZZLE<br>FACE';

//       //   let backside_blk_1 = document.getElementById('puzzf_backside_blk_1');
//       //   backside_blk_1.className = 'flip flip-puzzf-backside-blk';
//       //   let backside_blk_2 = document.getElementById('puzzf_backside_blk_2');
//       //   backside_blk_2.className = 'flip flip-puzzf-backside-blk';
//       //   document.getElementById('puzzf_mask').className = 'flip flip-puzzf-mask';
      
//       //   rotated = false;
//       // }
 
//       // let first_btn = document.getElementById('puzzf_rotate_mask_btn');
//       // first_btn.style.opacity = '1';
//       // first_btn.style.cursor = 'default';
//       // first_btn.setAttribute('onclick', 'rotation(event);');


//       rotated_2 = false;
//     }
//   }



// * rotation of mask and pdf blk 2
//console.log('ini');
var base64result = '';
var  global_value_obj_dirs_1 = new Object;                     
var  global_value_obj_tiles_1 = new Object;  



// var  global_value_obj_dirs_2 = new Object;                     
// var  global_value_obj_tiles_2 = new Object;   

// var  global_value_obj_dirs_3 = new Object;                     
// var  global_value_obj_tiles_3 = new Object;   

// var  global_value_obj_dirs_4 = new Object;                     
// var  global_value_obj_tiles_4 = new Object;   

// var canvases_count = 0;
// function jigazo_puzzf(x, cropped_img_2, cropped_img_3, cropped_img_4) {

function jigazo_puzzf(x) {
  // console.log('x = ', x);

  // if(not_first_time === true){
   // have_overlay = true;
  // }




  var b = 10,
    e = 30,
    n = 30,
    I = 15,
    D = 20,
    E = I * D,
    h = [],
    g = !1,
    o = !1,
    k = -1,
    L = {},
    U = U || Array;

  function d() {
    return g && o;
  }
  function v(t, r, a) {
    var e = document.createElement("canvas");
    return (
      (e.width = a),
      (e.height = a),
      e.getContext("2d").drawImage(t, r * a, 0, a, a, 0, 0, a, a),
      e
    );
  }
  var i = [0, b - 1, b * b - 1, (b - 1) * b],
    f = [b, -1, -b, 1],
    c = [1, b, -1, -b];
  function l(t, r, a) {
    return i[a] + t * f[a] + r * c[a];
  }
  function s(t, r, a) {
    for (var e = 0, n = 0; n < b; n++)
      for (var o = 0; o < b; o++) {
        var i = t[l(n, o, 0)],
          f = r[l(n, o, a)];
        e += Math.pow(i - f, 2);
      }
    return e / (b * b);
  }
  function u(t, r, a) {
    for (var e = 0, n = 0, o = 0; o < b; o += 2)
      for (var i = 0; i < b; i += 2) {
        var f = t[l(o, i, 0)],
          c = r[l(o, i, a)];
        (e += Math.pow(f - c, 2)), n++;
      }
    return e / n;
  }
  function m(t, r, a) {
    for (var e = 0, n = 0, o = 1; o < b; o += 3)
      for (var i = 1; i < b; i += 3) {
        var f = t[l(o, i, 0)],
          c = r[l(o, i, a)];
        (e += Math.pow(f - c, 2)), n++;
      }
    return e / n;
  }
  function w(t, r, a) {
    for (
      var e = 0,
        n = [0, (b / 5) * 3, 0, 0, (b / 5) * 2],
        o = [(b / 5) * 2, b, b, b, (b / 5) * 3],
        i = [0, 0, 0, (b / 5) * 3, (b / 5) * 2],
        f = [b, b, (b / 5) * 2, b, (b / 5) * 3],
        c = 0;
      c < n.length;
      c++
    ) {
      for (var s = 0, u = 0, g = n[c]; g < o[c]; g++)
        for (var h = i[c]; h < f[c]; h++)
          (s += t[l(g, h, 0)]), (u += r[l(g, h, a)]);
      (s /= (o[c] - n[c]) * (f[c] - i[c])),
        (u /= (o[c] - n[c]) * (f[c] - i[c])),
        (e += Math.pow(u - s, 2));
    }
    return e / n.length;
  }



  
  // * y(x("#canvas_2")[0], "tileData", canvas_2_width / 15, t, r); 
  function y(t,              r,         a,                   e, n) {     // * e is our t (our imgs)

// console.log('selected_canvas = ', selected_canvas);
    // console.log('e_in_y() = ', e);

  //  console.log('canvases_count_in_y() = ', canvases_count);

  // global_value_obj_dirs = e.dirs;                    
  // global_value_obj_tiles = e.tiles;  
  // console.log('global_value_obj_dirs_1 inside y()', global_value_obj_dirs_1);
  // console.log('canvases_count in y() = ', canvases_count);
    // if(canvases_count === 1){
      // console.log('1');
      global_value_obj_dirs_1 = e.dirs;                    
      global_value_obj_tiles_1 = e.tiles;        
     // console.log('global_value_obj_dirs_1 inside y()', global_value_obj_dirs_1); 
      // console.log('global_value_obj_tiles_1 inside y()', global_value_obj_tiles_1); 
    // }
    // else if(canvases_count === 2){
    //   // console.log('2');
    //   global_value_obj_dirs_2 = e.dirs;       
    //   global_value_obj_tiles_2 = e.tiles;   
    // }
    // else if(canvases_count === 3){
    //   // console.log('3');
    //   global_value_obj_dirs_3 = e.dirs;       
    //   global_value_obj_tiles_3 = e.tiles;   
    // }
    // else if(canvases_count === 4){
    //   // console.log('4');
    //   global_value_obj_dirs_4 = e.dirs;       
    //   global_value_obj_tiles_4 = e.tiles;   
    // }


    // console.log('t_in_y = ', t);  // ! canvas_2 element, canvas_2 element and so on to 4th
    // console.log('r_in_y = ', r);
    // console.log('a_in_y = ', a);
    // console.log('e_in_y = ', e); 
    // console.log('n_in_y = ', n);  // ! <img id="puzzf_cropped_img" ... "puzzf_cropped_img_3" ... "puzzf_cropped_img_4
//console.log('jigazo_yFunc_on_load_page');
    for (
      var o = e.tiles,
        i = e.dirs,
        f = n
          ? ((t.width = a * I), (t.height = a * D), I)
          : ((t.width = a * D), (t.height = a * I), D),
        c = t.getContext("2d"),
        s = 0;
      s < o.length;
      s++
    ) {
      var u = Math.floor(s / f),
        g = s % f;
      c.save(),
        c.translate(g * a + a / 2, u * a + a / 2),
        c.rotate((-Math.PI / 2) * i[s]),
        c.drawImage(h[o[s]][r], -a / 2, -a / 2, a, a),          // ?????  h[o[s]][r] ??   h = [],  o = !1
        c.restore();
    }
  }
  function C(t, r, a, e) {
    return e * (0.21 * t + 0.72 * r + 0.07 * a) + 255 * (1 - e);
  }



  function N(t) {
    // console.log('test1');  
    // console.log('r_in_N = ', r);
    // console.log('L[r]=', L[r]);
    //console.log('t_in_N(t) =', t);     // !  t_in_N(t) = 0                                         
    if (t == k && L && L.image_tiles) {     // todo what is    t == k    ?
      var r = x("#cost_function").val();           // ! 5.01.23  IS NEEDED because Uncaught ReferenceError: r is not defined 
        // console.log('L = ', L);
        // console.log('L[r].costs = ', L[r].costs);
      if (((L[r] = L[r] || {}), !L[r].costs)) {          
       // console.log('L[r]=', L[r]);  // todo Object { cost:  , dirs: , tiles:  }      have value
      // console.log('calling_N(t)');
        // if ("sse" == r) a = s;
        if ("sse" == r) a = s;
        // else if ("sse2" == r) a = u;
        // else if ("sse3" == r) a = m;
        // else {
        //   if ("key_regions" != r) throw new Error("Unrecognized cost");
        //   a = w;
        // }

        L[r].costs = (function (t, r) {
          for (var a = new Array(E), e = 0; e < E; e++) {
            for (var n = new Array(E), o = 0; o < E; o++)
              for (var i = 0; i < 4; i++) {
                var f = {
                  cost: r(t[e], h[o].luminosities, i),
                  tile: o,
                  dir: i,
                };
                (!n[o] || f.cost < n[o].cost) && (n[o] = f);
              }
            a[e] = n;
          }
          return a;
        })(L.image_tiles, a);
      }
      var a,
        t = L[r].costs;
      L[r].matching ||
        (L[r].matching = (function (t) {
          for (
            var e = new Array(E),
              n = new Array(E),
              a = new Array(E),
              o = 0,
              i = new Array(E),
              f = new Array(E),
              c = function (t, r) {
                return a[t][r] - i[t] - f[r];
              },
              s = [],
              u = new Array(E),
              g = new Array(E),
              h = new Array(E),
              d = new Array(E),
              r = 0;
            r < E;
            r++
          ) {
            (e[r] = -1),
              (n[r] = -1),
              (i[r] = 0),
              (f[r] = 0),
              (a[r] = new Array(E));
            for (var v = 0; v < E; v++) a[r][v] = t[r][v].cost;
          }
          var l = -2;
          function m(t, r) {
            for (
              var a = { side: t, index: r }, e = !1, n = 0;
              n < s.length;
              n++
            )
              if (s[n].side == a.side && s[n].index == a.index) {
                e = !0;
                break;
              }
            e || s.push(a);
          }
          function w() {
            var t = s[0];
            s.splice(0, 1);
            var r = t.index;
            if ("s" == t.side)
              !(function (t) {
                for (var r = 0; r < E; r++)
                  -1 == g[r] && 0 === c(t, r) && ((g[r] = t), m("t", r));
              })(r);
            else {
              if (-1 == n[r]) return r;
              !(function (t) {
                if (-1 == u[n[t]]) {
                  (u[n[t]] = t), m("s", n[t]);
                  for (var r = 0; r < E; r++)
                    -1 == g[r] &&
                      c(n[t], r) < h[r] &&
                      ((h[r] = c(n[t], r)), (d[r] = n[t]));
                }
              })(r);
            }
            return -1;
          }
          (function () {
            for (var t = 0; t < E; t++) {
              i[t] = Number.MAX_VALUE;
              for (var r = 0; r < E; r++) i[t] = Math.min(i[t], a[t][r]);
            }
            for (r = 0; r < E; r++) {
              f[r] = Number.MAX_VALUE;
              for (t = 0; t < E; t++) f[r] = Math.min(f[r], a[t][r] - i[t]);
            }
          })(),
            (function () {
              for (var t = !0; t; )
                for (var t = !1, r = 0; r < E; r++)
                  for (var a = 0; a < E; a++)
                    0 === c(r, a) &&
                      -1 == e[r] &&
                      -1 == n[a] &&
                      ((e[r] = a), (n[a] = r), o++, (t = !0));
            })();
          for (; o < E; ) {
            !(function () {
              s = [];
              for (var t = 0; t < E; t++) u[t] = -1;
              for (var r = 0; r < E; r++)
                (g[r] = -1), (h[r] = Number.MAX_VALUE), (d[r] = -1);
              for (t = 0; t < E; t++)
                if (-1 == e[t]) {
                  (u[t] = l), m("s", t);
                  for (r = 0; r < E; r++)
                    -1 == g[r] &&
                      c(t, r) < h[r] &&
                      ((h[r] = c(t, r)), (d[r] = t));
                }
            })();
            for (var y = -1; -1 == y; ) {
              for (; -1 == y && 0 < s.length; ) y = w();
              -1 == y &&
                (function () {
                  for (var t = Number.MAX_VALUE, r = 0; r < E; r++)
                    -1 == g[r] && (t = Math.min(t, h[r]));
                  for (var a = 0; a < E; a++) -1 != u[a] && (i[a] += t);
                  for (r = 0; r < E; r++)
                    -1 != g[r] ? (f[r] -= t) : (h[r] -= t);
                  for (r = 0; r < E; r++)
                    -1 == g[r] && 0 === h[r] && ((g[r] = d[r]), m("t", r));
                })();
            }
            !(function (t) {
              for (var r = t; r != l; ) {
                var a = g[r];
                (n[r] = a), (e[a] = r), (r = u[a]);
              }
              o++;
            })(y);
          }
          for (var A = e, _ = [], p = 0, v = 0; v < E; v++)
            _.push(t[v][A[v]].dir), (p += t[v][A[v]].cost);
          return { cost: p, tiles: A, dirs: _ };
        })(t)),
        (a = "matching"),
        (t = L[r].matching),
        (r = L.is_portrait);

        // y(x("#" + a + "_tiles")[0], "tileData", e, t, r),          // ! commented (original)
        // y(x("#" + a + "_symbols")[0], "symbolData", n, t, r);





          canvas_2 = document.getElementById('canvas_2');
          //console.log('canvas_2 = ', canvas_2);
          canvas_2_width = canvas_2.width;
 


// ? pixelization CHANGED/ADDED 20.12.23 1
            let remainder = Math.round(canvas_2_width / 15) - (canvas_2_width / 15);
            // console.log('remainder = ', remainder);
      
            
  
            // * 1
                if((remainder > 0.25) && (remainder < 0.5)){
                  // console.log('1');
                  // console.log('Math.round(canvas_2_width / 15)= ', Math.round(canvas_2_width / 15));
                  y(x("#canvas_2")[0], "tileData", Math.round(canvas_2_width / 15), t, r);    // !    / 15) - 0.5  minus
                 
    
                }
                else if((remainder > -0.5) && (remainder < -0.25)){
                  y(x("#canvas_2")[0], "tileData", Math.round(canvas_2_width / 15), t, r); 
                 
      
                }
                // else if((remainder >= 0.5) && (remainder) < 0.76){
                //   console.log('2');
                //   y(x("#canvas_2")[0], "tileData", Math.round(canvas_2_width / 15 + 0.5), t, r);    // !    / 15) + 0.5  plus
                // }
                // else if((remainder >= -0.76) && (remainder < -0.5)){
                //   y(x("#canvas_2")[0], "tileData", Math.round(canvas_2_width / 15) - 0.5, t, r);   
                // }
                else if(Math.round(canvas_2_width / 15) === 0){
                  // console.log('3');
                  y(x("#canvas_2")[0], "tileData", Math.round(canvas_2_width / 15), t, r);
                 
    
                  // console.log('4');
                }else{
                  y(x("#canvas_2")[0], "tileData", Math.round(canvas_2_width / 15), t, r);
                 
                  // console.log('5');
                }

// ? pixelization CHANGED/ADDED 20.12.23 2








          // * 2




          // y(x("#puzzf_canvas_backside_blk")[0], "tileData", Math.round(canvas_backside_width / 15), t, r);
          // y(x("#canvas_2")[0], "tileData", Math.round(canvas_2_width / 15), t, r);








if(browser_width >= browser_height){

          // console.log('global_value_obj_dirs_1 = ', global_value_obj_dirs_1);
          // console.log('global_value_obj_tiles_1 = ', global_value_obj_tiles_1);

          let num_dirs_ = global_value_obj_dirs_1;

// ! 1 

let num_tiles_ = global_value_obj_tiles_1;


let array_matrix_placement = [
  'A30', 'A31', 'A32', 'A33', 'A34', 'A35', 'A36', 'A40', 'A41', 'A42', 'A43', 'A44', 'A45', 'A46', 'A47', 
  'A37', 'A38', 'A39', 'B30', 'B31', 'B32', 'B33', 'A48', 'A49', 'B40', 'B41', 'B42', 'B43', 'B44', 'B45', 
  'B34', 'B35', 'B36', 'B37', 'B38', 'B39', 'C30', 'B46', 'B47', 'B48', 'B49', 'C40', 'C41', 'C42', 'C43', 
  'C31', 'C32', 'C33', 'C34', 'C35', 'C36', 'C37', 'C44', 'C45', 'C46', 'C47', 'C48', 'C49', 'D40', 'D41', 
  'C38', 'C39', 'D30', 'D31', 'D32', 'D33', 'D34', 'D42', 'D43', 'D44', 'D45', 'D46', 'D47', 'D48', 'D49', 
  'D35', 'D36', 'D37', 'D38', 'D39', 'E30', 'E31', 'E40', 'E41', 'E42', 'E43', 'E44', 'E45', 'E46', 'E47',  
  'E32', 'E33', 'E34', 'E35', 'E36', 'E37', 'E38', 'E48', 'E49', 'F40', 'F41', 'F42', 'F43', 'F44', 'F45', 
  'E39', 'F30', 'F31', 'F32', 'F33', 'F34', 'F35', 'F46', 'F47', 'F48', 'F49', 'G40', 'G41', 'G42', 'G43', 
  'F36', 'F37', 'F38', 'F39', 'G30', 'G31', 'G32', 'G44', 'G45', 'G46', 'G47', 'G48', 'G49', 'H40', 'H41',  
  'G33', 'G34', 'G35', 'G36', 'G37', 'G38', 'G39', 'H42', 'H43', 'H44', 'H45', 'H46', 'H47', 'H48', 'H49',
  'H30', 'H31', 'H32', 'H33', 'H34', 'H35', 'H36', 'A50', 'A51', 'A52', 'A53', 'A54', 'A55', 'A56', 'A57', 
  'H37', 'H38', 'H39', 'I30', 'I31', 'I32', 'I33', 'A58', 'A59', 'B50', 'B51', 'B52', 'B53', 'B54', 'B55', 
  'I34', 'I35', 'I36', 'I37', 'I38', 'I39', 'J30', 'B56', 'B57', 'B58', 'B59', 'C50', 'C51', 'C52', 'C53', 
  'J31', 'J32', 'J33', 'J34', 'J35', 'J36', 'J37', 'C54', 'C55', 'C56', 'C57', 'C58', 'C59', 'D50', 'D51', 
  'J38', 'J39', 'I40', 'I41', 'I42', 'I43', 'I44', 'D52', 'D53', 'D54', 'D55', 'D56', 'D57', 'D58', 'D59', 
  'I45', 'I46', 'I47', 'I48', 'I49', 'J40', 'J41', 'E50', 'E51', 'E52', 'E53', 'E54', 'E55', 'E56', 'E57',
  'J42', 'J43', 'J44', 'J45', 'J46', 'J47', 'J48', 'E58', 'E59', 'F50', 'F51', 'F52', 'F53', 'F54', 'F55', 
  'J49', 'I50', 'I51', 'I52', 'I53', 'I54', 'I55', 'F56', 'F57', 'F58', 'F59', 'G50', 'G51', 'G52', 'G53', 
  'I56', 'I57', 'I58', 'I59', 'J50', 'J51', 'J52', 'G54', 'G55', 'G56', 'G57', 'G58', 'G59', 'H50', 'H51', 
  'J53', 'J54', 'J55', 'J56', 'J57', 'J58', 'J59', 'H52', 'H53', 'H54', 'H55', 'H56', 'H57', 'H58', 'H59'
];

let array_colors_img_svg = ['red_shape_rgb_v2.svg', 'green_shape_rgb_v2.svg', 'blue_shape_rgb_v2.svg', 'violet_shape_rgb_v2.svg', 'orange_shape_rgb_v2.svg'];



let array_tiles_letter = ["A","B","C","D","E","F","G","H","I","J"]; 
let array_tiles_in_line = {};
let array_symbols_in_line = [];

let tile_number;
let index;
let z;
let y;
let remainder_15;
let back_number;


for (k = 0; k < 3; k++) {
  for (i = 0; i < array_tiles_letter.length; i++) {
    for (j = 0; j < array_tiles_letter.length; j++) {
      tile_number = 30 + 10 * k + j;
      tile_number = array_tiles_letter[i] + tile_number ;

      // console.log('tile_number = ', tile_number);
     
      index = Object.keys(array_tiles_in_line).length;
    //  console.log('index.length = ', index);
    // index; // *  index = 0, 1, 2, 3, ... 298, 299;
      array_tiles_in_line[ index ] = {'tile': tile_number}; 
      // console.log('array_tiles_in_line[ index ][tile] = ', array_tiles_in_line[ index ]['tile']);
      // console.log('array_matrix_placement.indexOf(array_tiles_in_line[ index ][tile]) = ', array_matrix_placement.indexOf(array_tiles_in_line[ index ]['tile']));
      // console.log('array_tiles_in_line = ', array_tiles_in_line);
      index_in_array_matrix_placement  = array_matrix_placement.indexOf(array_tiles_in_line[ index ]['tile']); 
      z =  Math.floor(index_in_array_matrix_placement / 15);
      y =  Math.floor(z / 5); 
      
      remainder_15 = (index_in_array_matrix_placement % 15);
      back_number = 15 * z - index_in_array_matrix_placement;  // ? where to use it?
      
      array_tiles_in_line[ index ]['number'] = (15 - remainder_15) + 15 * y; // 15 - number of position in the row

      array_tiles_in_line[ index ]['color'] = z - y * 5; // 5 - number of colors,  
      
    }
  }

}

// console.log('array_tiles_in_line = ', array_tiles_in_line);




// ! 2

          let right_blk = document.getElementById('puzzf_right_col_btns_in');
          // right_blk.style.outline = 'none';
          right_blk.innerHTML = '';
        
          // alert(num_dirs_.length);

          let large_blk_one_of_6_ = document.querySelectorAll('.puzzf_6_large_divs_in_right_column');
          for(i=0; i < 6; ++i){
            large_blk_one_of_6_[i].style.display = 'block';

            if(i === 0){
              large_blk_one_of_6_[i].style.borderLeft = '2px solid black';
              large_blk_one_of_6_[i].style.borderTop = '2px solid black';
              large_blk_one_of_6_[i].style.borderRight = '1px solid black';
              large_blk_one_of_6_[i].style.borderBottom = '1px solid black';

              // large_blk_one_of_6_[i].style.borderTopLeftRadius = browser_height * 0.005 + 'px';
            }
            else if(i === 1){
              large_blk_one_of_6_[i].style.borderLeft = '1px solid black';
              large_blk_one_of_6_[i].style.borderTop = '2px solid black';
              large_blk_one_of_6_[i].style.borderRight = '1px solid black';
              large_blk_one_of_6_[i].style.borderBottom = '1px solid black';
            }
            else if(i === 2){
              large_blk_one_of_6_[i].style.borderLeft = '1px solid black';
              large_blk_one_of_6_[i].style.borderTop = '2px solid black';
              large_blk_one_of_6_[i].style.borderRight = '2px solid black';
              large_blk_one_of_6_[i].style.borderBottom = '1px solid black';
            }
            else if(i === 3){
              large_blk_one_of_6_[i].style.borderLeft = '2px solid black';
              large_blk_one_of_6_[i].style.borderTop = '1px solid black';
              large_blk_one_of_6_[i].style.borderRight = '1px solid black';
              large_blk_one_of_6_[i].style.borderBottom = '2px solid black';
            }
            else if(i === 4){
              large_blk_one_of_6_[i].style.borderLeft = '1px solid black';
              large_blk_one_of_6_[i].style.borderTop = '1px solid black';
              large_blk_one_of_6_[i].style.borderRight = '1px solid black';
              large_blk_one_of_6_[i].style.borderBottom = '2px solid black';
            }
            else if(i === 5){
              large_blk_one_of_6_[i].style.borderLeft = '1px solid black';
              large_blk_one_of_6_[i].style.borderTop = '1px solid black';
              large_blk_one_of_6_[i].style.borderRight = '2px solid black';
              large_blk_one_of_6_[i].style.borderBottom = '2px solid black';
            }



            // large_blk_one_of_6_[i].classList.add("puzzf_animation_1");
          }

          let pdf_6_nums_ = document.querySelectorAll('.puzzf_right_col_nums');
          for(i=0; i < 6; ++i){
            pdf_6_nums_[i].style.display = 'block';
          }

          let pdf_wrp = document.getElementById('puzzf_pdf_hr_wrp');
          // console.log('pdf_wrp = ', pdf_wrp);
          pdf_wrp.style.display = 'block';

          let pdf_link_1 = document.getElementById('puzzf_pdf_link_1');
          let pdf_link_3 = document.getElementById('puzzf_pdf_link_3');
          let pdf_link_0 = document.getElementById('puzzf_pdf_link_0');
          // console.log('!!!!!!!!!!!!!pdf_link_1 = ', pdf_link_1);
          // console.log('!!!!!!!!!!!!!pdf_link_2 = ', pdf_link_2);
          pdf_link_1.style.display = 'block';
          pdf_link_3.style.display = 'block';
          pdf_link_0.style.display = 'block';

    
          for(i=0; i < num_dirs_.length; ++i){
            let element = document.createElement('div');
            // element.style.float = 'left';

            // element.style.width = '6.6666%';
            // element.style.width = (browser_height * 0.52) / 15 + 'px';

            // element.style.height = '5%';
            // element.style.height = ((browser_height * 0.52) / 0.75) / 20 + 'px';

            // element.style.border = '0.5px solid #B2B2B2';
            element.style.border = '0.5px solid black';
            
            element.style.display = 'flex';
            element.style.background = 'white';

            element.style.justifyContent = 'center';
            element.style.alignItems = 'center';


        //  console.log('browser_height = ', browser_height);






        
        // let orientation_height = 20;
        // let orientation_width = 15;
        // let svg_image_name = '';
        // index = 0;
        // for(i=0; i < orientation_height; i++){   
        //   for(j=orientation_width; j > 0; j--){  
        //     if(array_tiles_in_line[ index ]['number'] == 9){
        //       array_tiles_in_line[ index ]['number'] = "";
        //     }
 
        let what_row_i = Math.floor(i / 15);
        // let center_row_i = what_row_i * 15 + 7;
        let index_in_row_i = i - what_row_i * 15;
        let mirrored_i = 14 - index_in_row_i + what_row_i * 15;

        let angle;
        if(num_dirs_[mirrored_i] == '0'){
          angle = '0';
        }
        else if(num_dirs_[mirrored_i] == '1'){
          angle = '90';
        }
        else if(num_dirs_[mirrored_i] == '2'){
          angle = '180';
        }
        else if(num_dirs_[mirrored_i] == '3'){
          angle = '270';
        }




        if(array_tiles_in_line[num_tiles_[mirrored_i]]['number'] == 9){
          array_tiles_in_line[num_tiles_[mirrored_i]]['number'] = "";
        }
        
            svg_image_name = array_colors_img_svg[array_tiles_in_line[num_tiles_[mirrored_i]]['color']];
            // console.log('svg_image_name = ', svg_image_name);
            if(array_tiles_in_line[ num_tiles_[mirrored_i] ]['number'] == ""){  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              svg_image_name = svg_image_name.replace('.svg', '_n9.svg');
            }
            // angle = 0;
            // element.innerHTML = '<img style="pozition:absolute;width:74%;height:74%;margin-left:'+(browser_height * 0.0037)+'px;margin-top:'+(browser_height * 0.0037)+'px;transform-origin:center;transform:rotateZ('+angle+'deg);" src="images/shapes/'+svg_image_name+'" alt="symbol_img"><div style="position:absolute;outline:0px solid red;margin-left:'+(browser_height * 0.008)+'px;margin-top:'+(browser_height * 0.0075)+'px;transform-origin:center;transform:rotateZ('+angle+'deg);color:white;font-family: Arial, sans-serif;font-size:'+browser_height * 0.011+'px;font-weight:100;">'+array_tiles_in_line[ num_tiles_[mirrored_i]]['number']+'</div>';
            // <div style="width:10px;height:10px;outline:1px solid black;">'+num_dirs_[i]+'</div>;
            element.innerHTML = '<img style="pozition:absolute;width:74%;height:74%;transform:rotateZ('+angle+'deg);" src="images/shapes/'+svg_image_name+'" alt="symbol_img"><div style="position:absolute;outline:0px solid red;transform:rotateZ('+angle+'deg);color:white;font-family: Arial, sans-serif;font-size:'+browser_height * 0.011+'px;">'+array_tiles_in_line[ num_tiles_[mirrored_i]]['number']+'</div>';

            right_blk.appendChild(element);




        //     index++;
        //   }
        // }
        // console.log('array_tiles_in_line = ', array_tiles_in_line);

        




            


       
          }
// !
// !!!!!!!!!!!!!!!!!!!!!!!!!!!! SAVE IMAGE KEY btn
// !


// ? 18.11.23 ADDED 1
          let text_under_pdf_blk = document.getElementById("puzzf_text_under_pdf");
          text_under_pdf_blk.style.display = "block";
          // save_image_key_btn.setAttribute('onclick', 'create_pdf();');
// ? pixelization CHANGED/ADDED 20.12.23 1          

  let get_generate_btn = document.getElementById("puzzf_generate_btn");

  // let canvas_1 = document.getElementById('canvas_1');
  // let canvas_1_w = canvas_2.getAttribute('width');
  let canvas_2 = document.getElementById('canvas_2');
  let canvas_2_w = canvas_2.getAttribute('width');
  // canvas_2.width = canvas_1_w + 'px';
  // console.log('canvas_1_w = ', canvas_1_w);
  // console.log('canvas_2_w = ', canvas_2_w);
  get_generate_btn.style.width = canvas_2_w + 'px';

  // get_generate_btn.style.opacity = "1";


  let generate_tip = document.getElementById('puzzf_after_generate_tip');
  // console.log('generate_tip = ', generate_tip);

  generate_tip.style.width = canvas_2.width + 'px';
  generate_tip.style.display = 'block';


// ? pixelization CHANGED/ADDED 20.12.23 2



          let save_image_key_btn = document.getElementById('puzzf_get_code_btn');
          save_image_key_btn.style.display = 'block';
          save_image_key_btn.style.display = 'flex';
          save_image_key_btn.style.justifyContent = 'center';
          save_image_key_btn.style.alignItems = 'center';


// ? 18.11.23 ADDED 2     
        } // * if(browser_width >= browser_height){


          // for
          // global_value_obj_dirs_1
























          // let get_img = document.getElementById('puzzf_image');
          // get_img.style.pointerEvents = 'auto';

          // let get_zoom = document.getElementById('puzzf_zoom');
          // get_zoom.style.pointerEvents = 'auto';

          // get_overlay.style.pointerEvents = 'auto';

          // let get_lock_mask_data = document.getElementById('lock_mask_data');
          // // get_lock_mask_data.innerHTML = 'false';
          // let get_lock_attr = get_lock_mask_data.setAttribute('lock_attr', 'false');
          // // console.log('get_lock_attr in jigazo = ', get_lock_attr);

          // // console.log('on_N lock_mask = ', get_lock_mask_data.innerHTML);
    }
  }




  



  





  






  // function A(t, r, cropped_img_2, cropped_img_3, cropped_img_4) {  // ? trying 
    function A(t,r) {     
      
    // console.log('t.target = ', t.target);         // * FileReader { readyState: 2, result: "data:image/png;base64,
    // console.log('t.target.result = ', t.target.result);     // * data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACgAAAAZAC

    //  console.log('t_in_A_func= ', t); // todo really have <img id="puzzf_cropped_img and <img id="puzzf_cropped_img_2
//  console.log('r_in_A_func= ', r);   // todo r_in_A_func=  0    two times
   var a;
    var save_t;       // ! ADDED 5.01.23

    // console.log('r_in_A = ', r);
    // console.log('k_in_A = ', k);
    // console.log('t_in_A = ', t);   // ! ADDED 5.01.23       

    // r == k &&           // ! ???????   r = 0 k = 0, why we need  0 == 0 (r == k) ?
// console.log('t.src = ', t.src);
    //   (
              (r = t.src),   // ? changed from    ((r = t.target.result),  
              // console.log('r-************ = ', r),   // todo     data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAADgCAYAAACXQC21AAAgAElEQVR4Xuy9eaxl2Xndt++bx3o1V0
              save_t = t,                                               // ! ADDED 5.01.23
     
              (t = new Image()),
              // console.log('before_x(t).load'),
      //  console.log('a = ', a);
      //  console.log('k = ', k);
              x(t).load(    // ! only on load of img through the <input>                      // ??? 6.01.23
              // console.log('in_x(t).load'),

                ((a = k),     // todo     without (a = k) have no puzzles !!!
                function (t) {
                     // console.log('t = ', t);     // todo Object { originalEvent: load, type: "load", isDefaultPrevented: $(), 
                    //  console.log('test2')
                     !(function (t, r) {
                  //console.log('r_in_A_func= ', r); // todo  r_in_A_func=  0 !!!!!
                    //console.log(x("#orig")[0]);                // ! !!!!!!!!!!!!!!!
                    
                      if (r == k) {
                        x("#status").text("");

 // console.log('r_in_A_func_1= ', r);   // todo   r_in_A_func=  0   // todo   r_in_A_func=  1   when k++; on 779 line is uncomment  and we have only ONE console.log()  !!! - where is the second? and also we have only first canvas with puzzles

                        a = cropped_img;
                        e = x("#orig")[0],       // ! orig is needed BECAUSE we have properly size of canvas_2 2 3 4
//console.log('e = ', e);   // todo    <canvas id="orig" style="display:none
                          //console.log('e = ', e);       // * <canvas id="canvas_2" class="puzzf_canvases" style="\n    

                          n = a.height > a.width;
                        (L.is_portrait = n)
                          ? ((e.width = b * I), (e.height = b * D))                       // ? **************************** e.width = set new width of canvas_2 
                          : ((e.width = b * D), (e.height = b * I));
                        t = e.getContext("2d");
                        t.drawImage(a, 0, 0, e.width, e.height);
                        for (
                          var o = t.getImageData(0, 0, e.width, e.height),
                            i = new Array(256),
                            f = 0,
                            c = 0;
                          c < i.length;
                          c++
                        )
                          i[c] = 0;
                        for (c = 0; c < o.data.length; c += 4) {
                          var s = o.data[c + 3] / 255,
                            u = o.data[c],
                            g = o.data[c + 1],
                            h = o.data[c + 2];
                          (i[(M = Math.floor(C(u, g, h, s)))] += 1), (f += 1);
                        }
                        for (var d = -1, v = 0, c = 0; c < 256; c++)
                          if (0.05 * f <= (v += i[c])) {
                            d = c;
                            break;
                          }
                        for (var l = -1, m = 0, c = 255; 0 <= c; c--)
                          if (0.05 * f <= (m += i[c])) {
                            l = c + 1;
                            break;
                          }
                        for (var w = [], c = 0; c < E; c++) w.push(U(b * b));
                        for (c = 0; c < o.data.length; c += 4) {
                          var y = (c / 4) % e.width,
                            A = Math.floor(c / 4 / e.width),
                            _ = Math.floor(y / b),
                            p = Math.floor(A / b),
                            y = y % b,
                            A = A % b,
                            s = o.data[c + 3] / 255,
                            M = C(
                              (u = o.data[c]),
                              (g = o.data[c + 1]),
                              (h = o.data[c + 2]),
                              s
                            );
                          (M = Math.max(Math.min(((M - d) / (l - d)) * 256, 255), 0)),
                            (o.data[c] = M),
                            (o.data[c + 1] = M),
                            (o.data[c + 2] = M),
                            (o.data[c + 3] = 255),
                            (w[p * (n ? I : D) + _][A * b + y] = M);
                        }
                        //a = x("#grayscale")[0];     // ! commented 
                        //a = x("#puzzf_mask")[0];      // * added - my string 
                        
                        // * console.log('a = ', a);    ---- canvas #grayscale element
                        //(a.width = e.width),        // ! commented
                      //   (a.height = e.height),    // ! commented
                        // (t = a.getContext("2d")).putImageData(o, 0, 0),   // !!! COMMENTED

                        // console.log('L = ', L);
                          (L.image_tiles = w),      // *  PUT OUR PUZZLED PICTURE in <canvas id="matching_tiles"></canvas>

       // console.log('r_in_A_func_2 = ', r); // todo   r_in_A_func_2 =  0
        //                 console.log('now_we_will_call_N(r)');
        
                          N(r);
                         
                      }

                  // }             // ? trying     // * for loop   
                  })(t, a);
                })

              ),    // * x(t).load
 
              // console.log('after_x(t).load'),
              x(t).error(function () {
                x("#status").text("Error: could not read image");
              }),
              x(t).attr("src", r)
      // );



  }    // * function A(t,r)



 




   











// ! original t function      1
  // function t() {
  //   var t,
  //     r,
  //     a = x("#file_input")[0].files;
  //   1 == a.length
  //     ? (k++,
  //       (L = {}),
  //       x("#status").text("Processing..."),
  //       ((t = new FileReader()).onload =
  //         ((r = k),
  //         function (t) {
  //           A(t, r);
  //         })),
  //       t.readAsDataURL(a[0]))
  //     : x("#status").text("Select an image");
  // }

  // ! original t function      2
  
  function t() {

   // console.log('canvases_count = ', canvases_count);
    // console.log('cropper_img in jigazo_puzzf = ', cropped_img);
    // console.log('cropper_img_2 in jigazo_puzzf = ', cropped_img_2);
    // console.log('cropper_img_3 in jigazo_puzzf = ', cropped_img_3);
    // console.log('cropper_img_4 in jigazo_puzzf = ', cropped_img_4);


    var t,
      r,
      a;

      a = x("#puzzf_getval")[0].files;                  // ! changed      a = x("#file_input")[0].files;   to current
// console.log('a = ', a);

      // function readURL(input) {
      //   if (input.files && input.files[0]) {
      //     var reader = new FileReader();
      //     reader.onload = function (e) {
      //       $('#blah')
      //         .attr('src', e.target.result)
      //         .width(150)
      //         .height(200);
      //     };
      //     reader.readAsDataURL(input.files[0]);
      //   }
      // }


      // console.log('a = ', a);
      if(a.length === 1){       
         
              //  x("#status").text("Select an image")      // ? wos this thing 
              k++;    // ?? k - ??                         // ? but now this 4 lines
              // console.log('k = ', k);
              L = {};
              r = k;
        
          t = cropped_img; 
          // console.log('t_in_t = ', t); 
          // canvases_count++;
                  A(t,r);     // ?????? what is r? (0, 1, 2, 3)
        


// t = cropped_img_backside;
// A(t,r);   







                  // // k++;              // ??? do we need this three line again after previous same lines?          
                  // L2 = {};
                  // // r = k;
               
                  // t = cropped_img_2;  
                  // canvases_count++;
                  // A2(t,r,canvases_count);            // ! ADDED 5.01.23

                  // // k++;                       // ??? do we need this three line again after previous same lines?                               
                  // L3 = {};
                  // // r = k;
                  // t = cropped_img_3;  
                  // canvases_count++;
                  // A3(t, r,canvases_count);            // ! ADDED 5.01.23

                  // // k++;                      // ??? do we need this three line again after previous same lines?  
                  // L4 = {};
                  // // r = k;
                  // t = cropped_img_4;  
                  // canvases_count++;
                  // A4(t, r, canvases_count);            // ! ADDED 5.01.23

                  // // canvases_count = 0;


               
                  // alert('have_overlay = false;');
                  // have_overlay = false;



            // setTimeout(set_have_overlay_to_false(), 100);
            // function set_have_overlay_to_false(){
            //   have_overlay = false;
            // }
        }


  } 



  x(document).ready(function () {


    


    x("#status").text("Loading..."),
      (function (u) {                           // ???????? what is u ???                     u function is not called (if put console.log in u() line 48 in this file)
        //console.log('u = ', u);   // ! u =  function t()   is called in after current function


        for (var t = 0; t < E; t++) h[t] = {};          
        var r = new Image();
        (r.src = "images/tiles.png"),
          (r.onload = function (t) {


            //console.log('t.target_in_(r.onload = function (t) { = ', t.target);     // ! <img src="images/tiles.png">  5.01.23


            for (var r = t.target, a = 0; a < E; a++)
              h[a].tileData = v(r, a, 30);
              
            t = document.createElement("canvas");
            (t.width = b), (t.height = b);
            for (var e = t.getContext("2d"), a = 0; a < E; a++) {
              e.drawImage(r, 30 * a, 0, 30, 30, 0, 0, b, b);
              for (
                var n = e.getImageData(0, 0, b, b).data,
                  o = new U(b * b),
                  i = 0;
                i < n.length;
                i += 4
              ) {
                var f = n[i],
                  c = n[i + 1],
                  s = n[i + 2];
                if (f != c || f != s || c != s)
                  throw new Error("Non-grayscale image");
                o[i / 4] = f;
              }
              h[a].luminosities = o;
            }
            (g = !0), d() && u();
            // have_overlay = false;
          }),
          ((r = new Image()).src = "images/symbols.png"),
          (r.onload = function (t) {
            for (var r = t.target, a = 0; a < E; a++)
              h[a].symbolData = v(r, a, 64);
            (o = !0), d() && u();
          });
          // have_overlay = false;
        // ! })(t),  5.01.23  this changed to bottom line and see  // x("#cost_function").change(function () {  //   //N(k);    lines
      })(t); // ! if delete t in () we have Uncaught TypeError: u is not a function
 
      // x("#puzzf_getval").change(function () {                   // ! changed     x("#file_input").change(function () {        to         x("#puzzf_getval").change(function () {  
      //   d() && t();  // ? !!!!!!!! ????????????????????????????????????????????????????????????????????/
      // }),

// ! 1  do not need this 5.01.23
      // x("#cost_function").change(function () {
      //   N(k);                                   //            // !!!! IS NEEDED !!!!!!!!
      // });
// ! 2  do not need this 5.01.23

      // x("#matching_symbols_link").click(function () {
      //   var t,
      //     r = x("#cost_function").val();
      //   return (
      //     L[r] &&
      //       L[r].matching &&
      //       ((t = document.createElement("canvas")),
      //       (L[r] = L[r] || {}),
      //       y(t, "symbolData", 64, L[r].matching, L.is_portrait),
      //       window.open(t.toDataURL())),
      //     !1
      //   );
      // });
      // x("#toggle_advanced").click(function () {
      //   x("#advanced").toggle();
      // });
      // x("noscript").remove();
      // x("div.input").show(),
      // x("#puzzf_image").click(function () {                         // !       x("#file_img").click(function () {return x("#file_input").trigger("click"), !1;    to current
      //   return x("#puzzf_getval").trigger("click"), !1;                     
      // });

     // have_overlay = false; 
  });

// have_overlay = false; 



};
// })(window.jQuery);
// grayscale

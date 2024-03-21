// this.setContainerY(this.container.parentElement.offsetHeight);

// console.log('a');


    // * a =  <div class="pinch-zoom-container"></div>
    // * a = <img id="puzzf_image" 


  

 

    "function" != typeof Object.assign &&
    Object.defineProperty(Object, "assign", {
      value: function (a) {
  
        if (null == a)
          throw new TypeError("Cannot convert undefined or null to object");
          // console.log('Object(a) = ', Object(a));
        for (var b, c = Object(a), d = 1; d < arguments.length; d++)
          if (((b = arguments[d]), null != b))
            for (var e in b)
              Object.prototype.hasOwnProperty.call(b, e) && (c[e] = b[e]);
              // console.log('c = ', c);
        return c;
      },
      writable: !0,
      configurable: !0,
    }),
  
    "function" != typeof Array.from &&
      (Array.from = function (a) {
        return [].slice.call(a);
    
      });
  
  
  
  
  var buildElement = function (a) {   // * line 437   building container(this.container) - container is 'a', and then put in container('<div class="pinch-zoom-container"></div>') our img (this.el)
    //console.log('a = ', a);               // ! a =  <div class="pinch-zoom-container"></div>
      var b = document.implementation.createHTMLDocument("");
      // console.log('b = ', b);   // ! b = HTMLDocument
      // console.log('Array.from(b.body.children)[0] = ', Array.from(b.body.children)[0]); // * undefined
      //console.log('buildElement fuction    (before return)');
      return (b.body.innerHTML = a), Array.from(b.body.children)[0];
    },
  
  
    triggerEvent = function (a, b) {
      var c = document.createEvent("HTMLEvents");
      c.initEvent(b, !0, !1), a.dispatchEvent(c);
  
      //  console.log('a = ', a);     // ? 
      //  console.log('b = ', b);     // ? 
      //  console.log('c = ', c);     // ? 
    },
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    definePinchZoom = function () {
      // console.log('Math.min = ', Math.min);   // * function min()   length: 2    name: "min"  - ???
      // console.log('Math.abs = ', Math.abs); 
      var a = Math.min,     // * function min(){}
        b = Math.max,     // * function max(){}
        c = Math.abs,      // * function abs(){}
        d = function (a, b) {
          //console.log('b = ', b);   // * Object {  } empty
          //console.log('a = ', a);   // * <img id="puzzf_image" 
          (this.el = a),  
  
          console.log('*this.el.offsetWidth = ', this.el.offsetWidth);  // * 0 !!!
          console.log('*this.el.offsetHeight = ', this.el.offsetHeight); // * 384 - height of mask!!!
          
            // (this.zoomFactor = 1),                            // ************** initial zoom
            // * this.zoomFactor = 1 - insert by width in mask - by large side of the image
            (this.zoomFactor = 1),  // * this.zoomFactor = 2.15 is about to insert by small side of the img
             
            (this.lastScale = 1),
            (this.offset = { x: 0, y: 0 }),
            (this.initialOffset = { x: 0, y: 0 }),
            (this.options = Object.assign({}, this.defaults, b)),
            this.setupMarkup(),                                   // ! !!!!!!!!!!!!!!!!!!!
            this.bindEvents(),
            this.update(),
            this.isImageLoaded(this.el) &&
              (this.updateAspectRatio(), this.setupOffsets()),
            this.enable();
        },
        e = function (c, a) {
          // console.log('c = ', c);  // ?
          // console.log('a = ', a);  // ?
          return c + a;
        },
        f = function (a, b) {
          return a > b - 0.01 && a < b + 0.01;
        };
  
  
      d.prototype = {       // * adding new properties   (and methods to constructor of our d function)         [only through .prototype property we can add something to constructor of function] or we need to put properties right in constructor this.some_propertie = some_value
        defaults: {
          tapZoomFactor: 2,
          zoomOutFactor: 1.3,
          animationDuration: 300,
          maxZoom: 50,
          minZoom: 1,
          draggableUnzoomed: !0,
          lockDragAxis: !1,
          setOffsetsOnce: !1,
          use2d: !0,
          zoomStartEventName: "pz_zoomstart",
          zoomUpdateEventName: "pz_zoomupdate",
          zoomEndEventName: "pz_zoomend",
          dragStartEventName: "pz_dragstart",
          dragUpdateEventName: "pz_dragupdate",
          dragEndEventName: "pz_dragend",
          doubleTapEventName: "pz_doubletap",
          verticalPadding: 0,
          horizontalPadding: 0,
          onZoomStart: null,
          onZoomEnd: null,
          onZoomUpdate: null,
          onDragStart: null,
          onDragEnd: null,
          onDragUpdate: null,
          onDoubleTap: null,
        },
        handleDragStart: function (a) {
          triggerEvent(this.el, this.options.dragStartEventName),
            "function" == typeof this.options.onDragStart &&
              this.options.onDragStart(this, a),
            this.stopAnimation(),
            (this.lastDragPosition = !1),
            (this.hasInteraction = !0),
            this.handleDrag(a);
        },
        handleDrag: function (a) {
          var b = this.getTouches(a)[0];
          this.drag(b, this.lastDragPosition),
            (this.offset = this.sanitizeOffset(this.offset)),
            (this.lastDragPosition = b);
        },
        handleDragEnd: function () {
          triggerEvent(this.el, this.options.dragEndEventName),
            "function" == typeof this.options.onDragEnd &&
              this.options.onDragEnd(this, event),
            this.end();
        },
        handleZoomStart: function (a) {
          triggerEvent(this.el, this.options.zoomStartEventName),
            "function" == typeof this.options.onZoomStart &&
              this.options.onZoomStart(this, a),
            this.stopAnimation(),
            (this.lastScale = 1),                                           // ! lastScale
            (this.nthZoom = 0),
            (this.lastZoomCenter = !1),
            (this.hasInteraction = !0);
        },
        handleZoom: function (a, b) {
          var c = this.getTouchCenter(this.getTouches(a)),
            d = b / this.lastScale;
          
          (this.lastScale = b),                                                    // ! lastScale
            (this.nthZoom += 1),
            3 < this.nthZoom &&
              (this.scale(d, c), this.drag(c, this.lastZoomCenter)),
            (this.lastZoomCenter = c);
        },
        handleZoomEnd: function () {
          triggerEvent(this.el, this.options.zoomEndEventName),
            "function" == typeof this.options.onZoomEnd &&
              this.options.onZoomEnd(this, event),
            this.end();
        },
        handleDoubleTap: function (a) {
          var b = this.getTouches(a)[0],
            c = 1 < this.zoomFactor ? 1 : this.options.tapZoomFactor,
            d = this.zoomFactor,
            e = function (a) {
              this.scaleTo(d + a * (c - d), b);
            }.bind(this);
          this.hasInteraction ||
            ((this.isDoubleTap = !0),
            d > c && (b = this.getCurrentZoomCenter()),
            this.animate(this.options.animationDuration, e, this.swing),
            triggerEvent(this.el, this.options.doubleTapEventName),
            "function" == typeof this.options.onDoubleTap &&
              this.options.onDoubleTap(this, a));
        },
        computeInitialOffset: function () {                           // * **************
          // console.log('this.el = ', this.el);     // !  <img id="puzzf_image" 
          // console.log('here = ', -c(this.el.offsetWidth * this.getInitialZoomFactor() - this.container.offsetWidth) / 2) ;  // * = -0    if without -c() then we have just 0
          // console.log('here_2 = ', -c(this.el.offsetHeight * this.getInitialZoomFactor() - this.container.offsetHeight) / 2);       // * =-26.44 if without -c() then we have  = -52.88 if n
  
          // this.el.style.height = this.container.offsetHeight + 'px'; // todo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // console.log('this.el.style.height = ', this.el.style.height);
  
          this.initialOffset = {
            x:                                              // ! if x = -200 we move img to right on 200px from left border of mask
  // 0,
              -c(
                this.el.offsetWidth * this.getInitialZoomFactor() -       // !  (this.el = a),   a is <img id="puzzf_image"     
                  this.container.offsetWidth
              ) / 2,
  
         
            y:                                             // ! if y = 200 img gous up on 200px
  // 0,                                         
              -c(
                this.el.offsetHeight * this.getInitialZoomFactor() -
                  this.container.offsetHeight
              ) / 2,                                                // ! top-margin of img inside pinch-zoom-container and it goes to c() function
          };
        },
        resetOffset: function () {
          (this.offset.x = this.initialOffset.x),
            (this.offset.y = this.initialOffset.y);
        },
        isImageLoaded: function (a) {
          return "IMG" === a.nodeName
            ? a.complete && 0 !== a.naturalHeight
            : Array.from(a.querySelectorAll("img")).every(this.isImageLoaded);
        },
        setupOffsets: function () {                               // ! if comment all this lines in this function - img goes to the top - left corner
          (this.options.setOffsetsOnce && this._isOffsetsSet) ||      
            ((this._isOffsetsSet = !0),
            this.computeInitialOffset(),                        // * if comment this line - our img goes to left top corner !!!!!
            this.resetOffset());
        },
        sanitizeOffset: function (c) {                            // ? HERE !!!!!!!!!!!!!!!
          // console.log('this.el = ', this.el);  // * <img id="puzzf_image"
          // console.log('this.el.offsetWidth = ', this.el.offsetWidth);  // * = 614
          // console.log('this.getInitialZoomFactor() = ', this.getInitialZoomFactor()); // * = 0.46905537459283386 not changing until zooming 
          // console.log('this.zoomFactor = ', this.zoomFactor); // * = 1
  
          var d =
              this.el.offsetWidth * this.getInitialZoomFactor() * this.zoomFactor,
            e =
              this.el.offsetHeight *
              this.getInitialZoomFactor() *
              this.zoomFactor;
              // console.log('d = ', d); // * = 288
              // console.log('e = ', e); // * = 180.1172638436482
              // console.log('this.getContainerX() = ', this.getContainerX()); // * = 288 (as d)
              // console.log('this.getContainerY() = ', this.getContainerY()); // * = 384
              // console.log('this.options.horizontalPadding = ', this.options.horizontalPadding); // * = 0
              // console.log('this.options.verticalPadding = ', this.options.verticalPadding); // * = 0
              // console.log('this.options = ', this.options); // * Object { tapZoomFactor: 2, zoomOutFactor: 1.3, animationDuration: 300, maxZoom: 50, minZoom: 1, draggableUnzoomed: true, lockDragAxis: false, setOffsetsOnce: false, use2d: true, zoomStartEventName: "pz_zoomstart", … }
  
            f = d - this.getContainerX() + this.options.horizontalPadding, // * padding x = 0
            g = e - this.getContainerY() + this.options.verticalPadding,   // * padding y = -203.883
            // f = e - this.getContainerY() + this.options.verticalPadding, // * padding x = 0
            // g = d - this.getContainerX() + this.options.horizontalPadding,   // * padding y = -203.883
  
            h = b(f, 0),
            // console.log('h = ', h); // * h = 0
            i = b(g, 0),
            // console.log('i = ', i); // * i = 0
            j = a(f, 0) - this.options.horizontalPadding,
            // console.log('j = ', j); // * j = 0
            k = a(g, 0) - this.options.verticalPadding;
            // console.log('k = ', k); // * k = 203.8827361563518 = g
  
          return { x: a(b(c.x, j), h), y: a(b(c.y, k), i) };      // * returns left(x) and top(y) of our img!!!
        },
        
        scaleTo: function (a, b) {
          // console.log('a_in_scale_to = ', a);
          this.scale(a / this.zoomFactor, b);
        },
        scale: function (a, b) {
          (a = this.scaleZoomFactor(a)),
            this.addOffset({
              x: (a - 1) * (b.x + this.offset.x),
              y: (a - 1) * (b.y + this.offset.y),
            }),
            triggerEvent(this.el, this.options.zoomUpdateEventName),
            "function" == typeof this.options.onZoomUpdate &&
              this.options.onZoomUpdate(this, event);
        },
        scaleZoomFactor: function (c) {
          var d = this.zoomFactor;
          return (
            (this.zoomFactor *= c),
            (this.zoomFactor = a(
              this.options.maxZoom,
              b(this.zoomFactor, this.options.minZoom)
            )),
            this.zoomFactor / d
          );
        },
        canDrag: function () {
          return this.options.draggableUnzoomed || !f(this.zoomFactor, 1);
        },
        drag: function (a, b) {
          b &&
            (this.options.lockDragAxis
              ? c(a.x - b.x) > c(a.y - b.y)
                ? this.addOffset({ x: -(a.x - b.x), y: 0 })                          // ???????????????????????????????
                : this.addOffset({ y: -(a.y - b.y), x: 0 })
              : this.addOffset({ y: -(a.y - b.y), x: -(a.x - b.x) }),
            triggerEvent(this.el, this.options.dragUpdateEventName),
            "function" == typeof this.options.onDragUpdate &&
              this.options.onDragUpdate(this, event));
        },
        getTouchCenter: function (a) {
          return this.getVectorAvg(a);
        },
        getVectorAvg: function (a) {
          return {
            x:
              a
                .map(function (a) {
                  return a.x;
                })
                .reduce(e) / a.length,
            y:
              a
                .map(function (a) {
                  return a.y;
                })
                .reduce(e) / a.length,
          };
        },
        addOffset: function (a) {
          this.offset = { x: this.offset.x + a.x, y: this.offset.y + a.y };
        },
        sanitize: function () {         // * sanitize -> disinfect
          this.zoomFactor < this.optionsFactor
            ? thisAnimation()
            : this.isInsaneOffset(this.offset) && this.sanitizeOffsetAnimation();
        },
        isInsaneOffset: function (a) {
          var b = this.sanitizeOffset(a);
          return b.x !== a.x || b.y !== a.y;
        },
        sanitizeOffsetAnimation: function () {
          var a = this.sanitizeOffset(this.offset),
            b = { x: this.offset.x, y: this.offset.y },
            c = function (c) {
              (this.offset.x = b.x + c * (a.x - b.x)),
                (this.offset.y = b.y + c * (a.y - b.y)),
                this.update();
            }.bind(this);
          this.animate(this.options.animationDuration, c, this.swing);
        },
      Animation: function () {
          if (1 !== this.zoomFactor) {
            var a = this.zoomFactor,
              b = this.getCurrentZoomCenter(),
              c = function (c) {
                this.scaleTo(a + c * (1 - a), b);
              }.bind(this);
            this.animate(this.options.animationDuration, c, this.swing);
          }
        },
        updateAspectRatio: function () {
          this.unsetContainerY(),
            this.setContainerY(this.container.parentElement.offsetHeight);
            // this.setContainerY(this.getContainerX() / this.getAspectRatio());  // * added by vd
        },
        getInitialZoomFactor: function () {
          // console.log('this.container.offsetWidth = ', this.container.offsetWidth);   // * = 288  - is ok
          // console.log('this.container.offsetHeight = ', this.container.offsetHeight);  // * = 384   - is ok
          // console.log('this.el.offsetWidth = ', this.el.offsetWidth);      // * = 334  // ! ????????? very small(or very big)
          // console.log('this.el.offsetHeight = ', this.el.offsetHeight);      // * = 384
  // ? ????????????????????????????????????????????????????     1
          var b = this.container.offsetWidth / this.el.offsetWidth,   // * 288 / 334 = 0.8622
          //var b = this.container.offsetWidth / this.el.offsetWidth,
     
            c = this.container.offsetHeight / this.el.offsetHeight;   // * 384 / 384 = 1
            // console.log('!!!this.el.offsetHeight =', this.el.offsetHeight)  // * = 384
            // console.log('c = ', c); // * = 1
            // console.log('!!!this.el.offsetWidth =', this.el.offsetWidth) // * = 334
  
            // console.log('ratio = ', this.el.offsetWidth / this.el.offsetHeight)
          return a(b, c);
  // ? ????????????????????????????????????????????????????     2
        },
        getAspectRatio: function () { // !!! is not calling anywhere !!! - checked in original pinchzoom.js
          // console.log('calling getAspectRatio');     // ! no console.log
          // console.log('this.el.offsetWidth = ', this.el.offsetWidth);  // ! no console.log
          // console.log('this.el.offsetHeight = ', this.el.offsetHeight); // ! no console.log
         // console.log('this.el.offsetWidth / this.el.offsetHeight = ', this.el.offsetWidth / this.el.offsetHeight);
  
          return this.el.offsetWidth / this.el.offsetHeight;    
          // return this.el.offsetWidth / (this.el.offsetHeight / 2);
        },
  
        getCurrentZoomCenter: function () {
          var a = this.offset.x - this.initialOffset.x,
            b = -1 * this.offset.x - a / (1 / this.zoomFactor - 1),
            c = this.offset.y - this.initialOffset.y,
            d = -1 * this.offset.y - c / (1 / this.zoomFactor - 1);
          return { x: b, y: d };
        },
        getTouches: function (a) {
          var b = this.container.getBoundingClientRect(),
            c = document.documentElement.scrollTop || document.body.scrollTop,
            d = document.documentElement.scrollLeft || document.body.scrollLeft,
            e = b.top + c,
            f = b.left + d;
          return Array.prototype.slice.call(a.touches).map(function (a) {
            return { x: a.pageX - f, y: a.pageY - e };
          });
        },
        animate: function (a, b, c, d) {
          var e = new Date().getTime(),
            f = function () {
              if (this.inAnimation) {
                var g = new Date().getTime() - e,
                  h = g / a;
                g >= a
                  ? (b(1),
                    d && d(),
                    this.update(),
                    this.stopAnimation(),
                    this.update())
                  : (c && (h = c(h)),
                    b(h),
                    this.update(),
                    requestAnimationFrame(f));
              }
            }.bind(this);
          (this.inAnimation = !0), requestAnimationFrame(f);
        },
        stopAnimation: function () {
          this.inAnimation = !1;
        },
        swing: function (a) {
          return -Math.cos(a * Math.PI) / 2 + 0.5;
        },
        getContainerX: function () {                        // ! container width
          // console.log('this.container.offsetWidth = ', this.container.offsetWidth); // * 288
          return this.container.offsetWidth;
        },
        getContainerY: function () {
          // console.log('this.container.offsetHeight = ', this.container.offsetHeight);  // * 384
          return this.container.offsetHeight;
        },
        setContainerY: function (a) {                         // !!! set Container in Y !!!!
          // console.log('a_in_setContainerY = ', a); // * = 384
          return (this.container.style.height = a + "px");    //  ! a is a height of mask - the father of pinch-zoom-container
        },
        unsetContainerY: function () {
          this.container.style.height = null;
        },
        setupMarkup: function () {                             // ! !!!!!!!!!!!!!!!!!!!
          (this.container = buildElement(
            '<div class="pinch-zoom-container"></div>'  // * a = <div class="pinch-zoom-container"></div> in buildElement
          )),
         // todo console.log('this.el = ', this.el);                         // * <img id="puzzf_image" 
         // todo console.log('this.el.parentNode = ', this.el.parentNode);   // * <div id="puzzf_mask"
            this.el.parentNode.insertBefore(this.container, this.el), // * insert this.container before this.el
            this.container.appendChild(this.el),
            (this.container.style.overflow = "hidden"),
            (this.container.style.position = "relative"),
            (this.el.style.webkitTransformOrigin = "0% 0%"),
            (this.el.style.mozTransformOrigin = "0% 0%"),
            (this.el.style.msTransformOrigin = "0% 0%"),
            (this.el.style.oTransformOrigin = "0% 0%"),
            (this.el.style.transformOrigin = "0% 0%"),
            // (this.el.style.width = "2000px"),
            // (this.el.style.height = "2000px"),
            (this.el.style.position = "absolute");
        },
        end: function () {
          (this.hasInteraction = !1), this.sanitize(), this.update();
        },
        bindEvents: function () {
          var a = this;
          g(this.container, this),
            (this.resizeHandler = this.update.bind(this)),
            window.addEventListener("resize", this.resizeHandler),
            Array.from(this.el.querySelectorAll("img")).forEach(function (b) {
              b.addEventListener("load", a.update.bind(a));
            }),
            "IMG" === this.el.nodeName &&
              this.el.addEventListener("load", this.update.bind(this));
        },
        update: function (a) {
          a &&
            "resize" === a.type &&
            (this.updateAspectRatio(), this.setupOffsets()),
            a &&
              "load" === a.type &&
              (this.updateAspectRatio(), this.setupOffsets());                    // ?? !! ?? here if we remove this.setupOffsets() our image will have top:0 left:0 px
          this.updatePlanned ||
            ((this.updatePlanned = !0),
            window.setTimeout(
              function () {
                this.updatePlanned = !1;
  
                // console.log('###this.getInitialZoomFactor() = ', this.getInitialZoomFactor());
                // console.log('###this.zoomFactor = ', this.zoomFactor); // * = 1
  
                var a = this.getInitialZoomFactor() * this.zoomFactor,
  
                  b = -this.offset.x / a,   // todo commented 513
                  // b =  (this.el.offsetWidth - this.container.offsetWidth) / 2; // todo changed to 514  hide part of img under mask
  
                  c = -this.offset.y / a, // todo commented 514
                  // c = 0,                  // todo changed to 515    get no top:px in 'y'
  
                  d =
                    "scale3d(" +
                    a +                        // todo a +  changed to  1 +
                    ", " +
                    a +                        // todo a +  changed to  1 +
                    ",1) translate3d(" +
                    b +
                    "px," +
                    c +
                    "px,0px)",
                  e =
                    "scale(" +
                    a +           // todo a +  changed to  1 +
                    ", " +
                    a +            // todo a +  changed to  1 +
                    ") translate(" +
                    b +
                    "px," +
                    c +
                    "px)",
                  f = function () {
                    this.clone &&
                      (this.clone.parentNode.removeChild(this.clone),
                      delete this.clone);
                  }.bind(this);
                !this.options.use2d || this.hasInteraction || this.inAnimation
                  ? ((this.is3d = !0),
                    f(),
                    (this.el.style.webkitTransform = d),
                    (this.el.style.mozTransform = e),
                    (this.el.style.msTransform = e),
                    (this.el.style.oTransform = e),
                    (this.el.style.transform = d))
                  : (this.is3d &&
                      ((this.clone = this.el.cloneNode(!0)),
                      (this.clone.style.pointerEvents = "none"),
                      this.container.appendChild(this.clone),
                      window.setTimeout(f, 200)),
                    (this.el.style.webkitTransform = e),
                    (this.el.style.mozTransform = e),
                    (this.el.style.msTransform = e),
                    (this.el.style.oTransform = e),
                    (this.el.style.transform = e),
                    (this.is3d = !1));
              }.bind(this),
              0
            ));
        },
        enable: function () {
          this.enabled = !0;
        },
        disable: function () {
          this.enabled = !1;
        },
        destroy: function () {
          window.removeEventListener("resize", this.resizeHandler),
            this.container && (this.container.remove(), (this.container = null));
        },
      }; // *     end of  d.prototype = {
      
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
      
  
     // *  sanitizeOffset: function (c) {    have  this:         
        // * h = b(f, 0),
          //   // console.log('h = ', h); // * h = 0
          // *  i = b(g, 0),
          //   // console.log('i = ', i); // * i = 0
          // *  j = a(f, 0) - this.options.horizontalPadding,
          //   // console.log('j = ', j); // * j = 0
          // * k = a(g, 0) - this.options.verticalPadding;
          //   // console.log('k = ', k); // * k = 203.8827361563518 = g
  
          // * return { x: a(b(c.x, j), h), y: a(b(c.y, k), i) };     // * all this letter which are below in code
  
      var g = function (a, b) {
        var c = null,
          d = 0,
          e = null,
          f = null,
          g = function (a, d) {
            c !== a &&
              (c &&
                !a &&
                ("zoom" === c
                  ? b.handleZoomEnd(d)
                  : "drag" === c
                  ? b.handleDragEnd(d)
                  : void 0),
              "zoom" === a
                ? b.handleZoomStart(d)
                : "drag" === a
                ? b.handleDragStart(d)
                : void 0);
            c = a;
          },
          h = function (a) {
            2 === d
              ? g("zoom")
              : 1 === d && b.canDrag()
              ? g("drag", a)
              : g(null, a);
          },
          i = function (a) {
            return Array.from(a).map(function (a) {
              return { x: a.pageX, y: a.pageY };
            });
          },
          j = function (c, a) {
            var d,
              e,
              b = Math.sqrt;
            return (d = c.x - a.x), (e = c.y - a.y), b(d * d + e * e);
          },
          k = function (a, b) {
            var c = j(a[0], a[1]),
              d = j(b[0], b[1]);
            return d / c;
          },
          l = function (a) {
            a.stopPropagation(), a.preventDefault();
          },
          m = function (a) {
            var f = new Date().getTime();
            1 < d && (e = null);
            300 > f - e
              ? (l(a),
                b.handleDoubleTap(a),
                "zoom" === c
                  ? b.handleZoomEnd(a)
                  : "drag" === c
                  ? b.handleDragEnd(a)
                  : void 0)
              : (b.isDoubleTap = !1);
            1 === d && (e = f);
          },
          n = !0;
        a.addEventListener(
          "touchstart",
          function (a) {
            b.enabled && ((n = !0), (d = a.touches.length), m(a));
          },
          { passive: !1 }
        ),
          a.addEventListener(
            "touchmove",
            function (a) {
              b.enabled &&
                !b.isDoubleTap &&
                (n
                  ? (h(a), c && l(a), (f = i(a.touches)))
                  : ("zoom" === c
                      ? 2 == f.length &&
                        2 == a.touches.length &&
                        b.handleZoom(a, k(f, i(a.touches)))
                      : "drag" === c
                      ? b.handleDrag(a)
                      : void 0,
                    c && (l(a), b.update())),
                (n = !1));
            },
            { passive: !1 }
          ),
          a.addEventListener("touchend", function (a) {
            b.enabled && ((d = a.touches.length), h(a));
  
            // console.log('a = ', a); // * touchend { target: img#puzzf_image, isTrusted: true, touches: TouchList, targetTouches: TouchList, changedTouches: TouchList, altKey: false, metaKey: false, ctrlKey: false, shiftKey: false, view: Window, … }
            // console.log('b = ', b); // * Object { el: img#puzzf_image, zoomFactor: 1, lastScale: 1, offset: {…}, initialOffset: {…}, options: {…}, container: div.pinch-zoom-container, resizeHandler: update(), updatePlanned: true, enabled: true, … }
            // console.log('b.el = ', b.el);  // * b.el = <img id="puzzf_image" 
  
            // alert('touchend');
            // console.log('touchend');
  
            // var a = document.createElement("img"); // create img tag
            // a.setAttribute('id', 'a');
            // a.style.width = 100 + 'px';
            // a.style.height = 100 + 'px';
            // a.style.position = 'absolute';
            // a.style.left = '0';
            // a.style.top = '0';
            // a.style.outline = '1px solid grey';
            // a.style.zIndex = '10000';
            // a.style.backgroundColor = 'black';
  
            // document.body.appendChild(a);
  
  
            // console.log('a.target.style.transform = ', a.target.style.transform);
  
          // *  console.log('b=', b);
          // * Object { el: img#puzzf_image, zoomFactor: 1, lastScale: 1, offset: {…}, initialOffset: {…}, options: {…}, container: div.pinch-zoom-container, resizeHandler: update(), updatePlanned: false, _isOffsetsSet: true, … }
  
  
  
            // * console.log('b_x=', b.offset.x);  // ! coordinates of our dragged element       to left top +   to bottom right have -
            // * console.log('b_y=', b.offset.y);
            // * b_x = 0  b_y = -50 картинка сдвинута вниз(!) по y 
  
            // console.log('zoomFactor=', b.zoomFactor);
            // // alert(b.zoomFactor);         // ! scaling value
  
            // let img_el_for_canvas = document.getElementById('puzzf_image');   // * for dragElement(img_el);
            // console.log('img_el_for_canvas = ', img_el_for_canvas);
            // let img_transform = img_el_for_canvas.style.transform;
            // console.log('img_transform = ', img_transform);
            
            const mask_aspect_ratio = 3/4;
  
            const image = new Image();
            canvas_1 = document.getElementById('canvas_1');
  
  
  
            // alert('3');
  
  
  
            canvas_2 = document.getElementById('canvas_2');
            canvas_3 = document.getElementById('canvas_3');
            canvas_4 = document.getElementById('canvas_4');
  
  
           
            ctx_1 = canvas_1.getContext('2d', {willReadFrequently: true});
            ctx_1.clearRect(0, 0, canvas_1.width, canvas_1.height);
  
            ctx_2 = canvas_2.getContext('2d', {willReadFrequently: true});
            ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);
  
            ctx_3 = canvas_3.getContext('2d', {willReadFrequently: true});
            ctx_3.clearRect(0, 0, canvas_3.width, canvas_3.height);
  
            ctx_4 = canvas_4.getContext('2d', {willReadFrequently: true});
            ctx_4.clearRect(0, 0, canvas_4.width, canvas_4.height);
  
  
  
            
        
  
  
            let img_el_for_canvas = document.getElementById('puzzf_image');   // * for dragElement(img_el);
            // console.log('img_el_for_canvas = ', img_el_for_canvas);
            let img_src_for_canvas = img_el_for_canvas.getAttribute('src');
            let img_width = img_el_for_canvas.offsetWidth;
            let img_height = img_el_for_canvas.offsetHeight;
            // console.log('img_width = ', img_width);
            // console.log('img_height = ', img_height);
            let ratio = img_width / img_height;
  
            // console.log(b.width);
        
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
            // ! OR THIS 
  
  
  
  
  
  
  
  // ! here we CAN SEE the created additional img (from canvas_1 img)
  
            
            ctx_1.drawImage(image,  // * what element to use (video, or image or canvas)
              0, 0,  
              image.width, image.height,   // * if image.width / 2  have stretched img in x
              -b.offset.x / 4.3, -b.offset.y / 4.3,   // * if  -b.offset.y / 4.3 replace with -b.offset.y 
                                                        // * then when move img to bottom on 10 pixels - it moves on much more than 10 pixels -  
              ratio >= 0.75  
                ? canvas_1.width * b.zoomFactor   // * we have landscape img and here is our width
                : (canvas_1.height * ratio) * b.zoomFactor,   // * we have portrait img and here is our calculated width
              ratio >= 0.75 
                ? (canvas_1.width / ratio) * b.zoomFactor   // * // * we have landscape img and here is our calculated height
                : canvas_1.height * b.zoomFactor);     // * we have portrait img and here is our height
  
            ctx_2.drawImage(image,
              0, 0,   
              image.width, image.height,   
              -b.offset.x / 4.3, -b.offset.y / 4.3,     
              ratio >= 0.75 
                ? canvas_2.width * b.zoomFactor 
                : (canvas_2.height * ratio) * b.zoomFactor,
              ratio >= 0.75 
                ? (canvas_2.width / ratio) * b.zoomFactor 
                : canvas_2.height * b.zoomFactor); 
      
            ctx_3.drawImage(image,
              0, 0,   // Start at x/y pixels from the left and the top of the image (crop),
              image.width, image.height,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
              -b.offset.x / 4.3, -b.offset.y / 4.3,     // Place the result at 0, 0 in the canvas,
              ratio >= 0.75 
                ? canvas_3.width * b.zoomFactor 
                : (canvas_3.height * ratio) * b.zoomFactor,
              ratio >= 0.75 
                ? (canvas_3.width / ratio) * b.zoomFactor 
                : canvas_3.height * b.zoomFactor);  // With as width / height: 100 * 100 (scale)
      
            ctx_4.drawImage(image,
              0, 0,   // Start at x/y pixels from the left and the top of the image (crop),
              image.width, image.height,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
              -b.offset.x / 4.3, -b.offset.y / 4.3,     // Place the result at 0, 0 in the canvas,
              ratio >= 0.75 
                ? canvas_4.width * b.zoomFactor 
                : (canvas_4.height * ratio) * b.zoomFactor,
              ratio >= 0.75 
                ? (canvas_4.width / ratio) * b.zoomFactor 
                : canvas_4.height * b.zoomFactor);  // With as width / height: 100 * 100 (scale)
      
  
  
  // ! here we CANNOT the created additional img (from canvas_1 img)
  
  
  
      // ! on desktop (in phone design) we can see ALL alerts, but on on phone device - no
  
  // !  our alert is visible(on phone device)         !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // alert('1');
  if(img_el_for_canvas.getAttribute('src') !== 'images/upload_image_line_text_grey_v1.svg'){
  
  
  
    
    let url = canvas_1.toDataURL();   // ??????????? HERE !!!!!!!!!!!!!!!!! if we delete this line (and also this:   newImg.src = url;  --> we have no problem - we see our created img in left-top corner)
    // ! our alert is not visible(on phone device)    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
    if(document.getElementById("puzzf_cropped_img") !== null  
      && document.getElementById("puzzf_cropped_img_2") !== null
      && document.getElementById("puzzf_cropped_img_3") !== null
      && document.getElementById("puzzf_cropped_img_4") !== null){
  
      let delete_old_img = document.getElementById("puzzf_cropped_img");
      delete_old_img.remove();
  
      let delete_old_img_2 = document.getElementById("puzzf_cropped_img_2");
      delete_old_img_2.remove();
  
      let delete_old_img_3 = document.getElementById("puzzf_cropped_img_3");
      delete_old_img_3.remove();
  
      let delete_old_img_4 = document.getElementById("puzzf_cropped_img_4");
      delete_old_img_4.remove();
    }
  
    // var delete_old_img = document.getElementById("puzzf_cropped_img"); // create img tag
    let newImg = document.createElement("img"); // create img tag
  
    newImg.setAttribute('id', 'puzzf_cropped_img');
    newImg.style.width = canvas_1.width + 'px';
    newImg.style.height = canvas_1.height + 'px';
    newImg.style.position = 'absolute';
    newImg.style.left = '0';
    newImg.style.top = -canvas_1.height + 'px';
    newImg.style.outline = '1px solid grey';
    newImg.style.zIndex = '10000';
    newImg.style.opacity = '0';
  
  
  newImg.src = url;
  
  
  
  
    document.body.appendChild(newImg); // add to end of your document
    // var get_new_blk = document.getElementById('puzzf_cropped_img');
    // console.log('get_new_blk.src = ', get_new_blk);
    cropped_img = newImg;
    // console.log('after cropped_img = ', cropped_img);
  
  
  
  
        // var delete_old_img = document.getElementById("puzzf_cropped_img"); // create img tag
        let newImg_2 = document.createElement("img"); // create img tag
  
        newImg_2.setAttribute('id', 'puzzf_cropped_img_2');
        newImg_2.style.width = canvas_2.width + 'px';
        newImg_2.style.height = canvas_2.height + 'px';
        newImg_2.style.position = 'absolute';
        newImg_2.style.left = canvas_2.width + 'px';
        newImg_2.style.top = -canvas_2.height + 'px';
        newImg_2.style.outline = '1px solid grey';
        newImg_2.style.zIndex = '10000';
        newImg_2.style.opacity = '0';
    
    
      newImg_2.src = url;
    
    
    
    
        document.body.appendChild(newImg_2); // add to end of your document
        // var get_new_blk = document.getElementById('puzzf_cropped_img');
        // console.log('get_new_blk.src = ', get_new_blk);
        cropped_img_2 = newImg_2;
        // console.log('after cropped_img = ', cropped_img);
  
  
  
  
            // var delete_old_img = document.getElementById("puzzf_cropped_img"); // create img tag
    let newImg_3 = document.createElement("img"); // create img tag
  
    newImg_3.setAttribute('id', 'puzzf_cropped_img_3');
    newImg_3.style.width = canvas_3.width + 'px';
    newImg_3.style.height = canvas_3.height + 'px';
    newImg_3.style.position = 'absolute';
    newImg_3.style.left = canvas_3.width * 2 + 'px';
    newImg_3.style.top = -canvas_3.height + 'px';
    newImg_3.style.outline = '1px solid grey';
    newImg_3.style.zIndex = '10000';
    newImg_3.style.opacity = '0';
  
  
  newImg_3.src = url;
  
  
  
  
    document.body.appendChild(newImg_3); // add to end of your document
    // var get_new_blk = document.getElementById('puzzf_cropped_img');
    // console.log('get_new_blk.src = ', get_new_blk);
    cropped_img_3 = newImg_3;
    // console.log('after cropped_img = ', cropped_img);
  
  
  
  
  
        // var delete_old_img = document.getElementById("puzzf_cropped_img"); // create img tag
        let newImg_4 = document.createElement("img"); // create img tag
  
        newImg_4.setAttribute('id', 'puzzf_cropped_img_4');
        newImg_4.style.width = canvas_4.width + 'px';
        newImg_4.style.height = canvas_4.height + 'px';
        newImg_4.style.position = 'absolute';
        newImg_4.style.left = canvas_4.width * 3 + 'px';
        newImg_4.style.top = -canvas_4.height + 'px';
        newImg_4.style.outline = '1px solid grey';
        newImg_4.style.zIndex = '10000';
        newImg_4.style.opacity = '0';
  
    
    
    
      newImg_4.src = url;
    
    
    
    
        document.body.appendChild(newImg_4); // add to end of your document
        // var get_new_blk = document.getElementById('puzzf_cropped_img');
        // console.log('get_new_blk.src = ', get_new_blk);
        cropped_img_4 = newImg_4;
        // console.log('after cropped_img = ', cropped_img);
    
    let x = window.jQuery; 
    jigazo_puzzf(x);
  }
  
  
          });
   
  
  
  
      };
      return d;
    },
    PinchZoom = definePinchZoom();
  // export default PinchZoom;
  
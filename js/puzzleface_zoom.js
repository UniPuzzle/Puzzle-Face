// this.setContainerY(this.container.parentElement.offsetHeight);

// console.log('a');

let have_once = false;

"function" != typeof Object.assign &&
  Object.defineProperty(Object, "assign", {
    value: function (a) {
      if (null == a)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var b, c = Object(a), d = 1; d < arguments.length; d++)
        if (((b = arguments[d]), null != b))
          for (var e in b)
            Object.prototype.hasOwnProperty.call(b, e) && (c[e] = b[e]);
      return c;
    },
    writable: !0,
    configurable: !0,
  }),
  "function" != typeof Array.from &&
    (Array.from = function (a) {
      return [].slice.call(a);
    });
var buildElement = function (a) {
    // console.log('a = ', a);               // ! a =  <div class="pinch-zoom-container"></div>
    var b = document.implementation.createHTMLDocument("");
    // console.log('b = ', b);   // ! b = HTMLDocument
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
    // console.log('Math.min = ', Math.min);
    // console.log('Math.abs = ', Math.abs);
    var a = Math.min, // * function min()   length: 2    name: "min"
      b = Math.max,
      c = Math.abs,
      save_b,
      save_c;
    (d = function (a, b) {
      (this.el = a),
        // (this.zoomFactor = 1),                            // ************** initial zoom
        (this.zoomFactor = 1),
        (this.lastScale = 1),
        (this.offset = { x: 0, y: 0 }),
        (this.initialOffset = { x: 0, y: 0 }),
        (this.options = Object.assign({}, this.defaults, b)),
        this.setupMarkup(), // ! !!!!!!!!!!!!!!!!!!!
        this.bindEvents(),
        this.update(),
        this.isImageLoaded(this.el) &&
          (this.updateAspectRatio(), this.setupOffsets()),
        this.enable();
    }),
      (e = function (c, a) {
        // console.log('c = ', c);  // ?
        // console.log('a = ', a);  // ?
        return c + a;
      }),
      (f = function (a, b) {
        return a > b - 0.01 && a < b + 0.01;
      });
    d.prototype = {
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
          (this.lastScale = 1), // ! lastScale
          (this.nthZoom = 0),
          (this.lastZoomCenter = !1),
          (this.hasInteraction = !0);
      },
      handleZoom: function (a, b) {
        var c = this.getTouchCenter(this.getTouches(a)),
          d = b / this.lastScale;

        (this.lastScale = b), // ! lastScale
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
      computeInitialOffset: function () {
        // console.log('this.el = ', this.el);     // *  <img id="puzzf_image"
        // console.log('here = ', -c(this.el.offsetWidth * this.getInitialZoomFactor() - this.container.offsetWidth) / 2) ;  // * = -0    if without -c() then we have just 0
        // console.log('here_2 = ', -c(this.el.offsetHeight * this.getInitialZoomFactor() - this.container.offsetHeight) / 2);       // * =-26.44 if without -c() then we have  = -52.88 if n
        this.initialOffset = {
          x:
            // 0,
            c(
              // todo changed '-c' on 'c'  *(changing position of img in mask(container) - by smaller side) - to change back return minus back - and see all comment with todo
              this.el.offsetWidth * this.getInitialZoomFactor() -
                this.container.offsetWidth
            ) / 2,

          y:
            // 0,
            c(
              // todo changed '-c' on 'c'   *(changing position of img in mask(container) - by smaller side) - to change back return minus back - and see all comment with todo
              this.el.offsetHeight * this.getInitialZoomFactor() -
                this.container.offsetHeight
            ) / 2,
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
      setupOffsets: function () {
        (this.options.setOffsetsOnce && this._isOffsetsSet) ||
          ((this._isOffsetsSet = !0),
          this.computeInitialOffset(), // * if comment this line - our img goes to left top corner !!!!!
          this.resetOffset());
      },
      sanitizeOffset: function (c) {
        // ? HERE !!!!!!!!!!!!!!!
        var d =
            this.el.offsetWidth * this.getInitialZoomFactor() * this.zoomFactor,
          e =
            this.el.offsetHeight *
            this.getInitialZoomFactor() *
            this.zoomFactor,
          f = d - this.getContainerX() + this.options.horizontalPadding,
          g = e - this.getContainerY() + this.options.verticalPadding,
          h = b(f, 0),
          i = b(g, 0),
          j = a(f, 0) - this.options.horizontalPadding,
          k = a(g, 0) - this.options.verticalPadding;
        return { x: a(b(c.x, j), h), y: a(b(c.y, k), i) }; // * returns left(x) and top(y) of our img!!!
      },
      scaleTo: function (a, b) {
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
              ? this.addOffset({ x: -(a.x - b.x), y: 0 }) // ???????????????????????????????
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
        // console.log('calling_addOffset');
        // console.log('a_in_addOffset = ', a);
        this.offset = { x: this.offset.x + a.x, y: this.offset.y + a.y };
      },
      sanitize: function () {
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
        //console.log('calling_getInitialZoomFactor');
        // console.log('this.container.offsetWidth = ', this.container.offsetWidth);   // * =288
        // console.log('this.container.offsetHeight = ', this.container.offsetHeight);   // * = 384
        // console.log('this.el.offsetWidth = ', this.el.offsetWidth);                 // * =614  (don't forget to load next img for console.log(614)), because first img is not that I'am working with
        // console.log('this.el.offsetHeight = ', this.el.offsetHeight);                 // * = 384

        // ! first img is always in left-top corner and we find in how many times our container is smaller in one of two sides(landscape or portrait) - we take the minimum (not division that gives us 1, but 0.86 for example)

        var b = this.container.offsetWidth / this.el.offsetWidth; // * 288 / 614 = 0.469055      = 0.862275 this is fo FIRST -> upload_image img - don't forget
        save_b = b;
        //var b = this.container.offsetWidth / this.el.offsetWidth,
        // console.log('b_in_getInitialZoomFactor = ', b); // * 1st time = Infinity , second and further =0.8622754491017964

        var c = this.container.offsetHeight / this.el.offsetHeight; // * 384 / 384 = 1
        save_c = c;
        // console.log('c_in_getInitialZoomFactor = ', c); // * =1
        // console.log('a(b, c) = ', a(b, c)); // * var a = Math.min, so 'a' function get the minimum of two numbers = 0.8622

        var maximum = Math.max(b, c); // todo  added line     *(changing position of img in mask(container) - by smaller side)!     remove(comment) for inserting by bigger side in mask(container)
        // return a(b, c); // todo(return for inserting by bigger side in mask(container) )    commented for changing(next line)
        return maximum; // todo changed       *(changing position of img in mask(container) - by smaller side)!                 remove(comment) for inserting by bigger side in mask(container)
      },

      getAspectRatio: function () {
        // console.log('this.el.offsetWidth = ', this.el.offsetWidth);
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
      getContainerX: function () {
        return this.container.offsetWidth;
      },
      getContainerY: function () {
        //console.log('this.container.offsetHeight = ', this.container.offsetHeight);
        return this.container.offsetHeight;
      },
      setContainerY: function (a) {
        return (this.container.style.height = a + "px");
      },
      unsetContainerY: function () {
        this.container.style.height = null;
      },
      setupMarkup: function () {
        (this.container = buildElement(
          '<div class="pinch-zoom-container"></div>'
        )),
          this.el.parentNode.insertBefore(this.container, this.el),
          this.container.appendChild(this.el),
          (this.container.style.overflow = "hidden"),
          (this.container.style.position = "relative"),
          (this.el.style.webkitTransformOrigin = "0% 0%"),
          (this.el.style.mozTransformOrigin = "0% 0%"),
          (this.el.style.msTransformOrigin = "0% 0%"),
          (this.el.style.oTransformOrigin = "0% 0%"),
          (this.el.style.transformOrigin = "0% 0%"),
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
            (this.updateAspectRatio(), this.setupOffsets()); // ?? !! ?? here if we remove this.setupOffsets() our image will have top:0 left:0 px
        this.updatePlanned ||
          ((this.updatePlanned = !0),
          window.setTimeout(
            function () {
              this.updatePlanned = !1;

              //  console.log('###this.getInitialZoomFactor() = ', this.getInitialZoomFactor());  // * NaN
              //  console.log('###this.zoomFactor = ', this.zoomFactor); // * = 1

              var a = this.getInitialZoomFactor() * this.zoomFactor;
              //  console.log('a = ', a);   // * 0.862275 (number) this is for upload_image img - don't forget (for my lanscape animate girls img it's 0.469055 )

              //  console.log('this.offset.x = ', this.offset.x);  // * -23    -163 for animated girls with baby
              //  console.log('this.offset.y = ', this.offset.y);  // * -0     -0

              var b = -this.offset.x / a;

              var c = -this.offset.y / a;
              // var  c = 0;                     // * changed

              var d =
                "scale3d(" +
                a +
                ", " +
                a +
                ",1) translate3d(" +
                b +
                "px," +
                c +
                "px,0px)";

              var e =
                "scale(" +
                a +
                ", " +
                a +
                ") translate(" +
                b +
                "px," +
                c +
                "px)";

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
    };
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
            // todo 19.05.23 1
            //console.log('touchstart');

            if (have_once === false) {
              if (
                document.getElementById("puzzf_pinch_zoom_icon_wrp") !== null
              ) {
                let pinch_zoom_icon = document.getElementById(
                  "puzzf_pinch_zoom_icon_wrp"
                );
                //console.log('pinch_zoom_icon = ', pinch_zoom_icon);
                // pinch_zoom_icon.style.transition = 'all 1s ease-out;';
                // pinch_zoom_icon.style.position = 'absolute';
                // pinch_zoom_icon.style.left = '';
                // pinch_zoom_icon.style.top = '';
                // pinch_zoom_icon.style.right = '0';
                // pinch_zoom_icon.style.bottom = '0';

                // pinch_zoom_icon.style.transform = 'translate(85%, 160%)';

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
            // //console.log('touchstart');
            // let pinch_zoom_icon = document.getElementById('puzzf_pinch_zoom_icon_wrp');
            // //console.log('pinch_zoom_icon = ', pinch_zoom_icon);
            // pinch_zoom_icon.style.display = 'none';
            // // pinch_zoom_icon.remove();

            // let get_img = document.getElementById('puzzf_image');
            // if(get_img.getAttribute('src') !== 'images/upload_image_line_text_grey_v1.svg'){
            //   let text_below_the_canvas = document.getElementById('puzzf_right_text');
            //   text_below_the_canvas.style.display = 'block';

            //   let text_below_the_mask = document.getElementById('puzzf_left_text');
            //   text_below_the_mask.innerHTML = 'Keep adjusting the image above, to get the best Puzzle Face image (above right).';
            // }
            // todo 19.05.23 2

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

          // todo 19.05.23 1
          //console.log('touchstart');
          if (document.getElementById("puzzf_pinch_zoom_icon_wrp") !== null) {
            let pinch_zoom_icon = document.getElementById(
              "puzzf_pinch_zoom_icon_wrp"
            );
            //console.log('pinch_zoom_icon = ', pinch_zoom_icon);
            pinch_zoom_icon.style.display = "none";
            // pinch_zoom_icon.remove();
          }
          // //console.log('touchstart');
          // let pinch_zoom_icon = document.getElementById('puzzf_pinch_zoom_icon_wrp');
          // //console.log('pinch_zoom_icon = ', pinch_zoom_icon);
          // pinch_zoom_icon.style.display = 'none';
          // // pinch_zoom_icon.remove();

          let get_img = document.getElementById("puzzf_image");
          if (
            get_img.getAttribute("src") !==
            "images/upload_image_line_grey_v1.svg"
          ) {
            let text_below_the_canvas =
              document.getElementById("puzzf_right_text");
            text_below_the_canvas.style.display = "none";

            let text_below_the_mask =
              document.getElementById("puzzf_left_text");
            text_below_the_mask.innerHTML =
              text_below_the_mask.innerHTML = `<p class="puzzf_left_text">
                <span class="puzzf_left_text--bold">TIP:&#32;</span>Keep adjusting the image until you get the best Puzzle Face result.
              </p>`;
          }
          // todo 19.05.23 2

          const image = new Image();
          canvas_1 = document.getElementById("canvas_1");
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
          // console.log('img_width = ', img_width);
          // console.log('img_height = ', img_height);
          let ratio = img_width / img_height;

          image.src = img_src_for_canvas;
          // image.addEventListener('load', () => {

          // console.log('img_el_for_canvas.getAttribute(src) = ', img_el_for_canvas.getAttribute('src'))
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
            // * because our canvas is much more smaller - so we have to make our b.offset.x(y) smaller by division (4.2 for example -> in about 4 times smaller canvas we have)
            -b.offset.x / mask_canvas_diff_width,
            -b.offset.y / mask_canvas_diff_height,
            // * insert our img in canvas with offset (left-top corner)
            // * -b.offset.x moves img to left under(overflow hidden) the mask(landscape example)
            // * we dont need zoomFactor here - bacause it will be included with sides of canvas(bottom lines)
            // * it's enough to add  * zoomFactor only for sides of canvas - thats all

            // * 3)
            ratio >= 0.75
              ? // * canvas_1.height * ratio   -> is (small)width of img(landscape example) - small img - that we inserting in canvas(not big img)
                // * and  * b.zoomFactor   is needed because our img can be zoomed in mask - and also in canvas
                // * as we start from canvas_1.height (small CANVAS side - so we do not need division by mask_canvas_diff_width)
                canvas_1.height * ratio * b.zoomFactor // * zoomFactor is enough for changing we do not need anything else
              : canvas_1.width * b.zoomFactor,
            ratio >= 0.75
              ? canvas_1.height * b.zoomFactor
              : (canvas_1.width / ratio) * b.zoomFactor
          );

          // ctx_2.drawImage(image,
          //   0, 0,
          //   image.width , image.height,

          //   -b.offset.x / mask_canvas_diff_width, -b.offset.y / mask_canvas_diff_height,
          //   ratio >= 0.75
          //     ? (canvas_2.height * ratio) * b.zoomFactor
          //     : canvas_2.width * b.zoomFactor,
          //   ratio >= 0.75
          //     ? canvas_2.height * b.zoomFactor
          //     : (canvas_2.width / ratio) * b.zoomFactor);

          //   ctx_3.drawImage(image,
          //     0, 0,
          //     image.width , image.height,

          //     -b.offset.x / mask_canvas_diff_width, -b.offset.y / mask_canvas_diff_height,
          //     ratio >= 0.75
          //       ? (canvas_3.height * ratio) * b.zoomFactor
          //       : canvas_3.width * b.zoomFactor,
          //     ratio >= 0.75
          //       ? canvas_3.height * b.zoomFactor
          //       : (canvas_3.width / ratio) * b.zoomFactor);

          //   ctx_4.drawImage(image,
          //     0, 0,
          //     image.width , image.height,

          //     -b.offset.x / mask_canvas_diff_width, -b.offset.y / mask_canvas_diff_height,
          //     ratio >= 0.75
          //       ? (canvas_4.height * ratio) * b.zoomFactor
          //       : canvas_4.width * b.zoomFactor,
          //     ratio >= 0.75
          //       ? canvas_4.height * b.zoomFactor
          //       : (canvas_4.width / ratio) * b.zoomFactor);

          // ! here we CANNOT the created additional img (from canvas_1 img)

          // ! on desktop (in phone design) we can see ALL alerts, but on on phone device - no

          // !  our alert is visible(on phone device)         !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // alert('1');

          if (
            img_el_for_canvas.getAttribute("src") !==
            "images/upload_image_line_grey_v1.svg"
          ) {
            let get_overlay = document.getElementById("puzzf_overlay_ph");
            get_overlay.style.display = "block";

            let url = canvas_1.toDataURL(); // ??????????? HERE !!!!!!!!!!!!!!!!! if we delete this line (and also this:   newImg.src = url;  --> we have no problem - we see our created img in left-top corner)
            // ! our alert is not visible(on phone device)    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            // base64result = url.split(',')[1];
            base64result = url;
            //console.log('##base64result = ', base64result);

            if (document.getElementById("puzzf_cropped_img") !== null) {
              // && document.getElementById("puzzf_cropped_img_2") !== null
              // && document.getElementById("puzzf_cropped_img_3") !== null
              // && document.getElementById("puzzf_cropped_img_4") !== null){

              let delete_old_img = document.getElementById("puzzf_cropped_img");
              delete_old_img.remove();

              // let delete_old_img_2 = document.getElementById("puzzf_cropped_img_2");
              // delete_old_img_2.remove();

              // let delete_old_img_3 = document.getElementById("puzzf_cropped_img_3");
              // delete_old_img_3.remove();

              // let delete_old_img_4 = document.getElementById("puzzf_cropped_img_4");
              // delete_old_img_4.remove();
            }

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

            //   document.body.appendChild(newImg_2); // add to end of your document
            //   // var get_new_blk = document.getElementById('puzzf_cropped_img');
            //   // console.log('get_new_blk.src = ', get_new_blk);
            //   cropped_img_2 = newImg_2;
            //   // console.log('after cropped_img = ', cropped_img);

            //           // var delete_old_img = document.getElementById("puzzf_cropped_img"); // create img tag
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

            //   document.body.appendChild(newImg_3); // add to end of your document
            //   // var get_new_blk = document.getElementById('puzzf_cropped_img');
            //   // console.log('get_new_blk.src = ', get_new_blk);
            //   cropped_img_3 = newImg_3;
            //   // console.log('after cropped_img = ', cropped_img);

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

            //   document.body.appendChild(newImg_4); // add to end of your document
            //   // var get_new_blk = document.getElementById('puzzf_cropped_img');
            //   // console.log('get_new_blk.src = ', get_new_blk);
            //   cropped_img_4 = newImg_4;
            //   // console.log('after cropped_img = ', cropped_img);

            let x = window.jQuery;
            jigazo_puzzf(x);
          }
        });
    };
    return d;
  },
  PinchZoom = definePinchZoom();
// export default PinchZoom;

!(function (x) {
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
  function y(t, r, a, e, n) {
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
        c.drawImage(h[o[s]][r], -a / 2, -a / 2, a, a),
        c.restore();
    }
  }
  function C(t, r, a, e) {
    return e * (0.21 * t + 0.72 * r + 0.07 * a) + 255 * (1 - e);
  }
  function N(t) {
    if (t == k && L && L.image_tiles) {
      var r = x("#cost_function").val();
      if (((L[r] = L[r] || {}), !L[r].costs)) {
        if ("sse" == r) a = s;
        else if ("sse2" == r) a = u;
        else if ("sse3" == r) a = m;
        else {
          if ("key_regions" != r) throw new Error("Unrecognized cost");
          a = w;
        }
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
        (r = L.is_portrait),
        y(x("#" + a + "_tiles")[0], "tileData", e, t, r),
        y(x("#" + a + "_symbols")[0], "symbolData", n, t, r);
    }
  }
  function A(t, r) {
    var a;
    r == k &&
      ((r = t.target.result),
      (t = new Image()),
      x(t).load(
        ((a = k),
        function (t) {
          !(function (t, r) {
            if (r == k) {
              x("#status").text("");
              var a = t.target,
                e = x("#orig")[0],
                n = a.height > a.width;
              (L.is_portrait = n)
                ? ((e.width = b * I), (e.height = b * D))
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
              a = x("#grayscale")[0];
              (a.width = e.width),
                (a.height = e.height),
                (t = a.getContext("2d")).putImageData(o, 0, 0),
                (L.image_tiles = w),
                N(r);
            }
          })(t, a);
        })
      ),
      x(t).error(function () {
        x("#status").text("Error: could not read image");
      }),
      x(t).attr("src", r));
  }
  function t() {
    var t,
      r,
      a = x("#file_input")[0].files;
    1 == a.length
      ? (k++,
        (L = {}),
        x("#status").text("Processing..."),
        ((t = new FileReader()).onload =
          ((r = k),
          function (t) {
            A(t, r);
          })),
        t.readAsDataURL(a[0]))
      : x("#status").text("Select an image");
  }
  x(document).ready(function () {
    x("#status").text("Loading..."),
      (function (u) {
        for (var t = 0; t < E; t++) h[t] = {};
        var r = new Image();
        (r.src = "images/tiles.png"),
          (r.onload = function (t) {
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
          }),
          ((r = new Image()).src = "images/symbols.png"),
          (r.onload = function (t) {
            for (var r = t.target, a = 0; a < E; a++)
              h[a].symbolData = v(r, a, 64);
            (o = !0), d() && u();
          });
      })(t),
      x("#file_input").change(function () {
        d() && t();
      }),
      x("#cost_function").change(function () {
        N(k);
      }),
      x("#matching_symbols_link").click(function () {
        var t,
          r = x("#cost_function").val();
        return (
          L[r] &&
            L[r].matching &&
            ((t = document.createElement("canvas")),
            (L[r] = L[r] || {}),
            y(t, "symbolData", 64, L[r].matching, L.is_portrait),
            window.open(t.toDataURL())),
          !1
        );
      }),
      x("#toggle_advanced").click(function () {
        x("#advanced").toggle();
      }),
      x("noscript").remove(),
      x("div.input").show(),
      x("#file_img").click(function () {
        return x("#file_input").trigger("click"), !1;
      });
  });
})(window.jQuery);

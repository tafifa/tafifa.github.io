!(function () {
  var t = {
      307: function () {
        !(function (t) {
          const e = {
            gridSelector: ".bsb-project-1-grid",
            itemSelector: ".bsb-project-1-item",
            grid: "",
            initiated() {
              const t = document.querySelector(e.gridSelector);
              null != t && t.classList.add("bsb-project-1-initiated");
            },
            init() {
              const n = t(e.gridSelector);
              n.length > 0 &&
                ((e.grid = n.imagesLoaded(function () {
                  e.grid.isotope({
                    itemSelector: e.itemSelector,
                    layoutMode: "packery",
                    transitionDuration: "0.8s",
                  });
                })),
                e.initiated());
            },
          };
          "loading" === document.readyState &&
            document.addEventListener("DOMContentLoaded", function () {}),
            window.addEventListener(
              "load",
              function () {
                e.init();
              },
              !1
            );
        })(jQuery);
      },
    },
    e = {};
  function n(o) {
    var r = e[o];
    if (void 0 !== r) return r.exports;
    var i = (e[o] = { exports: {} });
    return t[o](i, i.exports, n), i.exports;
  }
  (n.n = function (t) {
    var e =
      t && t.__esModule
        ? function () {
            return t.default;
          }
        : function () {
            return t;
          };
    return n.d(e, { a: e }), e;
  }),
    (n.d = function (t, e) {
      for (var o in e)
        n.o(e, o) &&
          !n.o(t, o) &&
          Object.defineProperty(t, o, { enumerable: !0, get: e[o] });
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (function () {
      "use strict";
      n(307);
    })();
})();

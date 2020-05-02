// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/slide.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var saiSlide =
/*#__PURE__*/
function () {
  function saiSlide(el, opts) {
    _classCallCheck(this, saiSlide);

    this.DOM = {
      el: el
    };
    this._opts = opts || {};
    this.config = {
      saiSlSpeed: this._opts.saiSlSpeed || 800,
      saiSlDelay: this._opts.saiSlDelay || 3000,
      saiSlDuration: this._opts.saiSlDuration || 3,
      saiSlLoop: this._opts.saiSlLoop || true,
      saiGsapDuration: this._opts.saiGsapDuration || 1,
      saiGsapEase: this._opts.saiGsapEase || "ease",
      saiGsapDelay: this._opts.saiGsapDelay || 0.05
    };
    this.init();
  }

  _createClass(saiSlide, [{
    key: "init",
    value: function init() {
      this.assignElements();
      this.assignComponents();
      this.assignEventHandler();
    }
  }, {
    key: "assignElements",
    value: function assignElements() {
      this._swiperItem = this.DOM.el.querySelector(".swiper-slide");
      this._swiperPagination = this.DOM.el.querySelector(".slideshow-pagination");
      this._swiperNavigation = this.DOM.el.querySelector(".slideshow-navigation");
      this._swiperNavigationPrev = this.DOM.el.querySelector(".prev");
      this._swiperNavigationNext = this.DOM.el.querySelector(".next");
      this._swiperTitle = this.DOM.el.querySelectorAll('.slide-title');

      this._swiperTitle.forEach(function (slText, i) {
        var _array = slText.textContent.split("");

        var _html = '';

        _array.forEach(function (txt) {
          _html += '<span class="text">' + txt + '</span>';
        });

        slText.innerHTML = _html;
      });
    }
  }, {
    key: "assignComponents",
    value: function assignComponents() {
      var self = this;
      this.saislide = new Swiper(this.DOM.el, {
        speed: this.config.saiSlSpeed,
        loop: this.config.saiSlLoop,
        preloadImages: true,
        updateOnImagesReady: true,
        autoplay: {
          delay: this.config.saiSlDelay,
          disableOnInteraction: false
        },
        pagination: {
          duration: this.config.saiSlDuration
        },
        navigation: {
          nextEl: this._swiperNavigationNext,
          prevEl: this._swiperNavigationPrev
        },
        on: {
          init: function init() {
            self.onMoveNext();
          }
        }
      });
    }
  }, {
    key: "assignEventHandler",
    value: function assignEventHandler() {
      var _this = this;

      this.saislide.on('slideNextTransitionStart', function () {
        return _this.onMoveNext();
      });
      this.saislide.on('slidePrevTransitionStart', function () {
        return _this.onMovePrev();
      });
    }
  }, {
    key: "onMovePrev",
    value: function onMovePrev() {
      this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active'), this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image'), this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-title'), this.DOM.activeSlideTitleLetters = [].slice.call(this.DOM.activeSlideTitle.querySelectorAll('span')).reverse();
      this.DOM.oldSlide = this.DOM.el.querySelector('.swiper-slide-next');
      this.onMove('prev');
    }
  }, {
    key: "onMoveNext",
    value: function onMoveNext() {
      this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active'), this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image'), this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-title'), this.DOM.activeSlideTitleLetters = this.DOM.activeSlideTitle.querySelectorAll('span');
      this.DOM.oldSlide = this.DOM.el.querySelector('.swiper-slide-prev');
      this.onMove('next');
    }
  }, {
    key: "onMove",
    value: function onMove(direction) {
      if (this.DOM.oldSlide) {
        this.DOM.oldSlideTitle = this.DOM.oldSlide.querySelector('.slide-title'), this.DOM.oldSlideTitleLetters = this.DOM.oldSlideTitle.querySelectorAll('span'); // 초기화

        gsap.set(this.DOM.oldSlideTitleLetters, {
          autoAlpha: 0,
          y: -100,
          delay: this.config.saiSlDelay
        });
      } // 애니메이션


      gsap.fromTo(this.DOM.activeSlideTitleLetters, {
        autoAlpha: 0,
        y: -100
      }, {
        autoAlpha: 1,
        y: 0,
        duration: this.config.saiGsapDuration,
        stagger: 0.05,
        ease: this.config.saiGsapEase,
        delay: this.config.saiGsapEelay
      }); //백그라운드

      gsap.fromTo(this.DOM.activeSlideImg, {
        x: direction === 'next' ? 200 : -200
      }, {
        x: 0,
        ease: "slow(0.5, 0.4, false)",
        duration: 1.2
      });
    }
  }]);

  return saiSlide;
}();

;
var saislide = new saiSlide(document.querySelector('.slideshow'), {
  saiGsapDuration: 0.7,
  saiGsapEase: "back.out(1.7)"
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "3998" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/slide.js"], null)
//# sourceMappingURL=/slide.609957ed.js.map
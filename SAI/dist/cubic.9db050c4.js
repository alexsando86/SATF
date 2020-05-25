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
})({"js/cubic.js":[function(require,module,exports) {
// stupid FF FOUT fix
$("h1 span").css("display", "inline-block");
var canvas = document.getElementById("curve"),
    ctx = canvas.getContext("2d"),
    box = document.getElementById("box"),
    code = document.getElementById("codeOutput"),
    supportsTouch = "createTouch" in document,
    time = document.getElementById("time"),
    timeVal = 500;

var supportsBezierRange = function () {
  var el = document.createElement("div");
  el.style.WebkitTransitionTimingFunction = "cubic-bezier(1,0,0,1.1)";
  return !!el.style.WebkitTransitionTimingFunction.length;
}(); // bezier contructor


function BezierHandle(x, y) {
  this.x = x;
  this.y = y;
  this.width = 12;
  this.height = 12;
}

BezierHandle.prototype = {
  // get the edges for easy grabby coordinates
  getSides: function getSides() {
    this.left = this.x - this.width / 2;
    this.right = this.left + this.width;
    this.top = this.y - this.height / 2;
    this.bottom = this.top + this.height;
  },
  draw: function draw() {
    // figure out the edges
    this.getSides();
    ctx.fillStyle = "#222";
    ctx.fillRect(this.left, this.top, this.width, this.height);
  }
}; // make 2 new handles

var handles = [new BezierHandle(50, 280), new BezierHandle(150, 180)];

function Graph() {
  this.x = 0;
  this.y = 130;
  this.height = 200;
  this.width = 200;
}

Graph.prototype = {
  draw: function draw() {
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, this.width, this.height); // the 0.5 offset is to account for stroke width to make lines sharp

    ctx.strokeStyle = "#666";
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x + 0.5, this.y - 0.5, this.width - 1, this.height);
    ctx.restore();
  }
};
var graph = new Graph(); // get the x and y pos, normalized by getOffset

function getPos(event) {
  var mouseX = event.pageX - getOffSet(event.target).left,
      mouseY = event.pageY - getOffSet(event.target).top;
  return {
    x: mouseX,
    y: mouseY
  };
} //from quirksmode.org. Modified slightly to return obj


function getOffSet(obj) {
  var curleft = curtop = 0;

  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);

    return {
      left: curleft,
      top: curtop
    };
  }
}

var drag = false,
    draggingObj,
    oldX,
    oldY;

function onPress(event) {
  //console.log('press')
  // to get rid of text cursor
  event.preventDefault();
  event.stopPropagation(); //not sure if this is needed

  var cursorEvent = supportsTouch ? event.touches[0] : event;
  var mouseCoordinates = getPos(cursorEvent),
      x = mouseCoordinates.x,
      y = mouseCoordinates.y; //check to see if over any handles

  for (var i = 0; i < handles.length; i++) {
    var current = handles[i],
        curLeft = current.left,
        curRight = current.right,
        curTop = current.top,
        curBottom = current.bottom; //20 px padding for chubby fingers

    if (supportsTouch) {
      curLeft -= 20;
      curRight += 20;
      curTop -= 20;
      curBottom += 20;
    } //console.log('current.x:',current.x, 'current.y:',current.y)


    if (x >= curLeft && x <= curRight && y >= curTop && y <= curBottom) {
      //over the current handle
      //console.log('over')
      //drag = true;
      draggingObj = current;
      oldX = event.pageX;
      oldY = event.pageY;
      var currentlySelected = $("#presets option:selected");
      currentlySelected.removeAttr("selected").parent().parent().find("option").last().attr("selected", "selected");
      document.addEventListener("mouseup", onRelease, false);
      document.addEventListener("touchend", touchEnd, false);
      document.addEventListener("mousemove", onMove, false);
      document.addEventListener("touchmove", touchMove, false); // set move cursor

      document.body.style.cursor = canvas.style.cursor = "move";
    }
  }
}

function onMove(event) {
  var cursorEvent = supportsTouch ? event.touches[0] : event;
  var x = cursorEvent.pageX - getOffSet(canvas).left,
      y = cursorEvent.pageY - getOffSet(canvas).top;

  if (x > graph.width) {
    x = graph.width;
  }

  if (x < 0) {
    x = 0;
  }

  if (y > canvas.height) {
    y = canvas.height;
  }

  if (y < 0) {
    y = 0;
  }

  draggingObj.x = x;
  draggingObj.y = y;
  updateDrawing();
}

function touchMove(event) {
  onMove(event);
  event.preventDefault();
}

function onRelease(event) {
  //console.log('release')
  drag = false; // restore pointer cursor

  canvas.style.cursor = "pointer";
  document.body.style.cursor = "default";
  document.removeEventListener("mousemove", onMove, false);
  document.removeEventListener("touchmove", touchMove, false);
  document.removeEventListener("mouseup", onRelease, false);
  document.removeEventListener("touchend", touchEnd, false);
}

function touchEnd(event) {
  onRelease(event);
  event.preventDefault();
}

canvas.addEventListener("mousedown", onPress, false);
canvas.addEventListener("touchstart", function touchPress(event) {
  onPress(event);
  event.preventDefault();
}, false);

function updateDrawing() {
  // clear
  ctx.clearRect(0, 0, canvas.width, canvas.height); // draw graph

  graph.draw(); // get handles

  var cp1 = handles[0],
      cp2 = handles[1]; // draw bezier curve

  ctx.save();
  ctx.strokeStyle = "#4C84D3";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(graph.x, graph.y + graph.height); //start at bottom left, first handle is cp1, second handle is cp2, end is top right

  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, graph.width, graph.y);
  ctx.stroke();
  ctx.restore(); // draw anchor point lines

  ctx.strokeStyle = "#f00";
  ctx.beginPath();
  ctx.moveTo(graph.x, graph.y + graph.height);
  ctx.lineTo(cp1.x, cp1.y);
  ctx.moveTo(graph.width, graph.y);
  ctx.lineTo(cp2.x, cp2.y);
  ctx.stroke(); // draw handles

  for (var i = 0; i < handles.length; i++) {
    handles[i].draw();
  } //console.log(cp1.x, cp1.y, cp2.x, cp2.y)
  // output code


  var x1 = (cp1.x / graph.width).toFixed(3),
      y1 = ((graph.height + graph.y - cp1.y) / graph.height).toFixed(3),
      x2 = (cp2.x / canvas.width).toFixed(3),
      y2 = ((graph.height + graph.y - cp2.y) / graph.height).toFixed(3),
      //console.log( cp1.x, cp1.y )
  points = "(" + x1 + ", " + y1 + ", " + x2 + ", " + y2 + ")",
      bezier = "cubic-bezier" + points,
      easeName = $("#presets option:selected").text();

  if (easeName.indexOf("custom") > -1) {
    easeName = "custom";
  }

  var webkitTrans = "-webkit-transition: all " + timeVal + "ms " + bezier;
  var webkitTiming = "-webkit-transition-timing-function: " + bezier;
  window.cubicBezier = {
    bezier: bezier,
    time: timeVal
  };
  console.log(cubicBezier);

  if (y1 > 1 || y1 < 0 || y2 > 1 || y2 < 0) {
    var webkitY1 = y1,
        webkitY2 = y2;
    if (y1 > 1) webkitY1 = 1;
    if (y1 < 0) webkitY1 = 0;
    if (y2 > 1) webkitY2 = 1;
    if (y2 < 0) webkitY2 = 0;
    webkitTrans = "-webkit-transition: all " + timeVal + "ms " + "cubic-bezier(" + x1 + ", " + webkitY1 + ", " + x2 + ", " + webkitY2 + ")" + "; /* older webkit */" + "<br>-webkit-transition: all " + timeVal + "ms " + bezier; // webkitTiming = "-webkit-transition-timing-function: cubic-bezier(" + x1 + ", " + webkitY1 + ", " + x2 + ", " + webkitY2 + ")" + "; /* older webkit */" + "<br>-webkit-transition-timing-function: " + bezier;
  } // output code snippets
  // code.innerHTML = "<p>" + webkitTrans + "; <br>&nbsp;&nbsp; -moz-transition: all " + timeVal + "ms " + bezier + "; <br>&nbsp;&nbsp;&nbsp;&nbsp; -o-transition: all " + timeVal + "ms " + bezier + "; <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; transition: all " + timeVal + "ms " + bezier + "; /* " + easeName + " */</p>" + "<p>"
  // + webkitTiming + "; <br>&nbsp;&nbsp; -moz-transition-timing-function: " + bezier + "; <br>&nbsp;&nbsp;&nbsp;&nbsp; -o-transition-timing-function: " + bezier + "; <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; transition-timing-function: " + bezier + "; /* " + easeName + " */</p>";


  code.innerHTML = "transition: all " + timeVal + "ms " + bezier + "; /* " + easeName + " */</p>" + "<p>";
}

function setTransitions() {
  var cp1 = handles[0],
      cp2 = handles[1];
  var x1 = (cp1.x / graph.width).toFixed(3),
      y1 = ((graph.height + graph.y - cp1.y) / graph.height).toFixed(3),
      x2 = (cp2.x / canvas.width).toFixed(3),
      y2 = ((graph.height + graph.y - cp2.y) / graph.height).toFixed(3),
      //console.log( cp1.x, cp1.y )
  points = "(" + x1 + ", " + y1 + ", " + x2 + ", " + y2 + ")"; //console.log(points)

  timeVal = time.value; // set all transition types. ugly ugly vendor prefixes

  box.style.WebkitTransition = box.style.MozTransition = box.style.MsTransition = box.style.OTransition = box.style.transition = "all " + timeVal + "ms cubic-bezier" + points;

  if (!supportsBezierRange) {
    var wy1, wy2;
    if (y1 > 1) wy1 = 1;
    if (y1 < 0) wy1 = 0;
    if (y2 > 1) wy2 = 1;
    if (y2 < 0) wy2 = 0;
    box.style.WebkitTransition = "all " + timeVal + "ms cubic-bezier" + "(" + x1 + ", " + wy1 + ", " + x2 + ", " + wy2 + ")";
  }
}

function presetChange() {
  var coordinates = this.value.split(","),
      cp1 = handles[0],
      cp2 = handles[1];
  cp1.x = coordinates[0] * graph.width;
  cp1.y = graph.y + graph.height - coordinates[1] * graph.height;
  cp2.x = coordinates[2] * graph.width;
  cp2.y = graph.y + graph.height - coordinates[3] * graph.height;
  updateDrawing();
}

var $presets = $("#presets"),
    $time = $("#time"),
    $presetOpts = $("#presets option");
$presets.change(presetChange); // get the button value and toggle the class

$(".testButton").click(function () {
  //updateDrawing();
  setTransitions();
  $("#box").toggleClass($(this).val());
});
$time.change(function () {
  setTransitions();
  updateDrawing();
});
$time.keyup(function () {
  $(this).trigger("change");
}); // arrow key support

$(document).keydown(function (event) {
  var currentlySelected, currentIdx;

  if (event.keyCode === 39 && event.target !== time) {
    //right key && not in time input
    currentlySelected = $("#presets option:selected");
    currentIdx = $presetOpts.index(currentlySelected);

    if (currentIdx < $presetOpts.length - 1) {
      currentlySelected.attr("selected", "");
      $presetOpts.eq(currentIdx + 1).attr("selected", "selected");
      $presets.trigger("change");
    }
  } else if (event.keyCode === 37 && event.target !== time) {
    // left key && not in time input
    currentlySelected = $("#presets option:selected");
    currentIdx = $presetOpts.index(currentlySelected);

    if (currentIdx > 0) {
      currentlySelected.attr("selected", "");
      $presetOpts.eq(currentIdx - 1).attr("selected", "selected");
      $presets.trigger("change");
    }
  }
});
setTransitions();
$presets.trigger("change");
},{}],"C:/Users/user/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55542" + '/');

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
},{}]},{},["C:/Users/user/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/cubic.js"], null)
//# sourceMappingURL=/cubic.9db050c4.js.map
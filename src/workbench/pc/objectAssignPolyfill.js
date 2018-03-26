import objectAssign from 'object-assign';
import arrayFrom from 'array.from';
import arrayFind from 'array.find';
import Symbol from 'es6-symbol';
if (typeof Object.assign === 'undefined') {
  Object.assign = objectAssign;
}
if (typeof Array.from === 'undefined') {
    Array.from = arrayFrom;
}
if(typeof Array.find === 'undefined'){
    Array.find = arrayFind;
}
if(typeof window.Symbol === 'undefined'){
    window.Symbol = Symbol;
}
if (!("classList" in document.documentElement)) {
  Object.defineProperty(HTMLElement.prototype, 'classList', {
      get: function() {
          var self = this;
          function update(fn) {
              return function(value) {
                  var classes = self.className.split(/\s+/g),
                      index = classes.indexOf(value);

                  fn(classes, index, value);
                  self.className = classes.join(" ");
              }
          }

          return {
              add: update(function(classes, index, value) {
                  if (!~index) classes.push(value);
              }),

              remove: update(function(classes, index) {
                  if (~index) classes.splice(index, 1);
              }),

              toggle: update(function(classes, index, value) {
                  if (~index)
                      classes.splice(index, 1);
                  else
                      classes.push(value);
              }),

              contains: function(value) {
                  return !!~self.className.split(/\s+/g).indexOf(value);
              },

              item: function(i) {
                  return self.className.split(/\s+/g)[i] || null;
              }
          };
      }
  });
}
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function(searchElement, fromIndex) {

        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          // c. Increase k by 1.
          // NOTE: === provides the correct "SameValueZero" comparison needed here.
          if (o[k] === searchElement) {
            return true;
          }
          k++;
        }

        // 8. Return false
        return false;
      }
    });
}
if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
      value: function(predicate) {
       // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];

        // 5. Let k be 0.
        var k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return k.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return -1.
        return -1;
      }
    });
  }

//   解决首页tab在ie9下面的点击报错问题。
//   这实际上是由这个插件依赖于使用setTimeout将参数传递给文件animate-scroller.js中没有requestAnimationFrame（）的浏览器中的回调函数引起的，并且这已知在IE中不起作用。
var browser=navigator.appName;
var b_version=navigator.appVersion;
if(browser=="Microsoft Internet Explorer" && b_version.match(/9./i)=="9.")
{
    window.location.reload();
    (function(f){ window.setTimeout=f(window.setTimeout); window.setInterval=f(window.setInterval); })(function(f){return function(c,t){ var a=[].slice.call(arguments,2);return f(function(){c instanceof Function?c.apply(this,a):eval(c)},t)} });  
}
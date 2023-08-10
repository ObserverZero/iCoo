"use strict";

require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.default = void 0;
exports.parseDelay = parseDelay;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _feature = require("./../helpers/feature");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @class Interval
 */
var Interval = /*#__PURE__*/function () {
  function Interval(func, delay) {
    var _this = this;
    _classCallCheck(this, Interval);
    /**
     * Animation frame request id.
     *
     * @type {number}
     */
    this.timer = null;
    /**
     * Function to invoke repeatedly.
     *
     * @type {Function}
     */
    this.func = func;
    /**
     * Number of milliseconds that function should wait before next call.
     */
    this.delay = parseDelay(delay);
    /**
     * Flag which indicates if interval object was stopped.
     *
     * @type {boolean}
     * @default true
     */
    this.stopped = true;
    /**
     * Interval time (in milliseconds) of the last callback call.
     *
     * @private
     * @type {number}
     */
    this._then = null;
    /**
     * Bounded function `func`.
     *
     * @private
     * @type {Function}
     */
    this._callback = function () {
      return _this.__callback();
    };
  }

  /**
   * Start loop.
   *
   * @returns {Interval}
   */
  _createClass(Interval, [{
    key: "start",
    value: function start() {
      if (this.stopped) {
        this._then = Date.now();
        this.stopped = false;
        this.timer = (0, _feature.requestAnimationFrame)(this._callback);
      }
      return this;
    }

    /**
     * Stop looping.
     *
     * @returns {Interval}
     */
  }, {
    key: "stop",
    value: function stop() {
      if (!this.stopped) {
        this.stopped = true;
        (0, _feature.cancelAnimationFrame)(this.timer);
        this.timer = null;
      }
      return this;
    }

    /**
     * Loop callback, fired on every animation frame.
     *
     * @private
     */
  }, {
    key: "__callback",
    value: function __callback() {
      this.timer = (0, _feature.requestAnimationFrame)(this._callback);
      if (this.delay) {
        var now = Date.now();
        var elapsed = now - this._then;
        if (elapsed > this.delay) {
          this._then = now - elapsed % this.delay;
          this.func();
        }
      } else {
        this.func();
      }
    }
  }], [{
    key: "create",
    value: function create(func, delay) {
      return new Interval(func, delay);
    }
  }]);
  return Interval;
}();
var _default = Interval;
/**
 * Convert delay from string format to milliseconds.
 *
 * @param {number|string} delay The delay in FPS (frame per second) or number format.
 * @returns {number}
 */
exports.default = _default;
function parseDelay(delay) {
  var result = delay;
  if (typeof result === 'string' && /fps$/.test(result)) {
    result = 1000 / parseInt(result.replace('fps', '') || 0, 10);
  }
  return result;
}
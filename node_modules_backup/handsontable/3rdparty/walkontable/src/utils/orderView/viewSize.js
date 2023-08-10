"use strict";

require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.number.constructor.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Holder for current and next size (count of rendered and to render DOM elements) and offset.
 *
 * @class {ViewSize}
 */
var ViewSize = /*#__PURE__*/function () {
  function ViewSize() {
    _classCallCheck(this, ViewSize);
    /**
     * Current size of the rendered DOM elements.
     *
     * @type {number}
     */
    this.currentSize = 0;
    /**
     * Next size of the rendered DOM elements which should be fulfilled.
     *
     * @type {number}
     */
    this.nextSize = 0;
    /**
     * Current offset.
     *
     * @type {number}
     */
    this.currentOffset = 0;
    /**
     * Next ofset.
     *
     * @type {number}
     */
    this.nextOffset = 0;
  }

  /**
   * Sets new size of the rendered DOM elements.
   *
   * @param {number} size The size.
   */
  _createClass(ViewSize, [{
    key: "setSize",
    value: function setSize(size) {
      this.currentSize = this.nextSize;
      this.nextSize = size;
    }

    /**
     * Sets new offset.
     *
     * @param {number} offset The offset.
     */
  }, {
    key: "setOffset",
    value: function setOffset(offset) {
      this.currentOffset = this.nextOffset;
      this.nextOffset = offset;
    }
  }]);
  return ViewSize;
}();
exports.default = ViewSize;
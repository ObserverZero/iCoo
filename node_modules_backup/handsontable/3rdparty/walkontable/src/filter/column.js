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
 * @class ColumnFilter
 */
var ColumnFilter = /*#__PURE__*/function () {
  /**
   * @param {number} offset The scroll horizontal offset.
   * @param {number} total The total width of the table.
   * @param {number} countTH The number of rendered row headers.
   */
  function ColumnFilter(offset, total, countTH) {
    _classCallCheck(this, ColumnFilter);
    this.offset = offset;
    this.total = total;
    this.countTH = countTH;
  }

  /**
   * @param {number} index The visual column index.
   * @returns {number}
   */
  _createClass(ColumnFilter, [{
    key: "offsetted",
    value: function offsetted(index) {
      return index + this.offset;
    }

    /**
     * @param {number} index The visual column index.
     * @returns {number}
     */
  }, {
    key: "unOffsetted",
    value: function unOffsetted(index) {
      return index - this.offset;
    }

    /**
     * @param {number} index The visual column index.
     * @returns {number}
     */
  }, {
    key: "renderedToSource",
    value: function renderedToSource(index) {
      return this.offsetted(index);
    }

    /**
     * @param {number} index The visual column index.
     * @returns {number}
     */
  }, {
    key: "sourceToRendered",
    value: function sourceToRendered(index) {
      return this.unOffsetted(index);
    }

    /**
     * @param {number} index The visual column index.
     * @returns {number}
     */
  }, {
    key: "offsettedTH",
    value: function offsettedTH(index) {
      return index - this.countTH;
    }

    /**
     * @param {number} index The visual column index.
     * @returns {number}
     */
  }, {
    key: "unOffsettedTH",
    value: function unOffsettedTH(index) {
      return index + this.countTH;
    }

    /**
     * @param {number} index The visual column index.
     * @returns {number}
     */
  }, {
    key: "visibleRowHeadedColumnToSourceColumn",
    value: function visibleRowHeadedColumnToSourceColumn(index) {
      return this.renderedToSource(this.offsettedTH(index));
    }

    /**
     * @param {number} index The visual column index.
     * @returns {number}
     */
  }, {
    key: "sourceColumnToVisibleRowHeadedColumn",
    value: function sourceColumnToVisibleRowHeadedColumn(index) {
      return this.unOffsettedTH(this.sourceToRendered(index));
    }
  }]);
  return ColumnFilter;
}();
var _default = ColumnFilter;
exports.default = _default;
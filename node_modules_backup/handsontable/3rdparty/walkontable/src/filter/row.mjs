import "core-js/modules/es.symbol.to-primitive.js";
import "core-js/modules/es.date.to-primitive.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @class RowFilter
 */
var RowFilter = /*#__PURE__*/function () {
  /**
   * @param {number} offset The scroll vertical offset.
   * @param {number} total The total height of the table.
   * @param {number} countTH The number of rendered column headers.
   */
  function RowFilter(offset, total, countTH) {
    _classCallCheck(this, RowFilter);
    this.offset = offset;
    this.total = total;
    this.countTH = countTH;
  }

  /**
   * @param {number} index The visual row index.
   * @returns {number}
   */
  _createClass(RowFilter, [{
    key: "offsetted",
    value: function offsetted(index) {
      return index + this.offset;
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "unOffsetted",
    value: function unOffsetted(index) {
      return index - this.offset;
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "renderedToSource",
    value: function renderedToSource(index) {
      return this.offsetted(index);
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "sourceToRendered",
    value: function sourceToRendered(index) {
      return this.unOffsetted(index);
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "offsettedTH",
    value: function offsettedTH(index) {
      return index - this.countTH;
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "unOffsettedTH",
    value: function unOffsettedTH(index) {
      return index + this.countTH;
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "visibleColHeadedRowToSourceRow",
    value: function visibleColHeadedRowToSourceRow(index) {
      return this.renderedToSource(this.offsettedTH(index));
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "sourceRowToVisibleColHeadedRow",
    value: function sourceRowToVisibleColHeadedRow(index) {
      return this.unOffsettedTH(this.sourceToRendered(index));
    }
  }]);
  return RowFilter;
}();
export default RowFilter;
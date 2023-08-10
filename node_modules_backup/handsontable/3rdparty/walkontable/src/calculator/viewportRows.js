"use strict";

require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.symbol.iterator.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _constants = require("./constants");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var privatePool = new WeakMap();

/**
 * Calculates indexes of rows to render OR rows that are visible.
 * To redo the calculation, you need to create a new calculator.
 *
 * @class ViewportRowsCalculator
 */
var ViewportRowsCalculator = /*#__PURE__*/function () {
  /**
   * @param {object} options Object with all options specified for row viewport calculation.
   * @param {number} options.viewportSize Height of the viewport.
   * @param {number} options.scrollOffset Current vertical scroll position of the viewport.
   * @param {number} options.totalItems Total number of rows.
   * @param {Function} options.itemSizeFn Function that returns the height of the row at a given index (in px).
   * @param {Function} options.overrideFn Function that changes calculated this.startRow, this.endRow (used by MergeCells plugin).
   * @param {string} options.calculationType String which describes types of calculation which will be performed.
   * @param {number} options.scrollbarHeight The scrollbar height.
   */
  function ViewportRowsCalculator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      viewportSize = _ref.viewportSize,
      scrollOffset = _ref.scrollOffset,
      totalItems = _ref.totalItems,
      itemSizeFn = _ref.itemSizeFn,
      overrideFn = _ref.overrideFn,
      calculationType = _ref.calculationType,
      scrollbarHeight = _ref.scrollbarHeight;
    _classCallCheck(this, ViewportRowsCalculator);
    privatePool.set(this, {
      viewportHeight: viewportSize,
      scrollOffset: scrollOffset,
      totalRows: totalItems,
      rowHeightFn: itemSizeFn,
      overrideFn: overrideFn,
      calculationType: calculationType,
      horizontalScrollbarHeight: scrollbarHeight
    });

    /**
     * Number of rendered/visible rows.
     *
     * @type {number}
     */
    this.count = 0;

    /**
     * Index of the first rendered/visible row (can be overwritten using overrideFn).
     *
     * @type {number|null}
     */
    this.startRow = null;

    /**
     * Index of the last rendered/visible row (can be overwritten using overrideFn).
     *
     * @type {null}
     */
    this.endRow = null;

    /**
     * Position of the first rendered/visible row (in px).
     *
     * @type {number|null}
     */
    this.startPosition = null;
    this.isVisibleInTrimmingContainer = false;
    this.calculate();
  }

  /**
   * Calculates viewport.
   */
  _createClass(ViewportRowsCalculator, [{
    key: "calculate",
    value: function calculate() {
      var priv = privatePool.get(this);
      var calculationType = priv.calculationType;
      var overrideFn = priv.overrideFn;
      var rowHeightFn = priv.rowHeightFn;
      var scrollOffset = priv.scrollOffset;
      var zeroBasedScrollOffset = Math.max(priv.scrollOffset, 0);
      var totalRows = priv.totalRows;
      var viewportHeight = priv.viewportHeight;
      var horizontalScrollbarHeight = priv.horizontalScrollbarHeight || 0;
      var sum = 0;
      var needReverse = true;
      var startPositions = [];
      var rowHeight;
      var firstVisibleRowHeight = 0;
      var lastVisibleRowHeight = 0;

      // Calculate the number (start and end index) of rows needed
      for (var i = 0; i < totalRows; i++) {
        rowHeight = rowHeightFn(i);
        if (isNaN(rowHeight)) {
          rowHeight = ViewportRowsCalculator.DEFAULT_HEIGHT;
        }
        if (sum <= zeroBasedScrollOffset && calculationType !== _constants.FULLY_VISIBLE_TYPE) {
          this.startRow = i;
          firstVisibleRowHeight = rowHeight;
        }
        if (sum >= zeroBasedScrollOffset && sum + (calculationType === _constants.FULLY_VISIBLE_TYPE ? rowHeight : 0) <= zeroBasedScrollOffset + viewportHeight - horizontalScrollbarHeight) {
          // eslint-disable-line max-len
          if (this.startRow === null) {
            this.startRow = i;
            firstVisibleRowHeight = rowHeight;
          }
          this.endRow = i;
        }
        startPositions.push(sum);
        sum += rowHeight;
        lastVisibleRowHeight = rowHeight;
        if (calculationType !== _constants.FULLY_VISIBLE_TYPE) {
          this.endRow = i;
        }
        if (sum >= zeroBasedScrollOffset + viewportHeight - horizontalScrollbarHeight) {
          needReverse = false;
          break;
        }
      }
      var mostBottomScrollOffset = scrollOffset + viewportHeight - horizontalScrollbarHeight;
      var topRowOffset = calculationType === _constants.FULLY_VISIBLE_TYPE ? firstVisibleRowHeight : 0;
      var bottomRowOffset = calculationType === _constants.FULLY_VISIBLE_TYPE ? 0 : lastVisibleRowHeight;
      if (mostBottomScrollOffset < topRowOffset || scrollOffset > startPositions.at(-1) + bottomRowOffset) {
        this.isVisibleInTrimmingContainer = false;
      } else {
        this.isVisibleInTrimmingContainer = true;
      }

      // If the estimation has reached the last row and there is still some space available in the viewport,
      // we need to render in reverse in order to fill the whole viewport with rows
      if (this.endRow === totalRows - 1 && needReverse) {
        this.startRow = this.endRow;
        while (this.startRow > 0) {
          // rowHeight is the height of the last row
          var viewportSum = startPositions[this.endRow] + rowHeight - startPositions[this.startRow - 1];
          if (viewportSum <= viewportHeight - horizontalScrollbarHeight || calculationType !== _constants.FULLY_VISIBLE_TYPE) {
            this.startRow -= 1;
          }
          if (viewportSum >= viewportHeight - horizontalScrollbarHeight) {
            break;
          }
        }
      }
      if (calculationType === _constants.RENDER_TYPE && this.startRow !== null && overrideFn) {
        overrideFn(this);
      }
      this.startPosition = startPositions[this.startRow];
      if (this.startPosition === void 0) {
        this.startPosition = null;
      }

      // If totalRows exceeded its total rows size set endRow to the latest item
      if (totalRows < this.endRow) {
        this.endRow = totalRows - 1;
      }
      if (this.startRow !== null) {
        this.count = this.endRow - this.startRow + 1;
      }
    }
  }], [{
    key: "DEFAULT_HEIGHT",
    get:
    /**
     * Default row height.
     *
     * @type {number}
     */
    function get() {
      return 23;
    }
  }]);
  return ViewportRowsCalculator;
}();
var _default = ViewportRowsCalculator;
exports.default = _default;
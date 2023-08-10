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
var _element = require("../../../helpers/dom/element");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The class generates the nested headers structure in the DOM and reads the column width for
 * each column. The hierarchy is built only for visible, non-hidden columns. Each time the
 * column is shown or hidden, the structure is rebuilt, and the width of the columns in the
 * map updated.
 *
 * @private
 */
var GhostTable = /*#__PURE__*/function () {
  /**
   * Reference to the Handsontable instance.
   *
   * @private
   * @type {Handsontable}
   */

  /**
   * The function for retrieving the nested headers settings.
   *
   * @private
   * @type {Function}
   */

  /**
   * The value that holds information about the number of the nested header layers (header rows).
   *
   * @private
   * @type {number}
   */

  /**
   * Temporary element created to get minimal headers widths.
   *
   * @private
   * @type {*}
   */

  /**
   * PhysicalIndexToValueMap to keep and track of the columns' widths.
   *
   * @private
   * @type {PhysicalIndexToValueMap}
   */

  function GhostTable(hot, nestedHeaderSettingsGetter) {
    _classCallCheck(this, GhostTable);
    _defineProperty(this, "hot", void 0);
    _defineProperty(this, "nestedHeaderSettingsGetter", void 0);
    _defineProperty(this, "layersCount", 0);
    _defineProperty(this, "container", void 0);
    _defineProperty(this, "widthsMap", void 0);
    this.hot = hot;
    this.nestedHeaderSettingsGetter = nestedHeaderSettingsGetter;
    this.widthsMap = this.hot.columnIndexMapper.createAndRegisterIndexMap('nestedHeaders.widthsMap', 'physicalIndexToValue');
  }

  /**
   * Sets the number of nested headers layers count.
   *
   * @param {number} layersCount Total number of headers levels.
   * @returns {GhostTable}
   */
  _createClass(GhostTable, [{
    key: "setLayersCount",
    value: function setLayersCount(layersCount) {
      this.layersCount = layersCount;
      return this;
    }

    /**
     * Gets the column width based on the visual column index.
     *
     * @param {number} visualColumn Visual column index.
     * @returns {number|null}
     */
  }, {
    key: "getWidth",
    value: function getWidth(visualColumn) {
      return this.widthsMap.getValueAtIndex(this.hot.toPhysicalColumn(visualColumn));
    }

    /**
     * Build cache of the headers widths.
     */
  }, {
    key: "buildWidthsMap",
    value: function buildWidthsMap() {
      this.container = this.hot.rootDocument.createElement('div');
      this.container.classList.add('handsontable', 'htGhostTable', 'htAutoSize');
      this._buildGhostTable(this.container);
      this.hot.rootDocument.body.appendChild(this.container);
      var columns = this.container.querySelectorAll('tr:last-of-type th');
      var maxColumns = columns.length;
      this.widthsMap.clear();
      for (var column = 0; column < maxColumns; column++) {
        var visualColumnsIndex = this.hot.columnIndexMapper.getVisualFromRenderableIndex(column);
        var physicalColumnIndex = this.hot.toPhysicalColumn(visualColumnsIndex);
        this.widthsMap.setValueAtIndex(physicalColumnIndex, columns[column].offsetWidth);
      }
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }

    /**
     * Build temporary table for getting minimal columns widths.
     *
     * @private
     * @param {HTMLElement} container The element where the DOM nodes are injected.
     */
  }, {
    key: "_buildGhostTable",
    value: function _buildGhostTable(container) {
      var _this$hot = this.hot,
        rootDocument = _this$hot.rootDocument,
        columnIndexMapper = _this$hot.columnIndexMapper;
      var fragment = rootDocument.createDocumentFragment();
      var table = rootDocument.createElement('table');
      var isDropdownEnabled = !!this.hot.getSettings().dropdownMenu;
      var maxRenderedCols = columnIndexMapper.getRenderableIndexesLength();
      for (var row = 0; row < this.layersCount; row++) {
        var tr = rootDocument.createElement('tr');
        for (var col = 0; col < maxRenderedCols; col++) {
          var visualColumnsIndex = columnIndexMapper.getVisualFromRenderableIndex(col);
          if (visualColumnsIndex === null) {
            visualColumnsIndex = col;
          }
          var th = rootDocument.createElement('th');
          var headerSettings = this.nestedHeaderSettingsGetter(row, visualColumnsIndex);
          if (headerSettings && (!headerSettings.isPlaceholder || headerSettings.isHidden)) {
            var label = headerSettings.label;
            if (isDropdownEnabled) {
              label += '<button class="changeType"></button>';
            }
            (0, _element.fastInnerHTML)(th, label);
            th.colSpan = headerSettings.colspan;
            tr.appendChild(th);
          }
        }
        table.appendChild(tr);
      }
      fragment.appendChild(table);
      container.appendChild(fragment);
    }

    /**
     * Clear the widths cache.
     */
  }, {
    key: "clear",
    value: function clear() {
      this.widthsMap.clear();
      this.container = null;
    }
  }]);
  return GhostTable;
}();
var _default = GhostTable;
exports.default = _default;
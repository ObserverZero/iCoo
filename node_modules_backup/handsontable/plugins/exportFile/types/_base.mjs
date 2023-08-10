function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.string.pad-start.js";
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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { extend, clone } from "../../../helpers/object.mjs";
import { substitute } from "../../../helpers/string.mjs";
/**
 * @private
 */
var BaseType = /*#__PURE__*/function () {
  function BaseType(dataProvider, options) {
    _classCallCheck(this, BaseType);
    /**
     * Data provider.
     *
     * @type {DataProvider}
     */
    this.dataProvider = dataProvider;
    /**
     * Format type class options.
     *
     * @type {object}
     */
    this.options = this._mergeOptions(options);
    this.dataProvider.setOptions(this.options);
  }

  /**
   * Merge options provided by users with defaults.
   *
   * @param {object} options An object with options to merge with.
   * @returns {object} Returns new options object.
   */
  _createClass(BaseType, [{
    key: "_mergeOptions",
    value: function _mergeOptions(options) {
      var _options = clone(this.constructor.DEFAULT_OPTIONS);
      var date = new Date();
      _options = extend(clone(BaseType.DEFAULT_OPTIONS), _options);
      _options = extend(_options, options);
      _options.filename = substitute(_options.filename, {
        YYYY: date.getFullYear(),
        MM: "".concat(date.getMonth() + 1).padStart(2, '0'),
        DD: "".concat(date.getDate()).padStart(2, '0')
      });
      return _options;
    }
  }], [{
    key: "DEFAULT_OPTIONS",
    get:
    /**
     * Default options.
     *
     * @returns {object}
     */
    function get() {
      return {
        mimeType: 'text/plain',
        fileExtension: 'txt',
        filename: 'Handsontable [YYYY]-[MM]-[DD]',
        encoding: 'utf-8',
        bom: false,
        columnHeaders: false,
        rowHeaders: false,
        exportHiddenColumns: false,
        exportHiddenRows: false,
        range: []
      };
    }
  }]);
  return BaseType;
}();
export default BaseType;
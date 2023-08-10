"use strict";

require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.__esModule = true;
exports.default = void 0;
var _object = require("../../../helpers/object");
var _utils = require("../utils");
var _metaSchema = _interopRequireDefault(require("../metaSchema"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * @typedef {Options} TableMeta
 */
/**
 * @returns {TableMeta} Returns an empty object. The holder for global meta object.
 */
function createTableMetaEmptyClass() {
  return /*#__PURE__*/_createClass(function TableMeta() {
    _classCallCheck(this, TableMeta);
  });
}

/**
 * The global meta object is a root of all default settings, which are recognizable by Handsontable.
 * Other layers are inherited from this object. Adding, removing, or changing property in that
 * object has a direct reflection to all layers such as: TableMeta, ColumnMeta, or CellMeta layers.
 *
 * +-------------+.
 * │ GlobalMeta  │
 * │ (prototype) │
 * +-------------+\
 *       │         \
 *       │          \
 *      \│/         _\|
 * +-------------+    +-------------+.
 * │ TableMeta   │    │ ColumnMeta  │
 * │ (instance)  │    │ (prototype) │
 * +-------------+    +-------------+.
 *                         │
 *                         │
 *                        \│/
 *                    +-------------+.
 *                    │  CellMeta   │
 *                    │ (instance)  │
 *                    +-------------+.
 */
var GlobalMeta = /*#__PURE__*/function () {
  function GlobalMeta(hot) {
    _classCallCheck(this, GlobalMeta);
    /**
     * An alias for the constructor. Necessary for inheritance for creating new layers.
     *
     * @type {TableMeta}
     */
    this.metaCtor = createTableMetaEmptyClass();
    /**
     * Main object (prototype of the internal TableMeta class), holder for all default settings.
     *
     * @type {object}
     */
    this.meta = this.metaCtor.prototype;
    (0, _object.extend)(this.meta, (0, _metaSchema.default)());
    this.meta.instance = hot;
  }

  /**
   * Gets constructor of the global meta object. Necessary for inheritance for creating the next meta layers.
   *
   * @returns {Function}
   */
  _createClass(GlobalMeta, [{
    key: "getMetaConstructor",
    value: function getMetaConstructor() {
      return this.metaCtor;
    }

    /**
     * Gets settings object for this layer.
     *
     * @returns {object}
     */
  }, {
    key: "getMeta",
    value: function getMeta() {
      return this.meta;
    }

    /**
     * Updates global settings object by merging settings with the current state.
     *
     * @param {object} settings An object to merge with.
     */
  }, {
    key: "updateMeta",
    value: function updateMeta(settings) {
      var _settings$type;
      (0, _object.extend)(this.meta, settings);
      (0, _utils.extendByMetaType)(this.meta, _objectSpread(_objectSpread({}, settings), {}, {
        type: (_settings$type = settings.type) !== null && _settings$type !== void 0 ? _settings$type : this.meta.type
      }), settings);
    }
  }]);
  return GlobalMeta;
}();
exports.default = GlobalMeta;
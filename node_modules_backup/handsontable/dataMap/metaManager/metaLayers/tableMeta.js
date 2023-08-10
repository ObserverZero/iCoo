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
var _object = require("../../../helpers/object");
var _utils = require("../utils");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The table meta object is a layer that keeps all settings of the Handsontable that was passed in
 * the constructor. That layer contains all default settings inherited from the GlobalMeta layer
 * merged with settings passed by the developer. Adding, removing, or changing property in that
 * object has no direct reflection on any other layers.
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
var TableMeta = /*#__PURE__*/function () {
  function TableMeta(globalMeta) {
    _classCallCheck(this, TableMeta);
    var MetaCtor = globalMeta.getMetaConstructor();

    /**
     * Main object (instance of the internal TableMeta class from GlobalMeta), holder for all settings defined in the table scope.
     *
     * @type {TableMeta}
     */
    this.meta = new MetaCtor();
  }

  /**
   * Gets settings object for this layer.
   *
   * @returns {TableMeta}
   */
  _createClass(TableMeta, [{
    key: "getMeta",
    value: function getMeta() {
      return this.meta;
    }

    /**
     * Updates table settings object by merging settings with the current state.
     *
     * @param {object} settings An object to merge with.
     */
  }, {
    key: "updateMeta",
    value: function updateMeta(settings) {
      (0, _object.extend)(this.meta, settings);
      (0, _utils.extendByMetaType)(this.meta, settings, settings);
    }
  }]);
  return TableMeta;
}();
exports.default = TableMeta;
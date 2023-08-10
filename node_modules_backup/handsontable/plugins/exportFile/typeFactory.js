"use strict";

require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.TYPE_PDF = exports.TYPE_EXCEL = exports.TYPE_CSV = exports.EXPORT_TYPES = void 0;
exports.default = typeFactory;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.number.constructor.js");
var _csv = _interopRequireDefault(require("./types/csv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TYPE_CSV = 'csv';
exports.TYPE_CSV = TYPE_CSV;
var TYPE_EXCEL = 'excel'; // TODO
exports.TYPE_EXCEL = TYPE_EXCEL;
var TYPE_PDF = 'pdf'; // TODO
exports.TYPE_PDF = TYPE_PDF;
var EXPORT_TYPES = _defineProperty({}, TYPE_CSV, _csv.default);

/**
 * @private
 * @param {string} type The exporter type.
 * @param {DataProvider} dataProvider The data provider.
 * @param {object} options Constructor options for exporter class.
 * @returns {BaseType|null}
 */
exports.EXPORT_TYPES = EXPORT_TYPES;
function typeFactory(type, dataProvider, options) {
  if (typeof EXPORT_TYPES[type] === 'function') {
    return new EXPORT_TYPES[type](dataProvider, options);
  }
  return null;
}
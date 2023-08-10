"use strict";

require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.TYPE_TEXT = exports.TYPE_NUMERIC = exports.TYPE_DATE = exports.TYPES = void 0;
exports.default = getOptionsList;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.number.constructor.js");
var _object = require("../../helpers/object");
var _array = require("../../helpers/array");
var _predefinedItems = require("../contextMenu/predefinedItems");
var _conditionRegisterer = require("./conditionRegisterer");
var _none = require("./condition/none");
exports.CONDITION_NONE = _none.CONDITION_NAME;
var _empty = require("./condition/empty");
exports.CONDITION_EMPTY = _empty.CONDITION_NAME;
var _notEmpty = require("./condition/notEmpty");
exports.CONDITION_NOT_EMPTY = _notEmpty.CONDITION_NAME;
var _equal = require("./condition/equal");
exports.CONDITION_EQUAL = _equal.CONDITION_NAME;
var _notEqual = require("./condition/notEqual");
exports.CONDITION_NOT_EQUAL = _notEqual.CONDITION_NAME;
var _greaterThan = require("./condition/greaterThan");
exports.CONDITION_GREATER_THAN = _greaterThan.CONDITION_NAME;
var _greaterThanOrEqual = require("./condition/greaterThanOrEqual");
exports.CONDITION_GREATER_THAN_OR_EQUAL = _greaterThanOrEqual.CONDITION_NAME;
var _lessThan = require("./condition/lessThan");
exports.CONDITION_LESS_THAN = _lessThan.CONDITION_NAME;
var _lessThanOrEqual = require("./condition/lessThanOrEqual");
exports.CONDITION_LESS_THAN_OR_EQUAL = _lessThanOrEqual.CONDITION_NAME;
var _between = require("./condition/between");
exports.CONDITION_BETWEEN = _between.CONDITION_NAME;
var _notBetween = require("./condition/notBetween");
exports.CONDITION_NOT_BETWEEN = _notBetween.CONDITION_NAME;
var _beginsWith = require("./condition/beginsWith");
exports.CONDITION_BEGINS_WITH = _beginsWith.CONDITION_NAME;
var _endsWith = require("./condition/endsWith");
exports.CONDITION_ENDS_WITH = _endsWith.CONDITION_NAME;
var _contains = require("./condition/contains");
exports.CONDITION_CONTAINS = _contains.CONDITION_NAME;
var _notContains = require("./condition/notContains");
exports.CONDITION_NOT_CONTAINS = _notContains.CONDITION_NAME;
var _before = require("./condition/date/before");
exports.CONDITION_DATE_BEFORE = _before.CONDITION_NAME;
var _after = require("./condition/date/after");
exports.CONDITION_DATE_AFTER = _after.CONDITION_NAME;
var _tomorrow = require("./condition/date/tomorrow");
exports.CONDITION_TOMORROW = _tomorrow.CONDITION_NAME;
var _today = require("./condition/date/today");
exports.CONDITION_TODAY = _today.CONDITION_NAME;
var _yesterday = require("./condition/date/yesterday");
exports.CONDITION_YESTERDAY = _yesterday.CONDITION_NAME;
var _byValue = require("./condition/byValue");
exports.CONDITION_BY_VALUE = _byValue.CONDITION_NAME;
var _true = require("./condition/true");
exports.CONDITION_TRUE = _true.CONDITION_NAME;
var _false = require("./condition/false");
exports.CONDITION_FALSE = _false.CONDITION_NAME;
var _conjunction = require("./logicalOperations/conjunction");
exports.OPERATION_AND = _conjunction.OPERATION_ID;
var _disjunction = require("./logicalOperations/disjunction");
exports.OPERATION_OR = _disjunction.OPERATION_ID;
var _disjunctionWithExtraCondition = require("./logicalOperations/disjunctionWithExtraCondition");
exports.OPERATION_OR_THEN_VARIABLE = _disjunctionWithExtraCondition.OPERATION_ID;
var _TYPES;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TYPE_NUMERIC = 'numeric';
exports.TYPE_NUMERIC = TYPE_NUMERIC;
var TYPE_TEXT = 'text';
exports.TYPE_TEXT = TYPE_TEXT;
var TYPE_DATE = 'date';
/**
 * Default types and order for filter conditions.
 *
 * @type {object}
 */
exports.TYPE_DATE = TYPE_DATE;
var TYPES = (_TYPES = {}, _defineProperty(_TYPES, TYPE_NUMERIC, [_none.CONDITION_NAME, _predefinedItems.SEPARATOR, _empty.CONDITION_NAME, _notEmpty.CONDITION_NAME, _predefinedItems.SEPARATOR, _equal.CONDITION_NAME, _notEqual.CONDITION_NAME, _predefinedItems.SEPARATOR, _greaterThan.CONDITION_NAME, _greaterThanOrEqual.CONDITION_NAME, _lessThan.CONDITION_NAME, _lessThanOrEqual.CONDITION_NAME, _between.CONDITION_NAME, _notBetween.CONDITION_NAME]), _defineProperty(_TYPES, TYPE_TEXT, [_none.CONDITION_NAME, _predefinedItems.SEPARATOR, _empty.CONDITION_NAME, _notEmpty.CONDITION_NAME, _predefinedItems.SEPARATOR, _equal.CONDITION_NAME, _notEqual.CONDITION_NAME, _predefinedItems.SEPARATOR, _beginsWith.CONDITION_NAME, _endsWith.CONDITION_NAME, _predefinedItems.SEPARATOR, _contains.CONDITION_NAME, _notContains.CONDITION_NAME]), _defineProperty(_TYPES, TYPE_DATE, [_none.CONDITION_NAME, _predefinedItems.SEPARATOR, _empty.CONDITION_NAME, _notEmpty.CONDITION_NAME, _predefinedItems.SEPARATOR, _equal.CONDITION_NAME, _notEqual.CONDITION_NAME, _predefinedItems.SEPARATOR, _before.CONDITION_NAME, _after.CONDITION_NAME, _between.CONDITION_NAME, _predefinedItems.SEPARATOR, _tomorrow.CONDITION_NAME, _today.CONDITION_NAME, _yesterday.CONDITION_NAME]), _TYPES);

/**
 * Get options list for conditional filter by data type (e.q: `'text'`, `'numeric'`, `'date'`).
 *
 * @private
 * @param {string} type The data type.
 * @returns {object}
 */
exports.TYPES = TYPES;
function getOptionsList(type) {
  var items = [];
  var typeName = type;
  if (!TYPES[typeName]) {
    typeName = TYPE_TEXT;
  }
  (0, _array.arrayEach)(TYPES[typeName], function (typeValue) {
    var option;
    if (typeValue === _predefinedItems.SEPARATOR) {
      option = {
        name: _predefinedItems.SEPARATOR
      };
    } else {
      option = (0, _object.clone)((0, _conditionRegisterer.getConditionDescriptor)(typeValue));
    }
    items.push(option);
  });
  return items;
}
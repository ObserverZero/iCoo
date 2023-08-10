"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.countFirstRowKeys = countFirstRowKeys;
exports.createEmptySpreadsheetData = createEmptySpreadsheetData;
exports.createSpreadsheetData = createSpreadsheetData;
exports.createSpreadsheetObjectData = createSpreadsheetObjectData;
exports.dataRowToChangesArray = dataRowToChangesArray;
exports.isArrayOfArrays = isArrayOfArrays;
exports.isArrayOfObjects = isArrayOfObjects;
exports.spreadsheetColumnIndex = spreadsheetColumnIndex;
exports.spreadsheetColumnLabel = spreadsheetColumnLabel;
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.keys.js");
var _object = require("./object");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var COLUMN_LABEL_BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var COLUMN_LABEL_BASE_LENGTH = COLUMN_LABEL_BASE.length;

/**
 * Generates spreadsheet-like column names: A, B, C, ..., Z, AA, AB, etc.
 *
 * @param {number} index Column index.
 * @returns {string}
 */
function spreadsheetColumnLabel(index) {
  var dividend = index + 1;
  var columnLabel = '';
  var modulo;
  while (dividend > 0) {
    modulo = (dividend - 1) % COLUMN_LABEL_BASE_LENGTH;
    columnLabel = String.fromCharCode(65 + modulo) + columnLabel;
    dividend = parseInt((dividend - modulo) / COLUMN_LABEL_BASE_LENGTH, 10);
  }
  return columnLabel;
}

/**
 * Generates spreadsheet-like column index from theirs labels: A, B, C ...., Z, AA, AB, etc.
 *
 * @param {string} label Column label.
 * @returns {number}
 */
function spreadsheetColumnIndex(label) {
  var result = 0;
  if (label) {
    for (var i = 0, j = label.length - 1; i < label.length; i += 1, j -= 1) {
      result += Math.pow(COLUMN_LABEL_BASE_LENGTH, j) * (COLUMN_LABEL_BASE.indexOf(label[i]) + 1);
    }
  }
  result -= 1;
  return result;
}

/**
 * Creates 2D array of Excel-like values "A1", "A2", ...
 *
 * @param {number} rows Number of rows to generate.
 * @param {number} columns Number of columns to generate.
 * @returns {Array}
 */
function createSpreadsheetData() {
  var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  var columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var _rows = [];
  var i;
  var j;
  for (i = 0; i < rows; i++) {
    var row = [];
    for (j = 0; j < columns; j++) {
      row.push(spreadsheetColumnLabel(j) + (i + 1));
    }
    _rows.push(row);
  }
  return _rows;
}

/**
 * Creates 2D array of Excel-like values "A1", "A2", as an array of objects.
 *
 * @param {number} rows Number of rows to generate.
 * @param {number} colCount Number of columns to generate.
 * @returns {Array}
 */
function createSpreadsheetObjectData() {
  var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  var colCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var _rows = [];
  var i;
  var j;
  for (i = 0; i < rows; i++) {
    var row = {};
    for (j = 0; j < colCount; j++) {
      row["prop".concat(j)] = spreadsheetColumnLabel(j) + (i + 1);
    }
    _rows.push(row);
  }
  return _rows;
}

/**
 * Generates an empty data object.
 *
 * @param {number} rows Number of rows to generate.
 * @param {number} columns Number of columns to generate.
 * @returns {Array}
 */
function createEmptySpreadsheetData(rows, columns) {
  var data = [];
  var row;
  for (var i = 0; i < rows; i++) {
    row = [];
    for (var j = 0; j < columns; j++) {
      row.push('');
    }
    data.push(row);
  }
  return data;
}

/**
 * Transform a data row (either an array or an object) or an array of data rows to array of changes in a form of `[row,
 * prop/col, value]`. Convenient to use with `setDataAtRowProp` and `setSourceDataAtCell` methods.
 *
 * @param {Array|object} dataRow Object of row data, array of row data or an array of either.
 * @param {number} rowOffset Row offset to be passed to the resulting change list. Defaults to `0`.
 * @returns {Array} Array of changes (in a form of an array).
 */
function dataRowToChangesArray(dataRow) {
  var rowOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var dataRows = dataRow;
  var changesArray = [];
  if (!Array.isArray(dataRow) || !Array.isArray(dataRow[0])) {
    dataRows = [dataRow];
  }
  dataRows.forEach(function (row, rowIndex) {
    if (Array.isArray(row)) {
      row.forEach(function (value, column) {
        changesArray.push([rowIndex + rowOffset, column, value]);
      });
    } else {
      Object.keys(row).forEach(function (propName) {
        changesArray.push([rowIndex + rowOffset, propName, row[propName]]);
      });
    }
  });
  return changesArray;
}

/**
 * Count the number of keys (or, basically, columns when the data is an array or arrays) in the first row of the
 * provided dataset.
 *
 * @param {Array} data The dataset.
 * @returns {number} Number of keys in the first row of the dataset.
 */
function countFirstRowKeys(data) {
  var result = 0;
  if (Array.isArray(data)) {
    if (data[0] && Array.isArray(data[0])) {
      result = data[0].length;
    } else if (data[0] && (0, _object.isObject)(data[0])) {
      result = (0, _object.deepObjectSize)(data[0]);
    }
  }
  return result;
}

/**
 * Check whether the provided dataset is a *non-empty* array of arrays.
 *
 * @param {Array} data Dataset to be checked.
 * @returns {boolean} `true` if data is an array of arrays, `false` otherwise.
 */
function isArrayOfArrays(data) {
  return !!(Array.isArray(data) && data.length && data.every(function (el) {
    return Array.isArray(el);
  }));
}

/**
 * Check whether the provided dataset is a *non-empty* array of objects.
 *
 * @param {Array} data Dataset to be checked.
 * @returns {boolean} `true` if data is an array of objects, `false` otherwise.
 */
function isArrayOfObjects(data) {
  return !!(Array.isArray(data) && data.length && data.every(function (el) {
    return _typeof(el) === 'object' && !Array.isArray(el) && el !== null;
  }));
}
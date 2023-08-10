"use strict";

require("core-js/modules/es.symbol.iterator.js");
exports.__esModule = true;
exports.MapCollection = void 0;
exports.getRegisteredMapsCounter = getRegisteredMapsCounter;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.number.constructor.js");
var _mixed = require("../../helpers/mixed");
var _object = require("../../helpers/object");
var _localHooks = _interopRequireDefault(require("../../mixins/localHooks"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Counter for checking if there is a memory leak.
var registeredMaps = 0;

/**
 * Collection of index maps having unique names. It allow us to perform bulk operations such as init, remove, insert on all index maps that have been registered in the collection.
 */
var MapCollection = /*#__PURE__*/function () {
  function MapCollection() {
    _classCallCheck(this, MapCollection);
    /**
     * Collection of index maps.
     *
     * @type {Map<string, IndexMap>}
     */
    this.collection = new Map();
  }

  /**
   * Register custom index map.
   *
   * @param {string} uniqueName Unique name of the index map.
   * @param {IndexMap} indexMap Index map containing miscellaneous (i.e. Meta data, indexes sequence), updated after remove and insert data actions.
   */
  _createClass(MapCollection, [{
    key: "register",
    value: function register(uniqueName, indexMap) {
      var _this = this;
      if (this.collection.has(uniqueName) === false) {
        this.collection.set(uniqueName, indexMap);
        indexMap.addLocalHook('change', function () {
          return _this.runLocalHooks('change', indexMap);
        });
        registeredMaps += 1;
      }
    }

    /**
     * Unregister custom index map.
     *
     * @param {string} name Name of the index map.
     */
  }, {
    key: "unregister",
    value: function unregister(name) {
      var indexMap = this.collection.get(name);
      if ((0, _mixed.isDefined)(indexMap)) {
        indexMap.destroy();
        this.collection.delete(name);
        this.runLocalHooks('change', indexMap);
        registeredMaps -= 1;
      }
    }

    /**
     * Unregisters and destroys all collected index map instances.
     */
  }, {
    key: "unregisterAll",
    value: function unregisterAll() {
      var _this2 = this;
      this.collection.forEach(function (indexMap, name) {
        return _this2.unregister(name);
      });
      this.collection.clear();
    }

    /**
     * Get index map for the provided name.
     *
     * @param {string} [name] Name of the index map.
     * @returns {Array|IndexMap}
     */
  }, {
    key: "get",
    value: function get(name) {
      if ((0, _mixed.isUndefined)(name)) {
        return Array.from(this.collection.values());
      }
      return this.collection.get(name);
    }

    /**
     * Get collection size.
     *
     * @returns {number}
     */
  }, {
    key: "getLength",
    value: function getLength() {
      return this.collection.size;
    }

    /**
     * Remove some indexes and corresponding mappings and update values of the others within all collection's index maps.
     *
     * @private
     * @param {Array} removedIndexes List of removed indexes.
     */
  }, {
    key: "removeFromEvery",
    value: function removeFromEvery(removedIndexes) {
      this.collection.forEach(function (indexMap) {
        indexMap.remove(removedIndexes);
      });
    }

    /**
     * Insert new indexes and corresponding mapping and update values of the others all collection's index maps.
     *
     * @private
     * @param {number} insertionIndex Position inside the actual list.
     * @param {Array} insertedIndexes List of inserted indexes.
     */
  }, {
    key: "insertToEvery",
    value: function insertToEvery(insertionIndex, insertedIndexes) {
      this.collection.forEach(function (indexMap) {
        indexMap.insert(insertionIndex, insertedIndexes);
      });
    }

    /**
     * Set default values to index maps within collection.
     *
     * @param {number} length Destination length for all stored maps.
     */
  }, {
    key: "initEvery",
    value: function initEvery(length) {
      this.collection.forEach(function (indexMap) {
        indexMap.init(length);
      });
    }
  }]);
  return MapCollection;
}();
exports.MapCollection = MapCollection;
(0, _object.mixin)(MapCollection, _localHooks.default);

/**
 * @returns {number}
 */
function getRegisteredMapsCounter() {
  return registeredMaps;
}
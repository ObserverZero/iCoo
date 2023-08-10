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
 * Factory for newly created DOM elements.
 *
 * @class {NodesPool}
 */
var NodesPool = /*#__PURE__*/function () {
  function NodesPool(nodeType) {
    _classCallCheck(this, NodesPool);
    /**
     * Node type to generate (ew 'th', 'td').
     *
     * @type {string}
     */
    this.nodeType = nodeType.toUpperCase();
  }

  /**
   * Set document owner for this instance.
   *
   * @param {HTMLDocument} rootDocument The document window owner.
   */
  _createClass(NodesPool, [{
    key: "setRootDocument",
    value: function setRootDocument(rootDocument) {
      this.rootDocument = rootDocument;
    }

    /**
     * Obtains an element. The returned elements in the feature can be cached.
     *
     * @returns {HTMLElement}
     */
  }, {
    key: "obtain",
    value: function obtain() {
      return this.rootDocument.createElement(this.nodeType);
    }
  }]);
  return NodesPool;
}();
export { NodesPool as default };
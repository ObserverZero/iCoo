"use strict";

exports.__esModule = true;
exports.default = copyColumnHeadersOnlyItem;
var _constants = require("../../../i18n/constants");
/**
 * @param {CopyPaste} copyPastePlugin The plugin instance.
 * @returns {object}
 */
function copyColumnHeadersOnlyItem(copyPastePlugin) {
  return {
    key: 'copy_column_headers_only',
    name: function name() {
      var selectedRange = this.getSelectedRangeLast();
      var nounForm = selectedRange ? Math.min(selectedRange.getWidth() - 1, 1) : 0;
      return this.getTranslatedPhrase(_constants.CONTEXTMENU_ITEMS_COPY_COLUMN_HEADERS_ONLY, nounForm);
    },
    callback: function callback() {
      copyPastePlugin.copyColumnHeadersOnly();
    },
    disabled: function disabled() {
      if (!this.hasColHeaders()) {
        return true;
      }
      var selected = this.getSelected();

      // Disable for no selection or for non-contiguous selection.
      if (!selected || selected.length > 1) {
        return true;
      }
      return false;
    },
    hidden: false
  };
}
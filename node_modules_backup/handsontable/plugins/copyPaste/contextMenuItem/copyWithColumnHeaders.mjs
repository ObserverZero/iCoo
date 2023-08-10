import { CONTEXTMENU_ITEMS_COPY_WITH_COLUMN_HEADERS } from "../../../i18n/constants.mjs";
/**
 * @param {CopyPaste} copyPastePlugin The plugin instance.
 * @returns {object}
 */
export default function copyWithColumnHeadersItem(copyPastePlugin) {
  return {
    key: 'copy_with_column_headers',
    name: function name() {
      var selectedRange = this.getSelectedRangeLast();
      var nounForm = selectedRange ? Math.min(selectedRange.getWidth() - 1, 1) : 0;
      return this.getTranslatedPhrase(CONTEXTMENU_ITEMS_COPY_WITH_COLUMN_HEADERS, nounForm);
    },
    callback: function callback() {
      copyPastePlugin.copyWithColumnHeaders();
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
import { CONTEXTMENU_ITEMS_COPY } from "../../../i18n/constants.mjs";
/**
 * @param {CopyPaste} copyPastePlugin The plugin instance.
 * @returns {object}
 */
export default function copyItem(copyPastePlugin) {
  return {
    key: 'copy',
    name: function name() {
      return this.getTranslatedPhrase(CONTEXTMENU_ITEMS_COPY);
    },
    callback: function callback() {
      copyPastePlugin.copyCellsOnly();
    },
    disabled: function disabled() {
      if (this.countRows() === 0 || this.countCols() === 0) {
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
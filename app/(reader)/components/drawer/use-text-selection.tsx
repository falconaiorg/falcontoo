import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

interface SelectionData {
  text: string | null;
  position: { x: number; y: number } | null;
  range: Range | null;
  selection: Selection | null;
}

const INITIAL_STATE: SelectionData = {
  text: null,
  position: null,
  range: null,
  selection: null,
};

/**
 * Custom hook to handle text selection on a web page using the Selection API.
 * This hook listens for text selection changes and provides the selected text,
 * its position, the selection range, and the selection object.
 *
 * @returns {object} - An object containing:
 * - `text` {string | null}: The currently selected text, or null if no text is selected.
 * - `position` {object | null}: The position of the selected text, or null if no text is selected.
 *   - `x` {number}: The x-coordinate of the selected text.
 *   - `y` {number}: The y-coordinate of the selected text.
 * - `range` {Range | null}: The range object representing the selected text, or null if no text is selected.
 * - `selection` {Selection | null}: The selection object, or null if no text is selected.
 * - `clearSelection` {function}: A function to clear the current text selection.
 *
 * @example
 * const { text, position, range, selection, clearSelection } = useTextSelection();
 *
 * @example
 * <div>
 *   <p>Try selecting some text on this page and see the result below:</p>
 *   <p>Selected Text: {text}</p>
 *   {text && (
 *     <button
 *       onClick={handleShare}
 *       style={{
 *         position: 'absolute',
 *         top: position?.y,
 *         left: position?.x,
 *       }}
 *     >
 *       Share on Twitter
 *     </button>
 *   )}
 *   <button onClick={clearSelection}>Clear Selection</button>
 * </div>
 */
export const useTextSelection = () => {
  const [selectionData, setSelectionData] = useState(INITIAL_STATE);
  const [hasSelectionChange, setHasSelectionChange] = useState(false);

  const updateSelectionData = useCallback((selection: Selection) => {
    const range = selection.getRangeAt(0);
    const { left, top } = range.getBoundingClientRect();
    setSelectionData({
      text: selection.toString(),
      position: { x: left + window.scrollX, y: top + window.scrollY },
      range,
      selection,
    });
  }, []);

  const handleSelectionChange = useCallback(() => {
    console.log("Selection change event triggered");
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
      console.log(selection.toString());
      console.log(selection.rangeCount);
      updateSelectionData(selection);
      setHasSelectionChange(true); // Update hasSelectionChange when selection changes
    } else {
      console.log("No selection");
      setSelectionData(INITIAL_STATE);
      setHasSelectionChange(false); // Update hasSelectionChange when there's no selection
    }
  }, [updateSelectionData]);

  const debouncedHandleSelectionChange = useCallback(
    debounce(handleSelectionChange, 300),
    [handleSelectionChange],
  );

  const handleSelectStart = useCallback(() => {
    console.log("Selection start event triggered");
    setSelectionData(INITIAL_STATE);
  }, []);

  const clearSelection = useCallback(() => {
    console.log("Clear selection called");
    if (selectionData.selection) {
      selectionData.selection.removeAllRanges();
      setSelectionData(INITIAL_STATE);
      setHasSelectionChange(false); // Update hasSelectionChange when selection is cleared
    }
  }, [selectionData.selection]);
  
  useEffect(() => {
    console.log("Adding event listeners");
    document.addEventListener(
      "selectionchange",
      debouncedHandleSelectionChange,
    );
    document.addEventListener("selectstart", handleSelectStart);

    return () => {
      console.log("Removing event listeners");
      document.removeEventListener(
        "selectionchange",
        debouncedHandleSelectionChange,
      );
      document.removeEventListener("selectstart", handleSelectStart);
    };
  }, [debouncedHandleSelectionChange, handleSelectStart]);

  const hasSelection =
    selectionData?.text && selectionData?.text?.length > 0 ? true : false;

  console.log(hasSelectionChange);
  console.log(hasSelection);
  console.log(selectionData.text);

  return {
    ...selectionData,
    clearSelection,
    hasSelection,
    setHasSelectionChange,
  };
};

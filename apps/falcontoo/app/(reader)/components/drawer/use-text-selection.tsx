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

  const clearSelection = useCallback(() => {
    //console.log("Clear selection called");
    if (selectionData.selection) {
      selectionData.selection.removeAllRanges();
      setSelectionData(INITIAL_STATE);
      setHasSelectionChange(false);
    }
  }, [selectionData.selection]);

  const handleSelectionChange = useCallback(() => {
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      //console.log(selection.toString());
      //console.log(selection.rangeCount);
      updateSelectionData(selection);
      setHasSelectionChange(true);
    } else {
      //console.log("No selection");
      // Don't reset selectionData if the selection is collapsed
      if (selection && selection.isCollapsed) {
        return;
      }
      setSelectionData(INITIAL_STATE);
      setHasSelectionChange(false);
    }
  }, [updateSelectionData]);

  const debouncedHandleSelectionChange = useCallback(
    debounce(handleSelectionChange, 300),
    [handleSelectionChange],
  );

  const handleSelectStart = useCallback(() => {
    setSelectionData(INITIAL_STATE);
  }, []);

  useEffect(() => {
    //console.log("Adding event listeners");
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener(
      "selectionchange",
      debouncedHandleSelectionChange,
    );
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    return () => {
      //console.log("Removing event listeners");
      document.removeEventListener(
        "selectionchange",
        debouncedHandleSelectionChange,
      );
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
    };
  }, [debouncedHandleSelectionChange, handleSelectStart]);

  const hasSelection =
    selectionData?.text && selectionData?.text?.length > 0 ? true : false;

  //console.log(hasSelectionChange);
  //console.log(hasSelection);
  //console.log(selectionData.text);

  return {
    ...selectionData,
    clearSelection,
    hasSelection,
    setHasSelectionChange,
  };
};

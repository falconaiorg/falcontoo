import { useState, useCallback, useEffect } from "react";

export const useClipboard = () => {
  const [clipboardText, setClipboardText] = useState<string>("");

  useEffect(() => {
    const readClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText();
        console.log("Clipboard text: ", text);
        setClipboardText(text);
      } catch (err) {
        console.log("Failed to read clipboard contents: ", err);
        console.error("Failed to read clipboard contents: ", err);
      }
    };

    readClipboard();
  }, []);

  console.log(clipboardText);

  return clipboardText;
};

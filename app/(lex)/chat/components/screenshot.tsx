// https://chat.openai.com/share/63718393-be68-4f98-a25f-5b212fb5d77c
import { useRef } from "react";
import html2canvas from "html2canvas";
import { ArrowDownIcon } from "@radix-ui/react-icons";

export const ScreenshotCapture = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const captureScreenshot = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current, { scale: 1 })
        .then((canvas) => {
          if (imageRef.current) {
            imageRef.current.src = canvas.toDataURL("image/png");
          }
        })
        .catch((error) => {
          console.error("Error capturing the screenshot:", error);
        });
    }
  };

  return (
    <div>
      <div
        ref={contentRef}
        style={{
          width: "300px",
          height: "200px",
          backgroundColor: "lightblue",
          padding: "20px",
        }}
      >
        {/* Content you want to screenshot */}
        <h1>
          Hello, capture this part!
          <ArrowDownIcon />
        </h1>
      </div>
      <div>What is the dog?</div>
      <button onClick={captureScreenshot}>Capture Screenshot</button>
      <img
        ref={imageRef}
        alt="Screenshot"
        style={{ width: "300px", marginTop: "10px" }}
      />
    </div>
  );
};

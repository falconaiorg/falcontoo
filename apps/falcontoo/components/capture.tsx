"use client";
import { useDeviceMotion } from "@/hooks/use-device-motion";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints: MediaTrackConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment", // Rear camera
};

export const Capture = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const { isActive, position } = useDeviceMotion();

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
    } else {
      console.error("Webcam not initialized");
    }
  };

  return (
    <div>
      <button onClick={() => setCameraActive(true)}>Open Camera</button>
      {(cameraActive || isActive) && (
        <div>
          <>
            {isActive ? (
              <div>
                <p>Device is active</p>
                <p>X: {position.x}</p>
                <p>Y: {position.y}</p>
              </div>
            ) : (
              <p>Device is not active</p>
            )}
          </>
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture Photo</button>
          <button onClick={() => setCameraActive(false)}>Close Camera</button>
        </div>
      )}
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Captured" />
          <p>Captured Image</p>
        </div>
      )}
    </div>
  );
};

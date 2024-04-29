"use client";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

interface Acceleration {
  x: number | null;
  y: number | null;
  z: number | null;
}

const useDeviceMotion = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const threshold = 10; // Define a threshold for activation
    let lastAcceleration: Acceleration = { x: 0, y: 0, z: 0 };

    const handleMotionEvent = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (
        acceleration &&
        lastAcceleration.x !== null &&
        lastAcceleration.y !== null &&
        lastAcceleration.z !== null
      ) {
        let deltaX = Math.abs(lastAcceleration.x - (acceleration.x || 0));
        let deltaY = Math.abs(lastAcceleration.y - (acceleration.y || 0));
        let deltaZ = Math.abs(lastAcceleration.z - (acceleration.z || 0));

        if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }

      lastAcceleration = {
        x: acceleration?.x ?? 0,
        y: acceleration?.y ?? 0,
        z: acceleration?.z ?? 0,
      };
    };

    window.addEventListener("devicemotion", handleMotionEvent);

    return () => {
      window.removeEventListener("devicemotion", handleMotionEvent);
    };
  }, []);

  return isActive;
};

export default useDeviceMotion;

export const Capture = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const isActive = useDeviceMotion();

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

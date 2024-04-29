"use client";

import { useEffect, useState } from "react";

interface Acceleration {
  x: number | null;
  y: number | null;
  z: number | null;
}

export const useDeviceMotion = () => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const threshold = 3; // Define a threshold for activation
    let lastAcceleration: Acceleration = { x: 0, y: 0, z: 0 };

    const handleMotionEvent = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;

      setPosition({
        x: acceleration?.x ?? 0,
        y: acceleration?.y ?? 0,
        z: acceleration?.z ?? 0,
      });
      console.log(acceleration);
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

  return { isActive, position };
};

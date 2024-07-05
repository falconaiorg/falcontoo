"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const InstallButton: React.FC = ({ ...props }: ButtonProps) => {
  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const beforeInstallPromptHandler = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener(
      "beforeinstallprompt",
      beforeInstallPromptHandler as EventListener,
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler as EventListener,
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPromptEvent) {
      return;
    }

    installPromptEvent.prompt();

    installPromptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        //console.log("User accepted the install prompt");
      } else {
        //console.log("User dismissed the install prompt");
      }
      setInstallPromptEvent(null);
    });
  };

  return (
    <Button onClick={handleInstallClick} {...props}>
      <div className="flex items-baseline space-x-2">
        <div>Install Lex</div> <div className="font-serif text-xs italics">(Alpha)</div>
      </div>
    </Button>
  );
};

"use client";
import { useTheme } from "next-themes";
import { STYLES } from "./config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  themeAtom,
  colorAtom,
  lineHeightAtom,
  fontSizeAtom,
  marginAtom,
  alignmentAtom,
  fontAtom,
} from "./theme-atoms";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
//import autoAnimate
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AdjustmentsIcon } from "@/components/icons";

export const Styler = ({ className }: { className?: string }) => {
  console.log("Styler");
  return (
    <Popover>
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outline"
          size={"icon"}
          className="rounded-full p-2 ring ring-secondary"
        >
          <AdjustmentsIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="center">
        <CardHeader>
          <CardTitle>Reader Layout</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Separator />
          <div className="flex flex-col space-y-2">
            <h1 className="text-sm ">Color</h1>
            <ThemeChanger />
          </div>
          <Separator />
          <div className="flex flex-col space-y-2">
            <h1 className="text-sm ">Margins</h1>
            <MarginPicker />
          </div>
          <Separator />
          <div className="flex flex-col space-y-2">
            <h1 className="text-sm ">Spacing</h1>
            <LineHeightPicker />
          </div>
          <Separator />
          <div className="flex flex-col space-y-2">
            <h1 className="text-sm ">Alignment</h1>
            <AlignmentPicker />
          </div>

          <Separator />
          <div className="flex flex-col space-y-2">
            <h1 className="text-sm ">Size</h1>
            <FontSizePicker />
          </div>
          <Separator />
          <div className="flex flex-col space-y-2">
            <h1 className="text-sm ">Font</h1>
            <FontPicker />
          </div>
        </CardContent>
      </PopoverContent>
    </Popover>
  );
};

const ColorPicker = () => {
  const { colors } = STYLES;
  const [color, setColor] = useAtom(colorAtom);
  console.log("color", color.name);

  return (
    <div className="flex items-center space-x-4">
      {colors.map((colorFromStyles) => (
        <Button
          variant={colorFromStyles.name === color.name ? "default" : "outline"}
          size={"sm"}
          key={colorFromStyles.name}
          onClick={() => {
            setColor(colorFromStyles);
          }}
        >
          {colorFromStyles.name}
        </Button>
      ))}
    </div>
  );
};

const ThemeChanger = () => {
  const { themes } = STYLES;
  const { theme, setTheme } = useTheme();
  console.log("theme", theme);

  return (
    <div className="flex items-center space-x-4">
      {themes.map((themeFromStyles) => (
        <Button
          variant={"ghost"}
          size={"icon"}
          key={themeFromStyles.name}
          onClick={() => {
            setTheme(themeFromStyles.name);
          }}
          className={cn("rounded-full", themeFromStyles.color, {
            "ring-2 ring-slate-400": themeFromStyles.name === "light",
            "ring-2 ring-white": themeFromStyles.name === "dark",
          })}
        ></Button>
      ))}
    </div>
  );
};

const LineHeightPicker = () => {
  const { lineHeights } = STYLES;
  const [lineHeight, setLineHeight] = useAtom(lineHeightAtom);
  console.log("lineHeight", lineHeight);

  return (
    <div className="flex items-center space-x-4">
      {lineHeights.map((lineHeightFromStyles) => (
        <Button
          variant={
            lineHeightFromStyles.size === lineHeight.size
              ? "default"
              : "outline"
          }
          size={"icon"}
          key={lineHeightFromStyles.size}
          onClick={() => {
            setLineHeight(lineHeightFromStyles);
          }}
        >
          <lineHeightFromStyles.Icon />
        </Button>
      ))}
    </div>
  );
};

const FontSizePicker = () => {
  const { fontSizes } = STYLES;
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  console.log("fontSize", fontSize);

  return (
    <div className="flex items-center space-x-4">
      {fontSizes.map((fontSizeFromStyles) => (
        <Button
          variant={
            fontSizeFromStyles.size === fontSize.size ? "default" : "outline"
          }
          size={"sm"}
          key={fontSizeFromStyles.size}
          onClick={() => {
            setFontSize(fontSizeFromStyles);
          }}
        >
          {fontSizeFromStyles.size}
        </Button>
      ))}
    </div>
  );
};

const AlignmentPicker = () => {
  const { alignments } = STYLES;
  const [alignment, setAlignment] = useAtom(alignmentAtom);
  console.log("alignment", alignment);

  return (
    <div className="flex items-center  space-x-4">
      {alignments.map((alignmentFromStyles) => (
        <Button
          variant={
            alignmentFromStyles.alignment === alignment.alignment
              ? "default"
              : "outline"
          }
          size={"icon"}
          key={alignmentFromStyles.alignment}
          onClick={() => {
            setAlignment(alignmentFromStyles);
          }}
        >
          <alignmentFromStyles.Icon />
        </Button>
      ))}
    </div>
  );
};

const MarginPicker = () => {
  const { margins } = STYLES;
  const [margin, setMargin] = useAtom(marginAtom);
  console.log("margin", margin);

  return (
    <div className="flex items-center space-x-4">
      {margins.map((marginFromStyles) => (
        <Button
          variant={
            marginFromStyles.size === margin.size ? "default" : "outline"
          }
          size={"icon"}
          key={marginFromStyles.size}
          onClick={() => {
            setMargin(marginFromStyles);
          }}
        >
          <marginFromStyles.Icon />
        </Button>
      ))}
    </div>
  );
};

const FontPicker = () => {
  const { fonts } = STYLES;
  const [font, setFont] = useAtom(fontAtom);
  const [animationParent] = useAutoAnimate();

  return (
    <div className="flex flex-col space-y-4" ref={animationParent}>
      <div className="flex flex-col space-y-4 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 ">
          {fonts.map((fontFromStyles) => (
            <Button
              variant={
                fontFromStyles.name === font.name ? "default" : "outline"
              }
              size={"sm"}
              className={fontFromStyles.className}
              key={fontFromStyles.name}
              onClick={() => {
                setFont(fontFromStyles);
              }}
            >
              {fontFromStyles.name}
            </Button>
          ))}
        </div>
      </div>
      <div
        className={cn("rounded border p-2 text-sm", font.className)}
        ref={animationParent}
      >
        {font.description}
      </div>
    </div>
  );
};

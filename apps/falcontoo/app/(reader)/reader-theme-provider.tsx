"use client";
import { ThemeProvider } from "next-themes";
import { useAtom } from "jotai";
import { themeAtom } from "./read/[articleId]/theme/theme-atoms";
import { useTheme } from "next-themes";

export function ReaderThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("ReaderThemeProvider");
  const [theme] = useAtom(themeAtom);
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();

  console.log("Theme: ", theme);
  console.log("Next Theme: ", nextTheme);
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}

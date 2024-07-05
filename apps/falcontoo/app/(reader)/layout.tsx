import { ThemeProvider } from "next-themes";
import { ReaderThemeProvider } from "./reader-theme-provider";

export default function ReaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReaderThemeProvider>{children}</ReaderThemeProvider>;
}

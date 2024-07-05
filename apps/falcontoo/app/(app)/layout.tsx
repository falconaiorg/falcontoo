import { ThemeProvider } from "next-themes";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      forcedTheme="dark"
    >
      {children}
    </ThemeProvider>
  );
}

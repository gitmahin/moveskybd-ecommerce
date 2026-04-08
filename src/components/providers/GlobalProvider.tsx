"use client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
type GlobalProviderPropsType = {
  children: React.ReactNode;
};
export const GlobalProvider = ({ children }: GlobalProviderPropsType) => {
  return (
    <>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="light"
        forcedTheme="light"
      >
        <Toaster richColors position="top-right" />
        {children}
      </ThemeProvider>
    </>
  );
};

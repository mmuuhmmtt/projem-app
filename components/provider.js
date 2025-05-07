"use client";

import { AppProvider } from '@/context/app-context';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <AppProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AppProvider>
  );
}

export default Providers;
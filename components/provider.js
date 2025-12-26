"use client";

import { AppProvider } from '@/context/app-context';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem suppressColorSchemeWarning>
      <AppProvider>
        {children}
      </AppProvider>
    </ThemeProvider>
  );
}

export default Providers;
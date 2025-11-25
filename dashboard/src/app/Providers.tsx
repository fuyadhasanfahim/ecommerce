'use client';

import { ThemeProvider } from '@/components/ui/theme-provider';
import { useTheme } from 'next-themes';
import { ReactNode } from 'react';
import { Toaster, ToasterProps } from 'sonner';

export default function Providers({ children }: { children: ReactNode }) {
    const { theme } = useTheme();

    return (
        <ThemeProvider
            attribute="class"
            // defaultTheme="system"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster theme={theme as ToasterProps['theme']} />
        </ThemeProvider>
    );
}

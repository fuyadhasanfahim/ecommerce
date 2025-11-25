'use client';

import { ThemeProvider } from '@/components/ui/theme-provider';
import { useSession } from '@/lib/auth-client';
import { ReactNode } from 'react';
import { Toaster, ToasterProps } from 'sonner';

export default function Providers({ children }: { children: ReactNode }) {
    const { data } = useSession();

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme={data?.user.theme}
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster theme={data?.user.theme as ToasterProps['theme']} />
        </ThemeProvider>
    );
}

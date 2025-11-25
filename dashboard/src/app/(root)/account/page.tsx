import RootAccount from '@/components/root/account/account';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Account | ',
};

export default function AccountPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RootAccount />
        </Suspense>
    );
}

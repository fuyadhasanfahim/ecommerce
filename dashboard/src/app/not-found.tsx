import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-background">
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                <h2 className="mb-3 text-5xl font-bold tracking-tight">
                    Whoops!
                </h2>

                <h3 className="mb-3 text-3xl font-semibold">
                    Something went wrong
                </h3>

                <p className="text-muted-foreground mb-8 max-w-md">
                    The page you're looking for doesn't exist. You can return to
                    the dashboard using the button below.
                </p>

                <Button asChild size="lg" className="rounded-lg text-base">
                    <Link href="/dashboard">Back to Dashboard</Link>
                </Button>
            </div>

            <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-black/90 rounded-none"></div>

                <Image
                    src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/error/image-1.png"
                    alt="404 Illustration"
                    fill
                    priority
                    className="object-contain p-10 mix-blend-screen"
                />
            </div>
        </div>
    );
}

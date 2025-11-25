'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from '@/lib/auth-client';
import {
    BellDotIcon,
    LockIcon,
    SettingsIcon,
    SquarePenIcon,
    UserIcon,
    VerifiedIcon,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ChangePassword from './change-password';

export default function RootAccount() {
    const { data, isPending, isRefetching } = useSession();

    const isLoading = isPending || isRefetching;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const showChangePassword = searchParams.has('change-password');

    return (
        <section className="grid grid-cols-3 gap-6 items-start">
            <Card className="col-span-1 overflow-hidden">
                <CardHeader className="grid items-center">
                    <div className="relative group/profile-image">
                        <Avatar className="mx-auto size-52 ring-2 ring-primary ring-offset-1">
                            <AvatarImage
                                src={data?.user.image as string}
                                alt={`${data?.user.name}'s profile`}
                            />
                            <AvatarFallback>
                                {isLoading ? (
                                    <Skeleton />
                                ) : (
                                    <UserIcon size={20} />
                                )}
                            </AvatarFallback>
                        </Avatar>
                        <Button className="absolute -top-16 right-0 group-hover/profile-image:top-0">
                            <SquarePenIcon />
                            Update Image
                        </Button>
                    </div>
                    <div className="w-full text-center space-y-2 mt-2">
                        <h3 className="text-2xl">
                            {isLoading ? (
                                <Skeleton className="h-[24px]" />
                            ) : (
                                data?.user.name
                            )}
                        </h3>

                        {isLoading ? (
                            <Skeleton className="h-[14px]" />
                        ) : (
                            <div className="flex items-center gap-2 justify-center">
                                <p className="text-sm font-serif capitalize">
                                    {data?.user.role?.replace('-', ' ')}
                                </p>
                                {data?.user.emailVerified && (
                                    <VerifiedIcon
                                        className="text-primary"
                                        size={14}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="p-3 bg-primary/20 rounded-lg grid items-start">
                        <Button variant={'link'} className="mr-auto">
                            <SquarePenIcon />
                            Edit Profile
                        </Button>
                        <Separator className="bg-primary" />
                        <Button variant={'link'} className="mr-auto">
                            <SettingsIcon />
                            Account Setting
                        </Button>
                        <Separator className="bg-primary" />
                        <Button
                            variant={'link'}
                            className="mr-auto"
                            onClick={() => {
                                router.push(`${pathname}?change-password=true`);
                            }}
                        >
                            <LockIcon />
                            Change Password
                        </Button>
                        <Separator className="bg-primary" />
                        <Button variant={'link'} className="mr-auto">
                            <BellDotIcon />
                            Notification
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {showChangePassword ? <ChangePassword /> : ''}
        </section>
    );
}

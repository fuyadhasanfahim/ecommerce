'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { signOut, useSession } from '@/lib/auth-client';
import {
    Bell,
    CreditCard,
    Ellipsis,
    Loader,
    LogOut,
    UserCircle,
    UserIcon,
} from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function NavUser() {
    const { isMobile } = useSidebar();
    const { data, isPending, isRefetching } = useSession();
    const [signingOut, setSigningOut] = useState(false);
    const router = useRouter();
    const isLoading = isPending || isRefetching;

    const handleSignout = async () => {
        try {
            setSigningOut(true);

            const res = await signOut();

            if (res.data?.success) {
                toast.success('Signed out successfully.');
                router.push('/sign-in');
            } else {
                toast.error(
                    res.error?.message || 'Failed to signout. Try again later.'
                );
            }
        } catch (error) {
            toast.error((error as Error).message || 'Something went wrong.');
        } finally {
            setSigningOut(false);
        }
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-full">
                                <AvatarImage
                                    src={data?.user.image as string}
                                    alt={data?.user.name}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {isLoading ? (
                                        <Skeleton className="h-full w-full" />
                                    ) : (
                                        <UserIcon className="size-4" />
                                    )}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className={cn(
                                    'grid flex-1 text-left text-sm leading-tight',
                                    isLoading && 'gap-1'
                                )}
                            >
                                <span className="truncate font-medium">
                                    {isLoading ? (
                                        <Skeleton className="h-[16px]" />
                                    ) : (
                                        data?.user.name
                                    )}
                                </span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {isLoading ? (
                                        <Skeleton className="h-[12px]" />
                                    ) : (
                                        data?.user.email
                                    )}
                                </span>
                            </div>
                            <Ellipsis className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-full">
                                    <AvatarImage
                                        src={data?.user.image as string}
                                        alt={data?.user.name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {isLoading ? (
                                            <Skeleton className="h-full w-full" />
                                        ) : (
                                            <UserIcon className="size-4" />
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={cn(
                                        'grid flex-1 text-left text-sm leading-tight',
                                        isLoading && 'gap-1'
                                    )}
                                >
                                    <span className="truncate font-medium">
                                        {isLoading ? (
                                            <Skeleton className="h-[16px]" />
                                        ) : (
                                            data?.user.name
                                        )}
                                    </span>
                                    <span className="text-muted-foreground truncate text-xs">
                                        {isLoading ? (
                                            <Skeleton className="h-[12px]" />
                                        ) : (
                                            data?.user.email
                                        )}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <UserCircle />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="bg-red-100 hover:bg-red-200 transition-all duration-200 cursor-pointer dark:hover:bg-destructive dark:bg-transparent ease-in"
                            onClick={handleSignout}
                            disabled={signingOut}
                        >
                            {signingOut ? (
                                <Loader className="animate-spin" />
                            ) : (
                                <LogOut className="text-destructive dark:text-white" />
                            )}
                            <span className="text-destructive dark:text-white">
                                Log out
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

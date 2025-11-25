'use client';

import * as React from 'react';

import { NavDocuments } from '@/components/sidebar/nav-documents';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavSecondary } from '@/components/sidebar/nav-secondary';
import { NavUser } from '@/components/sidebar/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    CameraIcon,
    ChartLine,
    ClipboardClock,
    Database,
    FileCode2,
    FileIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    ListCollapse,
    Plus,
    Search,
    Settings,
} from 'lucide-react';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '#',
            icon: LayoutDashboardIcon,
        },
        {
            title: 'Lifecycle',
            url: '#',
            icon: ListCollapse,
        },
        {
            title: 'Analytics',
            url: '#',
            icon: ChartLine,
        },
    ],
    navClouds: [
        {
            title: 'Capture',
            icon: CameraIcon,
            isActive: true,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Proposal',
            icon: FileCode2,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Prompts',
            icon: FileIcon,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: 'Settings',
            url: '#',
            icon: Settings,
        },
        {
            title: 'Get Help',
            url: '#',
            icon: HelpCircleIcon,
        },
        {
            title: 'Search',
            url: '#',
            icon: Search,
        },
    ],
    documents: [
        {
            name: 'Data Library',
            url: '#',
            icon: Database,
        },
        {
            name: 'Reports',
            url: '#',
            icon: ClipboardClock,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <a href="#">
                                <Plus className="size-5!" />
                                <span className="text-base font-semibold">
                                    Acme Inc.
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

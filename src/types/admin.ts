// TypeScript interfaces for admin components

export interface SidebarItemData {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

export interface AdminUser {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

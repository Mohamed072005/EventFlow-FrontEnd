import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";
import type React from "react";

interface AdminDashboardLayoutProps {
    children: React.ReactNode;
}

interface NavItem {
    label: string
    icon: string
    href: string
    role?: string[]
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
    const navItems: NavItem[] = [
        {
            label: "Dashboard",
            icon: 'LayoutDashboard',
            href: "/dashboard/admin",
        },
        {
            label: "Events",
            icon: 'Calendar',
            href: "/dashboard/admin/events",
        },
        {
            label: 'Users',
            icon: 'Users',
            href: "/dashboard/admin/users",
        },
        {
            label: 'Home',
            icon: 'Home',
            href: "/",
        }
    ]
    return (
        <>
            <DashboardLayout items={navItems}>
                { children }
            </DashboardLayout>
        </>
    )
}

export default AdminDashboardLayout
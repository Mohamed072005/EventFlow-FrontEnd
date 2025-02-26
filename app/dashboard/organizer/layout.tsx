import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";

interface OrganizerDashboardLayoutProps {
    children: React.ReactNode;
}

interface NavItem {
    label: string
    icon: string
    href: string
    role?: string[]
}

const OrganizerDashboardLayout: React.FC<OrganizerDashboardLayoutProps> = ({ children }) => {
    const navItems: NavItem[] = [
        {
            label: "Dashboard",
            icon: 'LayoutDashboard',
            href: "/dashboard/organizer",
        },
        {
            label: 'Your Events',
            icon: 'Calendar',
            href: "/dashboard/organizer/events",
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
                {children}
            </DashboardLayout>
        </>
    )
}

export default OrganizerDashboardLayout;
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
            label: "Total Events",
            icon: 'Calendar',
            href: "/dashboard/organizer",
        },
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
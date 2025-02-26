"use client"

import type React from "react"

import {Box, IconButton} from "@mui/material"
import {Menu} from "lucide-react"
import {useState} from "react"
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import {Bell, Calendar, LayoutDashboard, Users, Home} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    LayoutDashboard,
    Calendar,
    Users,
    Bell,
    Home
};

interface NavItem {
    label: string
    icon: string
    href: string
    role?: string[]
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    items: NavItem[]
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children, items}) => {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <Box sx={{display: "flex", minHeight: "100vh"}}>
            <DashboardHeader
                items={items.map(item => ({
                ...item,
                icon: iconMap[item.icon],}))}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    pt: {xs: 8, sm: 9},
                    backgroundColor: "background.default",
                }}
            >
                {/* Mobile menu button */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    sx={{
                        position: "fixed",
                        top: 16,
                        left: 16,
                        display: {md: "none"},
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        bgcolor: "background.paper",
                        boxShadow: 1,
                        "&:hover": {
                            bgcolor: "background.paper",
                        },
                    }}
                >
                    <Menu/>
                </IconButton>
                {children}
            </Box>
        </Box>
    )
}

export default DashboardLayout;
"use client"

import type React from "react"

import { useState } from "react"
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Drawer,
    useTheme,
    useMediaQuery,
    Divider,
    Tooltip,
    Avatar,
    Typography,
} from "@mui/material"
import {
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    ChevronLeft,
    ChevronRight,
    Shield,
    Bell,
    PlusCircle,
    LogOut,
    User,
} from "lucide-react"
import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import useAuthStore from "@/store/authStore"

const DRAWER_WIDTH = 300
const COLLAPSED_DRAWER_WIDTH = 80

interface NavItem {
    label: string
    icon: React.ElementType
    href: string
    role?: string[]
}

interface DashboardHeaderProps {
    items: NavItem[]
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ items }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()
    const { user } = useAuthStore()
    const router = useRouter()

    const mainNavItems: NavItem[] = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard",
        },
        {
            label: "Events",
            icon: Calendar,
            href: "/dashboard/admin/events",
        },
        {
            label: "Following",
            icon: Users,
            href: "/dashboard/following",
        },
        {
            label: "Notifications",
            icon: Bell,
            href: "/dashboard/notifications",
        },
    ]

    const organizerItems: NavItem[] = [
        {
            label: "Create Event",
            icon: PlusCircle,
            href: "/dashboard/events/create",
            role: ["organizer"],
        },
    ]

    const adminItems: NavItem[] = [
        {
            label: "Admin Panel",
            icon: Shield,
            href: "/dashboard/admin",
            role: ["admin"],
        },
    ]

    const bottomNavItems: NavItem[] = [
        {
            label: "Profile",
            icon: User,
            href: "/dashboard/profile",
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/dashboard/settings",
        },
    ]

    const renderNavItems = (items: NavItem[]) => {
        return items.map((item) => {
            // Check if the item should be shown based on user role
            if (item.role && (!user?.role || !item.role.includes(user.role))) {
                return null
            }

            return (
                <ListItem key={item.href} disablePadding sx={{ display: "block" }}>
                    <Tooltip title={isCollapsed ? item.label : ""} placement="right" arrow>
                        <ListItemButton
                            onClick={() => router.push(item.href)}
                            selected={pathname === item.href}
                            sx={{
                                minHeight: 48,
                                px: 2.5,
                                mx: 1,
                                my: 0.5,
                                borderRadius: 2,
                                justifyContent: isCollapsed ? "center" : "initial",
                                "&.Mui-selected": {
                                    bgcolor: "primary.main",
                                    color: "primary.contrastText",
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                    },
                                    "& .MuiListItemIcon-root": {
                                        color: "inherit",
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isCollapsed ? 0 : 2,
                                    justifyContent: "center",
                                    color: pathname === item.href ? "inherit" : "text.secondary",
                                }}
                            >
                                <item.icon size={20} />
                            </ListItemIcon>
                            {!isCollapsed && (
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize: "0.875rem",
                                        fontWeight: pathname === item.href ? 600 : 500,
                                    }}
                                />
                            )}
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
            )
        })
    }

    const drawer = (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* User Profile Section */}
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Avatar
                    sx={{
                        width: isCollapsed ? 40 : 48,
                        height: isCollapsed ? 40 : 48,
                        bgcolor: "primary.main",
                    }}
                >
                    {user?.role?.[0] || "U"}
                </Avatar>
                {!isCollapsed && (
                    <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle1" fontWeight={600} noWrap>
                            {user?.role || "User Name"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {user?.role || "User"}
                        </Typography>
                    </Box>
                )}
            </Box>

            <Divider sx={{ my: 1 }} />

            <List sx={{ px: 2 }}>{renderNavItems(items)}</List>

            {/* Bottom Navigation */}
            <Box sx={{ mt: "auto" }}>
                <Divider sx={{ my: 1 }} />
                <List sx={{ px: 2 }}>
                    {renderNavItems(bottomNavItems)}
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            onClick={() => {
                                router.push('/login');
                            }}
                            sx={{
                                minHeight: 48,
                                px: 2.5,
                                mx: 1,
                                my: 0.5,
                                borderRadius: 2,
                                justifyContent: isCollapsed ? "center" : "initial",
                                color: "error.main",
                                "&:hover": {
                                    bgcolor: "error.main",
                                    color: "error.contrastText",
                                    "& .MuiListItemIcon-root": {
                                        color: "inherit",
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isCollapsed ? 0 : 2,
                                    justifyContent: "center",
                                    color: "inherit",
                                }}
                            >
                                <LogOut size={20} />
                            </ListItemIcon>
                            {!isCollapsed && (
                                <ListItemText
                                    primary="Logout"
                                    primaryTypographyProps={{
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                    }}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            {/* Collapse Button */}
            {!isMobile && (
                <Box
                    sx={{
                        position: "absolute",
                        right: -20,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                >
                    <IconButton
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        sx={{
                            bgcolor: "background.paper",
                            border: 1,
                            borderColor: "divider",
                            "&:hover": { bgcolor: "background.paper" },
                        }}
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </IconButton>
                </Box>
            )}
        </Box>
    )

    return (
        <Box
            component="nav"
            sx={{
                width: { md: isCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH },
                flexShrink: { md: 0 },
            }}
        >
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: DRAWER_WIDTH,
                            borderRight: "none",
                            backgroundImage: "none",
                            boxShadow: (theme) => theme.shadows[2],
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: isCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
                            borderRight: "none",
                            backgroundImage: "none",
                            boxShadow: (theme) => theme.shadows[2],
                            transition: (theme) =>
                                theme.transitions.create("width", {
                                    easing: theme.transitions.easing.sharp,
                                    duration: theme.transitions.duration.enteringScreen,
                                }),
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            )}
        </Box>
    )
}

export default DashboardHeader;
"use client"

import type React from "react"
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Box,
    Avatar,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material"
import {
    Notifications as NotificationsIcon,
    Dashboard,
    Event,
    EventAvailable,
    Menu as MenuIcon,
    Person,
    ExitToApp,
    CalendarMonth,
    Settings,
    Login
} from "@mui/icons-material"
import Link from "next/link"
import {useState} from "react"
import {useRouter} from "next/navigation"
import {CreateEventModal} from "@/components/events/CreateEventModal"
import useAuthStore from "@/store/authStore";

export function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [createEventOpen, setCreateEventOpen] = useState(false)
    const router = useRouter()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const {isAuthenticated, user} = useAuthStore()

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleProfileAction = (path: string) => {
        handleClose()
        router.push(path)
    }

    const menuItems = [
        {icon: <Person/>, label: "Profile", path: "/profile"},
        {icon: <CalendarMonth/>, label: "My Events", path: "/dashboard"},
        {icon: <Settings/>, label: "Settings", path: "/settings"},
        {icon: <ExitToApp/>, label: "Logout", path: "/login"},
    ]

    const navItems = [
        {
            icon: <Dashboard/>,
            label: "Dashboard",
            path: "/dashboard",
        },
    ]

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "background.paper",
                backdropFilter: "blur(10px)",
                boxShadow: theme.shadows[2],
            }}
        >
            <Toolbar sx={{justifyContent: "space-between", px: {xs: 2, sm: 4}}}>
                {/* Logo Section */}
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    {isMobile && (
                        <IconButton color="primary" edge="start" onClick={() => setMobileMenuOpen(true)} sx={{mr: 1}}>
                            <MenuIcon/>
                        </IconButton>
                    )}
                    <EventAvailable
                        sx={{
                            color: "primary.main",
                            fontSize: {xs: 28, sm: 32},
                            transform: "rotate(-10deg)",
                        }}
                    />
                    <Typography
                        variant="h6"
                        component={Link}
                        href="/"
                        sx={{
                            textDecoration: "none",
                            color: "text.primary",
                            fontWeight: 700,
                            fontSize: {xs: "1.2rem", sm: "1.5rem"},
                            letterSpacing: "-0.5px",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                color: "primary.main",
                                transform: "translateY(-1px)",
                            },
                        }}
                    >
                        EventFlow
                    </Typography>
                </Box>

                {/* Navigation Section - Desktop */}
                {/*{!isMobile && (*/}
                {/*    <Box*/}
                {/*        sx={{*/}
                {/*            display: "flex",*/}
                {/*            gap: 1,*/}
                {/*            alignItems: "center",*/}
                {/*            ml: "auto",*/}
                {/*            mr: 2,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {navItems.map((item) => (*/}
                {/*            <Button*/}
                {/*                key={item.path}*/}
                {/*                component={Link}*/}
                {/*                href={item.path}*/}
                {/*                startIcon={item.icon}*/}
                {/*                sx={{*/}
                {/*                    color: "text.primary",*/}
                {/*                    px: 2,*/}
                {/*                    py: 1,*/}
                {/*                    borderRadius: "12px",*/}
                {/*                    transition: "all 0.3s ease",*/}
                {/*                    "&:hover": {*/}
                {/*                        backgroundColor: "action.hover",*/}
                {/*                        transform: "translateY(-2px)",*/}
                {/*                    },*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                {item.label}*/}
                {/*            </Button>*/}
                {/*        ))}*/}
                {/*    </Box>*/}
                {/*)}*/}

                {/* Actions Section */}
                {isAuthenticated ? (
                    <>
                        {!isMobile && (
                            <>
                                <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                                    <Button
                                        component={Link}
                                        href='/dashboard'
                                        startIcon={<Dashboard/>}
                                        sx={{
                                            color: "text.primary",
                                            px: 2,
                                            py: 1,
                                            borderRadius: "12px",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                backgroundColor: "action.hover",
                                                transform: "translateY(-2px)",
                                            },
                                        }}
                                    >
                                        Dashboard
                                    </Button>
                                    {user?.role === "organizer" && (
                                        <Button
                                            startIcon={<Event/>}
                                            onClick={() => setCreateEventOpen(true)}
                                            sx={{
                                                color: "text.primary",
                                                px: 2,
                                                py: 1,
                                                borderRadius: "12px",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    backgroundColor: "action.hover",
                                                    transform: "translateY(-2px)",
                                                },
                                            }}
                                        >
                                            Create Event
                                        </Button>
                                    )}
                                    <IconButton
                                        color="primary"
                                        component={Link}
                                        href="/notifications"
                                        sx={{
                                            color: 'text.primary',
                                            transition: "transform 0.3s ease",
                                            "&:hover": {transform: "translateY(-2px)"},
                                        }}
                                    >
                                        <Badge
                                            badgeContent={4}
                                            color="error"
                                            sx={{
                                                "& .MuiBadge-badge": {
                                                    animation: "pulse 2s infinite",
                                                    "@keyframes pulse": {
                                                        "0%": {transform: "scale(0.95)"},
                                                        "70%": {transform: "scale(1)"},
                                                        "100%": {transform: "scale(0.95)"},
                                                    },
                                                },
                                            }}
                                        >
                                            <NotificationsIcon/>
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        onClick={handleMenu}
                                        sx={{
                                            transition: "transform 0.3s ease",
                                            "&:hover": {transform: "translateY(-2px)"},
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 35,
                                                height: 35,
                                                border: "2px solid",
                                                borderColor: "primary.main",
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                            </>
                        )}
                    </>
                ) : (
                    <Button
                        component={Link}
                        href='/login'
                        startIcon={<Login />}
                        sx={{
                            color: "text.primary",
                            px: 2,
                            py: 1,
                            borderRadius: "12px",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                backgroundColor: "action.hover",
                                transform: "translateY(-2px)",
                            },
                        }}
                    >
                        Login
                    </Button>
                )
                }


                {/* Profile Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    transformOrigin={{horizontal: "right", vertical: "top"}}
                    anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                    PaperProps={{
                        elevation: 3,
                        sx: {
                            mt: 1.5,
                            minWidth: 200,
                            borderRadius: "12px",
                            "& .MuiMenuItem-root": {
                                py: 1.5,
                                gap: 1.5,
                            },
                        },
                    }}
                >
                    {menuItems.map((item) => (
                        <MenuItem
                            key={item.path}
                            onClick={() => handleProfileAction(item.path)}
                            sx={{
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    backgroundColor: "action.hover",
                                    transform: "translateX(4px)",
                                },
                            }}
                        >
                            <ListItemIcon sx={{color: "text.primary"}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </MenuItem>
                    ))}
                </Menu>

                {/* Mobile Navigation Drawer */}
                <Drawer
                    anchor="left"
                    open={mobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                    PaperProps={{
                        sx: {
                            width: 280,
                            borderRadius: "0 24px 24px 0",
                            p: 2,
                        },
                    }}
                >
                    <List sx={{pt: 2}}>
                        {isAuthenticated ? (
                            <>
                                {navItems.map((item) => (
                                    <ListItem
                                        key={item.path}
                                        component={Link}
                                        href={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        sx={{
                                            borderRadius: "12px",
                                            mb: 1,
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                backgroundColor: "action.hover",
                                                transform: "translateX(4px)",
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{color: "primary.main"}}>{item.icon}</ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontWeight: 500,
                                            }}
                                        />
                                    </ListItem>
                                ))}
                                <Divider sx={{my: 2}}/>
                                {menuItems.map((item) => (
                                    <ListItem
                                        key={item.path}
                                        onClick={() => {
                                            setMobileMenuOpen(false)
                                            handleProfileAction(item.path)
                                        }}
                                        sx={{
                                            borderRadius: "12px",
                                            mb: 1,
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                backgroundColor: "action.hover",
                                                transform: "translateX(4px)",
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{color: "text.primary"}}>{item.icon}</ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontWeight: 500,
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </>
                        ) : (
                            <ListItem
                                component={Link}
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                sx={{
                                    borderRadius: "12px",
                                    mb: 1,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                        transform: "translateX(4px)",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{color: "primary.main"}}><Login /></ListItemIcon>
                                <ListItemText
                                    primary="Login"
                                    primaryTypographyProps={{
                                        fontWeight: 500,
                                    }}
                                />
                            </ListItem>
                        )}
                    </List>
                </Drawer>
            </Toolbar>
            <CreateEventModal
                open={createEventOpen}
                onClose={() => setCreateEventOpen(false)}
                onSubmit={async (eventData) => {
                    setCreateEventOpen(false)
                }}/>
        </AppBar>

    )
}
"use client"

import type React from "react"

import { useState } from "react"
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Tabs,
    Tab,
    Paper,
    Button,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material"
import {
    Calendar,
    Users,
    TrendingUp,
    Clock,
    Edit2,
    Trash2,
    MoreVertical,
    AlertCircle,
    CheckCircle,
    XCircle,
} from "lucide-react"
import { useToast } from "@/contexts/ToastContext"
import { CreateEventModal } from "@/components/events/CreateEventModal"
import { format } from "date-fns"
import Link from "next/link"

interface Event {
    id: string
    title: string
    date: string
    location: string
    status: "draft" | "pending" | "approved" | "rejected" | "cancelled"
    participants: number
    maxParticipants: number
    thumbnail: string
}

// Mock data - replace with actual API call
const mockEvents: Event[] = Array.from({ length: 8 }, (_, i) => ({
    id: `event-${i + 1}`,
    title: `Event ${i + 1}`,
    date: new Date(Date.now() + i * 86400000).toISOString(),
    location: `Location ${i + 1}`,
    status: ["draft", "pending", "approved", "rejected", "cancelled"][Math.floor(Math.random() * 5)] as Event["status"],
    participants: Math.floor(Math.random() * 50),
    maxParticipants: 100,
    thumbnail: `/placeholder.svg?height=200&width=400`,
}))

const stats = [
    {
        title: "Total Events",
        value: "24",
        icon: Calendar,
        color: "#2196f3",
    },
    {
        title: "Total Participants",
        value: "1.2k",
        icon: Users,
        color: "#4caf50",
    },
    {
        title: "Avg. Attendance Rate",
        value: "85%",
        icon: TrendingUp,
        color: "#ff9800",
    },
    {
        title: "Pending Reviews",
        value: "3",
        icon: Clock,
        color: "#f44336",
    },
]

export default function DashboardOrganizerPage() {
    const [currentTab, setCurrentTab] = useState(0)
    const [createEventOpen, setCreateEventOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const { showToast } = useToast()

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, eventData: Event) => {
        setAnchorEl(event.currentTarget)
        setSelectedEvent(eventData)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setSelectedEvent(null)
    }

    const handleDeleteEvent = async () => {
        try {
            // Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            showToast("Event deleted successfully", "success")
            setDeleteDialogOpen(false)
            handleMenuClose()
        } catch (error) {
            showToast("Failed to delete event", "error")
        }
    }

    const getStatusChip = (status: Event["status"]) => {
        const statusConfig = {
            draft: { color: "default" as const, label: "Draft", icon: Clock },
            pending: { color: "warning" as const, label: "Pending Review", icon: AlertCircle },
            approved: { color: "success" as const, label: "Approved", icon: CheckCircle },
            rejected: { color: "error" as const, label: "Rejected", icon: XCircle },
            cancelled: { color: "error" as const, label: "Cancelled", icon: XCircle },
        }
        const config = statusConfig[status]
        return <Chip size="small" color={config.color} label={config.label} icon={<config.icon size={14} />} />
    }

    const filteredEvents = mockEvents.filter((event) => {
        if (currentTab === 0) return true // All events
        if (currentTab === 1) return event.status === "approved"
        if (currentTab === 2) return event.status === "pending"
        if (currentTab === 3) return event.status === "draft"
        return event.status === "rejected" || event.status === "cancelled"
    })

    return (
        <Box>
            <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'black' }}>
                    Organizer Dashboard
                </Typography>
                <Button variant="contained" startIcon={<Calendar />} onClick={() => setCreateEventOpen(true)}>
                    Create Event
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat) => (
                    <Grid item xs={12} sm={6} md={3} key={stat.title}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <stat.icon size={24} color={stat.color} />
                                    <Typography variant="h6" sx={{ ml: 1, color: "text.secondary" }}>
                                        {stat.title}
                                    </Typography>
                                </Box>
                                <Typography variant="h4" fontWeight="bold">
                                    {stat.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Paper sx={{ mb: 3 }}>
                <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)} sx={{ px: 2, pt: 2 }}>
                    <Tab label="All Events" />
                    <Tab label="Active" />
                    <Tab label="Pending" />
                    <Tab label="Drafts" />
                    <Tab label="Archived" />
                </Tabs>
            </Paper>

            <Grid container spacing={3}>
                {filteredEvents.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <Card>
                            <Box
                                sx={{
                                    position: "relative",
                                    paddingTop: "56.25%", // 16:9 aspect ratio
                                    backgroundColor: "grey.100",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={event.thumbnail}
                                    alt={event.title}
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        sx={{ bgcolor: "background.paper" }}
                                        onClick={(e) => handleMenuOpen(e, event)}
                                    >
                                        <MoreVertical size={18} />
                                    </IconButton>
                                </Box>
                            </Box>
                            <CardContent>
                                <Box sx={{ mb: 2 }}>{getStatusChip(event.status)}</Box>
                                <Typography variant="h6" gutterBottom>
                                    {event.title}
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {format(new Date(event.date), "PPP")}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {event.location}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {event.participants}/{event.maxParticipants} participants
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem component={Link} href={`/dashboard/organizer/events/${selectedEvent?.id}`}>
                    <ListItemIcon>
                        <Users size={18} />
                    </ListItemIcon>
                    <ListItemText>View Participants</ListItemText>
                </MenuItem>
                <MenuItem
                    component={Link}
                    href={`/dashboard/organizer/events/${selectedEvent?.id}/edit`}
                    disabled={selectedEvent?.status === "cancelled"}
                >
                    <ListItemIcon>
                        <Edit2 size={18} />
                    </ListItemIcon>
                    <ListItemText>Edit Event</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleMenuClose()
                        setDeleteDialogOpen(true)
                    }}
                    disabled={selectedEvent?.status === "cancelled"}
                    sx={{ color: "error.main" }}
                >
                    <ListItemIcon sx={{ color: "inherit" }}>
                        <Trash2 size={18} />
                    </ListItemIcon>
                    <ListItemText>Delete Event</ListItemText>
                </MenuItem>
            </Menu>

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Event</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete <strong>{selectedEvent?.title}</strong>? This action cannot be undone.
                    </Typography>
                    <Typography color="error" sx={{ mt: 2 }}>
                        All participants will be notified and any associated data will be permanently removed.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={handleDeleteEvent}>
                        Delete Event
                    </Button>
                </DialogActions>
            </Dialog>

            <CreateEventModal
                open={createEventOpen}
                onClose={() => setCreateEventOpen(false)}
                onSubmit={async (eventData) => {
                    // Handle event creation
                    console.log(eventData)
                    setCreateEventOpen(false)
                    showToast("Event created successfully!", "success")
                }}
            />
        </Box>
    )
}


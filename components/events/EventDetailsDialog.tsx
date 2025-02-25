import type React from "react"
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Chip,
    Button,
    IconButton,
    Grid,
    Divider,
    LinearProgress,
    Avatar,
    Stack,
    useTheme,
    useMediaQuery,
    Paper,
} from "@mui/material"
import { Calendar, Clock, MapPin, Users, Share2, X, CheckCircle, AlertCircle, Edit, Download } from "lucide-react"
import { format } from "date-fns"
import { Event } from "@/types/event"

interface EventDetailsDialogProps {
    open: boolean
    onClose: () => void
    event: Event | null
    isOrganizer?: boolean
    onJoin?: () => void
    onEdit?: () => void
}

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({open, onClose, event, isOrganizer = false, onJoin, onEdit}) => {
    console.log(event);
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

    const participationProgress = (event?.participants_number / event?.max_participants_number) * 100
    const isVerified = !!event?.verified_at
    const eventDate = new Date(event?.date)
    const isPastEvent = eventDate < new Date()
    const isFull = event?.participants_number >= event?.max_participants_number

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: event?.event_name,
                text: event?.description,
                url: window.location.href,
            })
        } else {
            // Fallback for browsers that don't support the Web Share API
            navigator.clipboard.writeText(window.location.href)
            // You could show a toast notification here
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={fullScreen}
            maxWidth="md"
            fullWidth
            scroll="paper"
            PaperProps={{
                sx: {
                    borderRadius: { xs: 0, sm: 2 },
                    overflow: "hidden",
                },
            }}
        >
            <DialogTitle sx={{ p: 0, position: "relative" }}>
                <Box
                    component="img"
                    src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg"
                    alt={event?.event_name}
                    sx={{
                        width: "100%",
                        height: { xs: 200, sm: 300 },
                        objectFit: "cover",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        p: 3,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Box>
                            <Typography variant="h4" color="white" fontWeight="bold" sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                                {event?.event_name}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                {isVerified && <Chip icon={<CheckCircle size={16} />} label="Verified" size="small" color="success" />}
                                {isPastEvent && <Chip label="Past Event" size="small" color="default" />}
                            </Box>
                        </Box>
                        <IconButton
                            onClick={onClose}
                            sx={{
                                color: "white",
                                bgcolor: "rgba(0,0,0,0.3)",
                                "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
                            }}
                        >
                            <X size={20} />
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" gutterBottom>
                            About this event
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {event?.description}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" gutterBottom>
                            Details
                        </Typography>
                        <Stack spacing={2}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar sx={{ bgcolor: "primary.main" }}>
                                    <Calendar size={20} />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2">Date</Typography>
                                    <Typography variant="body2">{event?.date ? format(new Date(event?.date), "EEEE, MMMM d, yyyy") : "N/A"}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar sx={{ bgcolor: "primary.main" }}>
                                    <Clock size={20} />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2">Time</Typography>
                                    <Typography variant="body2">{event?.date ? format(new Date(event?.date), "h:mm a") : "N/A"}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar sx={{ bgcolor: "primary.main" }}>
                                    <MapPin size={20} />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2">Location</Typography>
                                    <Typography variant="body2">{event?.location}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar sx={{ bgcolor: "primary.main" }}>
                                    <Users size={20} />
                                </Avatar>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle2">
                                        Participants ({event?.participants_number}/{event?.max_participants_number})
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={participationProgress}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            mt: 0.5,
                                            bgcolor: "grey.200",
                                            "& .MuiLinearProgress-bar": {
                                                bgcolor: isFull ? "error.main" : "success.main",
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Stack>

                        {isOrganizer && (
                            <>
                                <Divider sx={{ my: 3 }} />
                                <Typography variant="h6" gutterBottom>
                                    Event Management
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                    <Button variant="outlined" startIcon={<Users size={18} />} onClick={() => {}}>
                                        View Participants
                                    </Button>
                                    <Button variant="outlined" startIcon={<Download size={18} />} onClick={() => {}}>
                                        Export Data
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Registration
                            </Typography>

                            {isPastEvent ? (
                                <Box sx={{ textAlign: "center", py: 2 }}>
                                    <AlertCircle size={40} color={theme.palette.text.secondary} />
                                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                        This event has ended
                                    </Typography>
                                </Box>
                            ) : isFull ? (
                                <Box sx={{ textAlign: "center", py: 2 }}>
                                    <AlertCircle size={40} color={theme.palette.error.main} />
                                    <Typography variant="subtitle1" color="error" sx={{ mt: 1 }}>
                                        This event is full
                                    </Typography>
                                </Box>
                            ) : (
                                <Button variant="contained" fullWidth size="large" onClick={onJoin} sx={{ mb: 2 }}>
                                    Join Event
                                </Button>
                            )}

                            {isOrganizer && (
                                <Button variant="outlined" fullWidth startIcon={<Edit size={18} />} onClick={onEdit} sx={{ mt: 2 }}>
                                    Edit Event
                                </Button>
                            )}

                            <Button variant="text" fullWidth startIcon={<Share2 size={18} />} onClick={handleShare} sx={{ mt: 2 }}>
                                Share Event
                            </Button>

                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Created
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {event?.created_at ? format(new Date(event?.created_at), "MMMM d, yyyy") : "N/A"}
                                </Typography>
                            </Box>

                            {isVerified && (
                                <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                                    <CheckCircle size={16} color={theme.palette.success.main} />
                                    <Typography variant="body2" color="success.main">
                                        Verified on {event?.verified_at ? format(new Date(event.verified_at), "MMM d, yyyy") : "N/A"}
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default EventDetailsDialog


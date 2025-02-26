"use client"

import React, {useEffect} from "react"

import {useState} from "react"
import {
    Box,
    Paper,
    TextField,
    Typography,
    InputAdornment, Alert, Button,
} from "@mui/material"
import {Calendar, Search} from "lucide-react"
import {useToast} from "@/contexts/ToastContext"
import EventsTable from "@/components/events/EventsTable";
import ConfirmationDialog from "@/components/events/ConfirmationDialog";
import {Event} from "@/types/event";
import useEventApi from "@/hooks/useEventApi";
import {FETCH_ORGANIZER_EVENTS_PATH} from "@/constants/events/eventsApiUrl";
import Loader from "@/components/Loader";
import EventDetailsDialog from "@/components/events/EventDetailsDialog";
import {CreateEventModal} from "@/components/events/CreateEventModal";
import useAuthStore from "@/store/authStore";

export default function ManageEventsPage() {
    const [events, setEvents] = useState<Event[]>()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedEventForDetails, setSelectedEventForDetails] = useState<Event | null>(null)
    const [openEventDetails, setOpenEventDetails] = useState<boolean>(false);
    const {showToast} = useToast()
    const {fetchEvents, loading, error} = useEventApi();
    const [createEventOpen, setCreateEventOpen] = useState(false);
    const {user} = useAuthStore()
    const userRole = user?.role

    useEffect(() => {
        getEvents()
    }, []);

    const getEvents = async () => {
        try {
            const response = await fetchEvents(FETCH_ORGANIZER_EVENTS_PATH);
            console.log(response)
            if (response?.status === 200) {
                setEvents(response?.data?.events);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(Number.parseInt(event.target.value, 10))
        setPage(0)
    }

    const filteredEvents = events?.filter((event) => {
        const matchesSearch =
            event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event?.user?.role?.role_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    })

    const handleDetailsDiagonalVisibility = (event: Event | null) => {
        setOpenEventDetails(!openEventDetails);
        setSelectedEventForDetails(event)
    }

    return (
        <Box>
            <Box sx={{mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography variant="h4" fontWeight="bold" sx={{color: 'black'}}>
                    Manage Events
                </Typography>
                <Button variant="contained" startIcon={<Calendar/>} onClick={() => setCreateEventOpen(true)}>
                    Create Event
                </Button>
            </Box>

            <Box sx={{mb: 3, display: "flex", gap: 2}}>
                <TextField
                    size="small"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{flexGrow: 1}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={20}/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {error && (
                <>
                    <Alert severity="error" sx={{mb: 2}}>
                        {error}
                    </Alert>
                </>
            )}

            {!loading ? (
                <>
                    <Paper sx={{width: "100%", overflow: "hidden"}}>
                        <EventsTable events={filteredEvents} page={page}
                                     rowsPerPage={rowsPerPage}
                                     onPageChange={handleChangePage}
                                     onRowsPerPageChange={handleChangeRowsPerPage}
                                     handleDetailsDiagonalVisibility={handleDetailsDiagonalVisibility}
                        />
                    </Paper>
                    <EventDetailsDialog open={openEventDetails}
                                        onClose={() => setOpenEventDetails(false)}
                                        isOrganizer={userRole === 'organizer' ? true : false}
                                        event={selectedEventForDetails}/>
                </>
            ) : (
                <>
                    <Loader/>
                </>
            )}
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


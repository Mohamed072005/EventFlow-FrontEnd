"use client"

import React, {useEffect} from "react"

import { useState } from "react"
import {
    Box,
    Paper,
    TextField,
    Typography,
    InputAdornment, Alert, FormControl, InputLabel, Select, MenuItem,
} from "@mui/material"
import { Search } from "lucide-react"
import { useToast } from "@/contexts/ToastContext"
import EventsTable from "@/components/events/EventsTable";
import ConfirmationDialog from "@/components/events/ConfirmationDialog";
import { Event } from "@/types/event";
import useEventApi from "@/hooks/useEventApi";
import {FETCH_ALL_EVENTS_PATH} from "@/constants/events/eventsApiUrl";
import Loader from "@/components/Loader";
import EventDetailsDialog from "@/components/events/EventDetailsDialog";

export default function ManageEventsPage() {
    const [events, setEvents] = useState<Event[]>()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const [selectedEventForDetails, setSelectedEventForDetails] = useState<Event | null>(null)
    const [openEventDetails, setOpenEventDetails] = useState<boolean>(false);
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const { showToast } = useToast()
    const { fetchEvents, loading, error, approveEvent } = useEventApi();
    const roles = [
        { value: "all", label: "All Roles" },
        { value: "organizer", label: "Organizer" },
        { value: "user", label: "User" },
    ];

    useEffect(() => {
        getEvents()
    }, []);

    const getEvents = async () => {
        try {
            const response = await fetchEvents(FETCH_ALL_EVENTS_PATH);
            console.log(response)
            if (response?.status === 200){
                setEvents(response?.data?.events);
            }
            console.log(response);
        }catch (error) {
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

    const setTheEventAndOpenTheDialog = (event: Event) => {
        setSelectedEvent(event)
        setConfirmationOpen(true)
    }

    const handleConfirmAction = async () => {

        try {
            const response = await approveEvent(selectedEvent.id);
            if (response?.status === 200) {
                showToast(response.data.message, "success", 'Success');
                await getEvents();
            }
        } catch (error: any) {
            showToast(error?.response?.data?.message, "error", 'Error');
        }

        setConfirmationOpen(false)
        setSelectedEvent(null)
    }

    const filteredEvents = events?.filter((event) => {
        const matchesSearch =
            event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole =
            roleFilter === "all" || event.user?.role?.role_name === roleFilter;

        return matchesSearch && matchesRole;
    })

    const handleDetailsDiagonalVisibility = (event: Event | null) => {
        setOpenEventDetails(!openEventDetails);
        setSelectedEventForDetails(event)
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, color: 'black' }}>
                Manage Events
            </Typography>

            <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
                <TextField
                    size="small"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={20} />
                            </InputAdornment>
                        ),
                    }}
                />

                <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel>Filter by Role</InputLabel>
                    <Select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        label="Filter by Role"
                    >
                        {roles.map((role) => (
                            <MenuItem key={role.value} value={role.value}>
                                {role.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            { error && (
                <>
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                </>
            ) }

            { !loading ? (
                <>
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                        <EventsTable events={filteredEvents} page={page} rowsPerPage={rowsPerPage} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} onAction={setTheEventAndOpenTheDialog} handleDetailsDiagonalVisibility={handleDetailsDiagonalVisibility} />
                    </Paper>

                    <ConfirmationDialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)} onConfirm={handleConfirmAction} eventName={selectedEvent?.event_name || null} />
                    <EventDetailsDialog open={openEventDetails} onClose={() => setOpenEventDetails(false)} event={selectedEventForDetails} />
                </>
            ) : (
                <>
                    <Loader />
                </>
            ) }
        </Box>
    )
}


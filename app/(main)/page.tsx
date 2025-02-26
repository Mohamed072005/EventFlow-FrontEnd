"use client"

import {Alert, Box, Container, Grid, Typography} from "@mui/material";
import {EventFilters} from "@/components/events/EventFilters";
import {EventCard} from "@/components/events/EventCard";
import useEventApi from "@/hooks/useEventApi";
import React, {useEffect, useState} from "react";
import {Event} from "@/types/event";
import {FETCH_VERIFIED_EVENTS_PATH} from "@/constants/events/eventsApiUrl";
import EventDetailsDialog from "@/components/events/EventDetailsDialog";
import Loader from "@/components/Loader";

const HomaPage = () => {
    const {fetchEvents, loading, error} = useEventApi();
    const [events, setEvents] = useState<Event[]>();
    const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<Event>();
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        getEvents()
    }, []);

    const getEvents = async () => {
        try {
            const response = await fetchEvents(FETCH_VERIFIED_EVENTS_PATH);
            if (response?.status === 200) {
                setEvents(response?.data?.events);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const filteredEvents = events?.filter(event => {
        const matchesSearch = event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.max_participants_number.toLocaleString().includes(searchTerm.toLowerCase())

        return matchesSearch;
    })
    return (
        <>
            <Container maxWidth="lg" sx={{py: 4}}>
                <Box sx={{mb: 4}}>
                    <Typography variant="h4" component="h1" sx={{color: 'black'}} gutterBottom>
                        Discover Events
                    </Typography>
                    <EventFilters setSearch={setSearchTerm} />
                </Box>
                {loading && (
                    <>
                        <Loader/>
                    </>
                )}

                {error && (
                    <>
                        <Alert severity="error" sx={{mb: 2}}>
                            {error}
                        </Alert>
                    </>
                )}
                <Grid container spacing={3}>
                    {filteredEvents?.map((event: Event) => (
                        <Grid item xs={12} sm={6} md={4} key={event.id}>
                            <EventCard
                                event={event}
                                setDetailsModalOpen={() => {
                                    setDetailsModalOpen(true);
                                    setSelectedEvent(event);
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <EventDetailsDialog open={detailsModalOpen} onClose={() => setDetailsModalOpen(false)}
                                event={selectedEvent}/>
        </>
    )
}

export default HomaPage;
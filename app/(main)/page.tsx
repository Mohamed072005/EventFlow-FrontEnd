"use client"

import {Box, Container, Grid, Typography} from "@mui/material";
import {EventFilters} from "@/components/events/EventFilters";
import {EventCard} from "@/components/events/EventCard";
import useEventApi from "@/hooks/useEventApi";
import {useEffect, useState} from "react";
import {Event} from "@/types/event";

const HomaPage = () => {
    const { fetchEvents, loading, error } = useEventApi();
    const [events, setEvents] = useState<Event[]>();

    useEffect(() => {
        getEvents()
    }, []);

    const getEvents = async () => {
        try {
            const response = await fetchEvents();
            if (response?.status === 200){
                setEvents(response?.data?.events);
            }
            console.log(response);
        }catch (error) {
            console.log(error);
        }
    }
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Discover Events
                </Typography>
                <EventFilters />
            </Box>
            <Grid container spacing={3}>
                {events?.map((event: Event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <EventCard
                            id={`event-${event.id}`}
                            title={event.event_name}
                            description={event.description}
                            date={event.date}
                            location={event.location}
                            participants={event.participants_number}
                            maxParticipants={event.max_participants_number}
                            imageUrl={event.image_url}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default HomaPage;
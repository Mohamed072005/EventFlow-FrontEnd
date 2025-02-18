import {Box, Container, Grid, Typography} from "@mui/material";
import {EventFilters} from "@/components/events/EventFilters";
import {EventCard} from "@/components/events/EventCard";

const HomaPage = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Discover Events
                </Typography>
                <EventFilters />
            </Box>
            <Grid container spacing={3}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <EventCard
                            id={`event-${index}`}
                            title={`Event ${index + 1}`}
                            description="Join us for an amazing event that you won't want to miss!"
                            date={new Date(Date.now() + 86400000 * (index + 1))}
                            location="New York, NY"
                            participants={15}
                            maxParticipants={30}
                            imageUrl={`/placeholder.svg?height=200&width=400`}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default HomaPage;
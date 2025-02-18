"use client"

import { Grid, Typography, Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"

export default function DashboardPage() {
    const [tab, setTab] = useState(0)

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                My Dashboard
            </Typography>
            <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mb: 4 }}>
                <Tab label="Upcoming Events" />
                <Tab label="My Events" />
                <Tab label="Past Events" />
            </Tabs>
            <Grid container spacing={3}>
                {/*{events.map((event) => (*/}
                {/*    <Grid item xs={12} sm={6} md={4} key={event.id}>*/}
                {/*        <EventCard event={event} onJoin={joinEvent} />*/}
                {/*    </Grid>*/}
                {/*))}*/}
            </Grid>
        </Box>
    )
}
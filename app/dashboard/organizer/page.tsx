"use client"

import React, {useEffect} from "react"

import { useState } from "react"
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
     Alert,
} from "@mui/material"
import {
    Calendar,
    CheckCircle,
    XCircle,
} from "lucide-react"
import { useToast } from "@/contexts/ToastContext"
import useStatistiqueApi from "@/hooks/useStatistiqueApi";
import {FETCH_ORGANIZER_STATISTICS_PATH} from "@/constants/events/eventsApiUrl";
import {OrganizerStatistics} from "@/types/global";

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

export default function DashboardOrganizerPage() {
    const [statistique, setStatistique] = useState<OrganizerStatistics>({ events: 0, unverifiedEvents: 0, verifiedEvents: 0 })
    const { fetchStatistique, error, loading } = useStatistiqueApi()

    useEffect(() => {
        getStatistique();
    }, []);

    const getStatistique = async () => {
        try {
            const response = await fetchStatistique(FETCH_ORGANIZER_STATISTICS_PATH);
            console.log(response)
            setStatistique(response?.data);
        }catch (error: any) {
            console.log(error)
        }
    }

    const stats = [
        {
            title: "Total Events",
            value: statistique.events,
            icon: Calendar,
            color: "#2196f3",
        },
        {
            title: "Verified Events",
            value: statistique.verifiedEvents,
            icon: CheckCircle,
            color: "#4caf50",
        },
        {
            title: "Unverified Events",
            value: statistique.unverifiedEvents,
            icon: XCircle,
            color: "#ff9800",
        },
    ]

    return (
        <Box>
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'black' }}>
                    Organizer Dashboard
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    Welcome back! Here's what's happening with your Platform.
                </Typography>

            { error && (
                <>
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                </>
            ) }

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
        </Box>
    )
}


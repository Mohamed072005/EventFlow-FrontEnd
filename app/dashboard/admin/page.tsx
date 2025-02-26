"use client"

import {Box, Typography, Grid, Card, CardContent, Button, Alert} from "@mui/material"
import { Calendar, Users, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import React, {useEffect, useState} from "react";
import {AdminStatistics} from "@/types/global";
import useStatistiqueApi from "@/hooks/useStatistiqueApi";
import {FETCH_ADMIN_STATISTICS_PATH} from "@/constants/events/eventsApiUrl";

export default function DashboardAdminPage() {

    const [statistics, setStatistics] = useState<AdminStatistics>({ allEvents: 0, allOrganizers: 0, allUsers: 0 });
    const { fetchStatistique, loading, error } = useStatistiqueApi()

    useEffect(() => {
        getAdminStatistics()
    }, []);

    const getAdminStatistics = async () => {
        try {
            const response = await fetchStatistique(FETCH_ADMIN_STATISTICS_PATH);
            if (response.status === 200) {
                setStatistics(response.data);
            }
        }catch (error: any) {
            console.log(error)
        }
    }

    const stats = [
        {
            title: "Events",
            value: statistics.allEvents,
            icon: Calendar,
            color: "#2196f3",
            href: "/dashboard/events",
        },
        {
            title: "Users",
            value: statistics.allUsers,
            icon: Users,
            color: "#4caf50",
            href: "/dashboard/following",
        },
        {
            title: "Organizers",
            value: statistics.allOrganizers,
            icon: Star,
            color: "#ff9800",
            href: "/dashboard/events",
        }
    ]

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ color: 'black' }} gutterBottom >
                Dashboard
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
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 2,
                                    }}
                                >
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


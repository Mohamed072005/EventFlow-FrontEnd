"use client"

import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material"
import { Calendar, Users, Star, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardAdminPage() {
    const stats = [
        {
            title: "Events",
            value: "12",
            icon: Calendar,
            color: "#2196f3",
            href: "/dashboard/events",
        },
        {
            title: "Users",
            value: "48",
            icon: Users,
            color: "#4caf50",
            href: "/dashboard/following",
        },
        {
            title: "Organizers",
            value: "3",
            icon: Star,
            color: "#ff9800",
            href: "/dashboard/events",
        },
        {
            title: "Admins",
            value: "156",
            icon: TrendingUp,
            color: "#f44336",
            href: "/dashboard/events",
        },
    ]

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ color: 'black' }} gutterBottom >
                Dashboard
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Welcome back! Here's what's happening with your events.
            </Typography>

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
                                <Button
                                    component={Link}
                                    href={stat.href}
                                    sx={{
                                        mt: 2,
                                        color: stat.color,
                                        "&:hover": {
                                            bgcolor: `${stat.color}10`,
                                        },
                                    }}
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}


import type React from "react"
import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material"
import { EventAvailable } from "@mui/icons-material"

interface AuthCardProps {
    title: string
    subtitle: string
    children: React.ReactNode
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
    return (
        <Card
            sx={{
                maxWidth: 450,
                width: "100%",
                mx: "auto",
                borderRadius: 4,
                boxShadow: (theme) => theme.shadows[20],
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
            }}
        >
            <CardHeader
                title={
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                                mb: 3,
                            }}
                        >
                            <EventAvailable
                                sx={{
                                    fontSize: 40,
                                    color: "primary.main",
                                    transform: "rotate(-10deg)",
                                }}
                            />
                            <Typography
                                variant="h4"
                                component="span"
                                sx={{
                                    fontWeight: 700,
                                    background: (theme) =>
                                        `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                EventHub
                            </Typography>
                        </Box>
                        <Typography variant="h5" fontWeight="700">
                            {title}
                        </Typography>
                        <Typography color="text.secondary" mt={1}>
                            {subtitle}
                        </Typography>
                    </Box>
                }
            />
            <CardContent sx={{ pt: 0 }}>{children}</CardContent>
        </Card>
    )
}
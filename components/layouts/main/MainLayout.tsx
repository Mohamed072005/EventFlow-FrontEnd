"use client"

import type React from "react"

import { Box, Container, useTheme } from "@mui/material"
import { Header } from "./Header"

export function MainLayout({ children }: { children: React.ReactNode }) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            <Header />
            <Container
                maxWidth="lg"
                sx={{
                    py: 4,
                    mt: theme.spacing(8),
                }}
            >
                {children}
            </Container>
        </Box>
    )
}


"use client"

import { Box, Button, Container, Typography } from "@mui/material"
import { Shield, Home, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ForbiddenPage() {
    const router = useRouter()

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            }}
        >
            <Container maxWidth="sm">
                <Box
                    sx={{
                        textAlign: "center",
                        p: 4,
                        borderRadius: 4,
                        bgcolor: "background.paper",
                        boxShadow: (theme) => theme.shadows[20],
                        backdropFilter: "blur(10px)",
                        background: "rgba(255, 255, 255, 0.9)",
                    }}
                >
                    <Shield
                        size={80}
                        strokeWidth={1.5}
                        style={{
                            color: "#f44336",
                            marginBottom: "1rem",
                        }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "4rem", sm: "6rem" },
                            fontWeight: 700,
                            color: "error.main",
                            lineHeight: 1,
                            mb: 2,
                        }}
                    >
                        403
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                        }}
                    >
                        Access Forbidden
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{
                            mb: 4,
                            maxWidth: "400px",
                            mx: "auto",
                        }}
                    >
                        Sorry, you don&apos;t have permission to access this page. Please contact your administrator if you believe
                        this is a mistake.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<ArrowLeft />}
                            onClick={() => router.back()}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                            }}
                        >
                            Go Back
                        </Button>
                        <Button
                            variant="contained"
                            component={Link}
                            href="/"
                            startIcon={<Home />}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                            }}
                        >
                            Go Home
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}


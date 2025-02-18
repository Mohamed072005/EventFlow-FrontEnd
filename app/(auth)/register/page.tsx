"use client"

import type React from "react"

import { useState } from "react"
import { Box, TextField, Button, InputAdornment, IconButton, Alert, Grid } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import Link from "next/link"
import { AuthCard } from "@/components/auth/AuthCard"
import { PasswordStrength } from "@/components/auth/PasswordStrength"
import useAuth from "@/hooks/useAuth";
import {useToast} from "@/contexts/ToastContext";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { register, loading, error } = useAuth()
    const { showToast } = useToast()
    const router = useRouter()
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const payload = {
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            password_confirmation: formData.get("password_confirmation") as string,
        }
        console.log(payload)
        try {
            const response = await register(payload.first_name, payload.last_name, payload.email, payload.password, payload.password_confirmation);
            if (response?.status === 201) {
                showToast(response?.data?.message, 'success', 'Success');
                router.push('/login');
            }
            console.log(response)
        }catch (error: any) {
            console.log(error)
            showToast(error.data.message, 'error', 'Error');
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            }}
        >
            <AuthCard title="Create Account" subtitle="Join EventHub and start organizing amazing events">
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="First Name" name='first_name' autoFocus />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Last Name" name='last_name' />
                        </Grid>
                    </Grid>
                    <TextField fullWidth label="Email Address" type="email" name='email' sx={{ mb: 2 }} />
                    <TextField
                        fullWidth
                        label="Password"
                        name='password'
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <PasswordStrength password={password} />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name='password_confirmation'
                        type={showPassword ? "text" : "password"}
                        sx={{ mt: 2, mb: 3 }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                            py: 1.5,
                            mb: 2,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: "1.1rem",
                        }}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </Button>

                    <Box sx={{ mt: 3, textAlign: "center" }}>
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            style={{
                                color: "inherit",
                                textDecoration: "none",
                                fontWeight: 600,
                            }}
                        >
                            Sign in
                        </Link>
                    </Box>
                </Box>
            </AuthCard>
        </Box>
    )
}


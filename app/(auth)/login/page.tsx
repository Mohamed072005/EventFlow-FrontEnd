"use client"

import type React from "react"

import { useState } from "react"
import {
    Box,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Alert,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import Link from "next/link"
import { AuthCard } from "@/components/auth/AuthCard"
import useAuth from "@/hooks/useAuth";
import {useToast} from "@/contexts/ToastContext";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { showToast } = useToast();
    const router = useRouter();
    const { login, loading, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const payload = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        }
        try {
            const response = await login(payload.email, payload.password);

            if(response?.status === 200){
                showToast("Login successfully!", 'success', 'Success');
                localStorage.setItem('authToken', response.data.token)
                router.push('/');
            }
        }catch (error: any) {
            console.log(error);
            showToast(error.data.message, "error", "Error")
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
                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            }}
        >
            <AuthCard title="Welcome Back!" subtitle="Please sign in to continue to EventHub">
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <TextField fullWidth label="Email Address" type="email" name='email'  sx={{ mb: 2 }} />
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 1 }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >

                    </Box>
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
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>

                    <Box sx={{ mt: 3, textAlign: "center" }}>
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            style={{
                                color: "inherit",
                                textDecoration: "none",
                                fontWeight: 600,
                            }}
                        >
                            Sign up
                        </Link>
                    </Box>
                </Box>
            </AuthCard>
        </Box>
    )
}


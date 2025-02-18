import { Box, LinearProgress, Typography } from "@mui/material"

interface PasswordStrengthProps {
    password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    const calculateStrength = () => {
        let strength = 0
        if (password.length >= 8) strength += 25
        if (password.match(/[A-Z]/)) strength += 25
        if (password.match(/[0-9]/)) strength += 25
        if (password.match(/[^A-Za-z0-9]/)) strength += 25
        return strength
    }

    const getStrengthLabel = () => {
        const strength = calculateStrength()
        if (strength === 0) return ""
        if (strength <= 25) return "Weak"
        if (strength <= 50) return "Fair"
        if (strength <= 75) return "Good"
        return "Strong"
    }

    const getStrengthColor = () => {
        const strength = calculateStrength()
        if (strength <= 25) return "error"
        if (strength <= 50) return "warning"
        if (strength <= 75) return "info"
        return "success"
    }

    if (!password) return null

    return (
        <Box sx={{ mt: 1 }}>
            <LinearProgress
                variant="determinate"
                value={calculateStrength()}
                color={getStrengthColor()}
                sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" sx={{ color: `${getStrengthColor()}.main`, mt: 0.5, display: "block" }}>
                Password Strength: {getStrengthLabel()}
            </Typography>
        </Box>
    )
}


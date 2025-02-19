"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { Alert, Snackbar, type AlertColor, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { CheckCircle, Warning, Info, Error } from "@mui/icons-material"

interface Toast {
    id: number
    message: string
    type: AlertColor
    title?: string
}

interface ToastContextType {
    showToast: (message: string, type?: AlertColor, title?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const StyledAlert = styled(Alert)(({ theme }) => ({
    borderRadius: "10px",
    boxShadow: theme.shadows[3],
    ".MuiAlert-icon": {
        fontSize: "24px",
    },
    ".MuiAlert-message": {
        fontSize: "0.95rem",
    },
    "&.MuiAlert-standardSuccess": {
        backgroundColor: "rgba(255, 255, 255)",
        color: "#1a7f37",
    },
    "&.MuiAlert-standardError": {
        backgroundColor: "rgba(255, 255, 255)",
        color: "#cf222e",
    },
    "&.MuiAlert-standardWarning": {
        backgroundColor: "rgb(255,255,255)",
        color: "#9a6700",
    },
    "&.MuiAlert-standardInfo": {
        backgroundColor: "rgb(255,255,255)",
        color: "#0969da",
    },
}))

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((message: string, type: AlertColor = "info", title?: string) => {
        const id = Date.now()
        setToasts((currentToasts) => [...currentToasts, { id, message, type, title }])

        // Automatically remove toast after 6 seconds
        setTimeout(() => {
            setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
        }, 6000)
    }, [])

    const handleClose = (id: number) => {
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
    }

    const getIcon = (type: AlertColor) => {
        switch (type) {
            case "success":
                return <CheckCircle fontSize="inherit" />
            case "warning":
                return <Warning fontSize="inherit" />
            case "error":
                return <Error fontSize="inherit" />
            default:
                return <Info fontSize="inherit" />
        }
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Box
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    zIndex: 2000,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                {toasts.map((toast) => (
                    <Snackbar
                        key={toast.id}
                        open={true}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        sx={{
                            position: "relative",
                            transform: "none",
                            marginTop: 1,
                        }}
                    >
                        <StyledAlert
                            icon={getIcon(toast.type)}
                            severity={toast.type}
                            onClose={() => handleClose(toast.id)}
                            sx={{
                                minWidth: "300px",
                                animation: "slideIn 0.5s ease-out",
                                "@keyframes slideIn": {
                                    from: {
                                        transform: "translateX(100%)",
                                        opacity: 0,
                                    },
                                    to: {
                                        transform: "translateX(0)",
                                        opacity: 1,
                                    },
                                },
                            }}
                        >
                            {toast.title && <div style={{ fontWeight: 600, marginBottom: 4 }}>{toast.title}</div>}
                            {toast.message}
                        </StyledAlert>
                    </Snackbar>
                ))}
            </Box>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}


import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        primary: {
            main: "#2196f3",
        },
        secondary: {
            main: "#f50057",
        },
        background: {
            default: "#f5f5f5",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                },
            },
        },
    },
})

export default theme
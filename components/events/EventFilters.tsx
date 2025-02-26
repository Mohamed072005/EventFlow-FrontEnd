"use client"

import { Box, TextField } from "@mui/material"

interface EventFiltersProps {
    setSearch: (term: string) => void; // Add this prop
}

export function EventFilters({ setSearch }: EventFiltersProps) {

    return (
        // <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                    mb: 4,
                }}
            >
                <TextField
                    label="Search events"
                    variant="outlined"
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    sx={{ minWidth: 200 }} />

            </Box>
        // </LocalizationProvider>
    )
}


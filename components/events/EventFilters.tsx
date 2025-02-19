"use client"

import { Box, TextField, MenuItem, Button } from "@mui/material"
// import { DatePicker } from "@mui/x-date-pickers/DatePicker"
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useState } from "react"

export function EventFilters() {
    const [date, setDate] = useState<Date | null>(null)

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
                <TextField label="Search events" variant="outlined" size="small" sx={{ minWidth: 200 }} />
                <TextField select label="Category" variant="outlined" size="small" defaultValue="" sx={{ minWidth: 150 }}>
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="social">Social</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                    <MenuItem value="education">Education</MenuItem>
                </TextField>
                {/*<DatePicker*/}
                {/*    label="Date"*/}
                {/*    value={date}*/}
                {/*    onChange={(newValue) => setDate(newValue)}*/}
                {/*    slotProps={{*/}
                {/*        textField: {*/}
                {/*            size: "small",*/}
                {/*            sx: { minWidth: 150 },*/}
                {/*        },*/}
                {/*    }}*/}
                {/*/>*/}
                <Button variant="contained" color="primary">
                    Apply Filters
                </Button>
            </Box>
        // </LocalizationProvider>
    )
}


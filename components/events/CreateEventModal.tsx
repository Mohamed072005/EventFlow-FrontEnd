"use client"

import type React from "react"

import { useState } from "react"
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Stack,
    InputAdornment,
    Paper,
    LinearProgress, Alert,
} from "@mui/material"
import { Close, CloudUpload, Add as AddIcon, Remove as RemoveIcon, LocationOn, Event } from "@mui/icons-material"
import { useToast } from "@/contexts/ToastContext"
import useEventApi from "@/hooks/useEventApi";
import {EventFormData} from "@/types/event";

interface CreateEventModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (eventData: EventFormData) => Promise<void>
}

export function CreateEventModal({ open, onClose, onSubmit }: CreateEventModalProps) {
    const { error, createEvent, loading } = useEventApi();
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [formData, setFormData] = useState<EventFormData>({
        event_name: "",
        description: "",
        location: "",
        date: new Date().toISOString().split('T')[0],
        participants_number: 0,
        max_participants_number: 10,
    })
    const { showToast } = useToast()

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showToast("Image size should be less than 5MB", "error")
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
                setFormData((prev) => ({
                    ...prev,
                    image_url: reader.result as string,
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await createEvent(formData);
            if (response?.status === 201) {
                showToast("Successfully created event", "success", "Success")
                onClose();
            }
        }catch (error: any) {
            if (error?.status === 400) {
                console.log(error?.data)
                showToast(error?.data?.message, "warning", 'Warning')
            }else {
                showToast("Error creating event", "warning", 'Error')
            }
        }
    }

    const handleParticipantsChange = (
        type: "increment" | "decrement",
        field: "participants_number" | "max_participants_number",
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: type === "increment" ? prev[field] + 1 : Math.max(0, prev[field] - 1),
        }))
    }

    return (
        <Modal open={open} onClose={loading ? undefined : onClose} aria-labelledby="create-event-modal">
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "95%",
                    maxWidth: 600,
                    maxHeight: "90vh",
                    overflow: "auto",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                {loading && <LinearProgress sx={{ position: "absolute", top: 0, left: 0, right: 0 }} />}

                <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" component="h2" fontWeight="bold" className='text-gray-600'>
                        Create New Event
                    </Typography>
                    <IconButton onClick={onClose} disabled={loading} sx={{ mt: -1, mr: -1 }}>
                        <Close />
                    </IconButton>
                </Box>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Stack spacing={3}>
                        <TextField
                            label="Event Name"
                            required
                            fullWidth
                            value={formData.event_name}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    event_name: e.target.value,
                                }))
                            }
                            disabled={loading}
                        />

                        <TextField
                            label="Description"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            disabled={loading}
                        />

                        <TextField
                            label="Location"
                            required
                            fullWidth
                            value={formData.location}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    location: e.target.value,
                                }))
                            }
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOn color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Simple Date Input */}
                        <TextField
                            label="Event Date"
                            type="date"
                            required
                            fullWidth
                            value={formData.date}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    date: e.target.value,
                                }))
                            }
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Event color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Participants
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        Initial Participants
                                    </Typography>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            p: 1,
                                            mt: 0.5,
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() => handleParticipantsChange("decrement", "participants_number")}
                                            disabled={loading || formData.participants_number === 0}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography sx={{ mx: 2 }}>{formData.participants_number}</Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleParticipantsChange("increment", "participants_number")}
                                            disabled={loading || formData.participants_number >= formData.max_participants_number}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Paper>
                                </Box>

                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        Maximum Participants
                                    </Typography>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            p: 1,
                                            mt: 0.5,
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() => handleParticipantsChange("decrement", "max_participants_number")}
                                            disabled={loading || formData.max_participants_number <= formData.participants_number}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography sx={{ mx: 2 }}>{formData.max_participants_number}</Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleParticipantsChange("increment", "max_participants_number")}
                                            disabled={loading}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Paper>
                                </Box>
                            </Stack>
                        </Box>

                        {/*<Box>*/}
                        {/*    <Typography variant="subtitle2" gutterBottom>*/}
                        {/*        Event Image*/}
                        {/*    </Typography>*/}
                        {/*    <Button*/}
                        {/*        component="label"*/}
                        {/*        variant="outlined"*/}
                        {/*        startIcon={<CloudUpload />}*/}
                        {/*        disabled={loading}*/}
                        {/*        sx={{ width: "100%" }}*/}
                        {/*    >*/}
                        {/*        Upload Image*/}
                        {/*        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />*/}
                        {/*    </Button>*/}
                        {/*    {imagePreview && (*/}
                        {/*        <Box*/}
                        {/*            sx={{*/}
                        {/*                mt: 2,*/}
                        {/*                position: "relative",*/}
                        {/*                width: "100%",*/}
                        {/*                paddingTop: "56.25%", // 16:9 Aspect Ratio*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <Box*/}
                        {/*                component="img"*/}
                        {/*                src={imagePreview}*/}
                        {/*                alt="Event preview"*/}
                        {/*                sx={{*/}
                        {/*                    position: "absolute",*/}
                        {/*                    top: 0,*/}
                        {/*                    left: 0,*/}
                        {/*                    width: "100%",*/}
                        {/*                    height: "100%",*/}
                        {/*                    objectFit: "cover",*/}
                        {/*                    borderRadius: 1,*/}
                        {/*                }}*/}
                        {/*            />*/}
                        {/*        </Box>*/}
                        {/*    )}*/}
                        {/*</Box>*/}

                        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                            <Button variant="outlined" onClick={onClose} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" disabled={loading}>
                                Create Event
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}
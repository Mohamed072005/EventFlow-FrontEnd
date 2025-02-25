"use client"

import React from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography} from "@mui/material";
import {AlertCircle} from "lucide-react";

interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    eventName: string | null;
}

export default function ConfirmationDialog({
                                               open,
                                               onClose,
                                               onConfirm,
                                               eventName,
                                           }: ConfirmationDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <AlertCircle color={"#4caf50"}/>
                    Approve Event
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to Approve <strong>{eventName}</strong>?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    color={"success"}
                    onClick={onConfirm}
                >
                    Approve
                </Button>
            </DialogActions>
        </Dialog>
    );
}
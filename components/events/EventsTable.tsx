"use client"

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Box,
    Typography,
} from "@mui/material";
import { Eye, Check } from "lucide-react";
import StatusChip from "./StatusChip";
import { Event } from "@/types/event"
import useAuthStore from "@/store/authStore";

interface EventsTableProps {
    events: Event[];
    page: number;
    rowsPerPage: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
    onAction: (event: Event) => void;
    setEventForDetails: (event: Event) => void;
    handleDetailsDiagonalVisibility: (event: Event) => void;
}

export default function EventsTable({events, page, rowsPerPage, onPageChange, onRowsPerPageChange, onAction, handleDetailsDiagonalVisibility}: EventsTableProps) {
    const { user } = useAuthStore();
    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Event Name</TableCell>
                        <TableCell>Location</TableCell>
                        {user?.role === 'admin' && (
                            <>
                                <TableCell>User Role</TableCell>
                                <TableCell>User Email</TableCell>
                            </>
                        )}

                        <TableCell>Date</TableCell>
                        <TableCell>Participants</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((event) => (
                            <TableRow key={event?.id} hover>
                                <TableCell>
                                    <Typography variant="subtitle2">
                                        {event?.event_name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="text.secondary">
                                        {event?.location}
                                    </Typography>
                                </TableCell>
                                {user?.role === 'admin' && (
                                    <>
                                        <TableCell>
                                            <Typography variant="body2" color={ event?.user?.role?.role_name === 'organizer' ? 'warning' : 'primary' }>
                                                <strong>{event?.user?.role?.role_name}</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {event?.user?.email}
                                            </Typography>
                                        </TableCell>
                                    </>
                                )}
                                <TableCell>
                                    {new Date(event?.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {event?.participants_number}/{event?.max_participants_number}
                                </TableCell>
                                <TableCell>
                                    <StatusChip status={event?.verified_at ? "approved" : "pending"} />
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => {
                                                handleDetailsDiagonalVisibility(event);
                                            }}
                                        >
                                            <Eye size={18} />
                                        </IconButton>
                                        {user?.role === 'admin' && (
                                            <>
                                                {!event?.verified_at && (
                                                    <>
                                                        <IconButton
                                                            size="small"
                                                            color="success"
                                                            onClick={() => onAction(event)}
                                                        >
                                                            <Check size={18} />
                                                        </IconButton>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={events?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </TableContainer>
    );
}
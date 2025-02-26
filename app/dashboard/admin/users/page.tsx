"use client"

import type React from "react"

import { useState } from "react"
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TextField,
    IconButton,
    Chip,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Avatar,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material"
import { Search, MoreVertical, Shield, UserX, Mail, Calendar, UserCheck } from "lucide-react"
import { useToast } from "@/contexts/ToastContext"
import { format } from "date-fns"

interface User {
    id: string
    name: string
    email: string
    avatar: string
    role: "user" | "organizer" | "admin"
    status: "active" | "inactive"
    eventsCreated: number
    eventsParticipating: number
    joinDate: string
}

const mockUsers: User[] = Array.from({ length: 10 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: `/placeholder.svg?height=40&width=40`,
    role: ["user", "organizer", "admin"][Math.floor(Math.random() * 3)] as User["role"],
    status: Math.random() > 0.2 ? "active" : "inactive",
    eventsCreated: Math.floor(Math.random() * 20),
    eventsParticipating: Math.floor(Math.random() * 50),
    joinDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}))

export default function ManageUsersPage() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterRole, setFilterRole] = useState<User["role"] | "all">("all")
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [confirmDialog, setConfirmDialog] = useState<{
        open: boolean
        title: string
        action: string
        type: "role" | "status"
        value?: string
    }>({
        open: false,
        title: "",
        action: "",
        type: "role",
    })
    const { showToast } = useToast()

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(Number.parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
        setAnchorEl(event.currentTarget)
        setSelectedUser(user)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setSelectedUser(null)
    }

    const handleConfirmAction = async () => {
        if (!selectedUser || !confirmDialog.action) return

        try {
            // Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            showToast(`User ${selectedUser.name} has been updated successfully!`, "success")
        } catch (error) {
            showToast("Failed to update user", "error")
        }

        setConfirmDialog({ ...confirmDialog, open: false })
        handleMenuClose()
    }

    const getRoleChip = (role: User["role"]) => {
        const roleConfig = {
            admin: { color: "error" as const, label: "Admin" },
            organizer: { color: "primary" as const, label: "Organizer" },
            user: { color: "default" as const, label: "User" },
        }
        const config = roleConfig[role]
        return <Chip size="small" {...config} />
    }

    const getStatusChip = (status: User["status"]) => {
        const statusConfig = {
            active: { color: "success" as const, label: "Active" },
            inactive: { color: "error" as const, label: "Inactive" },
        }
        const config = statusConfig[status]
        return <Chip size="small" {...config} />
    }

    const filteredUsers = mockUsers.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesRole = filterRole === "all" || user.role === filterRole

        return matchesSearch && matchesRole
    })

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, color: 'black' }}>
                Manage Users
            </Typography>

            <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
                <TextField
                    size="small"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={20} />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    select
                    size="small"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value as User["role"] | "all")}
                    sx={{ width: 200 }}
                >
                    <MenuItem value="all">All Roles</MenuItem>
                    <MenuItem value="user">Users</MenuItem>
                    <MenuItem value="organizer">Organizers</MenuItem>
                    <MenuItem value="admin">Admins</MenuItem>
                </TextField>
            </Box>

            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Events Created</TableCell>
                                <TableCell>Events Participating</TableCell>
                                <TableCell>Join Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                                <TableRow key={user.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <Avatar src={user.avatar} />
                                            <Box>
                                                <Typography variant="subtitle2">{user.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{getRoleChip(user.role)}</TableCell>
                                    <TableCell>{getStatusChip(user.status)}</TableCell>
                                    <TableCell>{user.eventsCreated}</TableCell>
                                    <TableCell>{user.eventsParticipating}</TableCell>
                                    <TableCell>{format(new Date(user.joinDate), "PP")}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={(e) => handleMenuOpen(e, user)}>
                                            <MoreVertical size={18} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem
                    onClick={() =>
                        setConfirmDialog({
                            open: true,
                            title: "Change User Role",
                            action: "promote",
                            type: "role",
                            value: "organizer",
                        })
                    }
                >
                    <ListItemIcon>
                        <Shield size={18} />
                    </ListItemIcon>
                    <ListItemText>Promote to Organizer</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        setConfirmDialog({
                            open: true,
                            title: "Update User Status",
                            action: selectedUser?.status === "active" ? "deactivate" : "activate",
                            type: "status",
                        })
                    }
                >
                    <ListItemIcon>
                        {selectedUser?.status === "active" ? <UserX size={18} /> : <UserCheck size={18} />}
                    </ListItemIcon>
                    <ListItemText>{selectedUser?.status === "active" ? "Deactivate User" : "Activate User"}</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <Mail size={18} />
                    </ListItemIcon>
                    <ListItemText>Send Email</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <Calendar size={18} />
                    </ListItemIcon>
                    <ListItemText>View Events</ListItemText>
                </MenuItem>
            </Menu>

            <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}>
                <DialogTitle>{confirmDialog.title}</DialogTitle>
                <DialogContent>
                    <Typography>
                        {confirmDialog.type === "role" && (
                            <>
                                Are you sure you want to promote <strong>{selectedUser?.name}</strong> to Organizer role? They will be
                                able to create and manage events.
                            </>
                        )}
                        {confirmDialog.type === "status" && (
                            <>
                                Are you sure you want to {confirmDialog.action} <strong>{selectedUser?.name}</strong>?
                                {confirmDialog.action === "deactivate" && (
                                    <Typography color="error" sx={{ mt: 1 }}>
                                        This will prevent the user from accessing their account.
                                    </Typography>
                                )}
                            </>
                        )}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>Cancel</Button>
                    <Button
                        variant="contained"
                        color={confirmDialog.action === "deactivate" ? "error" : "primary"}
                        onClick={handleConfirmAction}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}


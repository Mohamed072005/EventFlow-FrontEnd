import React from "react";
import { Chip } from "@mui/material";

interface StatusChipProps {
    status: "pending" | "approved";
}

export default function StatusChip({ status }: StatusChipProps) {
    const statusConfig = {
        pending: { color: "warning" as const, label: "Pending Review" },
        approved: { color: "success" as const, label: "Approved" },
    };
    const config = statusConfig[status];
    return <Chip size="small" {...config} />;
}
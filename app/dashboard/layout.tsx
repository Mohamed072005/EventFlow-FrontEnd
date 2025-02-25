import type React from "react"
import DashboardGuard from "@/components/guards/DashboardGuard";

export default function Layout({children}: {
    children: React.ReactNode
}) {
    return (
        <>
            <DashboardGuard>
                {children}
            </DashboardGuard>
        </>
    )
}
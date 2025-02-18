"use client"

import React, {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {StoragesGuard} from "@/lib/guards/storageGuard";

interface StorageGuardProps {
    children?: React.ReactNode
}

const StorageGuard: React.FC<StorageGuardProps> = ({ children }) => {
    const pathName = usePathname();
    const router = useRouter();
    useEffect(() => {
        console.log(pathName, router);
        if (pathName === '/login' || pathName === '/register') {
            StoragesGuard.clearAuthStorage();
        }
    }, [pathName, router]);
    return (
        <>
            {children}
        </>
    )
}

export default StorageGuard;
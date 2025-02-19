"use client"

import {useEffect, useState} from "react";
import useAuthStore from "@/store/authStore";
import {usePathname, useRouter} from "next/navigation";
import { Loop } from "@mui/icons-material"

interface AuthGuardProps {
    children?: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { checkAuth, isLoading } = useAuthStore()
    const pathName = usePathname()
    const router = useRouter();
    const [initialized, setInistialized] = useState<boolean>(false);

    useEffect(() => {
        const initialize = async () => {
            await checkAuth();
            setInistialized(true);
        }
        initialize()
    }, [pathName, router, checkAuth]);

    if (isLoading || !initialized) {
        return (
            <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50">
                <div className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
                    <div className="flex flex-col items-center gap-2">
                        <Loop className="h-12 w-12 animate-spin text-primary"/>
                        <p className="text-muted-foreground text-sm">Loading...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default AuthGuard;
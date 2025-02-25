"use client"

import {useEffect, useState} from "react";
import useAuthStore from "@/store/authStore";
import {usePathname, useRouter} from "next/navigation";
import { Loop } from "@mui/icons-material"
import Loader from "@/components/Loader";

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
            <Loader />
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default AuthGuard;
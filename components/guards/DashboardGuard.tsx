"use client"

import {useEffect, useState} from "react";
import useAuthStore from "@/store/authStore";
import {Loop} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import Loader from "@/components/Loader";

interface DashboardGuardProps {
    children?: React.ReactNode;
}

const DashboardGuard: React.FC<DashboardGuardProps> = ({ children }) => {
    const { user } = useAuthStore()
    const [initialized, setInistialized] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        if(!user){
            router.replace("/login");
            return;
        }
        switch (user.role) {
            case "admin":
                router.replace("/dashboard/admin");
                break;
            case "organizer":
                router.replace("/dashboard/organizer");
                break;
            case "user":
                router.replace("/forbidden");
                break;
            default:
                router.replace("/forbidden");
                break;
        }
        setInistialized(true);
    }, []);



    if (!initialized) {
        return (
            <Loader />
        )
    }

    return (
        <>
            { children }
        </>
    )
}

export default DashboardGuard;
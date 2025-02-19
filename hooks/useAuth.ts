import {UseAuth} from "@/types/user";
import axiosClient from "@/lib/api";
import {useState} from "react";
import useValidate from "@/hooks/useValidate";

const useAuth = (): UseAuth => {
    const [loading, setLoading] = useState<boolean>(false);
    const { registerValidation, loginValidation } = useValidate();
    const [error, setError] = useState<string | null>(null);
    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        const loginErrors  = loginValidation(email, password);
        if (Object.keys(loginErrors).length > 0) {
            setLoading(false);
            setError(loginErrors[Object.keys(loginErrors)[0]]);
            return;
        }
        try {
            const response = await axiosClient.post("/login", {
                email,
                password,
            });
            setLoading(false);
            return response;
        } catch (error: any) {
            console.log('Login failed:', error);
            setError(error.message);
            throw error;
        }finally {
            setLoading(false);
        }
    }
    const register = async (first_name: string, last_name: string, email: string, password: string, password_confirmation: string) => {
        setLoading(true);
        setError(null);
        const registerErrors = registerValidation(first_name, last_name, email, password, password_confirmation);
        if (Object.keys(registerErrors).length > 0) {
            setLoading(false);
            setError(registerErrors[Object.keys(registerErrors)[0]]);
            return;
        }
        try {
            const response = await axiosClient.post("/register", {
                first_name,
                last_name,
                email,
                password,
                password_confirmation
            });
            setLoading(false);
            console.log(response);
            return response;
        }catch (error: any) {
            console.log('Register failed:', error);
            setError(error.message);
            throw error;
        }finally {
            setLoading(false);
        }
    }

    return { login, register, error, loading };
}

export default useAuth;
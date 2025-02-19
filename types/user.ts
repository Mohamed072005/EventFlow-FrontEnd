import {AxiosResponse} from "axios";

export interface UseAuth {
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<AxiosResponse<any, any>| undefined>;
    register: (firstName: string, lastName: string, email: string, password: string, password_confirmation: string) => Promise<AxiosResponse<any, any>| undefined>;
}

export interface User {
    id: string;
    role: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    checkAuth: () => void;
    isLoading: boolean;
}
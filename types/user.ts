import {AxiosResponse} from "axios";

export interface UseAuth {
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<AxiosResponse<any, any>| undefined>;
    register: (firstName: string, lastName: string, email: string, password: string, password_confirmation: string) => Promise<AxiosResponse<any, any>| undefined>;
}

export interface Role {
    id: string;
    role_name: string;
}

export interface User {
    id: string;
    first_name: string;
    role_id: string;
    email: string;
    role: Role;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    checkAuth: () => void;
    isLoading: boolean;
}
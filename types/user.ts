import {AxiosResponse} from "axios";

export interface UseAuth {
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<AxiosResponse<any, any>| undefined>;
    register: (firstName: string, lastName: string, email: string, password: string, password_confirmation: string) => Promise<AxiosResponse<any, any>| undefined>;
    logout: () => void;
}

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}
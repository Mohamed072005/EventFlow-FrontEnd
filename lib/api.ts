import axios from "axios";
import {router} from "next/client";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

axiosClient.interceptors.request.use(
    async (config) => {
        const authToken = localStorage.getItem('authToken');
        if (authToken){
            config.headers.Authorization = `Bearer ${authToken}`
        }
        return config;
    }
)

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        // if (error.status === 401) {
        //     localStorage.removeItem('authToken');
        //     localStorage.removeItem('auth-storage');
        //     router.push('/login');
        // }
        return Promise.reject(error.response);
    }
)

export default axiosClient;
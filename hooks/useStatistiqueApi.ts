import {useState} from "react";
import {UseStatisticsApi} from "@/types/global";
import axiosClient from "@/lib/api";

const useStatistiqueApi = (): UseStatisticsApi => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchStatistique = async (api_url: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.get(api_url);
            return response;
        }catch (error: any) {
            console.log(error);
            setError(error);
            throw error;
        }finally {
            setLoading(false);
        }
    }

    return { fetchStatistique, error, loading }
}

export default useStatistiqueApi;
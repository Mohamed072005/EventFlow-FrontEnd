import {useState} from "react";
import axiosClient from "@/lib/api";
import {EventFormData, UseEventAPI} from "@/types/event";
import useEventValidation from "@/hooks/useEventValidation";

const useEventApi = (): UseEventAPI => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { createEventValidation } = useEventValidation()

    const createEvent = async (formData: EventFormData) => {
        setLoading(true);
        setError(null);
        const eventErrors = createEventValidation(formData);
        if (Object.keys(eventErrors).length > 0) {
            setLoading(false);
            setError(eventErrors[Object.keys(eventErrors)[0]]);
            return;
        }
        try {
            const response = await axiosClient.post('/create/event', { ...formData });
            console.log(response);
            setLoading(false);
            return response;
        }catch (error: any) {
            console.log(error);
            throw error;
        }finally {
            setLoading(false);
        }
    }

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.get(`/get/events`);
            return response;
        }catch (error) {
            console.log(error);
            throw error;
        }finally {
            setLoading(false);
        }
    }

    return { loading, error, createEvent, fetchEvents };
}

export default useEventApi;
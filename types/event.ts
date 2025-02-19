import {AxiosResponse} from "axios";

export interface UseEventAPI {
    loading: boolean,
    error: string | null,
    createEvent: (eventFormDataL: EventFormData) => Promise<AxiosResponse<any, any>| undefined>,
    fetchEvents: () => Promise<AxiosResponse<any, any>>
}

export interface EventFormData {
    event_name: string
    description: string
    location: string
    image_url?: string
    date: Date
    participants_number: number
    max_participants_number: number
}

export interface Event {
    id: string;
    event_name: string;
    description: string;
    location: string;
    date: string;
    participants_number: number;
    max_participants_number: number;
    image_url: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    verified_at: string;
}
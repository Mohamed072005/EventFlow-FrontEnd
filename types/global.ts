import {AxiosResponse} from "axios";

export interface UseStatisticsApi {
    loading: boolean,
    error: string | null,
    fetchStatistique: (api_url: string) => Promise<AxiosResponse<any, any>>
}

export interface OrganizerStatistics {
    events: number,
    verifiedEvents: number,
    unverifiedEvents: number
}

export interface AdminStatistics {
    allEvents: number,
    allUsers: number,
    allOrganizers: number
}
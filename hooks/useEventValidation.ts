import {EventFormData} from "@/types/event";

const useEventValidation = () => {
    let error: { [key: string]: string } = {};

    const createEventValidation = (payload: EventFormData) => {
        error = {}
        if (!payload.event_name || payload.event_name.trim() === "") {
            error.event_name = "Event name is required.";
        } else if (payload.event_name.length < 6) {
            error.event_name = "Event name must be at least 6 characters long.";
        }

        if (!payload.description || payload.description.trim() === "") {
            error.description = "Description is required.";
        } else if (payload.description.length < 10) {
            error.description = "Description must be at least 10 characters long.";
        }

        if (!payload.location || payload.location.trim() === "") {
            error.location = "Location is required.";
        }

        if (!payload.date || isNaN(Date.parse(payload.date))) {
            error.date = "Invalid date.";
        } else {
            const selectedDate = new Date(payload.date);
            const currentDate = new Date();
            if (selectedDate < currentDate) {
                error.date = "Event date must be in the future.";
            }
        }

        if (payload.participants_number < 0) {
            error.participants_number = "Number of participants cannot be negative.";
        }

        if (payload.max_participants_number <= 0) {
            error.max_participants_number = "Maximum participants must be greater than 0.";
        } else if (payload.max_participants_number < payload.participants_number) {
            error.max_participants_number = "Maximum participants must be greater than or equal to the current number of participants.";
        }
        return error;
    }

    return { createEventValidation }
}

export default useEventValidation;
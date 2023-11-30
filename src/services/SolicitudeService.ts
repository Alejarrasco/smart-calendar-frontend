// SolicitudeService.ts

import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/solicitude";

export const fetchSolicitudes = async () => {
    try{
        const response = await axios.get(API_URL, {
            headers: {
                Accept: "application/json",
                token: 0 //TODO get token from Auth0
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching solicitudes:", error);
        return null;
    }
}

export const createSolicitude = async (solicitude: any) => {
    try {
        const response = await axios.post(API_URL, solicitude, {
            headers: {
                Accept: "application/json",
                token: 1 //TODO get token from Auth0
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating solicitude:", error);
        return null;
    }
}

export const rejectSolicitude = async (solicitudeId: number) => {
    try {
        const response = await axios.put(API_URL + "/" + solicitudeId + "/reject", {
            headers: {
                Accept: "application/json",
                token: 1 //TODO get token from Auth0
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error rejecting solicitude:", error);
        return null;
    }
}
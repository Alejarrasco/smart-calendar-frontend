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
            }
        });
        return response.data;
    } catch (error : any) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        return null; // re-throw the error if you want to handle it in the calling code
      }
}
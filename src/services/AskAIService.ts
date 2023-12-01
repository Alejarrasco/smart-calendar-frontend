// PeriodService.ts
import axios from "axios"

const API_URL = "http://localhost:8080/api/v1/ask_ai"

export const fetchAskAI = async (spaceId: number) => {
    try {
        const response = await axios.post(API_URL + "/space/" + spaceId, {
            headers: {
                Accept: "application/json",
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching ask_ai:", error);
        return null;
    }
}


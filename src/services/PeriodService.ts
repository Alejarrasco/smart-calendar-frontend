// PeriodService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/period";

export const fetchPeriodsInSpace = async (spaceId: number) => {
    try {
        const response = await axios.get(API_URL + "/space/" + spaceId, {
        headers: {
            Accept: "application/json",
        },
        });
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        console.error("Error fetching periods:", error);
        return null;
    }
}
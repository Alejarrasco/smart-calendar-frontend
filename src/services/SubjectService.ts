// SubjectService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/subject";

export const fetchSubjects = async () => {
    try {
        const response = await axios.get(API_URL, {
        headers: {
            Accept: "application/json",
        },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        return null;
    }
    };

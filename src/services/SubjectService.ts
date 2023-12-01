// SubjectService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/subject";

export const fetchSubjects = async (responsible: number | null) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                responsible: responsible,
            },
            headers: {
                Accept: "application/json",
            },
        });
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        return null;
    }
};

export const postSubject = async (subject: any) => {
    try {
        const response = await axios.post(API_URL, subject, {
            headers: {
                Accept: "application/json",
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating subject:", error);
        return null;
    }
}

export const fetchFaculties = async () => {
    try {
        const response = await axios.get(API_URL + "/faculty", {
            headers: {
                Accept: "application/json",
            },
        });
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching faculties:", error);
        return null;
    }
};

export const fetchResponsibles = async () => {
    try {
        const response = await axios.get(API_URL + "/responsible", {
            headers: {
                Accept: "application/json",
            },
        });
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching responsibles:", error);
        return null;
    }
};

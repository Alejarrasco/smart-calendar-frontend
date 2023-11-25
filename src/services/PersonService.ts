// PersonService.ts

import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/person";

export const fetchPersons = async () => {
    try {
        const response = await axios.get(API_URL, {
        headers: {
            Accept: "application/json",
        },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching persons:", error);
        return null;
    }
};

export const fetchSubjectResponsibles = async (subjectId: number) => {
    try {
        const response = await axios.get(API_URL + "/responsible/" + subjectId, {
        headers: {
            Accept: "application/json",
        },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching persons:", error);
        return null;
    }
};

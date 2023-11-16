// CalendarService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/space/list";

export const fetchSpaces = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching spaces:", error);
    return null;
  }
};

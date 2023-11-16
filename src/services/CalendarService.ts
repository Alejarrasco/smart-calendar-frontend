// CalendarService.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/space/list";
const API_PLAN_URL = "http://localhost:8080/api/v1/planification/space"
const API_SCHEDULE_URL = "http://localhost:8080/api/v1/schedule/space"

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

export const fetchPlanifications = async (spaceId: number) => {
  try {
    const response = await axios.get(API_PLAN_URL + "/" + spaceId, {
      headers: {
        Accept: "application/json",
        },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching planifications:", error);
    return null;
  }
};

export const fetchPeriods = async () => {
  try {
    const response = await axios.get(API_SCHEDULE_URL, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching periods:", error);
    return null;
  }
};

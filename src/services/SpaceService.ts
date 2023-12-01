// SpaceService.ts

import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/space";


export const fetchSpaces = async () => {
    try {
      const response = await axios.get(API_URL + "/list", {
        headers: {
          Accept: "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching spaces:", error);
      return null;
    }
};

export const fetchSpace = async (spaceId: number) => {
    try {
      const response = await axios.get(API_URL + "/" + spaceId, {
        headers: {
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching space:", error);
      return null;
    }
};

export const createSpace = async (space: any) => {
    console.log("space", space);
    try {
      const response = await axios.post(API_URL, space, {
        headers: {
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating space:", error);
      return null;
    }
}

export const fetchSpaceTypes = async () => {
    try {
      const response = await axios.get(API_URL + "/type/list", {
        headers: {
          Accept: "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching space types:", error);
      return null;
    }
};

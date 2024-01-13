import axios from "./axios";

export const getGlucose = async () => {
    try {
        const response = await axios.get("/glucose");
        return response;
    } catch (error) {
        return error;
    }
};

export const addGlucose = async (data) => {
    try {
        const response = await axios.post("/glucose/add", data);
        return response;
    } catch (error) {
        return error;
    }
};
import axios from "./axios";

export const loginUser = async (data) => {
    try {
        const response = await axios.post("/user/login", data);
        return response;
    } catch (error) {
        return error;
    }
};

export const profileUser = async () => {
    try {
        const response = await axios.get("/user/profile");
        return response;
    } catch (error) {
        return error;
    }
};

export const registerUser = async (data) => {
    try {
        const response = await axios.post("/user/register", data);
        return response;
    } catch (error) {
        return error;
    }
};
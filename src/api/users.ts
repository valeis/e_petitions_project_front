import axios from "axios";

const apiUrl = "http://localhost:1337";

interface LoginParams {
    email: string;
    password: string;
}


export const users = {
    login: async ({ email, password }: LoginParams) => {
        try {
            const { data } = await axios.post(`${apiUrl}/login`, { email, password }, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            });

            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error; // Rethrow the error for higher-level handling
        }
    },
    register: async ({ email, password }: LoginParams) => {
        try {
            const { data } = await axios.post(`${apiUrl}/user/`, { email, password }, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            });

        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    },
    getUserById: async (id: string) => {
        try {
            const { data } = await axios.get(`${apiUrl}/user/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            return data;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    }
};

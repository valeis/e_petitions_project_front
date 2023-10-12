import axios from "axios";


const apiUrl = "http://192.168.56.1:1337";

interface LoginParams {
    email: string;
    password: string;
}

export const users = {
    login: async ({ email, password }: LoginParams) => {
        const { data } = await axios.post(`${apiUrl}/login`,
            JSON.stringify({ email, password }),
            {
                headers: {
                    "Content-Type": "*",
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );

        return data;
    },
    register: async ({ email, password }: LoginParams) => {
        const { data } = await axios.post(`${apiUrl}/user/`,
            JSON.stringify({ email, password }),
            {
                headers: {
                    "Content-Type": "*",
                    "Access-Control-Allow-Origin": "*"

                },
            }
        );

        return data;
    },
};

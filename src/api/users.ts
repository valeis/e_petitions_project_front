import axios from "axios";

const apiUrl = "http://localhost:1337";

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


export const users = {
    getUserById: async (id: string) => {
        const {data} = await axios.get(`${apiUrl}/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

        return data;
    },
};

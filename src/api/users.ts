import axios from "axios";

const apiUrl = "http://localhost:1337";

export const users = {
    getUserById: async (id: string) => {
        const {data} = await axios.get(`${apiUrl}/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

        return data;
    },
};

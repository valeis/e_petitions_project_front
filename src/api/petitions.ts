import axios from "axios";

const apiUrl = "http://localhost:1337";

export const petitions = {
    getList: async (params: any) => {
        const {page, limit} = params;
        const {data} = await axios.get(`${apiUrl}/petition/all/${page}/${limit}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

        return data;
    },

    add: async (body: any) => {
        const data = await axios.post(
          `${apiUrl}/petition/`,
          {
            ...body,
            // date: new Date().toISOString().split("T")[0],
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          },
        );
        console.log(data)
        return data;
    },

    sign: async (body: any) => {
        const {data} = await axios.post(`${apiUrl}/api/petitii/sign`, body, {
            headers: {
                "Content-Type": "application/json",
                "Allow-Control-Allow-Origin": "*",
            },
        });

        return data;
    },

    search: async (name: any) => {
        const {data} = await axios.post(`${apiUrl}/api/petitii/search/${name}`, {
            headers: {
                "Content-Type": "application/json",
                "Allow-Control-Allow-Origin": "*",
            },
        });

        return data;
    },

    getCategories: async () => {
        const {data} = await axios.get(`${apiUrl}/categories`, {
            headers: {
                "Content-Type": "application/json",
                "Allow-Control-Allow-Origin": "*",
            },
        });

        return data;
    },

    getById: async (id: string) => {
        const {data} = await axios.get(`${apiUrl}/petition/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

        return data;
    },

    getVoters: async (id: string) => {
        const {data} = await axios.get(`${apiUrl}/api/semnat/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Allow-Control-Allow-Origin": "*",
            },
        });

        return data;
    },

    changeStatus: async (body: any) => {
        const {data} = await axios.post(`${apiUrl}/petition/status/`, body, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

        return data;
    },
};

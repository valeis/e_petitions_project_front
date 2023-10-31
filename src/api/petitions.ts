import axios from "axios";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

export const petitions = {
    getList: async (params: any) => {
        const {page, limit} = params;
        const {data} = await axios.get(`${apiUrl}/petition/all/${page}/${limit}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Max-Age": "3600",
            },
        });

        return data;
    },

  getUserPetitions: async (params: any) => {
    const {page, limit, uid} = params;
    const {data} = await axios.get(`${apiUrl}/user/petitions/${uid}/${page}/${limit}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "3600",
      },
    });

    return data;
  },


  getUserVotedPetitions: async (params: any) => {
    const {page, limit, uid} = params;
    const {data} = await axios.get(`${apiUrl}/user/voted/${uid}/${page}/${limit}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "3600",
      },
    });

    return data;
  },


    add: async (body: any) => {
        const response = await axios.post(
          `${apiUrl}/petition`,
          {
            ...body,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Max-Age": "3600",
            },
          },
        );
      const petition_id = response.data.petition_id;
      return petition_id;
    },
  //  TODO create a proper update petition endpoint
  update: async (body: any) => {
    const response = await axios.post(
      `${apiUrl}/petition`,
      {
        ...body,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Max-Age": "3600",
        },
      },
    );
    const petition_id = response.data.petition_id;
    return petition_id;
  },

    sign: async (body: any) => {
        const {data} = await axios.post(`${apiUrl}/petition/sign/${localStorage.getItem("userId")}/${body.petition_id.toString()}`,
        {
          ...body,
        },
        {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Max-Age": "3600",
            },
        });

        return data;
    },

    search: async (body: any) => {
        const {data} = await axios.post(`${apiUrl}/petition/search/1/5`, body, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Max-Age": "3600",
            },
        });

        return data;
    },

    getCategories: async () => {
        const {data} = await axios.get(`${apiUrl}/categories`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Max-Age": "3600",
            },
        });

        return data;
    },

  getById: async (pid: string) => {
    try {
      const { data } = await axios.get(`${apiUrl}/petition/${pid}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Max-Age": "3600",
        },
      });

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

    changeStatus: async (body: any) => {
        const {data} = await axios.post(`${apiUrl}/petition/status/`, body, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Max-Age": "3600",
            },
        });

        return data;
    },
};

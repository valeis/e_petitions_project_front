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

  getUserPetitions: async (params: any) => {
    const {page, limit, uid} = params;
    const {data} = await axios.get(`${apiUrl}/user/petitions/${uid}/${page}/${limit}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
      },
    });

    return data;
  },


    add: async (body: any) => {
      console.log(body);
        const response = await axios.post(
          `${apiUrl}/petition`,
          {
            ...body,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          },
        );
      const petition_id = response.data.petition_id;
      console.log(response);
      return petition_id;
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

  getById: async (pid: string) => {
    try {
      const { data } = await axios.get(`${apiUrl}/petition/${pid}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
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
            },
        });

        return data;
    },
};

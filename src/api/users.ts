import axios from "axios";
import { S } from "vitest/dist/types-ad1c3f45";


const apiUrl = "http://localhost:1337";

interface LoginParams {
  email: string;
  password: string;
}

interface OtpParams {
    email: string;
}

export const users = {
  login: async ({ email, password }: LoginParams) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
          },
        },
      );
      return data;
      
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Rethrow the error for higher-level handling
    }
    
  },
  register: async ({ email, password }: LoginParams) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/user`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
          },
        },
      );
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
  getUserById: async (id: string, accessToken: string) => {
    try {
      const { data } = await axios.get(`${apiUrl}/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
        },
      });
      console.log("user data: ",data);
      return data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },
  sendOTP: async ({email}:OtpParams) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/send-otp`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
          },
        },
      );
      return data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  },
};

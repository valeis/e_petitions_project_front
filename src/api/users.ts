import axios from "axios";
import { S } from "vitest/dist/types-ad1c3f45";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

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
          },
        },
      );
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
  getUserById: async (id: number, accessToken: string | null) => {
    try {
      const { data } = await axios.get(`${apiUrl}/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

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

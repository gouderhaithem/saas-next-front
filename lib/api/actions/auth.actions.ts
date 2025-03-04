"use server";
import axios from "axios";
import { cookies } from "next/headers";
//const API_URL = "https://saas-express-js.vercel.app/api/auth";
const API_URL = "http://localhost:3001/api/auth";
const getAccessToken = () => {
  return cookies().get("token")?.value;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });

  return response.data;
};

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  const response = await axios.post(`${API_URL}/register`, {
    email,
    password,
    name,
  });
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await axios.post(
    "http://localhost:3000/api/auth/verify-email",
    { token }
  );
  return response.data;
};

export const subscribeApi = async (email: string) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.post(
      `${API_URL}/subscribe`,
      { email },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Subscription failed:", error);
    throw new Error("Failed to subscribe to API");
  }
};

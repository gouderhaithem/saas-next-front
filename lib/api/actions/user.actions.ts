"use server";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/client`;

// Function to get the access token from cookies
const getAccessToken = () => {
  return cookies().get("token")?.value;
};

export const getUserData = async (email: string) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(
      `${API_URL}/user/${email}`,

      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("failed to get user data:", error);
    throw new Error(error.message);
  }
};

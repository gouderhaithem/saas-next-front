"use server";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/client`;

// Function to get the access token from cookies
const getAccessToken = () => {
  return cookies().get("token")?.value;
};

// Generic function for file uploads
const uploadFile = async (endpoint: string, formData: FormData) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(`${API_URL}${endpoint}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error uploading file to ${endpoint}:`, error);
    throw new Error("Failed to upload file");
  }
};

// 🔹 Remove Background
export const removeBg = async (formData: FormData) =>
  uploadFile("/images/remove-background", formData);

// 🔹 Restore Image
export const restoreImage = async (formData: FormData) =>
  uploadFile("/images/restore-image", formData);

// 🔹 Convert Image to PDF
export const imageToPDF = async (
  formData: FormData,
  layout: "portrait" | "landscape" = "portrait"
) => uploadFile(`/images/image-to-pdf?layout=${layout}`, formData);

// 🔹 Merge PDF
export const mergePDF = async (formData: FormData) =>
  uploadFile("/pdf/merge", formData);

// 🔹 Split PDF
export const splitPDF = async (formData: FormData) =>
  uploadFile("/pdf/split", formData);

// 🔹 Remove Object from Image
export const removeObject = async (formData: FormData) =>
  uploadFile("/images/remove-object", formData);
// 🔹 Enhance image quality
export const enhanceQuality = async (formData: FormData) =>
  uploadFile("/images/restore-image", formData);
// 🔹 Remove TikTok Watermark
export const removeTikTokWatermark = async (url: string) => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.post(
      `${API_URL}/tiktok/remove-watermark`,
      { url },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error response:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to remove TikTok watermark"
    );
  }
};

// 🔹 Convert Image to SVG
export const imageToSVG = async (formData: FormData) =>
  uploadFile("/images/image-to-svg", formData);

//  Function to get the API key

export const getApiKey = async (email: string) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.post(
      `${API_URL}/user/api-key`,
      { email },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Subscription failed:", error);
    throw new Error("Failed to get api key");
  }
};

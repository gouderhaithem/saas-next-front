"use server";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = "http://localhost:3001/client";

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

/*import axios from "axios";

//const API_URL = "https://saas-express-js.vercel.app/api";
const API_URL = "http://localhost:3001/api";

const uploadFile = async (
  endpoint: string,
  file: File,
  accessToken: string,
  apiKey: string
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}${endpoint}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-api-key": apiKey,
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);

  return response.data;
};
export const removeObject = async (
  file: File,
  objectName: string,
  accessToken: string,
  apiKey: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("objectName", objectName); // Adding objectName separately

  const response = await axios.post(
    `${API_URL}/images/remove-object`,
    formData,
    {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  console.log(response.data);
  return response.data;
};
export const removeBg = (file: File, accessToken: string, apiKey: string) =>
  uploadFile("/images/remove-background", file, accessToken, apiKey);

export const restoreImage = (file: File, accessToken: string, apiKey: string) =>
  uploadFile("/images/restore-image", file, accessToken, apiKey);

export const imageToPDF = (
  file: File,
  accessToken: string,
  apiKey: string,
  layout: "portrait" | "landscape" = "portrait"
) =>
  uploadFile(
    `/images/image-to-pdf?layout=${layout}`,
    file,
    accessToken,
    apiKey
  );

export const mergePDF = (file: File, accessToken: string, apiKey: string) =>
  uploadFile("/pdf/merge", file, accessToken, apiKey);

export const splitPDF = (file: File, accessToken: string, apiKey: string) =>
  uploadFile("/pdf/split", file, accessToken, apiKey);

export const removeTikTokWatermark = async (
  url: string,
  accessToken: string,
  apiKey: string
) => {
  const response = await axios.post(
    `${API_URL}/tiktok/remove-watermark`,
    { url },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const imageToSVG = (file: File, accessToken: string, apiKey: string) =>
  uploadFile("/images/image-to-svg", file, accessToken, apiKey);
*/

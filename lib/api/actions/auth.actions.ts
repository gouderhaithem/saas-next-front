import axios from "axios";

//const API_URL = "https://saas-express-js.vercel.app/api/auth";
const API_URL = "http://localhost:3001/api/auth";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  console.log(response.data);

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

export const subscribe = async (planId: string, accessToken: string) => {
  const response = await axios.post(
    `${API_URL}/subscribe`,
    { planId },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
};

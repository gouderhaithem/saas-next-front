"use client";
import { login, register, subscribe } from "@/lib/api/actions/auth.actions";
import { createContext, useState, useEffect, ReactNode } from "react";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

interface UserContextType {
  user: any;
  setUser: any;
  //  token: string | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, password: string, name: string) => Promise<void>;
  subscribePlan: (planId: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  // Load user and token from localStorage on initial load
  useEffect(() => {
    const storedToken = getCookie("token");
    const storedUser = localStorage.getItem("user");
    const storedApiKey = localStorage.getItem("apiKey");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedApiKey) setApiKey(storedApiKey);
  }, []);

  const loginUser = async (email: string, password: string) => {
    const data = await login(email, password);

    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    //setToken(data.token);

    // Store token securely in cookies
    setCookie("token", data.token, {
      httpOnly: false, // Set true for better security on server side
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Store other user info in localStorage
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const registerUser = async (
    email: string,
    password: string,
    name: string
  ) => {
    const data = await register(email, password, name);

    setUser(data.user);
    // setToken(data.token);

    // Store token securely in cookies
    setCookie("token", data.token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const subscribePlan = async (planId: string) => {
    if (!token) return;
    await subscribe(planId, token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setApiKey(null);

    // Remove token from cookies
    deleteCookie("token");

    localStorage.removeItem("user");
    localStorage.removeItem("apiKey");
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,

        loginUser,
        registerUser,
        subscribePlan,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

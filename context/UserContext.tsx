"use client";
import { login, register } from "@/lib/api/actions/auth.actions";
import { createContext, useState, useEffect, ReactNode } from "react";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
interface UserContextType {
  user: any;
  setUser: any;
  //  token: string | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, password: string, name: string) => Promise<void>;
  authRedirect: (callback: () => void) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = getCookie("token");
    const storedUser = localStorage.getItem("user");
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);

      try {
        const decodedToken: any = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp < currentTime) {
          logout();
        } else {
          // Set a timer to auto-logout when the token expires
          const timeout = (decodedToken.exp - currentTime) * 1000;
          setTimeout(() => {
            logout();
          }, timeout);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedApiKey) setApiKey(storedApiKey);
  }, []);

  const loginUser = async (email: string, password: string) => {
    const data = await login(email, password);

    setUser(data.user);


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

  const authRedirect = (callback: () => void) => {
    if (!user) {
      toast.warning("You need to log in first!", {
        position: "top-center",
        duration: 3000, // 3 seconds
        icon: <AlertTriangle className="text-yellow-500" />,
      });

      // Save the last page before redirecting
      sessionStorage.setItem("callbackUrl", window.location.pathname);

      setTimeout(() => {
        router.push("/login");
      }, 1000); // Small delay before redirecting
    } else {
      callback();
    }
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
        authRedirect,
        logout,
      }}
    >
      {children}

    </UserContext.Provider>
  );
};

export default UserContext;

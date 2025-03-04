"use server";
import { cookies } from "next/headers";

export const createCheckoutSession = async (
  userEmail: string,
  plan: string
) => {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Unauthorized: No token found");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout/pricing-plan`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: userEmail, plan }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    throw error;
  }
};

//
export const createCreditPurchaseSession = async (
  userEmail: string,
  creditPackage: string
) => {
  try {
    // Retrieve token from cookies
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Unauthorized: No token found");

    // Call the backend API to create a checkout session
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout/credit-purchase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: userEmail, creditPackage }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Failed to create credit purchase session:", error);
    throw error;
  }
};

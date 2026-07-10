import { getAuthToken } from "../utils/authStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createLoanPrediction = async (loanApplicationData) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("You must be logged in to make a prediction");
  }

  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(loanApplicationData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Prediction request failed");
  }

  return data;
};
import { getAuthToken } from "../utils/authStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("You must be logged in");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createLoanPrediction = async (loanApplicationData) => {
  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(loanApplicationData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Prediction request failed");
  }

  return data;
};

export const getPredictionHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/api/predictions`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load prediction history");
  }

  return data;
};
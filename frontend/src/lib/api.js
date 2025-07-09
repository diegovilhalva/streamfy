import { axiosInstance } from "./axios"

export const signup = async (signupData) => {
    const res = await axiosInstance.post("/auth/signup", signupData)
    return res.data
}

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data
}

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Erro ao carregar usuário:", error);
    return null;
  }
};

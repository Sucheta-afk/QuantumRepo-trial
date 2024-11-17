import axios, { AxiosResponse } from "axios";
import { auth } from "@/utils/firebase";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";

const API_URL = typeof window !== "undefined" ? window.location.origin : "";

interface LoginResponse {
  message: string;
}

// Google Login
export const googleLogin = async (): Promise<LoginResponse> => {
  try {
    const provider = new GoogleAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${API_URL}/auth/googleLogin`,
      { token },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error during Google login:", error);
    throw new Error(error.message || "Google Login failed");
  }
};

// GitHub Login
export const githubLogin = async (): Promise<LoginResponse> => {
  try {
    const provider = new GithubAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${API_URL}/auth/githubLogin`,
      { token },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error during GitHub login:", error);
    throw new Error(error.message || "GitHub Login failed");
  }
};

// Logout
export const logoutUser = async (): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error logging out:", error);
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

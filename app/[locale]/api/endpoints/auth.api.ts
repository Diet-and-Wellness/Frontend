import apiClient from "../index";
import type {
  LoginRequest,
  SignupRequest,
  OtpRequest,
  OtpVerifyRequest,
  ForgetPasswordRequest,
  ResetPasswordRequest,
} from "../types/auth.types";

export const authApi = {
  login: (data: LoginRequest) => {
    return apiClient.post("auth/login", data);
  },
  signup: (data: SignupRequest) => {
    return apiClient.post("auth/signup", data);
  },
  sendOtp: (data: OtpRequest) => {
    return apiClient.post("auth/send-otp", data);
  },
  verifyOtp: (data: OtpVerifyRequest) => {
    return apiClient.post("auth/verify-otp", data);
  },
  refreshToken: () => {
    apiClient.post("/auth/refresh-token");
  },
  forgetPassword: (data: ForgetPasswordRequest) => {
    return apiClient.post("auth/forgot-password", data);
  },
  resetPassword: (data: ResetPasswordRequest) => {
    return apiClient.post("auth/reset-password", data);
  },
  logout: () => {
    return apiClient.post("auth/logout");
  },
};

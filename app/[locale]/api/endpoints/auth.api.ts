import apiClient from "../index";
import type {
  LoginRequest,
  SignupRequest,
  OtpRequest,
  OtpVerifyRequest,
  ForgetPasswordRequest,
  GoogleAuthRequest,
  GoogleAuthResponse,
  ResetPasswordRequest,
  VerifyResetOtpRequest,
  VerifyResetOtpResponse,
  UpdatePassword,
} from "../types/auth.types";

export const authApi = {
  login: (data: LoginRequest) => {
    return apiClient.post("auth/login", data);
  },
  signup: (data: SignupRequest) => {
    return apiClient.post("auth/signup", data);
  },
  google: (data: GoogleAuthRequest) => {
    return apiClient.post<GoogleAuthResponse>("auth/google", data);
  },
  sendOtp: (data: OtpRequest) => {
    return apiClient.post("auth/send-otp", data);
  },
  verifyOtp: (data: OtpVerifyRequest) => {
    return apiClient.post("auth/verify-otp", data);
  },
  refreshToken: () => {
    return apiClient.post("/auth/refresh-token");
  },
  forgetPassword: (data: ForgetPasswordRequest) => {
    return apiClient.post("auth/forgot-password", data);
  },
  verifyResetOtp: (data: VerifyResetOtpRequest) => {
    return apiClient.post<VerifyResetOtpResponse>(
      "auth/verify-reset-otp",
      data,
    );
  },
  resetPassword: (data: ResetPasswordRequest) => {
    return apiClient.post("auth/reset-password", data);
  },
  updatePassword: (data: UpdatePassword) => {
    return apiClient.patch("auth/password", data);
  },
  logout: () => {
    return apiClient.post("auth/logout");
  },
};

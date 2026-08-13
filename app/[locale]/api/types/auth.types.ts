export interface LoginRequest {
  email: string;
  password: string;
}

export type AuthRole = "customer" | "specialist" | "admin";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: AuthRole;
}

export interface GoogleAuthRequest {
  credential: string;
}

export interface GoogleAuthMeta {
  isNewUser: boolean;
  needsProfileCompletion: boolean;
  passwordLoginAvailable: boolean;
}

export interface GoogleAuthResponse {
  success: true;
  data: AuthUser;
  meta?: GoogleAuthMeta;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  password: string;
}

export interface OtpRequest {
  email: string;
}

export interface OtpVerifyRequest {
  email: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface VerifyResetOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyResetOtpResponse {
  message: string;
  data: {
    resetToken: string;
    expiresAt: string;
  };
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

export interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
  code?: string;
}

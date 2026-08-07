import { UserStatus } from "./user.enums";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserRequest {
  email: string;
  name: string;
  status: UserStatus;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ResetFirstPasswordRequest {
  password: string;
}

export interface ResetPasswordRequest {
  password: string;
}

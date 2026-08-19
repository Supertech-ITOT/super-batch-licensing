export interface UserResponse {
  id: number;
  name: string;
  email: string;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  systemAccount: boolean;
  passwordChangedRequired: boolean;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserRequest {
  email: string;
  name: string;
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

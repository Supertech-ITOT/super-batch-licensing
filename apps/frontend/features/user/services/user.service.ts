import api from "../../../common/lib/axios";
import { ApiResponse } from "../../../common/types/api.types";
import {
  ChangePasswordRequest,
  CreateUserRequest,
  ResetFirstPasswordRequest,
  ResetPasswordRequest,
  UpdateUserRequest,
  UserResponse,
} from "../types/user.types";

export const getAll = async () => {
  const res = await api.get<ApiResponse<UserResponse[]>>("/user");
  return res.data;
};

export const getById = async (id: number) => {
  const res = await api.get<ApiResponse<UserResponse>>(`/user/${id}`);
  return res.data;
};

export const create = async (data: CreateUserRequest) => {
  const res = await api.post<ApiResponse<void>>("/user", data);
  return res.data;
};

export const update = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateUserRequest;
}) => {
  const res = await api.put<ApiResponse<void>>(`/user/${id}`, data);
  return res.data;
};

export const remove = async ({ id }: { id: number }) => {
  const res = await api.delete<ApiResponse<void>>(`/user/${id}`);
  return res.data;
};

export const changePassword = async (data: ChangePasswordRequest) => {
  const res = await api.put<ApiResponse<void>>(
    "/user/me/change-password",
    data,
  );
  return res.data;
};

export const resetFirstPassword = async (data: ResetFirstPasswordRequest) => {
  const res = await api.put<ApiResponse<void>>(
    "/user/me/reset-first-password",
    data,
  );
  return res.data;
};

export const resetPassword = async ({
  id,
  data,
}: {
  id: number;
  data: ResetPasswordRequest;
}) => {
  const res = await api.put<ApiResponse<void>>(
    `/user/${id}/reset-password`,
    data,
  );
  return res.data;
};

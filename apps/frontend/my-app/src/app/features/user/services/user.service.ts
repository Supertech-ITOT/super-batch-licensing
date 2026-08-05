import api from "@/app/common/lib/axios";
import { ApiResponse } from "@/app/common/types/api.types";
import {
  CreateUserRequest,
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
  return res.dats;
};

export const update = async (id: number, data: UpdateUserRequest) => {
  const res = await api.put<ApiResponse<void>>(`/user/${id}`, data);
  return res.data;
};

export const remove = async (id: number) => {
  const res = await api.delete<ApiResponse<void>>(`/user/${id}`);
  return res.data;
};

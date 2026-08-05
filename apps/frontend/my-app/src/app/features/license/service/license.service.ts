import api from "@/app/common/lib/axios";
import {
  CreateLicenseRequest,
  LicenseResponse,
  UpdateLicenseRequest,
} from "../types/license.types";
import { ApiResponse } from "@/app/common/types/api.types";

export const getAll = async () => {
  const res = await api.get<ApiResponse<LicenseResponse[]>>("/license");
  return res.data;
};

export const getById = async (id: number) => {
  const res = await api.get<ApiResponse<LicenseResponse>>(`/license/${id}`);
  return res.data;
};

export const create = async (data: CreateLicenseRequest) => {
  const res = await api.post<ApiResponse<void>>("/license", data);
  return res.data;
};

export const update = async (id: number, data: UpdateLicenseRequest) => {
  const res = await api.put<ApiResponse<void>>(`/license/${id}`, data);
  return res.data;
};

export const remove = async (id: number) => {
  const res = await api.delete<ApiResponse<void>>(`/license/${id}`);
  return res.data;
};

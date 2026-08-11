import { ApiResponse } from "@/common/types/api.types";
import {
  CreateLicenseRequest,
  LicenseResponse,
  UpdateLicenseRequest,
} from "../types/license.types";
import api from "@/common/lib/axios";

export interface OptionDto {
  label: string;
  value: string;
}

export const getAll = async () => {
  const res = await api.get<ApiResponse<LicenseResponse[]>>("/licenses");
  return res.data;
};

export const getById = async (id: number) => {
  const res = await api.get<ApiResponse<LicenseResponse>>(`/licenses/${id}`);
  return res.data;
};

export const create = async (data: CreateLicenseRequest) => {
  const res = await api.post<ApiResponse<void>>("/licenses", data);
  return res.data;
};

export const update = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateLicenseRequest;
}) => {
  const res = await api.put<ApiResponse<void>>(`/licenses/${id}`, data);
  return res.data;
};

export const remove = async ({ id }: { id: number }) => {
  const res = await api.delete<ApiResponse<void>>(`/licenses/${id}`);
  return res.data;
};

export const getLicenseTypes = async () => {
  const res = await api.get<ApiResponse<OptionDto[]>>(
    "/metadata/license-types",
  );
  return res.data;
};

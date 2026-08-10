import api from "@/common/lib/axios";
import {
  CreatePlanRequest,
  PlanResponse,
  UpdatePlanRequest,
} from "../types/plan.types";
import { ApiResponse } from "@/common/types/api.types";

export const getAll = async () => {
  const res = await api.get<ApiResponse<PlanResponse[]>>("/plans");
  return res.data;
};

export const getById = async (id: number) => {
  const res = await api.get<ApiResponse<PlanResponse>>(`/plans/${id}`);
  return res.data;
};

export const create = async (data: CreatePlanRequest) => {
  const res = await api.post<ApiResponse<void>>("/plans", data);
  return res.data;
};

export const update = async ({
  id,
  data,
}: {
  id: number;
  data: UpdatePlanRequest;
}) => {
  const res = await api.put<ApiResponse<void>>(`/plans/${id}`, data);
  return res.data;
};

export const remove = async ({ id }: { id: number }) => {
  const res = await api.delete<ApiResponse<void>>(`/plans/${id}`);
  return res.data;
};

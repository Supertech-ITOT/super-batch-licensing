import api from "@/app/common/lib/axios";
import { ApiResponse } from "@/app/common/types/api.types";
import {
  CreatePlanRequest,
  PlanResponse,
  UpdatePlanRequest,
} from "../types/plan.types";

export const getAll = async () => {
  const res = await api.get<ApiResponse<PlanResponse[]>>("/plan");
  return res.data;
};

export const getById = async (id: number) => {
  const res = await api.get<ApiResponse<PlanResponse>>(`/plan/${id}`);
  return res.data;
};

export const create = async (data: CreatePlanRequest) => {
  const res = await api.post<ApiResponse<void>>("/plan", data);
  return res.data;
};

export const update = async (id: number, data: UpdatePlanRequest) => {
  const res = await api.put<ApiResponse<void>>(`/plan${id}`, data);
  return res.data;
};

export const remove = async (id: number) => {
  const res = await api.delete<ApiResponse<void>>(`/plan/${id}`);
  return res.data;
};

import api from "@/app/common/lib/axios";
import {
  CreateCustomerRequest,
  CustomerResponse,
  UpdateCustomerRequest,
} from "../types/customer.types";
import { ApiResponse } from "@/app/common/types/api.types";

export const getAll = async () => {
  const res = await api.get<ApiResponse<CustomerResponse[]>>("/customer");
  return res.data;
};

export const getById = async (id: number) => {
  const res = await api.get<ApiResponse<CustomerResponse>>(`/customer/${id}`);
  return res.data;
};

export const create = async (data: CreateCustomerRequest) => {
  const res = await api.post<ApiResponse<void>>("/customer", data);
  return res.data;
};

export const update = async (id: number, data: UpdateCustomerRequest) => {
  const res = await api.put<ApiResponse<void>>(`/customer/${id}`, data);
  return res.data;
};

export const remove = async (id: number) => {
  const res = await api.delete<ApiResponse<void>>(`/customer/${id}`);
  return res.data;
};

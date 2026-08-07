import api from "../../../common/lib/axios";
import { ApiResponse } from "../../../common/types/api.types";
import {
  CreateCustomerRequest,
  CustomerResponse,
  UpdateCustomerRequest,
} from "../types/customer.types";

export const getAll = async () => {
  const res = await api.get<ApiResponse<CustomerResponse[]>>("/customers");
  return res.data;
};

export const getById = async (id: number) => {
  const res = await api.get<ApiResponse<CustomerResponse>>(`/customers/${id}`);
  return res.data;
};

export const create = async (data: CreateCustomerRequest) => {
  const res = await api.post<ApiResponse<void>>("/customers", data);
  return res.data;
};

export const update = async (id: number, data: UpdateCustomerRequest) => {
  const res = await api.put<ApiResponse<void>>(`/customers/${id}`, data);
  return res.data;
};

export const remove = async (id: number) => {
  const res = await api.delete<ApiResponse<void>>(`/customers/${id}`);
  return res.data;
};

import { ApiResponse } from "@/common/types/api.types";
import {
  CreateProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from "../types/product.types";
import api from "@/common/lib/axios";

export const getAll = async () => {
  const res = await api.get<ApiResponse<ProductResponse[]>>("/products");
  return res.data;
};

export const getById = async (id: number) => {
  const res = await api.get<ApiResponse<ProductResponse>>(`/products/${id}`);
  return res.data;
};

export const create = async (data: CreateProductRequest) => {
  const res = await api.post<ApiResponse<void>>("/products", data);
  return res.data;
};

export const update = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateProductRequest;
}) => {
  const res = await api.put<ApiResponse<void>>(`/products/${id}`, data);
  return res.data;
};

export const remove = async (id: number) => {
  const res = await api.delete<ApiResponse<void>>(`/products/${id}`);
  return res.data;
};

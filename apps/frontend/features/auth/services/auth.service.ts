import api from "@/app/common/lib/axios";
import { LoginRequest, LoginResponse } from "../types/auth.types";
import { ApiResponse } from "@/app/common/types/api.types";

export const login = async (request: LoginRequest) => {
  const res = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    request,
  );
  return res.data;
};

import api from "../../../common/lib/axios";
import { ApiResponse } from "../../../common/types/api.types";
import { LoginRequest, LoginResponse } from "../types/auth.types";

export const login = async (request: LoginRequest) => {
  const res = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    request,
  );
  return res.data;
};

export const logout = async () => {
  const res = await api.post<ApiResponse<null>>("/auth/logout");
  return res.data;
};

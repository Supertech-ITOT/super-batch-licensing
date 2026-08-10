import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../common/query-keys";
import {
  changePassword,
  create,
  getAll,
  getById,
  remove,
  resetFirstPassword,
  resetPassword,
  update,
} from "../services/user.service";
import { UpdateUserRequest } from "../types/user.types";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: async () => {
      const res = await getAll();
      return res.data;
    },
  });
};

export const useGetUserById = (id?: number) => {
  return useQuery({
    queryKey: id ? queryKeys.user(id) : [],
    queryFn: async () => {
      const res = await getById(id!);
      return res.data;
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users,
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users,
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users,
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

export const useResetFirstPassword = () => {
  return useMutation({
    mutationFn: resetFirstPassword,
    onSuccess: () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        const user = JSON.parse(stored);
        user.passwordChangeRequired = false;
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
  });
};

export const useResetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users,
      });
    },
  });
};

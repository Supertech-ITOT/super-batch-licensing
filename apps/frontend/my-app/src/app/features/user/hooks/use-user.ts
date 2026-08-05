import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../common/query-keys";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../services/user.service";
import { UpdateUserRequest } from "../types/user.types";

export const useGetUsers = () => {
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
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) =>
      update(id, data),
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

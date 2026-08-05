import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../common/query-keys";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../services/customer.service";
import { UpdateCustomerRequest } from "../types/customer.types";

export const useGetAllCustomers = () => {
  return useQuery({
    queryKey: queryKeys.customers,
    queryFn: async () => {
      const res = await getAll();
      return res.data;
    },
  });
};

export const useGetCustomerById = (id?: number) => {
  return useQuery({
    queryKey: id ? queryKeys.customer(id) : [],
    queryFn: async () => {
      const res = await getById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers,
      });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCustomerRequest }) =>
      update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers,
      });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers,
      });
    },
  });
};

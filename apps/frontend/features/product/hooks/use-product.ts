import { queryKeys } from "@/features/common/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../service/product.service";

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: async () => {
      const res = await getAll();
      return res.data;
    },
  });
};

export const useGetProductById = (id?: number) => {
  return useQuery({
    queryKey: id ? queryKeys.product(id) : [],
    queryFn: async () => {
      const res = await getById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products,
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products,
      });
    },
  });
};

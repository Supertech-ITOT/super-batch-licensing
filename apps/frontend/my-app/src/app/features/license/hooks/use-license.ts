import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateLicenseRequest } from "../types/license.types";
import { queryKeys } from "../../common/query-keys";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../service/license.service";

export const useGetLicenses = () => {
  return useQuery({
    queryKey: queryKeys.licenses,
    queryFn: async () => {
      const res = await getAll();
      return res.data;
    },
  });
};

export const useGetLicenseById = (id?: number) => {
  return useQuery({
    queryKey: id ? queryKeys.license(id) : [],
    queryFn: async () => {
      const res = await getById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.licenses,
      });
    },
  });
};

export const useUpdateLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateLicenseRequest }) =>
      update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.licenses,
      });
    },
  });
};

export const useDeleteLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.licenses,
      });
    },
  });
};

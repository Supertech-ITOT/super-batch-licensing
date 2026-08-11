import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../common/query-keys";
import {
  create,
  getAll,
  getById,
  getLicenseTypes,
  remove,
  update,
} from "../service/license.service";

export const useGetAllLicenses = () => {
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
    mutationFn: update,

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

export const useGetLicenseTypes = () => {
  return useQuery({
    queryKey: ["license-types"],
    queryFn: async () => {
      const res = await getLicenseTypes();
      return res.data;
    },
  });
};

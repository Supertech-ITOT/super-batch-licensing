import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../common/query-keys";
import {
  changeMachine,
  create,
  downloadLicenseFile,
  downloadLicenseKey,
  getAll,
  getById,
  getLicenseStatus,
  getLicenseTypes,
  remove,
  sendLicenseFile,
  sendLicenseKey,
  update,
} from "../service/license.service";
import { queryClient } from "@/common/lib/query-client";

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
export const useGetLicenseStatus = () => {
  return useQuery({
    queryKey: ["license-status"],
    queryFn: async () => {
      const res = await getLicenseStatus();
      return res.data;
    },
  });
};

export const useDownloadLicenseKey = () => {
  return useMutation({
    mutationFn: downloadLicenseKey,
  });
};

export const useDownloadLicenseFile = () => {
  return useMutation({
    mutationFn: downloadLicenseFile,
  });
};

export const useSendLicenseKey = () => {
  return useMutation({
    mutationFn: sendLicenseKey,
  });
};

export const useSendLicenseFile = () => {
  return useMutation({
    mutationFn: sendLicenseFile,
  });
};

export const useChangeMachine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeMachine,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.licenses,
      });
    },
  });
};

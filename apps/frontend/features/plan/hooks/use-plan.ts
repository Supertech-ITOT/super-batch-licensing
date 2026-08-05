import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { UpdatePlanRequest } from "../types/plan.types";
import { queryKeys } from "../../common/query-keys";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../service/plan.service";

export const useGetPlans = () => {
  return useQuery({
    queryKey: queryKeys.plans,
    queryFn: async () => {
      const res = await getAll();
      return res.data;
    },
  });
};

export const useGetPlanById = (id?: number) => {
  return useQuery({
    queryKey: id ? queryKeys.plan(id) : [],
    queryFn: async () => {
      const res = await getById(id!);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.plans,
      });
    },
  });
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePlanRequest }) =>
      update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.plans,
      });
    },
  });
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.plans,
      });
    },
  });
};

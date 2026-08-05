import { PlanStatus } from "./plan.enums";

export interface PlanResponse {
  id: number;
  name: string;
  code: string;
  description: string | null;
  durationMonths: number;
  maxUsers: number;
  price: number;
  status: PlanStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlanRequest {
  name: string;
  code: string;
  description?: string;
  durationMonths: number;
  maxUsers: number;
  price: number;
  status?: PlanStatus;
}

export interface UpdatePlanRequest {
  name: string;
  code: string;
  description?: string;
  durationMonths: number;
  maxUsers: number;
  price: number;
  status: PlanStatus;
}

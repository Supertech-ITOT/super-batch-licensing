export interface PlanResponse {
  id: number;
  name: string;
  code: string;
  description: string | null;
  durationMonths: number;
  maxUsers: number;
  price: number;
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
}

export interface UpdatePlanRequest {
  name: string;
  code: string;
  description?: string;
  durationMonths: number;
  maxUsers: number;
  price: number;
}

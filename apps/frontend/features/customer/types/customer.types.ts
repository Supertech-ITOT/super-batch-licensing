export interface CustomerResponse {
  id: number;
  companyName: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerRequest {
  companyName: string;
  email: string;
}

export interface UpdateCustomerRequest {
  companyName: string;
  email: string;
}

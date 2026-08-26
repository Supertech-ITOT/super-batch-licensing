export interface CustomerResponse {
  id: number;
  name: string;
  companyName: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerRequest {
  name: string;
  companyName: string;
  email: string;
}

export interface UpdateCustomerRequest {
  name: string;
  companyName: string;
  email: string;
}

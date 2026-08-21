export interface CreateProductRequest {
  name: String;
  code: String;
  description?: String;
}

export interface UpdateProductRequest {
  name: String;
  code: String;
  description?: String;
}

export interface ProductResponse {
  id: number;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

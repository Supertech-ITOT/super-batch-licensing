export const queryKeys = {
  // Customer
  customers: ["customers"] as const,
  customer: (id: number) => ["customers", id] as const,

  // User
  users: ["users"] as const,
  user: (id: number) => ["users", id] as const,
  currentUser: ["users", "me"] as const,

  // Plan
  plans: ["plans"] as const,
  plan: (id: number) => ["plans", id] as const,

  // License
  licenses: ["licenses"] as const,
  license: (id: number) => ["licenses", id] as const,

  // Authentication
  auth: ["auth"] as const,
};

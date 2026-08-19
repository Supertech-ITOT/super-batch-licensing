import {
  Users,
  UserCog,
  Package,
  KeyRound,
  LucideIcon,
  Settings,
} from "lucide-react";

export enum ModuleType {
  CUSTOMERS = "CUSTOMERS",
  USERS = "USERS",
  PLANS = "PLANS",
  LICENSES = "LICENSES",
}

export interface ModuleResponse {
  id: number;
  name: string;
}

type RouteType = {
  label: string;
  short: string;
  path: string;
  icon: LucideIcon;
  module?: ModuleType;
  description: string;
};

export const OperationRoutes: RouteType[] = [
  {
    label: "Customers",
    short: "Customers",
    path: "/customers",
    icon: Users,
    module: ModuleType.CUSTOMERS,
    description:
      "Manage customer organizations and their licensing information.",
  },
  {
    label: "Users",
    short: "Users",
    path: "/user",
    icon: UserCog,
    module: ModuleType.USERS,
    description: "Manage system users, administrators, and access permissions.",
  },
  {
    label: "Plans",
    short: "Plans",
    path: "/plans",
    icon: Package,
    module: ModuleType.PLANS,
    description:
      "Create and manage license plans, pricing, duration, and limits.",
  },
  {
    label: "Licenses",
    short: "Licenses",
    path: "/licenses",
    icon: KeyRound,
    module: ModuleType.LICENSES,
    description:
      "Generate, activate, suspend, revoke, and monitor software licenses.",
  },
];

export const ConfigurationRoutes: RouteType[] = [
  {
    label: "Settings",
    short: "Settings",
    path: "/Setting",
    icon: Settings,
    description:
      "Configure system preferences, application settings, and defaults.",
  },
];

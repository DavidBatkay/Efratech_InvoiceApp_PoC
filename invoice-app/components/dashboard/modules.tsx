import { FileText, CreditCard, Users, UserCog } from "lucide-react";

export interface Module {
  name: string;
  href: string;
  description: string;
  icon: React.ElementType;
}

export const modules: Module[] = [
  {
    name: "Invoices",
    href: "invoices",
    description: "See all your invoices or create a new one",
    icon: FileText,
  },
  {
    name: "Payments",
    href: "payments",
    description: "Check your confirmed payments",
    icon: CreditCard,
  },
  {
    name: "Customers",
    href: "customers",
    description: "Manage your customer base",
    icon: Users,
  },
  {
    name: "Users",
    href: "users",
    description: "Manage all users",
    icon: UserCog,
  },
];

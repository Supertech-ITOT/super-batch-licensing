import { Plus, Users } from "lucide-react";
import { Button } from "../../../common/components/ui/button";

export default function CustomerHeader() {
  return (
    <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex flex-col       ">
          <Users className="text-primary " />
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your customers and their license information.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>
    </div>
  );
}

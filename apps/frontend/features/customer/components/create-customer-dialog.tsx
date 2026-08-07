import { FieldErrors, useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../common/components/ui/dialog";
import { useCreateCustomer } from "../hooks/use-customer";
import {
  createCustomerSchema,
  CreateCustomerSchema,
  CustomerSchemaLimit,
} from "../schemas/customer-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { showApiError } from "../../../common/lib/show-api-error";
import { Label } from "../../../common/components/ui/label";
import CharacterProgress from "../../../common/components/form/character-progress";
import { Input } from "../../../common/components/ui/input";
import { Button } from "../../../common/components/ui/button";
import { Loader } from "lucide-react";

type Props = { open: boolean; onClose: () => void };
export default function CreateCustomerDialog({ open, onClose }: Props) {
  const { mutateAsync: createCustomer, isPending: isCreating } =
    useCreateCustomer();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty },
  } = useForm<CreateCustomerSchema>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: { companyName: "", email: "" },
  });
  const loading = isSubmitting || isCreating;
  const onSubmit = async (formData: CreateCustomerSchema) => {
    try {
      const res = await createCustomer({
        companyName: formData.companyName,
        email: formData.email,
      });
      toast.success(res.messsage ?? "Customer created successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const handleClose = () => {
    reset({ companyName: "", email: "" });
    onClose();
  };

  const onInvalid = (errors: FieldErrors<CreateCustomerSchema>) => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message.toString());
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <DialogHeader>
            <DialogTitle>Create Customer</DialogTitle>
            <DialogDescription>Create a new customer</DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Name</Label>
              <CharacterProgress
                value={watch("companyName")}
                max={CustomerSchemaLimit.companyName.max}
              />
            </div>
            <Input
              type="text"
              disabled={loading}
              placeholder="SuperTech Automation"
              maxLength={CustomerSchemaLimit.companyName.max}
              {...register("companyName")}
            />
          </div>

          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Email</Label>
              <CharacterProgress
                value={watch("email")}
                max={CustomerSchemaLimit.email.max}
              />
            </div>
            <Input
              type="email"
              disabled={loading}
              placeholder="info@gmail.com"
              maxLength={CustomerSchemaLimit.email.max}
              {...register("email")}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={loading}
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="min-w-34 text-white"
              disabled={loading || !isDirty}
            >
              {loading ? (
                <Loader className="w-4 h-4 animate-spin text-white" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

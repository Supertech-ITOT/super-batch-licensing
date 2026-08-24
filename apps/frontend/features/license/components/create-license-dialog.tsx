import { useGetAllCustomers } from "@/features/customer/hooks/use-customer";
import { useCreateLicense, useGetLicenseTypes } from "../hooks/use-license";
import { useGetAllPlans } from "@/features/plan/hooks/use-plan";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import {
  createLicenseSchema,
  CreateLicenseSchema,
  licenseDefaultValues,
} from "../schemas/license-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { format } from "date-fns";
import {
  Boxes,
  Calendar as CalendarIcon,
  Fingerprint,
  KeyRound,
  Layers,
  Users,
} from "lucide-react";
import { TextInput } from "@/common/components/form/text-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import { useGetAllProducts } from "@/features/product/hooks/use-product";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";

type Props = { open: boolean; onClose: () => void };
export default function CreateLicenseDialog({ open, onClose }: Props) {
  const { mutateAsync: createLicense, isPending: isCreating } =
    useCreateLicense();
  const { data: customers, isLoading: customersLoading } = useGetAllCustomers();
  const { data: plans, isLoading: plansLoading } = useGetAllPlans();
  const { data: products, isLoading: productsLoading } = useGetAllProducts();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<CreateLicenseSchema>({
    resolver: zodResolver(createLicenseSchema),
    defaultValues: licenseDefaultValues,
  });
  const { data: licenseTypes, isLoading: licenseTypesLoading } =
    useGetLicenseTypes();
  const loading =
    isSubmitting ||
    isCreating ||
    customersLoading ||
    productsLoading ||
    plansLoading ||
    licenseTypesLoading;
  const onSubmit = async (formData: CreateLicenseSchema) => {
    try {
      const res = await createLicense(formData);
      toast.success(res.message ?? "License created successfully.");
      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const handleClose = () => {
    reset(licenseDefaultValues);
    onClose();
  };
  const onInvalid = (errors: FieldErrors<CreateLicenseSchema>) => {
    toast.error(showFormError(errors));
  };
  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Create License"
      description="Create a new license."
      footer={
        <FormLoadingButton
          form="create-license-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Create
        </FormLoadingButton>
      }
      icon={KeyRound}
    >
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        id="create-license-form"
      >
        <div className="space-y-2 grid grid-cols-2 gap-2">
          <Controller
            control={control}
            name="customerId"
            render={({ field }) => (
              <SearchableSelect
                value={field.value}
                icon={Users}
                label="Customer"
                onChange={field.onChange}
                options={
                  customers?.map((customer) => ({
                    label: customer.companyName,
                    value: customer.id,
                  })) ?? []
                }
                disabled={loading}
                placeholder="Select customer"
              />
            )}
          />

          <Controller
            control={control}
            name="productId"
            render={({ field }) => (
              <SearchableSelect
                value={field.value}
                icon={Boxes}
                label="Product"
                onChange={field.onChange}
                options={
                  products?.map((product) => ({
                    label: product.name,
                    value: product.id,
                  })) ?? []
                }
                disabled={loading}
                placeholder="Select product"
              />
            )}
          />

          <Controller
            control={control}
            name="planId"
            render={({ field }) => (
              <SearchableSelect
                value={field.value}
                icon={Layers}
                label="Plan"
                onChange={field.onChange}
                options={
                  plans?.map((plan) => ({
                    label: plan.name,
                    value: plan.id,
                  })) ?? []
                }
                disabled={loading}
                placeholder="Select plan"
              />
            )}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <SearchableSelect
                value={field.value}
                icon={KeyRound}
                label="Type"
                onChange={field.onChange}
                options={
                  licenseTypes?.map((lic) => ({
                    label: lic.label,
                    value: lic.value,
                  })) ?? []
                }
                placeholder="Select type"
                disabled={loading}
              />
            )}
          />

          <Controller
            control={control}
            name="expiryDate"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Expiry Date</label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={loading}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {field.value ? (
                        format(
                          new Date(field.value + "T00:00:00"),
                          "dd MMM yyyy",
                        )
                      ) : (
                        <span>Select expiry date</span>
                      )}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        field.value
                          ? new Date(field.value + "T00:00:00")
                          : undefined
                      }
                      onSelect={(date) => {
                        field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                      }}
                      disabled={(date) => date <= new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          />

          <TextInput
            label="Machine Fingerprint"
            icon={Fingerprint}
            placeholder="Fingerprint"
            disabled={loading}
            {...register("machineFingerprint")}
          />
        </div>
      </form>
    </FormDialog>
  );
}

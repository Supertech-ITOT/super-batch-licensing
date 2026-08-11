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
import { Calendar, Fingerprint, KeyRound, Layers, Users } from "lucide-react";
import { TextInput } from "@/common/components/form/text-input";
import SearchableSelect from "@/common/components/form/searchable-select";

type Props = { open: boolean; onClose: () => void };
export default function CreateLicenseDialog({ open, onClose }: Props) {
  const { mutateAsync: createLicense, isPending: isCreating } =
    useCreateLicense();
  const { data: customers, isLoading: customersLoading } = useGetAllCustomers();
  const { data: plans, isLoading: plansLoading } = useGetAllPlans();
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
      title="Create Customer"
      description="Create a new customer."
      footer={
        <FormLoadingButton
          form="create-customer-form"
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
        id="create-customer-form"
      >
        <div className="space-y-4">
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
                placeholder="Select license type"
                disabled={loading}
              />
            )}
          />

          <TextInput
            label="Expiry Date"
            icon={Calendar}
            type="date"
            disabled={loading}
            {...register("expiryDate")}
          />

          <TextInput
            label="Machine Fingerprint"
            icon={Fingerprint}
            placeholder="Enter machine fingerprint"
            disabled={loading}
            {...register("machineFingerprint")}
          />
        </div>
      </form>
    </FormDialog>
  );
}

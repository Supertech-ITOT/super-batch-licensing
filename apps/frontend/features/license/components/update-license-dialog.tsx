import { Controller, FieldErrors, useForm } from "react-hook-form";
import {
  useGetLicenseById,
  useGetLicenseStatus,
  useUpdateLicense,
} from "../hooks/use-license";
import {
  licenseDefaultValues,
  updateLicenseDefaultValues,
  updateLicenseSchema,
  UpdateLicenseSchema,
} from "../schemas/license-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import { KeyRound, Pencil } from "lucide-react";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import SearchableSelect from "@/common/components/form/searchable-select";

type Props = { open: boolean; onClose: () => void; licenseId: number };
export default function UpdateLicenseDialog({
  open,
  onClose,
  licenseId,
}: Props) {
  const { mutateAsync: updateLicense, isPending: isUpdating } =
    useUpdateLicense();
  const { data: license, isLoading: licenseIsLoading } =
    useGetLicenseById(licenseId);
  const { data: licenseStatus, isLoading: licenseStatusIsLoading } =
    useGetLicenseStatus();
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateLicenseSchema>({
    resolver: zodResolver(updateLicenseSchema),
    defaultValues: licenseDefaultValues,
  });
  const loading =
    isSubmitting || isUpdating || licenseIsLoading || licenseStatusIsLoading;
  useEffect(() => {
    if (!license) return;
    reset({
      status: license.status,
      expiryDate: license.expiryDate,
      machineFingerprint: license.machineFingerprint ?? "",
    });
  }, [license, reset]);
  const onSubmit = async (formData: UpdateLicenseSchema) => {
    try {
      const res = await updateLicense({
        id: licenseId,
        data: formData,
      });

      toast.success(res.message ?? "License updated successfully.");

      handleClose();
    } catch (error) {
      showApiError(error);
    }
  };
  const handleClose = () => {
    reset(updateLicenseDefaultValues);
    onClose();
  };
  const onInvalid = (errors: FieldErrors<UpdateLicenseSchema>) => {
    toast.error(showFormError(errors));
  };

  return (
    <FormDialog
      open={open}
      loading={loading}
      onClose={handleClose}
      title="Update License"
      description="Update the license details."
      icon={Pencil}
      footer={
        <FormLoadingButton
          form="update-license-form"
          type="submit"
          loading={loading}
          disabled={!isDirty}
        >
          Update
        </FormLoadingButton>
      }
    >
      <form
        id="update-license-form"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        {/* License Status */}
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <SearchableSelect
              value={field.value}
              icon={KeyRound}
              label="Status"
              onChange={field.onChange}
              options={
                licenseStatus?.map((lic) => ({
                  label: lic.label,
                  value: lic.value,
                })) ?? []
              }
              disabled={loading}
              placeholder="Select license status"
            />
          )}
        />
      </form>
    </FormDialog>
  );
}

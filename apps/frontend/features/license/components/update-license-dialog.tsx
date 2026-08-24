import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useGetLicenseById, useUpdateLicense } from "../hooks/use-license";
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
import {
  Calendar as CalendarIcon,
  Fingerprint,
  KeyRound,
  Pencil,
} from "lucide-react";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import SearchableSelect from "@/common/components/form/searchable-select";
import { TextInput } from "@/common/components/form/text-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Button } from "@/common/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/common/components/ui/calendar";

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
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateLicenseSchema>({
    resolver: zodResolver(updateLicenseSchema),
    defaultValues: licenseDefaultValues,
  });
  const loading = isSubmitting || isUpdating || licenseIsLoading;
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
        <div className="space-y-4">
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
                options={[
                  {
                    label: "Active",
                    value: "ACTIVE",
                  },
                  {
                    label: "Suspended",
                    value: "SUSPENDED",
                  },
                  {
                    label: "Expired",
                    value: "EXPIRED",
                  },
                  {
                    label: "Revoked",
                    value: "REVOKED",
                  },
                ]}
                disabled={loading}
                placeholder="Select license status"
              />
            )}
          />

          {/* Expiry Date */}
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

          {/* Machine Fingerprint */}
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

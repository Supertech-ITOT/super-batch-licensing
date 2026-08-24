"use client";

import { LicenseResponse } from "../types/license.types";
import { DialogProp } from "./license-view";
import {
  useDownloadLicenseFile,
  useSendLicenseFile,
  useSendLicenseKey,
} from "../hooks/use-license";

import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";

import { Button } from "@/common/components/ui/button";
import {
  Download,
  Edit3Icon,
  Mail,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

type Props = {
  license: LicenseResponse;
  setDialog: React.Dispatch<React.SetStateAction<DialogProp>>;
};

export default function LicenseActions({ license, setDialog }: Props) {
  // Download License File
  const { mutateAsync: downloadLicenseFile, isPending: isDownloading } =
    useDownloadLicenseFile();

  // Send License Key
  const { mutateAsync: sendLicenseKey, isPending: isSendingKey } =
    useSendLicenseKey();

  // Send License File
  const { mutateAsync: sendLicenseFile, isPending: isSendingFile } =
    useSendLicenseFile();

  const handleDownload = async () => {
    try {
      const blob = await downloadLicenseFile(license.id);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${license.licenseNumber}.lic`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("License downloaded successfully.");
    } catch (error) {
      showApiError(error);
    }
  };

  const handleSendLicenseKey = async () => {
    try {
      const res = await sendLicenseKey(license.id);

      toast.success(res.message ?? "License key sent successfully.");
    } catch (error) {
      showApiError(error);
    }
  };

  const handleSendLicenseFile = async () => {
    try {
      const res = await sendLicenseFile(license.id);

      toast.success(res.message ?? "License file sent successfully.");
    } catch (error) {
      showApiError(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {/* Edit */}
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();

            setDialog({
              action: "edit",
              id: license.id,
              open: true,
            });
          }}
        >
          <Edit3Icon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        {/* Download */}
        <DropdownMenuItem
          disabled={isDownloading}
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
        >
          <Download className="mr-2 h-4 w-4" />

          {isDownloading ? "Downloading..." : "Export"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Send License Key */}
        <DropdownMenuItem
          disabled={isSendingKey}
          onClick={(e) => {
            e.stopPropagation();
            handleSendLicenseKey();
          }}
        >
          <Mail className="mr-2 h-4 w-4" />

          {isSendingKey ? "Sending..." : "Send Key"}
        </DropdownMenuItem>

        {/* Send License File */}
        <DropdownMenuItem
          disabled={isSendingFile}
          onClick={(e) => {
            e.stopPropagation();
            handleSendLicenseFile();
          }}
        >
          <Mail className="mr-2 h-4 w-4" />

          {isSendingFile ? "Sending..." : "Send File"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Delete */}
        <DropdownMenuItem
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();

            setDialog({
              action: "delete",
              id: license.id,
              open: true,
            });
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteConfirmationDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Called to close the dialog */
  onClose: () => void;
  /** Title text displayed at the top */
  title: string;
  /** Body content (can include JSX) */
  description: React.ReactNode;
  /** Label for the confirmation checkbox */
  confirmCheckboxLabel: string;
  /** Warning message shown when the checkbox is unchecked */
  toastWarningMessage: string;
  /** Text for the delete button */
  deleteText?: string;
  /** Text shown while deletion is in progress */
  deletingText?: string;
  /** ID of the item to delete */
  id: string;
  /** Function performing the deletion (should return a Promise) */
  deleteFn: (id: string) => Promise<unknown>;
  /** Query key to invalidate on success */
  queryKey: readonly unknown[];
  /** Toast messages on success */
  successToast: { title: string; description?: string };
  /** Toast messages on error */
  errorToast?: { title?: string; description?: string };
}

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  title,
  description,
  confirmCheckboxLabel,
  toastWarningMessage,
  deleteText = "Delete",
  deletingText = "Deleting",
  id,
  deleteFn,
  queryKey,
  successToast,
  errorToast,
}: DeleteConfirmationDialogProps) {
  const [confirmed, setConfirmed] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      toast.success(successToast.title, {
        description: successToast.description,
      });
      queryClient.invalidateQueries({ queryKey });
      onClose();
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(errorToast?.title ?? "Error", {
          description: errorToast?.description,
        });
      }
    },
  });
  const isLoading = mutation.status === "pending";

  const handleCheckedChange = (checked: boolean | "indeterminate") => {
    const ok = checked === true;
    setConfirmed(ok);
    if (!ok) {
      toast.dismiss();
      toast.warning(title, {
        description: toastWarningMessage,
        icon: null,
      });
    }
  };

  const handleConfirm = () => {
    mutation.mutate(id);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-text-primary-default">
          {description}
        </DialogDescription>
        <div className="flex items-center space-x-2 py-4">
          <Checkbox id="confirm" onCheckedChange={handleCheckedChange} />
          <label htmlFor="confirm" className="text-sm font-medium leading-none">
            {confirmCheckboxLabel}
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!confirmed || isLoading}
          >
            {isLoading ? (
              <>
                <span>{deletingText}</span>{" "}
                <Loader className="inline animate-spin" />
              </>
            ) : (
              deleteText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

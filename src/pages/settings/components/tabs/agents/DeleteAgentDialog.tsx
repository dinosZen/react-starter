import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/toast";
import { deleteAgent } from "@/features/settings/api";
import { DeleteAgentDialogProps } from "@/features/settings/types";

export function DeleteAgentDialog({
  agent,
  isOpen,
  onClose,
}: DeleteAgentDialogProps) {
  const { t } = useTranslation();

  const [isDeletionConfirmed, setIsDeletionConfirmed] = useState(false);

  const queryClient = useQueryClient();

  const deleteAgentMutation = useMutation({
    mutationFn: deleteAgent,
    onSuccess: () => {
      toast.success(t("success"), {
        description: t("agent.deletedSuccessfully"),
      });
      // refetch agents
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      //close dialog
      onClose();
    },
    onError: (err: unknown) => {
      console.error("Delete error", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(t("error"), {
          description: t("agent.unknownError"),
        });
      }
    },
  });

  const handleConfirmDelete = async () => {
    if (agent.id !== undefined) {
      await deleteAgentMutation.mutateAsync(agent.id.toString());
    } else {
      toast.error(t("error"), {
        description: t("agent.deleteError"),
      });
    }
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
          <DialogTitle className="pb-4">Delete agent</DialogTitle>
          <DialogDescription className="text-text-primary-default">
            If you delete this agent, they will no longer have any permissions
            nor they would be able to approach the system.
            <br />
            Are you sure you want to delete the agent{" "}
            <strong>
              {agent.firstName} {agent.lastName}
            </strong>
            ?
            <br />
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 py-4">
          <Checkbox
            id="terms"
            onCheckedChange={(checked) => {
              setIsDeletionConfirmed(!isDeletionConfirmed);
              if (checked) {
                toast.dismiss();
              }
              if (!checked) {
                toast.warning(t("warning"), {
                  description: t("agent.confirmDelete"),
                  icon: null,
                });
              }
            }}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-text-primary-default"
          >
            I am sure I want to delete this agent
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={!isDeletionConfirmed}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

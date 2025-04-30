import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/toast";
import { deleteAgent } from "@/features/settings/api";
import { AgentStatusDialogProps } from "@/features/settings/types";

export function AgentStatusDialog({
  agent,
  isOpen,
  onClose,
}: AgentStatusDialogProps) {
  const { t } = useTranslation();

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
          <DialogTitle className="pb-4">Deactivate agent</DialogTitle>
          <DialogDescription className="text-text-primary-default">
            If you deactivate this agent, they will no longer have any
            permissions nor they would be able to approach the system.
            <br />
            <br />
            Are you sure you want to deactivate the agent{" "}
            <strong>
              {agent.firstName} {agent.lastName}
            </strong>
            ?
            <br />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleConfirmDelete}>
            Deactivate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

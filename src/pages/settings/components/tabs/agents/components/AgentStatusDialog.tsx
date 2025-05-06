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
import { updateAgent } from "@/features/settings/api";
import {
  AgentStatusDialogProps,
  AgentPatchPayload,
} from "@/features/settings/types";
import { Loader } from "lucide-react";

export function AgentStatusDialog({
  agent,
  isOpen,
  onClose,
}: AgentStatusDialogProps) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  type UpdateAgentVars = {
    agentId: string;
    data: AgentPatchPayload;
  };

  const updateAgentMutation = useMutation<unknown, unknown, UpdateAgentVars>({
    mutationFn: ({ agentId, data }) => updateAgent({ agentId, data }),
    onSuccess: () => {
      toast.success(t("success"), {
        description: t("agent.status-successfully-updated"),
      });
      // refetch agents
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      //close dialog
      onClose();
    },
    onError: (err: unknown) => {
      console.error("Status change error", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(t("error"), {
          description: t("unknown-error"),
        });
      }
    },
  });

  const handleStatusChange = async () => {
    if (agent.id !== undefined) {
      await updateAgentMutation.mutateAsync({
        agentId: agent.id.toString(),
        data: { status: "INACTIVE" },
      });
    } else {
      toast.error(t("error"), {
        description: t("agent.delete-error"),
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
          <DialogTitle className="pb-4">
            {t("agent.agent-deactivate")}
          </DialogTitle>
          <DialogDescription className="text-text-primary-default">
            {t("agent.agent-deactivate-message-part1")}
            <br />
            <br />
            {t("agent.agent-deactivate-message-part2")}{" "}
            <strong>
              {agent.firstName} {agent.lastName}
            </strong>
            ?
            <br />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onClose()}>
            {t("cancel")}
          </Button>
          <Button
            onClick={handleStatusChange}
            variant="default"
            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            disabled={updateAgentMutation.status === "pending"}
          >
            {updateAgentMutation.status === "pending" ? (
              <span>
                {t("agent.deactivateing")}{" "}
                <Loader className="inline animate-spin" />
              </span>
            ) : (
              t("agent.deactivate")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

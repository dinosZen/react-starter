import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { deleteAgent } from "../api/agent/deleteAgent";
import { Agent } from "@/types/agent";
import { Trash2 } from "lucide-react";

interface DeleteAgentDialogProps {
  readonly agent: Agent;
}

export function DeleteAgentDialog({ agent }: DeleteAgentDialogProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const queryClient = useQueryClient();

  const deleteAgentMutation = useMutation({
    mutationFn: deleteAgent,
    onSuccess: () => {
      toast.success(t("agent.deletedSuccessfully"));
      // refetch agents
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      //close dialog
      handleDialogClose();
    },
    onError: (err: unknown) => {
      console.error("Delete error", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(t("agent.unknownError"));
      }
    },
  });

  const handleConfirmDelete = async () => {
    if (agent.id !== undefined) {
      console.log("Deleting agent with ID:", agent.id);
      await deleteAgentMutation.mutateAsync(agent.id.toString());
    } else {
      toast.error(t("agent.invalidId"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="!hover:bg-background-primary-default transition duration-300 ease-in-out"
        >
          <Trash2 className="h-7 w-10" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the agent{" "}
            <strong>{agent.firstName}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

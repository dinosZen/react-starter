import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Agent } from "@/types/agent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { deleteAgent } from "../api/agent/deleteAgent";

interface DeleteAgentDialogProps {
  readonly agent: Agent;
}

export function DeleteAgentDialog({ agent }: DeleteAgentDialogProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeletionConfirmed, setIsDeletionConfirmed] = useState(false);

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
      await deleteAgentMutation.mutateAsync(agent.id.toString());
    } else {
      toast.error(t("agent.invalidId"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="px-4 hover:bg-background-primary-default transition duration-300 ease-in-out"
              >
                <Trash2 className="h-7 w-10" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-background-primary-default text-text-primary-default">
            <p>Delete agent</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-4">Confirm delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the agent{" "}
            <strong>{agent.firstName}</strong>?
            <br />
            This action cannot be undone.
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
                toast.error("Please confirm the deletion.");
              }
            }}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-text-primary-default"
          >
            I confirm that I want to delete this agent.
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
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

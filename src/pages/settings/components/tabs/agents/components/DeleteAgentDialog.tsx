import { useTranslation } from "react-i18next";
import { deleteAgent } from "@/features/settings/api";
import { DeleteAgentDialogProps } from "@/features/settings/types";
import { DeleteConfirmationDialog } from "../../../shared/DeleteConfirmationDialog";

// export function DeleteAgentDialog({
//   agent,
//   isOpen,
//   onClose,
// }: DeleteAgentDialogProps) {
//   const { t } = useTranslation();

//   const [isDeletionConfirmed, setIsDeletionConfirmed] = useState(false);
//   const queryClient = useQueryClient();

//   const deleteAgentMutation = useMutation({
//     //how to get loading state when in progress
//     mutationFn: deleteAgent,
//     onSuccess: () => {
//       toast.success(t("success"), {
//         description: t("agent.deleted-successfully"),
//       });
//       // refetch agents
//       queryClient.invalidateQueries({ queryKey: ["agents"] });
//       //close dialog
//       onClose();
//     },
//     onError: (err: unknown) => {
//       console.error("Delete error", err);
//       if (err instanceof Error) {
//         toast.error(err.message);
//       } else {
//         toast.error(t("error"), {
//           description: t("unknown-error"),
//         });
//       }
//     },
//   });

//   const handleConfirmDelete = async () => {
//     if (agent.id !== undefined) {
//       await deleteAgentMutation.mutateAsync(agent.id.toString());
//     } else {
//       toast.error(t("error"), {
//         description: t("agent.delete-error"),
//       });
//     }
//   };

//   const handleCheckedChange = (checked: boolean | "indeterminate") => {
//     const confirmed = checked === true;
//     setIsDeletionConfirmed(confirmed);

//     if (confirmed) {
//       toast.dismiss();
//     } else {
//       toast.warning(t("warning"), {
//         description: t("agent.confirm-delete"),
//         icon: null,
//       });
//     }
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={(open) => {
//         if (!open) onClose();
//       }}
//     >
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="pb-4">{t("agent.delete-agent")}</DialogTitle>
//           <DialogDescription className="text-text-primary-default">
//             {t("agent.delete-agent-message-part1")}
//             <br />
//             {t("agent.delete-agent-message-part2")}{" "}
//             <strong>
//               {agent.firstName} {agent.lastName}
//             </strong>
//             ?
//             <br />
//           </DialogDescription>
//         </DialogHeader>
//         <div className="flex items-center space-x-2 py-4">
//           <Checkbox id="terms" onCheckedChange={handleCheckedChange} />
//           <label
//             htmlFor="terms"
//             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-text-primary-default"
//           >
//             {t("agent.delete-agent-confirmation")}
//           </label>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={() => onClose()}>
//             {t("cancel")}
//           </Button>
//           <Button
//             variant="destructive"
//             onClick={handleConfirmDelete}
//             disabled={
//               !isDeletionConfirmed || deleteAgentMutation.status === "pending"
//             }
//           >
//             {deleteAgentMutation.status === "pending" ? (
//               <span>
//                 {t("deleteing")} <Loader className="inline animate-spin" />
//               </span>
//             ) : (
//               t("delete")
//             )}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
export function DeleteAgentDialog({
  agent,
  isOpen,
  onClose,
}: DeleteAgentDialogProps) {
  const { t } = useTranslation();
  return (
    <DeleteConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      title={t("agent.delete-agent")}
      description={
        <>
          {t("agent.delete-agent-message-part1")}
          <br />
          {t("agent.delete-agent-message-part2")}{" "}
          <strong>
            {agent.firstName} {agent.lastName}
          </strong>
          ?
        </>
      }
      confirmCheckboxLabel={t("agent.delete-agent-confirmation")}
      toastWarningMessage={t("agent.confirm-delete")}
      deleteText={t("delete")}
      deletingText={t("deleting")}
      id={agent.id.toString()}
      deleteFn={deleteAgent}
      queryKey={["agents"]}
      successToast={{
        title: t("success"),
        description: t("agent.deleted-successfully"),
      }}
      errorToast={{ title: t("error"), description: t("unknown-error") }}
    />
  );
}

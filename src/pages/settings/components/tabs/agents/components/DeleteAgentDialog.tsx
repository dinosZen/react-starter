import { useTranslation } from "react-i18next";
import { deleteAgent } from "@/features/settings/api";
import { DeleteAgentDialogProps } from "@/features/settings/types";
import { DeleteConfirmationDialog } from "../../../shared/DeleteConfirmationDialog";

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

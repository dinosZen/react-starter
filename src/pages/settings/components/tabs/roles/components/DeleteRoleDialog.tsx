import { DeleteConfirmationDialog } from "../../../shared/DeleteConfirmationDialog";
import { useTranslation } from "react-i18next";
import { deleteRole } from "@/features/settings/api";
import { DeleteRoleDialogProps } from "@/features/settings/types";

export function DeleteRoleDialog({
  role,
  isOpen,
  onClose,
}: DeleteRoleDialogProps) {
  const { t } = useTranslation();
  return (
    <DeleteConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      title={t("roles.delete-role")}
      description={
        <>
          {t("roles.delete-role-message-part1")}
          <br />
          {t("roles.delete-role-message-part2")} <strong>{role.title}</strong>?
        </>
      }
      confirmCheckboxLabel={t("roles.delete-role-confirmation")}
      toastWarningMessage={t("roles.confirm-delete")}
      deleteText={t("delete")}
      deletingText={t("deleting")}
      id={role.id.toString()}
      deleteFn={deleteRole}
      queryKey={["roles", "agents"]}
      successToast={{
        title: t("success"),
        description: t("roles.deleted-successfully"),
      }}
      errorToast={{ title: t("error"), description: t("unknown-error") }}
    />
  );
}

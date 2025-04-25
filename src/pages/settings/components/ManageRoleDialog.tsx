import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePermissionsGrouped, useRoles } from "@/features/settings/hooks";
import { EditAgentDialogProps, Role } from "@/features/settings/types";
import { Check, Pencil } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function ManageRoleDialog({ agent }: Readonly<EditAgentDialogProps>) {
  const { t } = useTranslation();
  const [enabledPermissions, setEnabledPermissions] = useState<
    Record<string, boolean>
  >({});
  const [selectedGroupCode, setSelectedGroupCode] = useState<string | null>(
    null
  );
  const [selected, setSelected] = useState<Role | null>(null);
  const { roles, isLoading: isLoadingRoles } = useRoles();
  const { permissions } = usePermissionsGrouped();

  const handleToggle = (key: string) => {
    setEnabledPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  console.log("selected", selected);
  console.log("Selected agent", agent);

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="px-4 hover:bg-background-primary-default transition duration-300 ease-in-out"
              >
                <Pencil className="h-7 w-10" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-background-primary-default text-text-primary-default">
            <p>{t("settings.manageRoleDialog.editAgent")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-4xl gap-8">
        <DialogHeader className="max-w-1/2">
          <DialogTitle>{`${t("settings.manageRoleDialog.title")} ${
            agent.firstName
          } ${agent.lastName}`}</DialogTitle>
          <DialogDescription>
            {t("settings.manageRoleDialog.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4">
          <div className="flex-1 flex  flex-col h-full gap-4">
            <div className="flex justify-between">
              <span className="text-base text-text-primary-default">
                {t("settings.manageRoleDialog.predefinedRoles")}
              </span>
            </div>
            {isLoadingRoles ? (
              t("settings.manageRoleDialog.loading")
            ) : (
              <div className="flex flex-col gap-2 max-h-96 overflow-scroll">
                {roles?.map((role: Role) => (
                  <button
                    key={role.id}
                    onClick={() =>
                      setSelected(selected?.id === role.id ? null : role)
                    }
                    className={`flex items-center gap-4 px-4 py-1.5 rounded cursor-pointer select-none 
                    ${
                      selected?.id === role.id
                        ? "bg-background-secondary-focus"
                        : "bg-background-secondary-default"
                    }`}
                  >
                    {selected?.id === role.id && (
                      <Check height={24} width={24} />
                    )}
                    <Label
                      htmlFor={role.code}
                      className="leading-6 cursor-pointer"
                    >
                      {role.title}
                    </Label>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Separator orientation="vertical" />
          <div className="flex-1 flex  flex-col h-full gap-4">
            <div className="flex justify-between items-center">
              <span className="text-base text-text-primary-default">
                {" "}
                {t("settings.manageRoleDialog.show")}
              </span>
              <Select
                onValueChange={(value) =>
                  setSelectedGroupCode(value === "all" ? null : value)
                }
                defaultValue="all"
              >
                <SelectTrigger className="w-[200px] text-primary">
                  <SelectValue
                    placeholder={t(
                      "settings.manageRoleDialog.allPermissionsGroup"
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("settings.manageRoleDialog.allPermissionsGroup")}
                  </SelectItem>
                  {permissions?.map((permissionGroup) => (
                    <SelectItem
                      value={permissionGroup.code}
                      key={permissionGroup.id}
                    >
                      {permissionGroup.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col justify-evenly gap-2 max-h-96 overflow-scroll">
              <span className="text-sm text-text-secondary-default">
                {t("settings.manageRoleDialog.default")}
              </span>
              {selected?.permissions?.map((permission) => (
                <div
                  key={permission?.id}
                  className={`flex items-center justify-between bg-secondary px-4 py-1.5 rounded-md ${
                    permission?.isActive
                      ? "bg-background-secondary-hover opacity-50 cursor-not-allowed"
                      : "bg-background-secondary-default"
                  }`}
                >
                  <Label
                    htmlFor={permission?.code}
                    className={`leading-5 ${
                      permission?.isActive
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {permission?.title}
                  </Label>
                  <Switch
                    id={permission?.code}
                    checked={enabledPermissions[permission?.id] || false}
                    onCheckedChange={() => handleToggle(permission?.code)}
                    className="cursor-pointer"
                    disabled={permission?.isActive}
                  />
                </div>
              ))}
              {permissions
                ?.filter(
                  (group) =>
                    !selectedGroupCode || group.code === selectedGroupCode
                )
                .map((group) => (
                  <div
                    key={group?.code}
                    className="flex flex-col justify-evenly gap-2 max-h-96"
                  >
                    <span className="text-sm text-text-secondary-default">
                      {group?.title}
                    </span>
                    {group.permissions
                      ?.filter((permission) => permission?.title)
                      .map((permission) => (
                        <div
                          key={permission?.id}
                          className={`flex items-center justify-between bg-secondary px-4 py-1.5 rounded-md ${
                            permission?.isActive
                              ? "bg-background-secondary-hover opacity-50 cursor-not-allowed"
                              : "bg-background-secondary-default"
                          }`}
                        >
                          <Label
                            htmlFor={permission?.code}
                            className={`leading-5 ${
                              permission?.isActive
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {permission?.title}
                          </Label>
                          <Switch
                            id={permission?.code}
                            checked={
                              enabledPermissions[permission?.id] || false
                            }
                            onCheckedChange={() =>
                              handleToggle(permission?.code)
                            }
                            className="cursor-pointer"
                            disabled={permission?.isActive}
                          />
                        </div>
                      ))}
                  </div>
                ))}
              {permissions
                ?.filter(
                  (group) =>
                    !selectedGroupCode || group.code === selectedGroupCode
                )
                .flatMap((group) => group.permissions)
                .filter((permission) => permission?.title)
                .map((permission) => (
                  <div
                    key={permission?.id}
                    className={`flex items-center justify-between bg-secondary px-4 py-1.5 rounded-md ${
                      permission?.isActive
                        ? "bg-background-secondary-hover opacity-50 cursor-not-allowed"
                        : "bg-background-secondary-default"
                    }`}
                  >
                    <Label
                      htmlFor={permission?.code}
                      className={`leading-5 ${
                        permission?.isActive
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      {permission?.title}
                    </Label>
                    <Switch
                      id={permission?.code}
                      checked={enabledPermissions[permission?.id] || false}
                      onCheckedChange={() => handleToggle(permission?.code)}
                      className="cursor-pointer"
                      disabled={permission?.isActive}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end pt-4">
          <div className="w-full flex justify-between items-center">
            <Button type="button" variant="secondary">
              {t("settings.manageRoleDialog.resendTheOtp")}
            </Button>
            <div className="flex items-center gap-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  {t("settings.manageRoleDialog.cancel")}
                </Button>
              </DialogClose>
              <Button type="button" className="cursor-pointer">
                {t("settings.manageRoleDialog.save")}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

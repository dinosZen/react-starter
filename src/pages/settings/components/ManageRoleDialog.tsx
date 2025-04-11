import { MoreVertical, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const permissionsList = [
  { label: "View users", key: "view-users" },
  { label: "Manager users", key: "manage-users" },
  { label: "Assign roles", key: "assign-roles" },
  { label: "View transactions", key: "view-transactions" },
  { label: "Initiate transactions", key: "initiate-transactions" },
  { label: "Approve transactions", key: "approve-transactions" },
  { label: "View wallets", key: "view-wallets" },
  { label: "Manage wallets", key: "manage-wallets" },
  { label: "View KYC/ALM Data", key: "view-kyc-alm-data" },
];

const permissions = [
  { key: "super-admin", label: "Super Admin" },
  { key: "agent-adming", label: "Admin Agent" },
  { key: "compliance-agent", label: "Compliance Agent" },
  { key: "support-agent", label: "Support Agent" },
  { key: "read-only-agent", label: "Read-only Agent" },
  { key: "transaction-agent", label: "Transaction Agent" },
];

export function ManageRoleDialog() {
  const { t } = useTranslation();
  const [enabledPermissions, setEnabledPermissions] = useState<
    Record<string, boolean>
  >({});

  const handleToggle = (key: string) => {
    setEnabledPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <Dialog open>
      <DialogTrigger asChild>
        <span className="dark:hover:bg-input/50 flex w-full items-center justify-start gap-2 rounded-md bg-transparent px-3 py-1.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <Plus /> {t("addNew")}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl gap-8">
        <DialogHeader className="max-w-1/2">
          <DialogTitle>{t("settings.manageRoleDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("settings.manageRoleDialog.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4">
          <div className="flex-1 flex  flex-col h-full gap-4">
            <div className="flex justify-between">
              <span className="text-base">Predefined roles</span>
            </div>

            <div className="flex flex-col gap-2 max-h-96 overflow-scroll">
              {permissions.map((perm) => (
                <div
                  key={perm.key}
                  className="flex justify-between items-center bg-muted px-4 rounded-md shadow-sm"
                >
                  <span className="text-sm font-medium">{perm.label}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="flex-1 flex  flex-col h-full gap-4">
            <div className="flex justify-between">
              <Select onValueChange={(value) => console.log(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All permissions group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col justify-evenly gap-2 max-h-96 overflow-scroll">
              {permissionsList.map((permission) => (
                <div
                  key={permission.key}
                  className="flex items-center justify-between bg-secondary p-2 rounded-md"
                >
                  <Label htmlFor={permission.key}>{permission.label}</Label>
                  <Switch
                    id={permission.key}
                    checked={enabledPermissions[permission.key] || false}
                    onCheckedChange={() => handleToggle(permission.key)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end pt-4">
          <Button type="button" className="cursor-pointer">
            {t("settings.manageRoleDialog.updatePermissions")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { agentRoleOptions } from "@/lib/constants";

export function AgentDialog() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="!px-6">
          <Plus /> {t("addNew")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add new agent</DialogTitle>
          <DialogDescription>
            Invite a user by entering their email and assigning a role. They'll
            get an email to create an account and access the platform based on
            their role.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name" className="font-normal">
              {t("agent.agentName")}
            </Label>
            <Input type="text" id="name" placeholder={t("agent.enterName")} />
          </div>
          <div className="grid w-full items-center gap-2 pb-1">
            <Label htmlFor="email" className="font-normal">
              {t("agent.agentEmail")}
            </Label>
            <Input
              type="email"
              id="email"
              placeholder={t("agent.enterEmail")}
            />
          </div>
          <Select>
            <SelectTrigger className="w-full data-[placeholder]:text-foreground">
              <SelectValue placeholder={t("agent.selectRole")} />
            </SelectTrigger>
            <SelectContent>
              {agentRoleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="sm:justify-end pt-4">
          <Button type="button" className="cursor-pointer">
            {t("agent.sendInvitation")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

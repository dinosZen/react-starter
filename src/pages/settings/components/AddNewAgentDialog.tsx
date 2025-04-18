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
import { Button } from "@/components/ui/button";
import { Plus, Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import { agentRoleOptions } from "@/lib/constants";
import { createAgent } from "@/pages/settings/api/agent/createAgent";
import { useState } from "react";

export function AgentDialog() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    firstName: z.string().min(1, t("agent.requiredField")),
    lastName: z.string().min(1, t("agent.requiredField")),
    email: z
      .string()
      .min(1, t("agent.requiredField"))
      .email(t("agent.invalidEmail")),
    roleId: z.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      roleId: 13,
    },
  });

  const { handleSubmit, control, reset } = form;

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const { mutate, status } = useMutation({
    mutationFn: createAgent,
    onSuccess: () => {
      toast.success(t("agent.createdSuccessfully"));
      // reset form fields
      reset();
      // refetch agents
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      //close dialog
      handleDialogClose();
    },
    onError: (err: unknown) => {
      console.error("Form submission error", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(t("agent.unknownError"));
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="!px-6">
          <Plus /> {t("addNew")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("agent.addNewAgent")}</DialogTitle>
          <DialogDescription>
            Invite a user by entering their email and assigning a role. They'll
            get an email to create an account and access the platform based on
            their role.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-4">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("agent.enterFirstName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("agent.firstNamePlaceholder")}
                        type=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="py-3 pb-5">
                    <FormLabel>{t("agent.enterLastName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("agent.lastNamePlaceholder")}
                        type=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="pb-5">
                    <FormLabel>{t("agent.agentEmail")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("agent.placeholderEmail")}
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full data-[placeholder]:text-foreground">
                          <SelectValue placeholder={t("agent.selectRole")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {agentRoleOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value.toString()}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="sm:justify-end mt-10">
                <Button
                  type="submit"
                  className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={status === "pending"}
                >
                  {status === "pending" ? (
                    <span>
                      {t("agent.sendingInvitation")}{" "}
                      <Loader className="inline animate-spin" />
                    </span>
                  ) : (
                    t("agent.sendInvitation")
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
import { addNewAgent } from "@/pages/settings/api/agent/addNewAgent";
import { useState } from "react";
import axios from "axios";

export function AgentDialog() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    firstName: z.string().min(1, t("agent.firstNameRequiredField")),
    lastName: z.string().min(1, t("agent.lastNameRequiredField")),
    email: z
      .string()
      .min(1, t("agent.emailRequiredField"))
      .email(t("agent.invalidEmail")),
    roleId: z.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      roleId: 14,
    },
  });

  const { handleSubmit, control, reset, setError } = form;

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  //Translate error messages
  const translateServerMessage = (
    field: string,
    raw: string,
    t: (key: string) => string
  ) => {
    if (raw.includes("should not be empty")) {
      return t(`agent.${field}RequiredField`);
    }
    const map: Record<string, string> = {
      "must be an email": `agent.invalidEmail`,
    };
    for (const [pattern, key] of Object.entries(map)) {
      if (raw.includes(pattern)) {
        return t(key);
      }
    }
    // Fallback error message
    return t("agent.unknownError");
  };

  const { mutate, status } = useMutation({
    mutationFn: addNewAgent,
    onSuccess: () => {
      toast.success(t("agent.createdSuccessfully"));
      // reset form fields
      reset();
      // refetch agents
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      //close dialog
      handleDialogClose();
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const resp = error.response;
        // case the “email already exists” conflict
        if (resp?.status === 409 && resp.data?.message === "email") {
          setError("email", {
            type: "server",
            message: t("agent.emailAlreadyExists") || "Email already exists",
          });
          return;
        }
        if (Array.isArray(resp?.data?.errors)) {
          (resp.data.errors as { field: string; messages: string[] }[]).forEach(
            ({ field, messages }) => {
              const rawMsg = messages[0];
              const translated = translateServerMessage(field, rawMsg, t);
              setError(field as keyof z.infer<typeof formSchema>, {
                type: "server",
                message: translated,
              });
            }
          );
          return;
        }
      }

      // fallback
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t("agent.unknownError"));
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="!px-6 text-text-primary-inverse">
          <Plus /> {t("addNew")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-text-primary-default">
            {t("agent.addNewAgent")}
          </DialogTitle>
          <DialogDescription className="text-text-secondary-default">
            Invite a user by entering their email and assigning a role. They'll
            get an email to create an account and access the platform based on
            their role.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full pt-4 space-y-4"
            >
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
                  <FormItem className="">
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
                  <FormItem className="">
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

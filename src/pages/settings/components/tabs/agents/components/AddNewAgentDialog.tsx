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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, Plus } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";
import * as z from "zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { agentRoleOptions } from "@/constants/settings";
import { addNewAgent } from "@/features/settings/api";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function AgentDialog() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    firstName: z.string().min(1, t("agent.first-name-required-field")),
    lastName: z.string().min(1, t("agent.last-name-required-field")),
    email: z
      .string()
      .min(1, t("agent.email-required-field"))
      .email(t("agent.invalid-email")),
    roleId: z.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      roleId: undefined,
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
      "must be an email": `agent.invalid-email`,
    };
    for (const [pattern, key] of Object.entries(map)) {
      if (raw.includes(pattern)) {
        return t(key);
      }
    }
    // Fallback error message
    return t("unknown-error");
  };

  const { mutate, status } = useMutation({
    mutationFn: addNewAgent,
    onSuccess: () => {
      toast.success(t("success"), {
        description: t("agent.created-successfully"),
      });
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
            message: t("agent.email-already-exists") || "Email already exists",
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
        toast.error(t("unknown-error"));
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
            {t("agent.add-new-agent")}
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
                    <FormLabel>{t("agent.enter-first-name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("agent.first-name-placeholder")}
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
                    <FormLabel>{t("agent.enter-last-name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("agent.last-name-placeholder")}
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
                    <FormLabel>{t("agent.email-label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("agent.email-placeholder")}
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
                          <SelectValue placeholder={t("agent.select-role")} />
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
                      {t("agent.sending-invitation")}{" "}
                      <Loader className="inline animate-spin" />
                    </span>
                  ) : (
                    t("agent.send-invitation")
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

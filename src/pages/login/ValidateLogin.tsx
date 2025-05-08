import cambixBackgorund from "@/assets/images/backgrounds/cambixLogin.svg";
import cambixLogo from "@/assets/images/logos/loginLogo.svg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useValidate } from "@/features/auth/hooks";
import { twoFacotorCodeSchema } from "@/features/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export default function ValidateTwoFactor() {
  const { t } = useTranslation();
  const validate = useValidate();
  const form = useForm<z.infer<typeof twoFacotorCodeSchema>>({
    resolver: zodResolver(twoFacotorCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(data: z.infer<typeof twoFacotorCodeSchema>) {
    validate.mutate(data);
  }

  return (
    <div className="flex min-h-full justify-center bg-background-secondary-default py-20 px-10 gap-10">
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <img src={cambixLogo} alt="Cambix" />
          <span className="text-lg font-semibold text-text-primary-default">
            Cambix
          </span>
        </div>
        <div className="flex justify-center flex-col gap-10 flex-1 w-md">
          <div className="flex flex-col gap-4">
            <span className="text-3xl font-bold text-text-primary-default">
              {t("validateLogin.title")}
            </span>
            <span className="text-base text-text-primary-default">
              {t("validateLogin.description")}
            </span>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={validate.isPending}>
                {validate.isPending
                  ? t("validateLogin.button.loading")
                  : t("validateLogin.button.verify")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <img
        src={cambixBackgorund}
        alt="Cambix"
        className="object-contain max-w-full"
      />
    </div>
  );
}

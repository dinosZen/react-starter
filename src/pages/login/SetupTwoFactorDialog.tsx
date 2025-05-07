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
import { useVerify } from "@/features/auth/hooks";
import { twoFacotorCodeSchema } from "@/features/auth/schemas";
import { JwtPartialUser } from "@/features/auth/types";
import { clearCookie, getCookieValue } from "@/lib/cookies";
import { useTwoFactorStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function SetupTwoFactor() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const verify = useVerify();
  const { secret } = useTwoFactorStore();
  const userCookie = getCookieValue("partial_token");
  const user = userCookie
    ? jwtDecode<JwtPartialUser>(userCookie)
    : { email: "cambix@cambix.com" };
  const form = useForm<z.infer<typeof twoFacotorCodeSchema>>({
    resolver: zodResolver(twoFacotorCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    if (!secret) {
      clearCookie("partial_token");
      navigate("/login");
    }
  }, [secret, navigate]);

  if (!secret) return null;

  function onSubmit(data: z.infer<typeof twoFacotorCodeSchema>) {
    verify.mutate(data);
  }

  return (
    <div className="flex min-h-full justify-center bg-background-secondary-default py-20 px-10 gap-10">
      <div className="flex flex-col justify-between min-w-[450px]">
        <div className="flex items-center gap-2">
          <img src={cambixLogo} alt="Cambix" />
          <span className="text-lg font-semibold text-text-primary-default">
            Cambix
          </span>
        </div>
        <div className="flex justify-center flex-col gap-6 flex-1">
          <span className="text-3xl font-bold text-text-primary-default">
            {t("verifyLogin.title")}
          </span>
          <span className="text-base text-text-primary-default">
            1. {t("verifyLogin.descriptionStep1")}
          </span>
          <span className="text-base text-text-primary-default">
            2. {t("verifyLogin.descriptionStep2")}
          </span>
          <QRCodeSVG
            value={`otpauth://totp/cambix:${user.email}?secret=${secret}&issuer=Cambix`}
            size={185}
          />
          <span className="text-base text-text-primary-default">
            3. {t("verifyLogin.descriptionStep3")}
          </span>
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

              <Button type="submit" disabled={verify.isPending}>
                {verify.isPending
                  ? t("verifyLogin.button.loading")
                  : t("verifyLogin.button.verify")}
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

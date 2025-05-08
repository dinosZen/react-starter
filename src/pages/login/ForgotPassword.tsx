import cambixBackgorund from "@/assets/images/backgrounds/cambixLogin.svg";
import cambixLogo from "@/assets/images/logos/loginLogo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "@/features/auth/hooks";
import { forgotPasswordSchema } from "@/features/auth/schemas";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const forgotPassword = useForgotPassword();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = forgotPasswordSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.formErrors.fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
      });
      return;
    }

    setErrors({});
    forgotPassword.mutate(parsed.data);
  };

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
              {t("forgotPassword.title")}
            </span>
            <span className="text-base text-text-primary-default">
              {t("forgotPassword.description")}
            </span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-white">
                {t("login.input.email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link to="/login">
                  <ArrowLeft /> {t("forgotPassword.button.backToLogin")}
                </Link>
              </Button>
              <Button
                variant="default"
                disabled={forgotPassword.isPending}
                type="submit"
              >
                {forgotPassword.isPending
                  ? t("forgotPassword.button.loading")
                  : t("forgotPassword.button.resetMyPassword")}
              </Button>
            </div>
          </form>
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

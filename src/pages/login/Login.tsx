import cambixBackgorund from "@/assets/images/backgrounds/cambixLogin.svg";
import cambixLogo from "@/assets/images/logos/loginLogo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/features/auth/hooks";
import { loginSchema } from "@/features/auth/schemas";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const login = useLogin();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.formErrors.fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    login.mutate(parsed.data);
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
              {t("login.title")}
            </span>
            <span className="text-base text-text-primary-default">
              {t("login.description")}
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

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-white">
                {t("login.input.password")}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link to="/forgot-password">{t("login.forgotPassword")}</Link>
              </Button>
              <Button
                variant="default"
                disabled={login.isPending}
                type="submit"
              >
                {login.isPending
                  ? t("login.button.loading")
                  : t("login.button.confirm")}
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

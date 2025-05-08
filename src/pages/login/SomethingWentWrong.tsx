import cambixBackgorund from "@/assets/images/backgrounds/cambixLogin.svg";
import cambixLogo from "@/assets/images/logos/loginLogo.svg";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function SomethingWentWrongPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-full justify-center bg-background-secondary-default py-20 px-10 gap-10">
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <img src={cambixLogo} alt="Cambix" />
          <span className="text-lg font-semibold text-text-primary-default">
            Cambix
          </span>
        </div>
        <div className="flex justify-center flex-col gap-6 flex-1 w-md">
          <div className="flex flex-col gap-4">
            <span className="text-3xl font-bold text-text-primary-default">
              {t("somethingWentWrong.title")}
            </span>
            <span className="text-base text-text-primary-default">
              {t("somethingWentWrong.description")}
            </span>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">
              {t("somethingWentWrong.button.visitOurWebsite")}
            </Button>
            <Button>{t("somethingWentWrong.button.contactOurSupport")}</Button>
          </div>
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

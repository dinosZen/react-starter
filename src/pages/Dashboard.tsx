import { useTranslation } from "react-i18next";

function Dashboard() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <div>
        <h1 className="font"></h1>
        <h1 className="my-4 text-xl font-extrabold leading-none tracking-tight text-gray-900">
          Translations
        </h1>
        <p className="mb-4 text-md font-normal text-gray-500 ">
          {t("dashboard.welcome")}
        </p>
        <div className="inline-flex">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l cursor-pointer"
            onClick={() => i18n.changeLanguage("fr")}
          >
            🇫🇷 French
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r cursor-pointer"
            onClick={() => i18n.changeLanguage("en")}
          >
            🇬🇧 English
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

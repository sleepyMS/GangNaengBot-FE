import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { useSettingsStore } from "@/store";

type Language = "ko" | "en";

interface LanguageOption {
  id: Language;
  name: string;
  nativeName: string;
  flag: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { id: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
];

export const LanguageTab = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage, resolvedTheme } = useSettingsStore();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {t("settings.language.title")}
      </h3>

      <div className="space-y-3">
        {LANGUAGE_OPTIONS.map((option) => {
          const isSelected = language === option.id;
          const isDark = resolvedTheme === "dark";

          return (
            <button
              key={option.id}
              onClick={() => handleLanguageChange(option.id)}
              className={`
                w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all
                ${
                  isSelected
                    ? isDark
                      ? "border-primary-500 bg-slate-800 ring-1 ring-primary-500"
                      : "border-primary-500 bg-primary-50"
                    : isDark
                    ? "border-gray-700 bg-slate-800 hover:border-gray-600"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }
              `}
            >
              {/* 플래그 */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                {option.flag}
              </div>

              {/* 텍스트 */}
              <div className="flex-1 text-left">
                <p
                  className={`font-medium ${
                    isSelected
                      ? isDark
                        ? "text-primary-400"
                        : "text-primary-600"
                      : isDark
                      ? "text-gray-100"
                      : "text-gray-800"
                  }`}
                >
                  {option.nativeName}
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {option.name}
                </p>
              </div>

              {/* 선택 표시 */}
              {isSelected && (
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

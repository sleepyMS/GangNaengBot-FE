import { useTranslation } from "react-i18next";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useSettingsStore } from "@/store";

type Theme = "light" | "dark" | "system";

interface ThemeOption {
  id: Theme;
  labelKey: string;
  descKey: string;
  icon: React.ReactNode;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "light",
    labelKey: "settings.theme.light",
    descKey: "settings.theme.lightDesc",
    icon: <Sun size={24} />,
  },
  {
    id: "dark",
    labelKey: "settings.theme.dark",
    descKey: "settings.theme.darkDesc",
    icon: <Moon size={24} />,
  },
  {
    id: "system",
    labelKey: "settings.theme.system",
    descKey: "settings.theme.systemDesc",
    icon: <Monitor size={24} />,
  },
];

export const ThemeTab = () => {
  const { t } = useTranslation();
  const { theme, setTheme, resolvedTheme } = useSettingsStore();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {t("settings.theme.title")}
      </h3>

      <div className="space-y-3">
        {THEME_OPTIONS.map((option) => {
          const isSelected = theme === option.id;
          const isDark = resolvedTheme === "dark";

          return (
            <button
              key={option.id}
              onClick={() => setTheme(option.id)}
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
              {/* 아이콘 */}
              <div
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  ${
                    isSelected
                      ? "bg-primary-500 text-white"
                      : isDark
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gray-100 text-gray-500"
                  }
                `}
              >
                {option.icon}
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
                  {t(option.labelKey)}
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {t(option.descKey)}
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

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type SendStatus = "idle" | "sending" | "success" | "error";

export const FeedbackTab = () => {
  const { t } = useTranslation();
  const { user, profile } = useAuthStore();

  const [form, setForm] = useState({
    title: "",
    message: "",
  });
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // 사용자 정보 가져오기
  const getUserName = () => {
    if (profile?.profile_name) return profile.profile_name;
    if (user?.email) return user.email.split("@")[0];
    return "Guest";
  };

  const getUserEmail = () => {
    return user?.email || "guest@gannaengbot.com";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.message.trim()) {
      setErrorMessage(t("settings.feedback.emptyFields"));
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const templateParams = {
        user_name: getUserName(),
        user_email: getUserEmail(),
        from_time: new Date().toLocaleString(),
        title: form.title,
        message: form.message,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setForm({ title: "", message: "" });

      // 3초 후 초기화
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setErrorMessage(t("settings.feedback.sendError"));
      setStatus("error");
    }
  };

  const inputStyle = `
    w-full px-4 py-2.5 rounded-xl transition-all
    bg-gray-100/80 dark:bg-slate-800
    text-gray-800 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-primary-400/30
    border border-transparent focus:border-primary-400/50
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 타이틀 */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {t("settings.feedback.title")}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t("settings.feedback.description")}
      </p>

      {/* 성공 메시지 */}
      {status === "success" && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl text-green-600 dark:text-green-400">
          <CheckCircle size={20} />
          <span className="text-sm">{t("settings.feedback.sendSuccess")}</span>
        </div>
      )}

      {/* 에러 메시지 */}
      {status === "error" && errorMessage && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
          <AlertCircle size={20} />
          <span className="text-sm">{errorMessage}</span>
        </div>
      )}

      {/* 발신자 정보 (읽기 전용) */}
      <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("settings.feedback.from")}:{" "}
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {getUserName()}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
            ({getUserEmail()})
          </span>
        </p>
      </div>

      {/* 제목 */}
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
          {t("settings.feedback.subject")}
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder={t("settings.feedback.subjectPlaceholder")}
          className={inputStyle}
          disabled={status === "sending"}
        />
      </div>

      {/* 내용 */}
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
          {t("settings.feedback.message")}
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder={t("settings.feedback.messagePlaceholder")}
          rows={4}
          className={`${inputStyle} resize-none`}
          disabled={status === "sending"}
        />
      </div>

      {/* 전송 버튼 */}
      <button
        type="submit"
        disabled={status === "sending"}
        className={`
          w-full flex items-center justify-center gap-2 py-3 rounded-xl
          font-medium text-white transition-all
          hover:scale-[1.02] active:scale-[0.98]
          ${status === "sending" ? "opacity-60 cursor-not-allowed" : ""}
        `}
        style={{
          background:
            "radial-gradient(63.37% 63.37% at 50% 50%, #4E92FF 0%, rgba(78, 146, 255, 0.5) 100%)",
          boxShadow:
            status === "sending"
              ? "0px 0px 24px 0px rgba(105, 162, 255, 0.3)"
              : "0px 0px 40px 0px rgba(105, 162, 255, 0.24)",
        }}
      >
        <Send size={18} />
        {status === "sending"
          ? t("settings.feedback.sending")
          : t("settings.feedback.send")}
      </button>
    </form>
  );
};

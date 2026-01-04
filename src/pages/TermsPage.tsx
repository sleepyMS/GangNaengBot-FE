import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

export const TermsPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {t("common.terms")}
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 md:p-8 space-y-8">
          {/* 서비스 개요 안내 */}
          <section className="bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              {t("terms.content.overview")}
            </p>
          </section>

          {/* 제1조: 목적 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.purpose")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("terms.content.purpose")}
            </p>
          </section>

          {/* 제2조: 용어의 정의 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.definition")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("terms.content.definition.intro")}</p>
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.definition.items", {
                    returnObjects: true,
                  }) as any[]
                ).map((item, i) => (
                  <li key={i}>
                    <strong>"{item.term}"</strong>
                    {item.separator || (i18n.language === "ko" ? "" : " ")}
                    {item.desc}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제3조: 약관의 효력 및 변경 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.efficacy")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.efficacy.items", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제4조: 서비스 이용계약의 체결 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.contract")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.contract.items", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                <li>
                  {t("terms.content.contract.restriction.intro")}
                  <ul className="mt-2 ml-6 space-y-1 list-disc">
                    {(
                      t("terms.content.contract.restriction.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </section>

          {/* 제5조: 계정 관리 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.account")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.account.items", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제6조: 서비스의 제공 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.service")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("terms.content.service.intro")}</p>
              <ul className="space-y-2 ml-6 list-disc">
                {(
                  t("terms.content.service.items", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">
                {t("terms.content.service.interruption.intro")}
              </p>
              <ul className="space-y-1 ml-6 list-disc">
                {(
                  t("terms.content.service.interruption.items", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제7조: AI 서비스의 특성 및 한계 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.aiLimit")}
            </h2>
            <div className="bg-yellow-50/70 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800 mb-4">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                {t("terms.content.aiLimit.warning")}
              </p>
            </div>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.aiLimit.items", {
                    returnObjects: true,
                  }) as any[]
                ).map((item, i) => (
                  <li key={i}>
                    <strong>{item.title}</strong> {item.content}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제8조: 이용자의 의무 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.duty")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("terms.content.duty.intro")}</p>
              <ul className="space-y-2 ml-6 list-decimal">
                {(
                  t("terms.content.duty.items", {
                    returnObjects: true,
                  }) as any[]
                ).map((item, i) => (
                  <li key={i}>{item.text || item}</li>
                ))}
                <li>
                  {t("terms.content.duty.contentRestriction.intro")}
                  <ul className="mt-2 ml-4 space-y-1 list-disc">
                    {(
                      t("terms.content.duty.contentRestriction.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </li>
                {(
                  t("terms.content.duty.extraItems", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제9조: 지적재산권 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.copyright")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.copyright.items", {
                    returnObjects: true,
                  }) as any[]
                ).map((item, i) => (
                  <li key={i}>
                    <strong>{item.title}</strong> {item.content}
                  </li>
                ))}
                <li>{t("terms.content.copyright.usageNotice")}</li>
              </ul>
            </div>
          </section>

          {/* 제10조: 서비스 이용 제한 및 계정 정지 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.restriction")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.restriction.items", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                <li>
                  {t("terms.content.restriction.procedural.intro")}
                  <ul className="mt-2 ml-6 space-y-1 list-disc">
                    {(
                      t("terms.content.restriction.procedural.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </li>
                <li>{t("terms.content.restriction.dataNotice")}</li>
                <li>{t("terms.content.restriction.appealNotice")}</li>
              </ul>
            </div>
          </section>

          {/* 제11조: 서비스의 변경 및 중단 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.change")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.change.items", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제12조: 면책조항 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.exemption")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.exemption.items", {
                    returnObjects: true,
                  }) as any[]
                ).map((item, i) => (
                  <li key={i}>
                    {typeof item === "string" ? (
                      item
                    ) : (
                      <>
                        <strong>{item.title}</strong> {item.content}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제13조: 손해배상 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.damages")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.damages.items", {
                    returnObjects: true,
                  }) as any[]
                ).map((item, i) => (
                  <li key={i}>
                    {typeof item === "string" ? (
                      item
                    ) : (
                      <>
                        <strong>{item.title}</strong> {item.content}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제14조: 개인정보 보호 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.privacy")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.privacy.items", {
                    returnObjects: true,
                  }) as any[]
                ).map((item, i) => (
                  <li key={i}>
                    {typeof item === "string" ? (
                      item
                    ) : (
                      <>
                        {item.text1}
                        <Link
                          to="/privacy"
                          className="text-blue-600 font-medium underline hover:text-blue-800 mx-1"
                        >
                          {item.link}
                        </Link>
                        {item.text2}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제15조: 분쟁 해결 및 준거법 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.dispute")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                {(
                  t("terms.content.dispute.items", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제16조: 연락처 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.articles.contact")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("terms.content.contact.intro")}</p>
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 mt-3 space-y-2">
                <p>
                  <strong>
                    {t("terms.content.contact.details.service.label")}
                  </strong>{" "}
                  {t("terms.content.contact.details.service.value")}
                </p>
                <p>
                  <strong>
                    {t("terms.content.contact.details.person.label")}
                  </strong>{" "}
                  {t("terms.content.contact.details.person.value")}
                </p>
                <p>
                  <strong>
                    {t("terms.content.contact.details.email.label")}
                  </strong>{" "}
                  {t("terms.content.contact.details.email.value")}
                </p>
                <p>
                  <strong>
                    {t("terms.content.contact.details.hours.label")}
                  </strong>{" "}
                  {t("terms.content.contact.details.hours.value")}
                </p>
              </div>
            </div>
          </section>

          {/* 부칙 */}
          <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("terms.addendum")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-2">
              <p>
                <strong>{t("terms.content.addendum.article1.title")}</strong>
              </p>
              <p>{t("terms.content.addendum.article1.content")}</p>

              <p className="mt-4">
                <strong>{t("terms.content.addendum.article2.title")}</strong>
              </p>
              <p>{t("terms.content.addendum.article2.content")}</p>
            </div>
          </section>

          {/* 개정이력 */}
          <section className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t("terms.history")}
            </h3>
            <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-1">
              {(
                t("terms.content.history", {
                  returnObjects: true,
                }) as string[]
              ).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </section>

          {/* 최종 업데이트 */}
          <section className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-gray-400 dark:text-gray-500 text-xs text-center">
              {t("terms.lastUpdate")}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

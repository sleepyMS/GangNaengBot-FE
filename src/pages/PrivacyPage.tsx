import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const PrivacyPage = () => {
  const { t } = useTranslation();
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
            {t("privacy.title")}
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 md:p-8 space-y-8">
          {/* 개인정보처리방침 개요 */}
          <section className="bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              <strong>{t("privacy.content.serviceName")}</strong>
              {t("privacy.content.overview").replace(
                t("privacy.content.serviceName"),
                ""
              )}
            </p>
          </section>

          {/* 제1조: 개인정보 처리 목적 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.purpose")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.purpose.intro")}</p>
              <div className="space-y-4 mt-4">
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {t("privacy.content.purpose.service.title")}
                  </h3>
                  <ul className="space-y-1 list-disc list-inside ml-2 text-sm">
                    {(
                      t("privacy.content.purpose.service.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {t("privacy.content.purpose.member.title")}
                  </h3>
                  <ul className="space-y-1 list-disc list-inside ml-2 text-sm">
                    {(
                      t("privacy.content.purpose.member.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {t("privacy.content.purpose.improvement.title")}
                  </h3>
                  <ul className="space-y-1 list-disc list-inside ml-2 text-sm">
                    {(
                      t("privacy.content.purpose.improvement.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제2조: 수집하는 개인정보 항목 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.items")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-slate-700">
                      <th className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                        {t("privacy.content.items.table.category")}
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                        {t("privacy.content.items.table.collected")}
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                        {t("privacy.content.items.table.required")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 font-medium">
                        {t("privacy.content.items.rows.signup.category")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.items.rows.signup.items")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.items.rows.signup.type")}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-slate-700/50">
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 font-medium">
                        {t("privacy.content.items.rows.profile.category")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.items.rows.profile.items")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.items.rows.profile.type")}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 font-medium">
                        {t("privacy.content.items.rows.usage.category")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.items.rows.usage.items")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.items.rows.usage.type")}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-slate-700/50">
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 font-medium">
                        {t("privacy.content.items.rows.auto.category")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.items.rows.auto.items")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.items.rows.auto.type")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-yellow-50/70 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800 mt-4">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <strong className="text-yellow-800 dark:text-yellow-200">
                    {t("privacy.content.items.warningLabel")}
                  </strong>{" "}
                  {t("privacy.content.items.warning")}
                </p>
              </div>
            </div>
          </section>

          {/* 제3조: 개인정보 수집 방법 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.method")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.method.intro")}</p>
              <ul className="space-y-2 list-decimal list-inside ml-2">
                <li>
                  <strong>{t("privacy.content.method.signup")}</strong>{" "}
                  {t("privacy.content.method.signupDesc")}
                </li>
                <li>
                  <strong>{t("privacy.content.method.profile")}</strong>{" "}
                  {t("privacy.content.method.profileDesc")}
                </li>
                <li>
                  <strong>{t("privacy.content.method.usage")}</strong>{" "}
                  {t("privacy.content.method.usageDesc")}
                </li>
                <li>
                  <strong>{t("privacy.content.method.auto")}</strong>{" "}
                  {t("privacy.content.method.autoDesc")}
                </li>
              </ul>
            </div>
          </section>

          {/* 제4조: 개인정보의 보유 및 이용 기간 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.period")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.period.intro")}</p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-slate-700">
                      <th className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                        {t("privacy.content.period.table.item")}
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                        {t("privacy.content.period.table.period")}
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                        {t("privacy.content.period.table.reason")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.account.item")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.account.period")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.account.reason")}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-slate-700/50">
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.chat.item")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.chat.period")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.chat.reason")}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.log.item")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.log.period")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.log.reason")}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-slate-700/50">
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.guest.item")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.guest.period")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.period.rows.guest.reason")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 제5조: 개인정보의 파기 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.destruction")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.destruction.intro")}</p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {t("privacy.content.destruction.procedure.title")}
                  </h3>
                  <p className="text-sm ml-2">
                    {t("privacy.content.destruction.procedure.content")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {t("privacy.content.destruction.method.title")}
                  </h3>
                  <ul className="space-y-1 list-disc list-inside ml-2 text-sm">
                    <li>
                      <strong>
                        {t("privacy.content.destruction.method.electronic")}
                      </strong>{" "}
                      {t("privacy.content.destruction.method.electronicDesc")}
                    </li>
                    <li>
                      <strong>
                        {t("privacy.content.destruction.method.paper")}
                      </strong>{" "}
                      {t("privacy.content.destruction.method.paperDesc")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제6조: 개인정보의 제3자 제공 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.thirdParty")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.thirdParty.intro")}</p>
              <p>{t("privacy.content.thirdParty.exception")}</p>
              <ul className="space-y-2 list-decimal list-inside ml-2">
                {(
                  t("privacy.content.thirdParty.exceptions", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* 제7조: 개인정보 처리의 위탁 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.consignment")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.consignment.intro")}</p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-slate-700">
                      <th className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                        {t("privacy.content.consignment.table.recipient")}
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                        {t("privacy.content.consignment.table.task")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.consignment.rows.google.recipient")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.consignment.rows.google.task")}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-slate-700/50">
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.consignment.rows.gcp.recipient")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.consignment.rows.gcp.task")}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.consignment.rows.ai.recipient")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.consignment.rows.ai.task")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-3">
                {t("privacy.content.consignment.notice")}
              </p>
            </div>
          </section>

          {/* 제8조: AI 학습 데이터 처리 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.ai")}
            </h2>
            <div className="bg-purple-50/50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800 mb-4">
              <p className="text-purple-800 dark:text-purple-200 text-sm font-medium">
                {t("privacy.content.ai.badge")}
              </p>
            </div>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-3 list-decimal list-inside ml-2">
                <li>
                  <strong>
                    {t("privacy.content.ai.items.training.title")}
                  </strong>{" "}
                  {t("privacy.content.ai.items.training.content")}
                </li>
                <li>
                  <strong>
                    {t("privacy.content.ai.items.anonymization.title")}
                  </strong>{" "}
                  {t("privacy.content.ai.items.anonymization.content")}
                </li>
                <li>
                  <strong>
                    {t("privacy.content.ai.items.response.title")}
                  </strong>{" "}
                  {t("privacy.content.ai.items.response.content")}
                </li>
                <li>
                  <strong>{t("privacy.content.ai.items.optout.title")}</strong>{" "}
                  {t("privacy.content.ai.items.optout.content")}
                </li>
              </ul>
            </div>
          </section>

          {/* 제9조: 정보주체의 권리 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.rights")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.rights.intro")}</p>
              <ul className="space-y-2 list-decimal list-inside ml-2">
                <li>
                  <strong>
                    {t("privacy.content.rights.items.access.title")}
                  </strong>{" "}
                  {t("privacy.content.rights.items.access.content")}
                </li>
                <li>
                  <strong>
                    {t("privacy.content.rights.items.correction.title")}
                  </strong>{" "}
                  {t("privacy.content.rights.items.correction.content")}
                </li>
                <li>
                  <strong>
                    {t("privacy.content.rights.items.suspension.title")}
                  </strong>{" "}
                  {t("privacy.content.rights.items.suspension.content")}
                </li>
                <li>
                  <strong>
                    {t("privacy.content.rights.items.withdrawal.title")}
                  </strong>{" "}
                  {t("privacy.content.rights.items.withdrawal.content")}
                </li>
                <li>
                  <strong>
                    {t("privacy.content.rights.items.deletion.title")}
                  </strong>{" "}
                  {t("privacy.content.rights.items.deletion.content")}
                </li>
              </ul>
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 mt-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  {t("privacy.content.rights.howTo.title")}
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    •{" "}
                    <strong>
                      {t("privacy.content.rights.howTo.profile.title")}
                    </strong>{" "}
                    {t("privacy.content.rights.howTo.profile.content")}
                  </li>
                  <li>
                    •{" "}
                    <strong>
                      {t("privacy.content.rights.howTo.chat.title")}
                    </strong>{" "}
                    {t("privacy.content.rights.howTo.chat.content")}
                  </li>
                  <li>
                    •{" "}
                    <strong>
                      {t("privacy.content.rights.howTo.withdrawal.title")}
                    </strong>{" "}
                    {t("privacy.content.rights.howTo.withdrawal.content")}
                  </li>
                  <li>
                    •{" "}
                    <strong>
                      {t("privacy.content.rights.howTo.other.title")}
                    </strong>{" "}
                    {t("privacy.content.rights.howTo.other.content")}
                  </li>
                </ul>
              </div>
              <p className="text-sm mt-3">
                {t("privacy.content.rights.notice")}
              </p>
            </div>
          </section>

          {/* 제10조: 자동화된 결정에 대한 권리 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.automated")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.automated.intro")}</p>
              <ul className="space-y-2 list-decimal list-inside ml-2">
                <li>
                  <strong>
                    {t("privacy.content.automated.items.explanation.title")}
                  </strong>{" "}
                  {t("privacy.content.automated.items.explanation.content")}
                </li>
                <li>
                  <strong>
                    {t("privacy.content.automated.items.objection.title")}
                  </strong>{" "}
                  {t("privacy.content.automated.items.objection.content")}
                </li>
              </ul>
              <p className="text-sm mt-3">
                {t("privacy.content.automated.notice")}
              </p>
            </div>
          </section>

          {/* 제11조: 만 14세 미만 아동 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.children")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.children.paragraph1")}</p>
              <p>{t("privacy.content.children.paragraph2")}</p>
            </div>
          </section>

          {/* 제12조: 로컬 저장소 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.cookies")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.cookies.intro")}</p>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mt-3">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {t("privacy.content.cookies.itemsTitle")}
                </h3>
                <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                  <li>
                    <strong>
                      • {t("privacy.content.cookies.items.token.title")}
                    </strong>
                    <p className="ml-4 text-blue-600 dark:text-blue-400 text-xs mt-1">
                      {t("privacy.content.cookies.items.token.desc")}
                    </p>
                  </li>
                  <li>
                    <strong>
                      • {t("privacy.content.cookies.items.auth.title")}
                    </strong>
                    <p className="ml-4 text-blue-600 dark:text-blue-400 text-xs mt-1">
                      {t("privacy.content.cookies.items.auth.desc")}
                    </p>
                  </li>
                  <li>
                    <strong>
                      • {t("privacy.content.cookies.items.settings.title")}
                    </strong>
                    <p className="ml-4 text-blue-600 dark:text-blue-400 text-xs mt-1">
                      {t("privacy.content.cookies.items.settings.desc")}
                    </p>
                  </li>
                  <li>
                    <strong>
                      • {t("privacy.content.cookies.items.i18n.title")}
                    </strong>
                    <p className="ml-4 text-blue-600 dark:text-blue-400 text-xs mt-1">
                      {t("privacy.content.cookies.items.i18n.desc")}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t("privacy.content.cookies.deleteTitle")}
                </h3>
                <p className="text-sm">
                  {t("privacy.content.cookies.deleteIntro")}
                </p>
                <ul className="space-y-1 text-sm mt-2 ml-2">
                  <li>• {t("privacy.content.cookies.deleteSteps.chrome")}</li>
                  <li>• {t("privacy.content.cookies.deleteSteps.safari")}</li>
                  <li>• {t("privacy.content.cookies.deleteSteps.firefox")}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 제13조: 안전성 확보 조치 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.safety")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.safety.intro")}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {t("privacy.content.safety.technical.title")}
                  </h3>
                  <ul className="space-y-1 list-disc list-inside text-sm">
                    {(
                      t("privacy.content.safety.technical.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {t("privacy.content.safety.administrative.title")}
                  </h3>
                  <ul className="space-y-1 list-disc list-inside text-sm">
                    {(
                      t("privacy.content.safety.administrative.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제14조: 개인정보 보호책임자 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.officer")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.officer.intro")}</p>
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 mt-3">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  {t("privacy.content.officer.title")}
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>{t("privacy.content.officer.serviceName")}</strong>{" "}
                    {t("privacy.content.officer.serviceValue")}
                  </p>
                  <p>
                    <strong>{t("privacy.content.officer.person")}</strong>{" "}
                    {t("privacy.content.officer.personValue")}
                  </p>
                  <p>
                    <strong>{t("privacy.content.officer.email")}</strong>{" "}
                    {t("privacy.content.officer.emailValue")}
                  </p>
                  <p>
                    <strong>{t("privacy.content.officer.hours")}</strong>{" "}
                    {t("privacy.content.officer.hoursValue")}
                  </p>
                </div>
              </div>
              <p className="text-sm mt-3">
                {t("privacy.content.officer.notice")}
              </p>
            </div>
          </section>

          {/* 제15조: 권익침해 구제방법 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.remedy")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <p>{t("privacy.content.remedy.intro")}</p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-slate-700">
                      <th className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                        {t("privacy.content.remedy.table.organization")}
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                        {t("privacy.content.remedy.table.contact")}
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-left font-semibold">
                        {t("privacy.content.remedy.table.website")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.kopico.org")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.kopico.contact")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.kopico.website")}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-slate-700/50">
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.kisa.org")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.kisa.contact")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.kisa.website")}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.spo.org")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.spo.contact")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.spo.website")}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-slate-700/50">
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.police.org")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.police.contact")}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                        {t("privacy.content.remedy.rows.police.website")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 제16조: 개인정보 처리방침 변경 */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.articles.amendment")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
              <ul className="space-y-2 list-decimal list-inside ml-2">
                {(
                  t("privacy.content.amendment.items", {
                    returnObjects: true,
                  }) as string[]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* 부칙 */}
          <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {t("privacy.addendum")}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-2">
              <p>
                <strong>{t("privacy.content.addendumContent.article1")}</strong>
              </p>
              <p>{t("privacy.content.addendumContent.effectiveDate")}</p>
            </div>
          </section>

          {/* 개정이력 */}
          <section className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t("privacy.history")}
            </h3>
            <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-1">
              {(
                t("privacy.content.historyItems", {
                  returnObjects: true,
                }) as string[]
              ).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </section>

          {/* 관련 문서 */}
          <section className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t("privacy.content.relatedDocs.title")}
            </h3>
            <div className="flex gap-3">
              <Link
                to="/terms"
                className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
              >
                {t("privacy.content.relatedDocs.terms")}
              </Link>
            </div>
          </section>

          {/* 최종 업데이트 */}
          <section className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-gray-400 text-xs text-center">
              {t("privacy.content.lastUpdate")}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

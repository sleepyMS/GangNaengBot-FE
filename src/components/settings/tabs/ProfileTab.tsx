import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore, useToastStore } from "@/store";
import { ChevronDown } from "lucide-react";
import { CustomDropdown } from "@/components/common";
import { UNIVERSITY_TRANS_KEYS } from "@/constants/universityTranslation";
import { COLLEGES, DEPARTMENTS, MAJORS } from "@/constants/universityData";

interface ProfileTabProps {
  isMobile?: boolean;
}

export const ProfileTab = ({ isMobile = false }: ProfileTabProps) => {
  const { t } = useTranslation();
  const { profile, updateProfile, isLoading, error, clearError } =
    useAuthStore();
  const { addToast } = useToastStore();

  // 입력 필드 ref (포커스 이동용)
  const nameInputRef = useRef<HTMLInputElement>(null);
  const studentIdInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    profile_name: "",
    student_id: "",
    college: "",
    department: "",
    major: "",
    current_grade: 1,
    current_semester: 1,
  });

  useEffect(() => {
    if (profile) {
      setForm({
        profile_name: profile.profile_name || "",
        student_id: profile.student_id || "",
        college: profile.college || "",
        department: profile.department || "",
        major: profile.major || "",
        current_grade: profile.current_grade || 1,
        current_semester: profile.current_semester || 1,
      });
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      let newValue: string | number = value;

      if (name === "student_id") {
        newValue = value.replace(/[^a-zA-Z0-9]/g, "");
      } else if (name === "current_grade" || name === "current_semester") {
        newValue = Number(value);
      }

      const updated = {
        ...prev,
        [name]: newValue,
      };
      if (name === "college") {
        updated.department = "";
        updated.major = "";
      }
      if (name === "department") {
        updated.major = "";
      }
      return updated;
    });
  };

  // 첫 번째 비어있는 필드 찾기 및 포커스
  const validateAndFocus = (): boolean => {
    if (!form.profile_name.trim()) {
      nameInputRef.current?.focus();
      addToast("error", t("settings.profile.validation.nameRequired"));
      return false;
    }
    if (!form.student_id.trim()) {
      studentIdInputRef.current?.focus();
      addToast("error", t("settings.profile.validation.studentIdRequired"));
      return false;
    }
    if (!form.college) {
      addToast("error", t("settings.profile.validation.collegeRequired"));
      return false;
    }
    if (!form.department) {
      addToast("error", t("settings.profile.validation.departmentRequired"));
      return false;
    }
    if (!form.major) {
      addToast("error", t("settings.profile.validation.majorRequired"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    // 유효성 검사
    if (!validateAndFocus()) {
      return;
    }

    try {
      await updateProfile(form);
      addToast("success", t("settings.profile.saveSuccess"));
    } catch {
      // 에러는 store에서 처리됨
    }
  };

  const departmentList = form.college ? DEPARTMENTS[form.college] || [] : [];
  const majorList = form.department ? MAJORS[form.department] || [] : [];

  // Helper to map string options to objects with translated labels
  const getTranslatedOptions = (items: string[]) => {
    return items.map((item) => {
      const transKey = UNIVERSITY_TRANS_KEYS[item];
      return {
        label: transKey ? t(transKey) : item,
        value: item,
      };
    });
  };

  const collegeOptions = getTranslatedOptions(COLLEGES);
  const departmentOptions = getTranslatedOptions(departmentList);
  const majorOptions = getTranslatedOptions(majorList);

  const inputStyle =
    "flex-1 min-w-0 px-4 py-3 bg-gray-100/80 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400/30 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all";

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* 타이틀 */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {t("settings.profile.title")}
        </h3>

        <div className="max-w-sm space-y-5">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* 이름 (필수) */}
          <div className="flex items-center gap-4">
            <label className="w-20 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
              {t("settings.profile.name")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              ref={nameInputRef}
              type="text"
              name="profile_name"
              value={form.profile_name}
              onChange={handleChange}
              placeholder={t("settings.profile.namePlaceholder")}
              className={inputStyle}
            />
          </div>

          {/* 학번 (필수) */}
          <div className="flex items-center gap-4">
            <label className="w-20 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
              {t("settings.profile.studentId")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              ref={studentIdInputRef}
              type="text"
              name="student_id"
              value={form.student_id}
              onChange={handleChange}
              placeholder="C049529"
              className={inputStyle}
            />
          </div>

          {/* 단과대학 (필수) */}
          <CustomDropdown
            label={
              <>
                {t("settings.profile.college")}{" "}
                <span className="text-red-500">*</span>
              </>
            }
            options={collegeOptions}
            value={form.college}
            onChange={(value) => {
              setForm((prev) => ({
                ...prev,
                college: value,
                department: "",
                major: "",
              }));
            }}
            placeholder={t("settings.profile.select")}
          />

          {/* 학부 (필수) */}
          <CustomDropdown
            label={
              <>
                {t("settings.profile.department")}{" "}
                <span className="text-red-500">*</span>
              </>
            }
            options={departmentOptions}
            value={form.department}
            onChange={(value) => {
              setForm((prev) => ({
                ...prev,
                department: value,
                major: "",
              }));
            }}
            placeholder={t("settings.profile.select")}
            disabled={!form.college}
          />

          {/* 전공 (필수) */}
          <CustomDropdown
            label={
              <>
                {t("settings.profile.major")}{" "}
                <span className="text-red-500">*</span>
              </>
            }
            options={majorOptions}
            value={form.major}
            onChange={(value) => {
              setForm((prev) => ({
                ...prev,
                major: value,
              }));
            }}
            placeholder={t("settings.profile.select")}
            disabled={!form.department}
          />

          {/* 현재학기 */}
          <div className="flex items-center gap-6">
            <label className="w-16 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
              {t("settings.profile.currentSemester")}
            </label>
            <div className="flex items-center gap-3 flex-1">
              <div className="relative z-10">
                <select
                  name="current_grade"
                  value={form.current_grade}
                  onChange={handleChange}
                  className="px-4 py-2 bg-gray-100/80 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400/30 text-gray-800 dark:text-gray-100 appearance-none cursor-pointer pr-8 transition-all"
                >
                  {[1, 2, 3, 4, 5].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t("settings.profile.grade")}
              </span>
              <div className="relative z-10">
                <select
                  name="current_semester"
                  value={form.current_semester}
                  onChange={handleChange}
                  className="px-4 py-2 bg-gray-100/80 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400/30 text-gray-800 dark:text-gray-100 appearance-none cursor-pointer pr-8 transition-all"
                >
                  {[1, 2].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t("settings.profile.semester")}
              </span>
            </div>
          </div>

          {/* 저장 버튼 - 데스크톱에서만 여기에 표시 */}
          {!isMobile && (
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  px-8 py-3 text-white font-medium rounded-full shadow-lg transition-all
                  hover:scale-105 active:scale-95
                  ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
                `}
                style={{
                  background:
                    "radial-gradient(63.37% 63.37% at 50% 50%, #4E92FF 0%, rgba(78, 146, 255, 0.5) 100%)",
                  boxShadow: isLoading
                    ? "0px 0px 24px 0px rgba(105, 162, 255, 0.3)"
                    : "0px 0px 40px 0px rgba(105, 162, 255, 0.24)",
                }}
              >
                {isLoading ? t("settings.profile.saving") : t("common.save")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 모바일에서 저장 버튼 하단 고정 */}
      {isMobile && (
        <div className="sticky bottom-0 left-0 right-0 z-0 pt-4 pb-2 bg-gradient-to-t from-white via-white to-transparent dark:from-slate-900 dark:via-slate-900">
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full px-8 py-3 text-white font-medium rounded-full shadow-lg transition-all
              hover:scale-105 active:scale-95
              ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
            `}
            style={{
              background:
                "radial-gradient(63.37% 63.37% at 50% 50%, #4E92FF 0%, rgba(78, 146, 255, 0.5) 100%)",
              boxShadow: isLoading
                ? "0px 0px 24px 0px rgba(105, 162, 255, 0.3)"
                : "0px 0px 40px 0px rgba(105, 162, 255, 0.24)",
            }}
          >
            {isLoading ? t("settings.profile.saving") : t("common.save")}
          </button>
        </div>
      )}
    </form>
  );
};

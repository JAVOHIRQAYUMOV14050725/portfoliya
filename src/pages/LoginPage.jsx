import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "../utils/axios";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const { t } = useTranslation();
  const loginSuccess = t("login.success");
  const loginError = t("login.error"); 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/auth/login", data, {
        withCredentials: true,
      });

      toast.success(loginSuccess, {
        icon: "🚀",
        duration: 3000,
      });

      setTimeout(() => {
        window.location.href = "/admin/projects";
      }, 1000); // 1 sekund kutib, yo'naltirish
    } catch (err) {
      toast.error(loginError);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-800 dark:text-white">
        🔐 {t("login.title")}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md dark:shadow-lg"
      >
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("login.email")}
          </label>
          <input
            type="email"
            {...register("email", { required: "login.errors.email" })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.email.message)}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("login.password")}
          </label>
          <input
            type="password"
            {...register("password", { required: "login.errors.password" })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.password.message)}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t("login.loading") : t("login.submit")}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

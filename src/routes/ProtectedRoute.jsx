import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";
import { useTranslation } from "react-i18next";

axios.defaults.withCredentials = true;

// ✅ Backenddan foydalanuvchi ma'lumotini olish
const fetchMe = async () => {
  const response = await axios.get("/auth/me");
  return response.data;
};

const ProtectedRoute = ({ children }) => {
  const { t } = useTranslation();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-lg text-gray-700 dark:text-gray-300">
        {t("protected.checking")}
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import {
  useContactInfoQuery,
  useUpdateContactInfo,
  useCreateContactInfo,
  useDeleteContactInfo
} from "../../api/contactInfoApi";

const schema = yup.object().shape({
  phone: yup
    .string()
    .transform((value) => value.replace(/\s+/g, ""))
    .required("admin.contact.errors.phone"),

  email: yup
    .string()
    .transform((value) => value.trim().toLowerCase())
    .email("admin.contact.errors.invalidEmail")
    .required("admin.contact.errors.email"),
  location: yup
    .string()
    .transform((value) => value.trim())
    .required("admin.contact.errors.location"),

  github: yup
    .string()
    .transform((value, originalValue) => {
      if (!originalValue?.startsWith("http")) {
        return `https://github.com/${originalValue.replace(/^@/, "")}`;
      }
      return originalValue;
    })
    .url("admin.contact.errors.githubUrl")
    .required("admin.contact.errors.github"),

  telegram: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue?.startsWith("@")) {
        return `https://t.me/${originalValue.slice(1)}`;
      }
      if (!originalValue?.startsWith("http")) {
        return `https://t.me/${originalValue}`;
      }
      return originalValue;
    })
    .url("admin.contact.errors.telegramUrl")
    .required("admin.contact.errors.telegram"),

  linkedin: yup
    .string()
    .transform((value, originalValue) => {
      if (!originalValue?.startsWith("http")) {
        return `https://linkedin.com/in/${originalValue.replace(/^@/, "")}`;
      }
      return originalValue;
    })
    .url("admin.contact.errors.linkedinUrl")
    .required("admin.contact.errors.linkedin"),
});

  
const AdminContactInfo = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useContactInfoQuery();
  const updateMutation = useUpdateContactInfo();
  const createMutation = useCreateContactInfo();
  const deleteMutation = useDeleteContactInfo();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data?.id) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = (values) => {
    if (!data?.id || isNaN(data.id)) {
      toast.error(t("admin.contact.toast.noValid"));
      return;
    }

    updateMutation.mutate(
      { id: data.id, ...values },
      {
        onSuccess: () => toast.success(t("admin.contact.toast.updated")),
        onError: () => toast.error(t("admin.contact.toast.updateError")),
      }
    );
  };

  const handleCreate = () => {
    createMutation.mutate(
      {
        phone: "",
        email: "",
        location: "",
        github: "",
        telegram: "",
        linkedin: "",
      },
      {
        onSuccess: () => toast.success(t("admin.contact.toast.created")),
        onError: () => toast.error(t("admin.contact.toast.createError")),
      }
    );
  };

  if (isLoading)
    return (
      <p className="text-center mt-10 text-slate-400">
        {t("admin.contact.loading")}
      </p>
    );

  if (!data?.id) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-400 mb-4">{t("admin.contact.notFound")}</p>
        <button
          onClick={handleCreate}
          className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700"
        >
          {t("admin.contact.add")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
        {t("admin.contact.title")}
      </h2>

      {["phone", "email", "location", "github", "telegram", "linkedin"].map(
        (name) => {
          const placeholders = {
            phone: t("admin.contact.placeholders.phone"),
            email: t("admin.contact.placeholders.email"),
            location: t("admin.contact.placeholders.location"),
            github: t("admin.contact.placeholders.github"),
            telegram: t("admin.contact.placeholders.telegram"),
            linkedin: t("admin.contact.placeholders.linkedin"),
          };

          const types = {
            phone: "tel",
            email: "email",
            location: "text",
            github: "text",
            telegram: "text",
            linkedin: "text",
          };

          return (
            <div key={name}>
              <label className="block mb-1 capitalize text-slate-700 dark:text-slate-300">
                {t(`contactPage.${name}`)}
              </label>
              <input
                type={types[name]}
                placeholder={placeholders[name]}
                {...register(name)}
                onBlur={(e) => {
                  const value = e.target.value;

                  // Telegram
                  if (name === "telegram" && value.startsWith("@")) {
                    const transformed = `https://t.me/${value.slice(1)}`;
                    e.target.value = transformed;
                    reset({ ...getValues(), telegram: transformed });
                  }

                  // GitHub
                  if (name === "github" && !value.startsWith("http")) {
                    const transformed = `https://github.com/${value.replace(/^@/, "")}`;
                    e.target.value = transformed;
                    reset({ ...getValues(), github: transformed });
                  }

                  // LinkedIn
                  if (name === "linkedin" && !value.startsWith("http")) {
                    const transformed = `https://linkedin.com/in/${value.replace(/^@/, "")}`;
                    e.target.value = transformed;
                    reset({ ...getValues(), linkedin: transformed });
                  }
                }}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                  {t(errors[name]?.message)}
                </p>
              )}
            </div>
          );
        }
      )}

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
        >
          {isSubmitting ? t("form.saving") : t("form.saveChanges")}
        </button>

        <button
          type="button"
          onClick={() => toast(t("admin.contact.reset")) || reset(data)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
        >
          {t("form.reset")}
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm(t("admin.contact.confirmDelete"))) {
              deleteMutation.mutate(data.id, {
                onSuccess: () =>
                  toast.success(t("admin.contact.toast.deleted")),
                onError: () =>
                  toast.error(t("admin.contact.toast.deleteError")),
              });
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          {t("form.delete")}
        </button>
      </div>
    </form>
  );
};

export default AdminContactInfo;

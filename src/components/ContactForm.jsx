// src/components/ContactForm.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useCreateContact } from "../api/massageApi";

const schema = yup.object().shape({
  fullName: yup.string().min(3).required("contactForm.errors.fullName"),
  email: yup.string().email().required("contactForm.errors.email"),
  message: yup.string().min(10).required("contactForm.errors.message"),
});

const ContactForm = () => {
  const { t } = useTranslation();
  const contactSuccess = t("contactForm.toast.success");
  const contactError = t("contactForm.toast.error"); 
  const createContact = useCreateContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    createContact.mutate(data, {
      onSuccess: () => {
        toast.success(contactSuccess);
        reset();
      },
      onError: () => {
        toast.error(contactError);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-xl mx-auto"
    >
      <div>
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300">
          {t("contactForm.fullName")}
        </label>
        <input type="text" {...register("fullName")} className="input" />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{t(errors.fullName.message)}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300">
          {t("contactForm.email")}
        </label>
        <input type="email" {...register("email")} className="input" />
        {errors.email && (
          <p className="text-red-500 text-sm">{t(errors.email.message)}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300">
          {t("contactForm.message")}
        </label>
        <textarea rows={5} {...register("message")} className="input" />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-md disabled:opacity-50"
      >
        {isSubmitting ? t("contactForm.sending") : t("contactForm.send")}
      </button>
    </form>
  );
};

export default ContactForm;

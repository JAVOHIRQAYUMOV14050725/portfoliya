// src/components/ContactForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useCreateContact } from "../api/contactApi";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email is required"),
  message: yup.string().required("Message is required"),
});

const ContactForm = () => {
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
        toast.success("📨 Message sent successfully!");
        reset();
      },
      onError: () => {
        toast.error("❌ Failed to send message");
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
          Full Name
        </label>
        <input type="text" {...register("fullName")} className="input" />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300">
          Email
        </label>
        <input type="email" {...register("email")} className="input" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300">
          Message
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
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup";

import {
  useContactInfoQuery,
  useUpdateContactInfo,
} from "../../api/contactInfoApi";

// ✅ Yup validation schema
const schema = yup.object().shape({
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  location: yup.string().required("Location is required"),
  github: yup.string().url("Invalid GitHub URL").required("GitHub is required"),
  telegram: yup
    .string()
    .url("Invalid Telegram URL")
    .required("Telegram is required"),
  linkedin: yup
    .string()
    .url("Invalid LinkedIn URL")
    .required("LinkedIn is required"),
});

const AdminContactInfo = () => {
  const { data, isLoading } = useContactInfoQuery();
  const updateMutation = useUpdateContactInfo();

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
      toast.error("❌ Invalid ID for update");
      return;
    }

    updateMutation.mutate(
      { id: data.id, ...values },
      {
        onSuccess: () => {
          toast.success("✅ Contact info updated");
        },
        onError: () => {
          toast.error("❌ Failed to update contact info");
        },
      }
    );
  };

  if (isLoading || !data?.id)
    return <p className="text-center">Loading contact info...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
        📇 Edit Contact Info
      </h2>

      {[
        { name: "phone", type: "tel", placeholder: "+998 94 202 40 44" },
        { name: "email", type: "email", placeholder: "example@mail.com" },
        { name: "location", type: "text", placeholder: "Tashkent, Uzbekistan" },
        {
          name: "github",
          type: "url",
          placeholder: "https://github.com/yourname",
        },
        {
          name: "telegram",
          type: "url",
          placeholder: "https://t.me/yourusername",
        },
        {
          name: "linkedin",
          type: "url",
          placeholder: "https://linkedin.com/in/yourname",
        },
      ].map(({ name, type, placeholder }) => (
        <div key={name}>
          <label className="block mb-1 capitalize text-slate-700 dark:text-slate-300">
            {name}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {errors[name] && (
            <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default AdminContactInfo;

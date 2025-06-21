// ✅ ENHANCED AdminExperience.jsx with icon preview
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  useExperiencesQuery,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
} from "../../api/experienceApi";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as SiIcons from "react-icons/si";

const allIcons = { ...FaIcons, ...MdIcons, ...SiIcons };

const schema = z.object({
  title: z.string().min(1, "admin.experience.errors.title"),
  company: z.string().min(1, "admin.experience.errors.company"),
  description: z.string().min(1, "admin.experience.errors.description"),
  startDate: z.string().min(4, "admin.experience.errors.startDate"),
  endDate: z.string().optional(),
  icon: z.string().optional(),
});

function getIconComponent(name) {
  const Icon = allIcons[name];
  return Icon ? <Icon className="inline-block text-cyan-500 mr-1" /> : null;
}

function AdminExperience() {
  const { t } = useTranslation();
  const { data: experiences = [] } = useExperiencesQuery();
  const create = useCreateExperience();
  const update = useUpdateExperience();
  const remove = useDeleteExperience();

  const [editingId, setEditingId] = useState(null);
  const [iconInput, setIconInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const currentIcon = watch("icon");

  const suggestions = Object.keys(allIcons)
    .filter((k) => k.toLowerCase().includes(iconInput.toLowerCase()))
    .slice(0, 5);

  const onSubmit = (formData) => {
    if (editingId) {
      update.mutate({ id: editingId, data: formData });
    } else {
      create.mutate(formData);
    }
    reset();
    setIconInput("");
    setEditingId(null);
  };

  const handleEdit = (item) => {
    reset(item);
    setIconInput(item.icon || "");
    setEditingId(item.id);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t("admin.experience.title")}</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >
        <input
          {...register("title")}
          placeholder={t("admin.experience.placeholders.title")}
          className="input"
        />
        <input
          {...register("company")}
          placeholder={t("admin.experience.placeholders.company")}
          className="input"
        />
        <input
          {...register("startDate")}
          placeholder={t("admin.experience.placeholders.start")}
          className="input"
        />
        <input
          {...register("endDate")}
          placeholder={t("admin.experience.placeholders.end")}
          className="input"
        />

        <div className="relative col-span-full">
          <input
            {...register("icon")}
            value={iconInput}
            onChange={(e) => {
              setIconInput(e.target.value);
              setValue("icon", e.target.value);
            }}
            placeholder={t("admin.experience.placeholders.icon")}
            className="input pr-10"
          />
          <div className="absolute right-3 top-2.5">
            {getIconComponent(iconInput)}
          </div>
          {iconInput && suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 bg-white dark:bg-slate-800 border rounded w-full shadow text-xs max-h-40 overflow-auto">
              {suggestions.map((s) => (
                <div
                  key={s}
                  onClick={() => {
                    setIconInput(s);
                    setValue("icon", s);
                  }}
                  className="px-3 py-1 cursor-pointer hover:bg-cyan-100 dark:hover:bg-slate-700 flex items-center gap-2"
                >
                  {getIconComponent(s)} {s}
                </div>
              ))}
            </div>
          )}
        </div>

        <textarea
          {...register("description")}
          placeholder={t("admin.experience.placeholders.description")}
          rows={3}
          className="textarea col-span-full"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 col-span-full"
        >
          {editingId ? t("form.update") : t("form.create")}
        </button>
      </form>

      <div className="space-y-4">
        {experiences.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-slate-100 dark:bg-slate-800 rounded shadow flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                {getIconComponent(item.icon)} {item.title}
                <span className="text-cyan-500"> @ </span>
                {item.company}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                {item.startDate} —{" "}
                {item.endDate || t("admin.experience.present")}
              </p>
              <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-yellow-400 text-black rounded"
              >
                {t("form.edit")}
              </button>
              <button
                onClick={() => remove.mutate(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                {t("form.delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminExperience;

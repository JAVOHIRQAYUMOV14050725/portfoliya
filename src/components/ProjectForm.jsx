// 📁 src/components/ProjectForm.jsx (ultimate version with drag&drop + modal + filepond)
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Dialog } from "@headlessui/react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useTranslation } from "react-i18next";
import "filepond/dist/filepond.min.css";
import axios from "../utils/axios";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

const schema = yup.object().shape({
  title: yup.string().required("projectForm.errors.title"),
  description: yup.string(),
  techStack: yup.string(),
  githubUrl: yup.string().url("projectForm.errors.github"),
  liveUrl: yup.string().url("projectForm.errors.live"),
  imageUrl: yup.string().nullable(),
});

const fields = [
  { name: "title", labelKey: "projectForm.fields.title" },
  {
    name: "description",
    labelKey: "projectForm.fields.description",
    type: "textarea",
  },
  { name: "techStack", labelKey: "projectForm.fields.techStack" },
  { name: "githubUrl", labelKey: "projectForm.fields.github", type: "url" },
  { name: "liveUrl", labelKey: "projectForm.fields.live", type: "url" },
];

const ProjectForm = ({ defaultValues = {}, onSubmit, onCancel, loading }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: defaultValues.title || "",
      description: defaultValues.description || "",
      techStack: (defaultValues.techStack || []).join(", "),
      githubUrl: defaultValues.githubUrl || "",
      liveUrl: defaultValues.liveUrl || "",
      imageUrl: defaultValues.imageUrl || "",
    },
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const imageUrl = watch("imageUrl");

  const submitHandler = (data) => {
    const techStackArray = data.techStack
      ? data.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];
    onSubmit({ ...data, techStack: techStackArray });
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "/upload/project-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setValue("imageUrl", res.data.imageUrl);
    } catch (err) {
      console.error("❌ Upload failed", err);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <motion.form
      onSubmit={handleSubmit(submitHandler)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-slate-300 dark:border-slate-700"
    >
      <input type="hidden" {...register("imageUrl")} />

      {fields.map(({ name, labelKey, type = "text" }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            {t(labelKey)}
          </label>
          {type === "textarea" ? (
            <textarea
              {...register(name)}
              rows={4}
              className={`w-full px-3 py-2 rounded-md border ${
                errors[name]
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-600"
              } bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500`}
            />
          ) : (
            <input
              type={type}
              {...register(name)}
              className={`w-full px-3 py-2 rounded-md border ${
                errors[name]
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-600"
              } bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500`}
            />
          )}
          {errors[name] && (
            <p className="text-xs text-red-500 mt-1">
              {t(errors[name].message)}
            </p>
          )}
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
          {t("projectForm.uploadLabel")}
        </label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-cyan-500 p-4 text-center rounded cursor-pointer hover:bg-cyan-50 dark:hover:bg-slate-700"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>{t("projectForm.dropHere")}</p>
          ) : (
            <p>{t("projectForm.dragHere")}</p>
          )}
        </div>
        {imageUrl && (
          <div className="relative mt-3">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-40 object-cover rounded shadow border border-slate-300 dark:border-slate-600 cursor-pointer"
              onClick={() => setPreviewOpen(true)}
            />
          </div>
        )}
      </div>

      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        className="fixed inset-0 z-50"
      >
        <div className="flex items-center justify-center min-h-screen bg-black/80 p-4">
          <Dialog.Panel className="relative">
            <img
              src={imageUrl}
              alt="Preview Full"
              className="max-h-[80vh] rounded"
            />
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-2 right-2 text-white text-xl font-bold"
            >
              ×
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <div className="flex justify-end space-x-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-sm text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-slate-600"
          >
            {t("projectForm.cancel")}
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 text-white text-sm font-semibold rounded hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading ? t("projectForm.submitting") : t("projectForm.submit")}
        </button>
      </div>
    </motion.form>
  );
};

export default ProjectForm;

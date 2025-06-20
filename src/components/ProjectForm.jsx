// 📁 src/components/ProjectForm.jsx (ultimate version with drag&drop + modal + filepond)
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Dialog } from "@headlessui/react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  techStack: yup.string(),
  githubUrl: yup.string().url("Invalid GitHub URL"),
  liveUrl: yup.string().url("Invalid Live URL"),
  imageUrl: yup.string().nullable(),
});

const fields = [
  { name: "title", label: "Project Title" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "techStack", label: "Tech Stack (comma-separated)" },
  { name: "githubUrl", label: "GitHub URL", type: "url" },
  { name: "liveUrl", label: "Live URL", type: "url" },
];

const ProjectForm = ({ defaultValues = {}, onSubmit, onCancel, loading }) => {
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
        "http://localhost:3000/upload/project-image",
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

      {fields.map(({ name, label, type = "text" }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            {label}
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
            <p className="text-xs text-red-500 mt-1">{errors[name].message}</p>
          )}
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
          Upload Project Image (drag & drop)
        </label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-cyan-500 p-4 text-center rounded cursor-pointer hover:bg-cyan-50 dark:hover:bg-slate-700"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <p>Drag & drop image here, or click to select file</p>
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
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 text-white text-sm font-semibold rounded hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </motion.form>
  );
};

export default ProjectForm;

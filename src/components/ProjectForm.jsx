import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Yup validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  techStack: yup.string(),
  githubUrl: yup.string().url("Invalid GitHub URL"),
  liveUrl: yup.string().url("Invalid Live URL"),
  imageUrl: yup.string().url("Invalid Image URL"),
});

function ProjectForm({ defaultValues = {}, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
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

  const submitHandler = (data) => {
    const techStackArray = data.techStack
      ? data.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];
    onSubmit({ ...data, techStack: techStackArray });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {[
        "title",
        "description",
        "techStack",
        "githubUrl",
        "liveUrl",
        "imageUrl",
      ].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-1 capitalize">
            {field === "techStack"
              ? "Tech Stack (comma-separated)"
              : field.replace(/([A-Z])/g, " $1")}
          </label>

          {field === "description" ? (
            <textarea
              {...register(field)}
              className="w-full border border-gray-300 rounded p-2"
              rows={4}
            />
          ) : (
            <input
              type={field.includes("Url") ? "url" : "text"}
              {...register(field)}
              className="w-full border border-gray-300 rounded p-2"
            />
          )}

          {errors[field] && (
            <p className="text-red-500 text-sm mt-1">{errors[field].message}</p>
          )}
        </div>
      ))}

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded bg-cyan-600 text-white hover:bg-cyan-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;

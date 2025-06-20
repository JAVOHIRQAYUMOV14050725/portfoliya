import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import {
  useHeroQuery,
  useCreateHero,
  useUpdateHero,
  useDeleteHero,
} from "../../api/heroApi";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

// ✅ Form validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  tagline: yup.string().required("Tagline is required"),
  technologies: yup
    .string()
    .required("Technologies (comma separated) is required"),
});

const AdminHero = () => {
  const { data, isLoading, isError } = useHeroQuery();
  const createHero = useCreateHero();
  const updateHero = useUpdateHero();
  const deleteHero = useDeleteHero();
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      tagline: "",
      technologies: "",
    },
  });

  useEffect(() => {
    if (showForm && data) {
      setValue("name", data.name || "");
      setValue("tagline", data.tagline || "");
      setValue("technologies", data.technologies?.join(", ") || "");
    } else if (showForm && !data) {
      reset();
    }
  }, [showForm, data, setValue, reset]);

  const onSubmit = (formData) => {
    const payload = {
      name: formData.name,
      tagline: formData.tagline,
      technologies: formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (data?.id) {
      updateHero.mutate(
        { id: data.id, payload },
        {
          onSuccess: () => {
            toast.success("✅ Hero updated");
            queryClient.invalidateQueries(["hero"]);
            setShowForm(false);
          },
          onError: () => toast.error("❌ Failed to update"),
        }
      );
    } else {
      createHero.mutate(payload, {
        onSuccess: () => {
          toast.success("✅ Hero created");
          queryClient.invalidateQueries(["hero"]);
          reset();
          setShowForm(false);
        },
        onError: () => toast.error("❌ Failed to create"),
      });
    }
  };

  // 1. LOADING
  if (isLoading)
    return <p className="text-center mt-10 text-slate-500">Loading...</p>;

  // 2. ERROR
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        ❌ Failed to load hero data
      </p>
    );

  // 3. ADD HERO (data yo‘q, forma yopiq)
  if (!data && !showForm) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <button
          onClick={() => {
            reset();
            setShowForm(true);
          }}
          className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 text-lg shadow-md transition duration-200"
        >
          ➕ Add Hero
        </button>
      </div>
    );
  }

  // 4. EDIT HERO (data bor, forma yopiq) ✅ Faqat tashqi edit tugmasi
  if (data && !showForm) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 text-lg shadow-md transition duration-200"
        >
          ✏️ Edit Hero
        </button>
      </div>
    );
  }

  // 5. SHOW FORM (ichki holat, ichki tugmalar)
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="hero-form"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl dark:shadow-gray-700/50"
      >
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
          {data ? "✏️ Edit Hero Section" : "➕ Create Hero Section"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Inputs... */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Name
            </label>
            <input
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-700 dark:text-white"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Tagline
            </label>
            <input
              {...register("tagline")}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-700 dark:text-white"
            />
            {errors.tagline && (
              <p className="text-xs text-red-500">{errors.tagline.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Technologies (comma-separated)
            </label>
            <input
              {...register("technologies")}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-slate-700 dark:text-white"
            />
            {errors.technologies && (
              <p className="text-xs text-red-500">
                {errors.technologies.message}
              </p>
            )}
          </div>

          {/* Submit + Cancel */}
          <div className="flex gap-3 flex-wrap">
            <button
              type="submit"
              disabled={createHero.isPending || updateHero.isPending}
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 disabled:opacity-50 transition duration-200"
            >
              {createHero.isPending || updateHero.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => {
                reset();
                setShowForm(false);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Delete + (Ichki) Edit Button */}
        {data && (
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("⚠️ Delete this hero?")) {
                  deleteHero.mutate(data.id, {
                    onSuccess: () => {
                      toast.success("🗑️ Hero deleted");
                      queryClient.invalidateQueries(["hero"]);
                      reset();
                      setShowForm(false);
                    },
                    onError: () => toast.error("❌ Failed to delete"),
                  });
                }
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              🗑️ Delete Hero
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
            >
              ✏️ Edit Hero
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminHero;

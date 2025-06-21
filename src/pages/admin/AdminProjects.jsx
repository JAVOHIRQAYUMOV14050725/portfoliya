import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useProjectsQuery,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../../api/projectApi";
import ProjectForm from "../../components/ProjectForm";

const AdminProjects = () => {
  const { t } = useTranslation();
  const { data: projects = [], isLoading, isError } = useProjectsQuery();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const showToast = (message, type = "success") => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = (values) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        showToast(t("admin.projects.toast.created"));
        closeForm();
      },
      onError: () => showToast(t("admin.projects.toast.createError"), "error"),
    });
  };

  const handleUpdate = (values) => {
    if (!editing) return;
    updateMutation.mutate(
      { id: editing.id, data: values },
      {
        onSuccess: () => {
          showToast(t("admin.projects.toast.updated"));
          closeForm();
        },
        onError: () =>
          showToast(t("admin.projects.toast.updateError"), "error"),
      }
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm(t("admin.projects.confirmDelete"))) return;
    deleteMutation.mutate(id, {
      onSuccess: () => showToast(t("admin.projects.toast.deleted")),
      onError: () => showToast(t("admin.projects.toast.deleteError"), "error"),
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">
          {t("admin.projects.title")}
        </h1>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="relative z-50 px-4 py-2 bg-yellow-300 text-black font-semibold border border-black rounded hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition"
        >
          {t("admin.projects.add")}
        </button>
      </div>

      {toast && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow z-50 text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-40 bg-black/50 flex justify-center overflow-y-auto">
          <div className="relative w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 my-10 rounded-lg shadow-xl z-50">
            <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-white">
              {editing ? t("admin.projects.edit") : t("admin.projects.new")}
            </h2>
            <ProjectForm
              defaultValues={editing || undefined}
              onSubmit={editing ? handleUpdate : handleCreate}
              onCancel={closeForm}
              loading={createMutation.isPending || updateMutation.isPending}
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="text-center text-slate-400">
          {t("admin.projects.loading")}
        </p>
      ) : isError ? (
        <p className="text-center text-red-500">{t("admin.projects.error")}</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-slate-400">
          {t("admin.projects.empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-slate-200 dark:bg-slate-700 flex items-center justify-center rounded mb-3 text-sm text-slate-500">
                  {t("admin.projects.imageNotFound")}
                </div>
              )}

              <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-300">
                {project.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-2">
                {project.description || t("admin.projects.noDescription")}
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {project.techStack?.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-slate-100 dark:bg-slate-700 text-xs text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setEditing(project);
                    setShowForm(true);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                >
                  {t("form.edit")}
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  {t("form.delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;

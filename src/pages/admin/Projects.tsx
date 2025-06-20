// ✅ OPTIMIZED AdminProjects.tsx (Full CRUD with React Query v5)
import React, { useState } from 'react';
import {
    useProjectsQuery,
    useCreateProject,
    useUpdateProject,
    useDeleteProject,
    Project,
} from '../../api/projectApi';
import ProjectForm, { ProjectFormValues } from '../../components/ProjectForm';

interface Toast {
    type: 'success' | 'error';
    message: string;
}

const AdminProjects: React.FC = () => {
    const { data: projects = [], isLoading, isError } = useProjectsQuery();
    const createMutation = useCreateProject();
    const updateMutation = useUpdateProject();
    const deleteMutation = useDeleteProject();

    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Project | null>(null);
    const [toast, setToast] = useState<Toast | null>(null);

    const closeForm = () => {
        setShowForm(false);
        setEditing(null);
    };

    const showToast = (message: string, type: Toast['type'] = 'success') => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    const handleCreate = (values: ProjectFormValues & { techStack: string[] }) => {
        createMutation.mutate(values, {
            onSuccess: () => {
                showToast('✅ Project created successfully!');
                closeForm();
            },
            onError: () => showToast('❌ Failed to create project', 'error'),
        });
    };

    const handleUpdate = (values: ProjectFormValues & { techStack: string[] }) => {
        if (!editing) return;
        updateMutation.mutate(
            { id: editing.id, data: values },
            {
                onSuccess: () => {
                    showToast('✏️ Project updated successfully!');
                    closeForm();
                },
                onError: () => showToast('❌ Failed to update project', 'error'),
            }
        );
    };

    const handleDelete = (id: number) => {
        if (!window.confirm('❗ Are you sure you want to delete this project?')) return;
        deleteMutation.mutate(id, {
            onSuccess: () => showToast('🗑️ Project deleted'),
            onError: () => showToast('❌ Failed to delete project', 'error'),
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">🚀 Manage Projects</h1>
                <button
                    onClick={() => {
                        setEditing(null);
                        setShowForm(true);
                    }}
                    className="z-50 relative px-5 py-2 bg-yellow-300 text-black font-bold border border-black rounded hover:bg-yellow-400 transition"
                >
                    ➕ Add Project
                </button>


            </div>

            {toast && (
                <div
                    className={`fixed top-4 right-4 px-4 py-2 rounded text-white shadow-lg z-50 ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
                >
                    {toast.message}
                </div>
            )}

            {showForm && (
                <div className="mb-6 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 p-6 shadow">
                    <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">
                        {editing ? '✏️ Edit Project' : '🆕 New Project'}
                    </h2>
                    <ProjectForm
                        defaultValues={editing || undefined}
                        onSubmit={editing ? handleUpdate : handleCreate}
                        onCancel={closeForm}
                    />
                </div>
            )}

            {isLoading ? (
                <p className="text-center text-slate-500">Loading projects...</p>
            ) : isError ? (
                <p className="text-center text-red-500">❌ Failed to load projects or invalid data.</p>
            ) : projects.length === 0 ? (
                <p className="text-center text-slate-500">No projects found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                        >
                            <h3 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300 mb-1">
                                {project.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                                {project.description || 'No description provided.'}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
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
                                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
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
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
    const { data, isLoading } = useProjectsQuery();
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
                showToast('Project created');
                closeForm();
            },
            onError: () => showToast('Failed to create project', 'error'),
        });
    };

    const handleUpdate = (values: ProjectFormValues & { techStack: string[] }) => {
        if (!editing) return;
        updateMutation.mutate(
            { id: editing.id, ...values },
            {
                onSuccess: () => {
                    showToast('Project updated');
                    closeForm();
                },
                onError: () => showToast('Failed to update project', 'error'),
            }
        );
    };

    const handleDelete = (id: number) => {
        if (!window.confirm('Delete this project?')) return;
        deleteMutation.mutate(id, {
            onSuccess: () => showToast('Project deleted'),
            onError: () => showToast('Failed to delete project', 'error'),
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            {toast && (
                <div
                    className={`fixed top-4 right-4 px-4 py-2 rounded text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                >
                    {toast.message}
                </div>
            )}
            <button
                onClick={() => setShowForm(true)}
                className="mb-4 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
            >
                Add Project
            </button>
            {showForm && (
                <div className="mb-4 border p-4 rounded bg-white dark:bg-slate-800">
                    <ProjectForm
                        defaultValues={editing || undefined}
                        onSubmit={editing ? handleUpdate : handleCreate}
                        onCancel={closeForm}
                    />
                </div>
            )}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <table className="min-w-full border divide-y divide-slate-200">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">Title</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {data?.map((project) => (
                            <tr key={project.id} className="hover:bg-slate-50">
                                <td className="px-4 py-2">{project.title}</td>
                                <td className="px-4 py-2 space-x-2">
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminProjects;
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Project } from '../api/projectApi';

const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().optional(),
    techStack: yup.string().optional(),
    githubUrl: yup.string().url('Invalid URL').optional(),
    liveUrl: yup.string().url('Invalid URL').optional(),
    imageUrl: yup.string().url('Invalid URL').optional(),
});

export type ProjectFormValues = yup.InferType<typeof schema>;

interface ProjectFormProps {
    defaultValues?: Partial<Project>;
    onSubmit: (values: ProjectFormValues & { techStack: string[] }) => void;
    onCancel?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ defaultValues, onSubmit, onCancel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: defaultValues?.title ?? '',
            description: defaultValues?.description ?? '',
            techStack: defaultValues?.techStack?.join(', ') ?? '',
            githubUrl: defaultValues?.githubUrl ?? '',
            liveUrl: defaultValues?.liveUrl ?? '',
            imageUrl: defaultValues?.imageUrl ?? '',
        },
    });

    const submitHandler = (data: ProjectFormValues) => {
        const payload = {
            ...data,
            techStack: data.techStack
                ? data.techStack.split(',').map((t) => t.trim()).filter(Boolean)
                : [],
        };
        onSubmit(payload as ProjectFormValues & { techStack: string[] });
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                    type="text"
                    {...register('title')}
                    className="w-full border rounded p-2"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea {...register('description')} className="w-full border rounded p-2" />
                {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
                <input type="text" {...register('techStack')} className="w-full border rounded p-2" />
                {errors.techStack && (
                    <p className="text-red-500 text-sm">{errors.techStack.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input type="url" {...register('githubUrl')} className="w-full border rounded p-2" />
                {errors.githubUrl && (
                    <p className="text-red-500 text-sm">{errors.githubUrl.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Live URL</label>
                <input type="url" {...register('liveUrl')} className="w-full border rounded p-2" />
                {errors.liveUrl && <p className="text-red-500 text-sm">{errors.liveUrl.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input type="url" {...register('imageUrl')} className="w-full border rounded p-2" />
                {errors.imageUrl && (
                    <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
                )}
            </div>
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
                <button type="submit" className="px-4 py-2 rounded bg-cyan-600 text-white hover:bg-cyan-700">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ProjectForm;
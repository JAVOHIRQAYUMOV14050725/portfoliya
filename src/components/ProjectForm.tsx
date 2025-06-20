// ✅ OPTIMIZED ProjectForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Project } from '../api/projectApi';

const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().optional(),
    techStack: yup.string().optional(),
    githubUrl: yup.string().url('Invalid GitHub URL').optional(),
    liveUrl: yup.string().url('Invalid Live URL').optional(),
    imageUrl: yup.string().url('Invalid Image URL').optional(),
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
        const techStackArray = data.techStack
            ? data.techStack.split(',').map((t) => t.trim()).filter(Boolean)
            : [];
        onSubmit({ ...data, techStack: techStackArray });
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            {['title', 'description', 'techStack', 'githubUrl', 'liveUrl', 'imageUrl'].map((field) => (
                <div key={field}>
                    <label className="block text-sm font-medium mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                    {field === 'description' ? (
                        <textarea {...register(field as keyof ProjectFormValues)} className="w-full border rounded p-2" />
                    ) : (
                        <input
                            type={field.includes('Url') ? 'url' : 'text'}
                            {...register(field as keyof ProjectFormValues)}
                            className="w-full border rounded p-2"
                        />
                    )}
                    {errors[field as keyof typeof errors] && (
                        <p className="text-red-500 text-sm">{errors[field as keyof typeof errors]?.message}</p>
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
                <button type="submit" className="px-4 py-2 rounded bg-cyan-600 text-white hover:bg-cyan-700">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ProjectForm;
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Project {
    id: number;
    title: string;
    description?: string;
    techStack?: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
}

const api = axios.create({
    withCredentials: true,
});

export const getProjects = async () => {
    const { data } = await api.get<Project[]>('/projects');
    return data;
};

export const getProject = async (id: number) => {
    const { data } = await api.get<Project>(`/projects/${id}`);
    return data;
};

export const createProject = async (dto: Partial<Project>) => {
    const { data } = await api.post<Project>('/projects', dto);
    return data;
};

export const updateProject = async (id: number, dto: Partial<Project>) => {
    const { data } = await api.put<Project>(`/projects/${id}`, dto);
    return data;
};

export const deleteProject = async (id: number) => {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
};

export const projectsQueryKey = ['projects'];

export const useProjectsQuery = () =>
    useQuery({ queryKey: projectsQueryKey, queryFn: getProjects });

export const useProjectQuery = (id?: number) =>
    useQuery({
        queryKey: ['projects', id],
        queryFn: () => getProject(id!),
        enabled: !!id,
    });

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProject,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsQueryKey }),
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...dto }: { id: number } & Partial<Project>) =>
            updateProject(id, dto),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsQueryKey }),
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProject,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsQueryKey }),
    });
};
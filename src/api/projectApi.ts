import axios from "../utils/axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ dynamic from .env
    withCredentials: true, // ✅ default credentials for auth
});

export default axiosInstance;

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export interface Project {
    id: number;
    title: string;
    description?: string;
    techStack?: string[];
    imageUrl?: string;
    githubUrl: string;
    liveUrl?: string;
    userId: number;
    createdAt?: string;
    updatedAt?: string;
}

type ProjectPayload = {
    title: string;
    description?: string;
    techStack?: string[];
    imageUrl?: string;
    githubUrl: string;
    liveUrl?: string;
};

const extractData = (response: AxiosResponse<any>): any => {
    const { data } = response;
    return data?.data ?? data;
};

export const getProjects = async (): Promise<Project[]> => {
    const res = await axios.get('/projects');
    const data = extractData(res);
    return Array.isArray(data) ? data : [];
};

export const getPublicProjects = async (): Promise<Project[]> => {
    const res = await axios.get('/projects');
    return extractData(res);
};

export const getProject = async (id: number): Promise<Project> => {
    const res = await axios.get(`/projects/${id}`);
    const data = extractData(res);
    if (!data || typeof data !== 'object') throw new Error('Project not found');
    return data;
};

export const createProject = async (payload: ProjectPayload): Promise<Project> => {
    const res = await axios.post('/projects', payload);
    return extractData(res);
};

export const updateProject = async (id: number, payload: ProjectPayload): Promise<Project> => {
    const res = await axios.put(`/projects/${id}`, payload);
    return extractData(res);
};

export const deleteProject = async (id: number): Promise<Project> => {
    const res = await axios.delete(`/projects/${id}`);
    return extractData(res);
};

export const useProjectsQuery = () =>
    useQuery({ queryKey: ['projects'], queryFn: getProjects, initialData: [] });

export const usePublicProjectsQuery = () =>
    useQuery({ queryKey: ['public-projects'], queryFn: getPublicProjects, initialData: [] });

export const useProjectQuery = (id: number) =>
    useQuery({ queryKey: ['projects', id], queryFn: () => getProject(id), enabled: !!id });

export const useCreateProject = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createProject,
        onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
    });
};

export const useUpdateProject = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: ProjectPayload }) => updateProject(id, data),
        onSuccess: (_data, variables) => {
            qc.invalidateQueries({ queryKey: ['projects'] });
            qc.invalidateQueries({ queryKey: ['projects', variables.id] });
        },
    });
};

export const useDeleteProject = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteProject(id),
        onSuccess: (_data, id) => {
            qc.invalidateQueries({ queryKey: ['projects'] });
            qc.invalidateQueries({ queryKey: ['projects', id] });
        },
    });
};

import axios, { AxiosResponse } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Project interface represents a project entity as returned by the API.
 * All fields from the backend Project entity are included, with optional fields marked accordingly.
 */
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

/**
 * Type for project creation/update payload (what we send to the API).
 * It omits fields like id, userId, createdAt, updatedAt which are set by the server.
 */
type ProjectPayload = {
    title: string;
    description?: string;
    techStack?: string[];
    imageUrl?: string;
    githubUrl: string;
    liveUrl?: string;
};

/**
 * Helper function to extract the actual data from an Axios response.
 * It handles both formats: 
 * - When the response data is directly the result (e.g., an array of projects or a project object).
 * - When the response data is wrapped in an object with a `data` property.
 */
const extractData = (response: AxiosResponse<any>): any => {
    const { data } = response;
    // If data is an object and has its own `data` field, return that (unwrapping nested data).
    if (data && typeof data === 'object' && 'data' in data) {
        return data.data;
    }
    // Otherwise, return data as is.
    return data;
};

/**
 * Fetch all projects for the current user.
 * Always returns an array of Project objects (returns [] if none found, never undefined).
 */
export const getProjects = async (): Promise<Project[]> => {
    const response = await axios.get('/projects');
    const data: unknown = extractData(response);
    // Ensure we never return undefined; return an empty array if data is falsy or not an array.
    if (!data) {
        return [];
    }
    if (Array.isArray(data)) {
        return data as Project[];
    }
    // If data is not an array (unexpected format), return an empty array to satisfy the return type.
    return [];
};

/**
 * Fetch a single project by ID for the current user.
 * @param id - The ID of the project to retrieve.
 * @returns The Project object if found.
 * @throws An error if the project is not found or the request fails.
 */
export const getProject = async (id: number): Promise<Project> => {
    const response = await axios.get(`/projects/${id}`);
    const data: unknown = extractData(response);
    if (!data || typeof data !== 'object') {
        // If no data is returned (e.g., project not found), throw an error to be handled by React Query.
        throw new Error('Project not found');
    }
    return data as Project;
};

/**
 * Create a new project for the current user.
 * @param projectPayload - The project data to create (title, description, etc.).
 * @returns The newly created Project (including its assigned ID and any default fields).
 */
export const createProject = async (projectPayload: ProjectPayload): Promise<Project> => {
    const response = await axios.post('/projects', projectPayload);
    const data: unknown = extractData(response);
    if (!data || typeof data !== 'object') {
        throw new Error('Failed to create project');
    }
    return data as Project;
};

/**
 * Update an existing project.
 * @param id - The ID of the project to update.
 * @param projectPayload - The project fields to update.
 * @returns The updated Project object.
 */
export const updateProject = async (id: number, projectPayload: ProjectPayload): Promise<Project> => {
    const response = await axios.put(`/projects/${id}`, projectPayload);
    const data: unknown = extractData(response);
    if (!data || typeof data !== 'object') {
        throw new Error('Failed to update project');
    }
    return data as Project;
};

/**
 * Delete a project by ID.
 * @param id - The ID of the project to delete.
 * @returns The deleted Project data.
 */
export const deleteProject = async (id: number): Promise<Project> => {
    const response = await axios.delete(`/projects/${id}`);
    const data: unknown = extractData(response);
    if (!data || typeof data !== 'object') {
        throw new Error('Failed to delete project');
    }
    return data as Project;
};

/** 
 * useProjectsQuery - React Query hook to retrieve all projects.
 * Uses ['projects'] as the query key. Ensures the data is always an array (empty if no projects).
 */
export const useProjectsQuery = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: getProjects,
        initialData: [],
    });
};
  
/**
 * useProjectQuery - React Query hook to retrieve a single project by ID.
 * Uses ['projects', id] as the query key for scope. Only enabled when an id is provided.
 * @param id - The project ID to fetch.
 */
export const useProjectQuery = (id: number) => {
    return useQuery({
        queryKey: ['projects', id],
        queryFn: () => getProject(id),
        enabled: !!id,
    });
};
  

/**
 * useCreateProject - React Query mutation hook to create a new project.
 * On success, it invalidates the 'projects' query to refresh the list of projects.
 */
export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};
  

/**
 * useUpdateProject - React Query mutation hook to update an existing project.
 * Expects variables of shape `{ id, data }`.
 * On success, invalidates the cache for both the projects list and the individual project.
 */
export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: ProjectPayload }) => updateProject(id, data),
        onSuccess: (_updatedProject, variables) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['projects', variables.id] });
        },
    });
};
  

/**
 * useDeleteProject - React Query mutation hook to delete a project by ID.
 * On success, invalidates the projects list and the cache for that project ID.
 */
export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteProject(id),
        onSuccess: (_deletedProject, id) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['projects', id] });
        },
    });
};
  

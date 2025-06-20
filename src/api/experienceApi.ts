import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

axios.defaults.withCredentials = true;

const API = 'http://localhost:3000/experience';

export const useExperiencesQuery = () => {
    return useQuery({
        queryKey: ['experience'],
        queryFn: async () => {
            const { data } = await axios.get(API);
            return data;
        },
    });
};

export const useCreateExperience = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            const res = await axios.post(API, data);
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries(['experience']),
    });
};

export const useUpdateExperience = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }) => {
            const res = await axios.patch(`${API}/${id}`, data);
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries(['experience']),
    });
};

export const useDeleteExperience = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            await axios.delete(`${API}/${id}`);
        },
        onSuccess: () => queryClient.invalidateQueries(['experience']),
    });
};

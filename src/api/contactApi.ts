// src/api/contactApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../utils/axios';

export const useMessagesQuery = () => {
    return useQuery(['messages'], async () => {
        const res = await axios.get('/contact');
        return res.data;
    });
};

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => axios.delete(`/contact/${id}`),
        onSuccess: () => queryClient.invalidateQueries(['messages']),
    });
};


export const useCreateContact = () => {
    return useMutation({
        mutationFn: async (data) => {
            const res = await axios.post('/contact', data);
            return res.data;
        },
    });
  };
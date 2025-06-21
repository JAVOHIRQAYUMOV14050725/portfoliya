// src/api/contactApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../utils/axios';

// ✅ Ideal fetch messages hook
export const useMessagesQuery = () =>
    useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const { data } = await axios.get('/contact');
            return data;
        },
    });

// ✅ Ideal delete message hook
export const useDeleteMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            await axios.delete(`/contact/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        },
    });
};

// ✅ Ideal create contact hook
export const useCreateContact = () =>
    useMutation({
        mutationFn: async (newContact) => {
            const { data } = await axios.post("/contact", newContact, {
                withCredentials: false, // ✅ MUHIM: Public route
            });
            return data;
        },
    });
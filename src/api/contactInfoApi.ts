// src/api/contactInfoApi.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axios";

export const useContactInfoQuery = () => {
    return useQuery({
        queryKey: ["contact-info"],
        queryFn: async () => {
            const res = await axios.get("/contact-info/latest"); // ✅ 'latest' endpoint
            return res.data;
        },
    });
};
  

export const useUpdateContactInfo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...data }) => axios.patch(`/contact-info/${id}`, data),
        onSuccess: () => queryClient.invalidateQueries(["contact-info"]),
    });
};
  

// ✨ Faqat o‘qish uchun (Contact.jsx ishlatadi)
export const usePublicContactInfo = () => {
    return useQuery({
        queryKey: ["public-contact-info"],
        queryFn: async () => {
            const res = await axios.get("/contact-info/latest"); // 💡 Faqat oxirgisi
            return res.data;
        },
    });
};
  
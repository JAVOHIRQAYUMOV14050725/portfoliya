import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axios";

const ENDPOINT = "/experience";

export const useExperiencesQuery = () => {
    return useQuery({
        queryKey: ["experience"],
        queryFn: async () => {
            const { data } = await axios.get(ENDPOINT);
            return data;
        },
    });
};

export const useCreateExperience = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            const res = await axios.post(ENDPOINT, data);
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries(["experience"]),
    });
};

export const useUpdateExperience = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }) => {
            const res = await axios.patch(`${ENDPOINT}/${id}`, data);
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries(["experience"]),
    });
};

export const useDeleteExperience = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            await axios.delete(`${ENDPOINT}/${id}`);
        },
        onSuccess: () => queryClient.invalidateQueries(["experience"]),
    });
};

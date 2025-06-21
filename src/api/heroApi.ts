import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axios"; // <-- local axiosInstance

export const useCreateHero = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) => axios.post("/hero", payload),
        onSuccess: () => {
            queryClient.invalidateQueries(["hero"]);
        },
    });
};

export const fetchHero = async () => {
    const res = await axios.get("/hero");
    const hero = res.data?.[0];
    return hero ?? null;
};

export const useHeroQuery = () =>
    useQuery({
        queryKey: ["hero"],
        queryFn: fetchHero,
    });

export const useUpdateHero = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: any }) =>
            axios.put(`/hero/${id}`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries(["hero"]);
        },
    });
};

export const useDeleteHero = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => axios.delete(`/hero/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["hero"]);
        },
    });
};

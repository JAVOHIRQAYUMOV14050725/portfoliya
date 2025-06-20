import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateHero = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: any) =>
            axios.post("http://localhost:3000/hero", payload, {
                withCredentials: true,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries(["hero"]);
        },
    });
  };
// ✅ GET hero data
export const fetchHero = async () => {
    const res = await axios.get("http://localhost:3000/hero", {
        withCredentials: true,
    });
    const hero = res.data?.[0];
    return hero ?? null; // ❗ null qaytadi, error o‘rniga
};
  

export const useHeroQuery = () =>
    useQuery({
        queryKey: ["hero"],
        queryFn: fetchHero,
    });

// ✅ UPDATE hero
export const useUpdateHero = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: any }) =>
            axios.put(`http://localhost:3000/hero/${id}`, payload, {
                withCredentials: true,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries(["hero"]);
        },
    });
};

// ➕ Qo‘shing:
export const useDeleteHero = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) =>
            axios.delete(`http://localhost:3000/hero/${id}`, {
                withCredentials: true,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries(["hero"]);
        },
    });
};
  

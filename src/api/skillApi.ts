// 📁 src/api/skillApi.ts
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export interface Skill {
    id: number;
    name: string;
    category: 'hard' | 'soft' | 'language';
    icon?: string;
    level?: string;
}

type SkillPayload = Omit<Skill, 'id'>;

// ====================== 📥 Fetch =========================
export const getSkills = async (): Promise<Skill[]> => {
    const { data } = await axios.get('/skills');
    return data;
};

export const useSkillsQuery = () => {
    return useQuery({ queryKey: ['skills'], queryFn: getSkills });
};

// ===================== ➕ Create =========================
export const createSkill = async (payload: SkillPayload): Promise<Skill> => {
    const { data } = await axios.post('/skills', payload);
    return data;
};

export const useCreateSkill = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] });
        },
    });
};

// ===================== 📝 Update =========================
export const updateSkill = async ({
    id,
    data,
}: {
    id: number;
    data: SkillPayload;
}): Promise<Skill> => {
    const response = await axios.put(`/skills/${id}`, data);
    return response.data;
};

export const useUpdateSkill = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateSkill,
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['skills'] });
            queryClient.invalidateQueries({ queryKey: ['skills', id] });
        },
    });
};

// ===================== ❌ Delete =========================
export const deleteSkill = async (id: number): Promise<void> => {
    await axios.delete(`/skills/${id}`);
};

export const useDeleteSkill = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] });
        },
    });
};

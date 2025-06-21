// 📁 src/api/skillApi.ts
import axios from '../utils/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export interface Skill {
    id: number;
    name: string;
    category: 'hard' | 'soft' | 'language';
    icon?: string;
    level?: string;
}

type SkillPayload = Omit<Skill, 'id'>;

// ✅ Common extractor
const extractData = (response: AxiosResponse<any>): any => {
    const { data } = response;
    return data?.data ?? data;
};

// ====================== 📥 Fetch =========================
export const getSkills = async (): Promise<Skill[]> => {
    const res = await axios.get('/skills');
    const data = extractData(res);
    return Array.isArray(data) ? data : [];
};

export const useSkillsQuery = () =>
    useQuery({ queryKey: ['skills'], queryFn: getSkills, initialData: [] });

// ===================== ➕ Create =========================
export const createSkill = async (payload: SkillPayload): Promise<Skill> => {
    const res = await axios.post('/skills', payload);
    return extractData(res);
};

export const useCreateSkill = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createSkill,
        onSuccess: () => qc.invalidateQueries({ queryKey: ['skills'] }),
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
    const res = await axios.put(`/skills/${id}`, data);
    return extractData(res);
};

export const useUpdateSkill = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: updateSkill,
        onSuccess: (_, { id }) => {
            qc.invalidateQueries({ queryKey: ['skills'] });
            qc.invalidateQueries({ queryKey: ['skills', id] });
        },
    });
};

// ===================== ❌ Delete =========================
export const deleteSkill = async (id: number): Promise<void> => {
    await axios.delete(`/skills/${id}`);
};

export const useDeleteSkill = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: deleteSkill,
        onSuccess: () => qc.invalidateQueries({ queryKey: ['skills'] }),
    });
};

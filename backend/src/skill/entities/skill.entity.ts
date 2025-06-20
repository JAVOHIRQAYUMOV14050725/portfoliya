import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum SkillType {
    HARD = 'hard',
    SOFT = 'soft',
    LANGUAGE = 'language',
}

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    category: 'hard' | 'soft' | 'language'; // 3 tur

    @Column({ nullable: true })
    icon?: string;

    @Column({ nullable: true })
    level?: string; // faqat language uchun
}


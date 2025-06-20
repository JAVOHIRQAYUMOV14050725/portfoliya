import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Hero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    tagline: string;

    @Column('text', { array: true })
    technologies: string[];
}

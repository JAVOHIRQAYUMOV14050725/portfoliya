import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    company: string;

    @Column({ type: 'text' })
    description: string;

    @Column()
    startDate: string; 

    @Column({ nullable: true })
    endDate: string;

    @Column({ nullable: true })
    icon: string;
}
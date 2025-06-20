import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column('text', { array: true, nullable: true })
    techStack: string[];

    @Column({ nullable: true })
    imageUrl: string;

    @Column()
    githubUrl: string;

    @Column({ nullable: true })
    liveUrl: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.projects)
    user: User;

    @CreateDateColumn() // ✅ Bu ikkisiga e'tibor
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
  
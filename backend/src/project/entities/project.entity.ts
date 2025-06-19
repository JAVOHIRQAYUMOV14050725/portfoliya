import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column()
    @Expose()
    title: string;

    @Column({ nullable: true })
    @Expose()
    description: string;

    @Column('simple-array', { nullable: true })
    @Expose()
    techStack: string[];

    @Column({ nullable: true })
    @Expose()
    githubUrl: string;

    @Column({ nullable: true })
    @Expose()
    liveUrl: string;

    @Column({ nullable: true })
    @Expose()
    imageUrl: string;

    @ManyToOne(() => User, (user) => user.projects, { eager: false })
    user: User;

    @Column()
    @Expose()
    userId: number;
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column('simple-array', { nullable: true })
    techStack: string[];

    @Column({ nullable: true })
    githubUrl: string;

    @Column({ nullable: true })
    liveUrl: string;

    @Column({ nullable: true })
    imageUrl: string;

    @ManyToOne(() => User, (user) => user.projects, { eager: false })
    user: User;

    // 👇 yoki agar userId kerak bo‘lsa
    @Column()
    userId: number;
}
// Bu yerda `userId` ustuni qo'shilgan, bu orqali loyiha qaysi foydalanuvchiga tegishli ekanligini aniqlash mumkin.
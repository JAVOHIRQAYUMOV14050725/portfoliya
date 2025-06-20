import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

// contact-message.entity.ts
@Entity()
export class ContactMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column({ type: 'text' })
    message: string;

    @CreateDateColumn()
    createdAt: Date;
}

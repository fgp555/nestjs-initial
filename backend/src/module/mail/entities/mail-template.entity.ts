import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('email_templates')
export class MailTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  templateName: string;

  @Column()
  subject: string;

  @Column('text', { nullable: true })
  text: string;

  @Column('text')
  htmlContent: string;

  @CreateDateColumn()
  createdAt: Date;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ length: 100, nullable: true })
  username: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  birthdate: string;

  @Column({ length: 100, nullable: true })
  nDni: string;

  @Column({ nullable: true, default: 'https://bit.ly/fgpImg1' })
  image: string;

  @Column({
    type: 'enum',
    enum: ['user', 'professional', 'admin'],
    default: 'user',
    // nullable: true,
  })
  role: 'user' | 'professional' | 'admin';

  @Column({ length: 255, nullable: true })
  title: string;

  @Column({ length: 255, nullable: true })
  specialization: string;

  @Column({ length: 1000, nullable: true })
  bio: string;

  @Column({
    type: 'enum',
    enum: ['woman', 'man'],
    nullable: true, // Esto lo hace opcional
  })
  gender?: 'woman' | 'man';

  @CreateDateColumn()
  createdAt: Date;
}

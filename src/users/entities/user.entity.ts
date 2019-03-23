import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column({ length: 500 })
  name: string;

  @Column('simple-array')
  roles: string[];

  @Column('text')
  password: string;
}

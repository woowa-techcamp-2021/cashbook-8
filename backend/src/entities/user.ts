import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'access_token'
  })
  accessToken!: string;
}

export default User;

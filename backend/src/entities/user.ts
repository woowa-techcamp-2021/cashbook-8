import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    name: 'avatar_url'
  })
  avatarURL!: string;

  @Column({
    name: 'access_token'
  })
  accessToken!: string;
}

export default User;

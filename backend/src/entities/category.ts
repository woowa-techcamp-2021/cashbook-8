import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import User from './user';

@Entity('category')
class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  color!: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'user_id'
  })
  user!: User;

  @RelationId((category: Category) => category.user)
  userId!: number;
}

export default Category;

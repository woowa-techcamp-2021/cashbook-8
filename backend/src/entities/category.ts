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

  @JoinColumn({
    name: 'user_id'
  })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE'
  })
  user!: User;

  @RelationId((category: Category) => category.user)
  userId!: string;
}

export default Category;

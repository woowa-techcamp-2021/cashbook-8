import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { CashHistories } from '../enums/cash-history.enum';
import User from './user';

@Entity('category')
class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  color!: string;

  @Column({
    type: 'enum',
    enum: CashHistories
  })
  type!: CashHistories;

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

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, RelationId } from 'typeorm';
import Category from './category';
import Payment from './payment';
import User from './user';

@Entity('cash_history')
class CashHistory {
  @PrimaryColumn()
  id!: number;

  @Column()
  price!: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'user_id'
  })
  user!: User;

  @RelationId((cashHistory: CashHistory) => cashHistory.user)
  userId!: number;

  @ManyToOne(() => Category, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({
    name: 'category_id'
  })
  category!: Category | null;

  @RelationId((cashHistory: CashHistory) => cashHistory.category)
  categoryId!: number | null;

  @ManyToOne(() => Payment, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({
    name: 'payment_id'
  })
  payment!: Payment | null;

  @RelationId((cashHistory: CashHistory) => cashHistory.payment)
  paymentId!: number | null;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt!: Date;
}

export default CashHistory;

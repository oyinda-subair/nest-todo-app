import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 50 })
  public title: string;

  @Column({ type: 'varchar', length: 250 })
  public description: string;

  @Column({ type: 'boolean', default: false })
  public isDone: boolean;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}

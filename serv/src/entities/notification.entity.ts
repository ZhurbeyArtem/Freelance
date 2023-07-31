import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Job } from './job.entity';
import { User } from './users.entity'

@Entity()
export class Notification extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'true', description: 'status' })
  @Column({
    type: 'enum',
    enum: ['waiting', 'rejected', 'approved', 'complaint'],
    default: 'waiting'
  })
  status: string;

  @ApiProperty({ example: 'bad work', description: 'complaint message' })
  @Column({ type: 'varchar', width: 255, nullable: true })
  complaintMessage: string;

  @ApiProperty({ example: '1', description: 'job id' })
  @Column({ type: 'varchar', width: 255 })
  message: string;

  @ApiProperty({ example: '1', description: 'job id' })
  @Column({ type: 'int' })
  userId: number;

  @ApiProperty({ example: '2', description: 'user id' })
  @Column({ type: 'int' })
  jobId: number;

  @ManyToOne(() => User, (user) => user.notifications)
  user!: User;

  @ManyToOne(() => Job, (job) => job.notifications)
  job!: Job;
}

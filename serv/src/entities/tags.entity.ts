import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Job } from './job.entity';

@Entity()
export class Tags extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'create unique design', description: 'Name' })
  @Column({ type: 'varchar', width: 30 })
  name: string;

  @ManyToMany(() => Job, job => job.tags)
  jobs: Job[];
}

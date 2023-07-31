import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


import { Bid } from './bid.entity';
import { User } from './users.entity';
import { Tags } from './tags.entity';
import { Notification } from './notification.entity';

@Entity()
export class Job extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'connect your site to cms', description: 'title' })
  @Column({ type: 'varchar', width: 255, unique: true })
  title: string;

  @ApiProperty({ example: 'createJob api for bot', description: 'description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: '15$', description: 'Hourly rate' })
  @Column({ type: 'varchar', width: 50 })
  hourlyRate: string;

  @ApiProperty({
    example: '3 day',
    description: 'time need that u finish order',
  })
  @Column({ type: 'varchar', width: 50 })
  duration: string;

  @ApiProperty({ example: 'advanced', description: 'lvl of english' })
  @Column({
    type: 'enum',
    enum: ['Advanced', 'Intermediate', 'Elementary'],
  })
  englishLevel: string;

  @ApiProperty({ example: 'rules.dox', description: 'file with task or other things' })
  @Column({
    type: 'varchar', width: 255, nullable: true, default: null
  })
  file: string;

  @ApiProperty({ example: 'ready.dox', description: 'file from freelancer' })
  @Column({
    type: 'varchar', width: 255, nullable: true, default: null
  })
  fileFreelancer: string;

  @ApiProperty({ example: 'notStarted', description: 'job status' })
  @Column({
    type: 'enum',
    enum: ['notStarted', 'atProcess', 'finished'],
    default: 'notStarted'
  })
  status: string;

  @ApiProperty({ example: 'true', description: 'owner confirm job' })
  @Column({
    type: 'varchar',
    default: false
  })
  ownerConfirm: boolean;

  @ApiProperty({ example: 'true', description: 'freelancer confirm job' })
  @Column({
    type: 'varchar',
    default: false
  })
  freelancerConfirm: boolean;

  @Column({
    type: 'int',
  })
  userId: number;

  @ManyToMany(() => Tags, tag => tag.jobs)
  @JoinTable({
    name: 'job_tags'
  })
  tags: Tags[]

  @OneToMany(() => Bid, (bid) => bid.job)
  bids: Bid[];

  @ManyToOne(() => User, (user) => user.jobs)
  user: User;

  @OneToMany(() => Notification, (notification) => notification.job)
  notifications: Notification[];
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobController } from './job.controller';
import { Job } from 'src/entities/job.entity';
import { AuthModule } from '../auth/auth.module';
import { JobService } from './job.service';
import { Tags } from '../../entities/tags.entity';
import { TagsService } from '../tags/tags.service';
import { FileModule } from '../../services/files/files.module';
import { PayModule } from 'src/services/pay/pay.module';
import { UsersModule } from '../users/users.module';
import { BidModule } from '../bid/bid.module';


@Module({
  controllers: [JobController],
  providers: [JobService, TagsService],
  imports: [TypeOrmModule.forFeature([Job, Tags]), AuthModule,
    FileModule, PayModule, UsersModule, BidModule],
  exports: [JobService]
  
})
export class JobModule { }

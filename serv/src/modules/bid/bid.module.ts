import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Bid } from 'src/entities/bid.entity';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { Job } from 'src/entities/job.entity';



@Module({
  controllers: [BidController],
  providers: [BidService],
  imports: [TypeOrmModule.forFeature([Bid, Job]), AuthModule],
  exports: [BidService]
})
export class BidModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tags } from 'src/entities/tags.entity';
import { AuthModule } from '../auth/auth.module';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

// Database connection
@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tags]), AuthModule],
})
export class TagsModule {}

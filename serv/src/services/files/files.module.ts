import { Module } from '@nestjs/common';
import { FileService } from './files.service';

@Module({
  exports: [FileService],
  providers: [FileService],
})
export class FileModule {}

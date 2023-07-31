import { Module } from '@nestjs/common';
import { PayService } from './pay.service';

@Module({
  exports: [PayService],
  providers: [PayService],
})
export class PayModule {}

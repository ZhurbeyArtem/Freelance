import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './modules/mail/mail.module';
import { JobModule } from './modules/job/job.module';
import { TagsModule } from './modules/tags/tags.module';
import { BidModule } from './modules/bid/bid.module';
import { dataSourceOptions } from 'db/data-source';
import { ChatGateway } from './services/chat/chat.gateway';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  providers: [AppService, ChatGateway],
  imports: [
    UsersModule,
    MailModule,
    JobModule,
    TagsModule,
    BidModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),

    TypeOrmModule.forRoot(dataSourceOptions),

    NotificationModule,
  ],
 
})
export class AppModule {}

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { NotificationDto } from './notification.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Notification } from "src/entities/notification.entity";
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { NotificationService } from './notification.service';
import { Pagination } from '../dto/pagination.dto';

@ApiTags("Notifications")
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @ApiOperation({ summary: "Create notification" })
  @ApiResponse({ status: 200, type: [Notification] })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: NotificationDto, @Req() req): Promise<Notification> {
    return this.notificationService.createNotification({
      ...dto,
      userId: req.user.id,
    });
  }

  @ApiOperation({ summary: "Get notifications" })
  @ApiResponse({ status: 200, type: [Notification] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(
    @Query() data: Pagination,
    status: string,
    @Req() req,
  ): Promise<string> {
    return this.notificationService.getNotifications({ data, id: req.user.id });
  }

  @ApiOperation({ summary: "Get notifications" })
  @ApiResponse({ status: 200, type: [Notification] })
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Query() status: string,
    @Body() message: string
  ): Promise<string> {
    return this.notificationService.updateNotification(id, status, message);
  }

  // reject - відхилити
}

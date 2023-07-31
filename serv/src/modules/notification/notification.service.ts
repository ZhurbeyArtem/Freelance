import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "src/entities/notification.entity";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) { }

  async createNotification(data): Promise<Notification> {
    try {
      return await this.notificationRepository.save(data);
    } catch (e) {
      console.log(e)
      return e;
    }
  }

  async getNotifications(dto) {
    try {
      const {
        id,
        data: { status = 'waiting' },
      } = dto;
      const page: number = dto.data.page || 1;
      const limit: number = dto.data.limit || 10;
      const offset: number = page * limit - limit;

      const notifications = await this.notificationRepository
        .createQueryBuilder("notification")
        .take(limit)
        .skip(offset)
        .leftJoin('notification.job', 'job')
        .where("job.userId = :id", { id })
        .andWhere('notification.status = :status', { status })
        .leftJoinAndSelect('job.user', 'user')
        .select(['notification', 'user.firstName', 'user.email', 'user.phoneNumber', 'user.id'])
        .getRawMany();

      const count = await this.notificationRepository
        .createQueryBuilder('notification')
        .leftJoin('notification.job', 'job')
        .where("job.userId = :id", { id })
        .andWhere('notification.status = :status', { status })
        .getCount()

      return { notifications, count }
    } catch (e) {
      return e;
    }
  }

  async updateNotification(id, status, message = null): Promise<string> {
    try {
      await this.notificationRepository
        .createQueryBuilder('notification')
        .update(Notification)
        .where('notification.id = :id', { id })
        .set({ status: status.status, complaintMessage: message.complaintMessage })
        .execute()

      return 'success'
    } catch (e) {
      return e
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDocument } from './entities/notification.entity';
import { Notification } from './entities/notification.interface';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  create(createNotificationDto: any) {
    return this.notificationModel.create(createNotificationDto);
  }

  findAll({ userId, limit = 10, skip = 0 }) {
    if (!userId) throw new Error('userId is required');
    return this.notificationModel
      .find({
        user: userId,
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
  }

  findOne(id: string) {
    return this.notificationModel.findById(id).lean();
  }

  markRead(id: string) {
    return this.notificationModel.findByIdAndUpdate(
      id,
      {
        read: true,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.notificationModel.findByIdAndDelete(id);
  }
}

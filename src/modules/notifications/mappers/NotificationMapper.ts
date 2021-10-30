import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'

class NotificationMapper {
  static toDTO(notification: Notification): NotificationDTO {
    const { id, data, read_at, created_at, type, title } = notification

    return {
      id,
      data,
      read_at,
      created_at,
      type,
      title,
    }
  }
}

export { NotificationMapper }

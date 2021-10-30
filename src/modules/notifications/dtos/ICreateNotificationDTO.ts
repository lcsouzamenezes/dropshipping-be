interface ICreateNotificationDTO {
  title?: string
  data: string
  account_id: string
  user_id?: string
  type?: 'normal' | 'success' | 'warning' | 'error' | 'info'
}

export { ICreateNotificationDTO }

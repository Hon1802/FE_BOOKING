import toast from 'react-hot-toast'

export const notifyError = (msg: string, duration?: number) =>
  toast.error(msg, { duration: duration || 2000 })

export const notifySuccess = (msg: string) =>
  toast.success(msg, { duration: 2000 })

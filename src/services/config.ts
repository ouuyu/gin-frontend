import alovaInstance from './api'

interface SystemConfig {
  version: string
  system_name: string
  footer: string
  home_page: string
  sqlite_path: string
  register_enabled: boolean
  password_register_enabled: boolean
  email_verification_enabled: boolean
  recaptcha_enabled: boolean
  smtp_server: string
  smtp_port: number
  smtp_user: string
  smtp_password: string
  smtp_from: string
  recaptcha_site_key: string
  recaptcha_secret_key: string
}

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export const getConfig = async () => {
  const res = await alovaInstance.Get<ApiResponse<SystemConfig>>('/system/config', {
    cacheFor: 0
  })
  return res.data
}

export const saveConfig = async (key: string, value: any) => {
  if (typeof value === 'boolean') {
    value = value ? "true" : "false"
  }
  if (typeof value === 'number') {
    value = value.toString()
  }
  return alovaInstance.Put('/system/config', { key, value })
}

export type { SystemConfig }

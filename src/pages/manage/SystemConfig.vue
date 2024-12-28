<template>
  <div class="p-8">
    <el-collapse>
      <el-form v-loading="saving">
        <el-collapse-item v-for="section in configs" :key="section.name" :title="section.name">
          <template v-for="item in section.items" :key="item.key">
            <el-form-item :label="item.label">
              <el-switch 
                v-if="item.type === 'switch'"
                v-model="config[item.key]"
                @change="() => handleChange(item.key)"
              />
              <el-input
                v-else
                v-model="config[item.key]"
                :type="item.type || 'text'"
                :show-password="item.type === 'password'"
                :disabled="item.disabled"
                @change="() => handleChange(item.key)"
              />
            </el-form-item>
          </template>
        </el-collapse-item>
      </el-form>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getConfig, saveConfig } from '@/services/config'
import type { SystemConfig } from '@/services/config'
import { ElMessage } from 'element-plus'

interface ConfigItem {
  key: keyof SystemConfig;
  label: string;
  type?: string;
  disabled?: boolean;
}

const configs: { name: string; items: ConfigItem[] }[] = [
  {
    name: "基础设置",
    items: [
      { key: 'system_name' as keyof SystemConfig, label: '系统名称', disabled: false },
      { key: 'version' as keyof SystemConfig, label: '系统版本', disabled: true },
      { key: 'footer' as keyof SystemConfig, label: '页脚信息', disabled: false },
      { key: 'home_page' as keyof SystemConfig, label: '首页地址', disabled: false },
      { key: 'sqlite_path' as keyof SystemConfig, label: '数据库路径', disabled: true }
    ]
  },
  {
    name: "注册设置",
    items: [
      { key: 'register_enabled' as keyof SystemConfig, label: '开启注册', type: 'switch' },
      { key: 'password_register_enabled' as keyof SystemConfig, label: '允许密码注册', type: 'switch' },
      { key: 'email_verification_enabled' as keyof SystemConfig, label: '开启邮箱验证', type: 'switch' },
      { key: 'recaptcha_enabled' as keyof SystemConfig, label: '开启人机验证', type: 'switch' }
    ]
  },
  {
    name: "邮件设置",
    items: [
      { key: 'smtp_server' as keyof SystemConfig, label: 'SMTP 服务器' },
      { key: 'smtp_port' as keyof SystemConfig, label: 'SMTP 端口', type: 'number' },
      { key: 'smtp_user' as keyof SystemConfig, label: 'SMTP 用户名' },
      { key: 'smtp_password' as keyof SystemConfig, label: 'SMTP 密码', type: 'password' },
      { key: 'smtp_from' as keyof SystemConfig, label: '发件人地址' }
    ]
  },
  {
    name: "人机验证设置",
    items: [
      { key: 'recaptcha_site_key' as keyof SystemConfig, label: 'Site Key' },
      { key: 'recaptcha_secret_key' as keyof SystemConfig, label: 'Secret Key', type: 'password' }
    ]
  }
]

const config = ref<SystemConfig>({} as SystemConfig)
const saving = ref(false)

const handleChange = async (
  key: keyof SystemConfig
) => {
  
  saving.value = true
  try {
    await saveConfig(key, config.value[key])
    ElMessage.success('保存成功')
  } finally {
    await fetchConfig()
    setTimeout(() => {
      saving.value = false
    }, 100) // 防抖
  }
}

const fetchConfig = async () => {
  const res = await getConfig()
  config.value = res
}

onMounted(() => {
  fetchConfig()
})
</script> 
<template>
  <el-form v-loading="saving" label-width="220px" class="max-w-3xl">
    <el-form-item label="系统名称">
      <el-input v-model="config.system_name" @change="() => handleChange('system_name')" />
    </el-form-item>
    <el-form-item label="系统版本">
      <el-input v-model="config.version" disabled />
    </el-form-item>
    <el-form-item label="页脚信息">
      <el-input v-model="config.footer" @change="() => handleChange('footer')" />
    </el-form-item>
    <el-form-item label="首页地址">
      <el-input v-model="config.home_page" @change="() => handleChange('home_page')" />
    </el-form-item>
    <el-form-item label="数据库路径">
      <el-input v-model="config.sqlite_path" disabled />
    </el-form-item>

    <el-divider>注册设置</el-divider>
    <el-form-item label="开启注册">
      <el-switch v-model="config.register_enabled" @change="() => handleChange('register_enabled')" />
    </el-form-item>
    <el-form-item label="允许密码注册">
      <el-switch v-model="config.password_register_enabled" @change="() => handleChange('password_register_enabled')" />
    </el-form-item>
    <el-form-item label="开启邮箱验证">
      <el-switch v-model="config.email_verification_enabled" @change="() => handleChange('email_verification_enabled')" />
    </el-form-item>
    <el-form-item label="开启人机验证">
      <el-switch v-model="config.recaptcha_enabled" @change="() => handleChange('recaptcha_enabled')" />
    </el-form-item>

    <el-divider>邮件设置</el-divider>
    <el-form-item label="SMTP 服务器">
      <el-input v-model="config.smtp_server" @change="() => handleChange('smtp_server')" />
    </el-form-item>
    <el-form-item label="SMTP 端口">
      <el-input type="number" v-model="config.smtp_port" @change="() => handleChange('smtp_port')" />
    </el-form-item>
    <el-form-item label="SMTP 用户名">
      <el-input v-model="config.smtp_user" @change="() => handleChange('smtp_user')" />
    </el-form-item>
    <el-form-item label="SMTP 密码">
      <el-input v-model="config.smtp_password" type="password" show-password @change="() => handleChange('smtp_password')" />
    </el-form-item>
    <el-form-item label="发件人地址">
      <el-input v-model="config.smtp_from" @change="() => handleChange('smtp_from')" />
    </el-form-item>

    <el-divider>人机验证设置</el-divider>
    <el-form-item label="Site Key">
      <el-input v-model="config.recaptcha_site_key" @change="() => handleChange('recaptcha_site_key')" />
    </el-form-item>
    <el-form-item label="Secret Key">
      <el-input v-model="config.recaptcha_secret_key" show-password @change="() => handleChange('recaptcha_secret_key')" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getConfig, saveConfig } from '../../services/config'
import type { SystemConfig } from '../../services/config'
import { ElMessage } from 'element-plus'

const config = ref<SystemConfig>({} as SystemConfig)
const saving = ref(false)

const handleChange = async (
  key: keyof SystemConfig
) => {
  
  saving.value = true
  try {
    await saveConfig(key, config.value[key])
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error(`${key} 保存失败`)
  } finally {
    await fetchConfig()
    setTimeout(() => {
      saving.value = false
    }, 100) // 防抖
  }
}

const fetchConfig = async () => {
  try {
    const res = await getConfig()
    config.value = res
  } catch (error) {
    ElMessage.error('获取配置失败')
  }
}

onMounted(() => {
  fetchConfig()
})
</script> 
<template>
    <el-card>
        <el-form>
            <el-form-item label="充值金额">
                <el-input-number v-model="formData.amount" :min="0.1" :max="100" :step="0.1" />
            </el-form-item>
            <el-form-item label="支付方式">
                <el-radio-group v-model="formData.pay_type">
                    <el-radio value="alipay">支付宝</el-radio>
                    <el-radio value="wxpay">微信</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="handleSubmit" :disabled="!formData.amount || loading">
            提交
        </el-button>

        <div class="hidden">
            <div ref="formContainer"></div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { recharge } from '@/services/store';

const formData = ref({
    amount: 0,
    pay_type: 'alipay'
});

const loading = ref(false);
const formContainer = ref<HTMLDivElement>();

const handleSubmit = async () => {
    if (formData.value.amount <= 0) {
        ElMessage.warning('请输入有效的充值金额');
        return;
    }

    loading.value = true;
    try {
        const response = await recharge(formData.value.amount, formData.value.pay_type);
        ElMessage.success('拉起支付');

        if (response) {
            const div = document.createElement('div');
            div.innerHTML = response;
            const form = div.querySelector('form');
            
            if (form) {
                form.setAttribute('target', '_blank');
                
                if (formContainer.value) {
                    formContainer.value.innerHTML = '';
                    formContainer.value.appendChild(form);
                    form.submit();
                }
            } else {
                throw new Error('支付表单解析失败');
            }
        }
    } catch (error: any) {
        ElMessage.error(error.message || '充值失败');
    } finally {
        loading.value = false;
    }
};
</script>
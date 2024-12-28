<template>
  <div class="p-8">
    <el-card v-loading="loading">
      <template #header>
        <div class="flex justify-between items-center">
          <span>订单列表</span>
        </div>
      </template>

      <el-table :data="orderList">
        <el-table-column prop="order_no" label="订单号" />
        <el-table-column prop="product_name" label="商品名称" />
        <el-table-column prop="amount" label="金额">
          <template #default="{ row }">
            ¥{{ row.amount }}
          </template>
        </el-table-column>
        <el-table-column prop="pay_type" label="支付方式">
          <template #default="{ row }">
            {{ row.pay_type === 'alipay' ? '支付宝' : '微信支付' }}
          </template>
        </el-table-column>
        <el-table-column prop="pay_status" label="支付状态">
          <template #default="{ row }">
            <el-tag :type="row.pay_status === 1 ? 'success' : 'warning'">
              {{ row.pay_status === 1 ? '已支付' : '未支付' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间">
          <template #default="{ row }">
            {{ new Date(row.created_at).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button text bg type="primary" @click="handleQuery(row.order_no)">查单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getOrderList, queryOrder } from '@/services/store'
import { ElMessage } from 'element-plus'

interface Order {
  id: number
  order_no: string
  trade_no: string
  user_id: number
  product_name: string
  amount: number
  pay_type: string
  pay_status: number
  param: string
  created_at: string
  updated_at: string
}

const loading = ref(false)
const orderList = ref<Order[]>([])

const loadOrderList = async () => {
  loading.value = true
  try {
    const response = await getOrderList()
    orderList.value = response
  } finally {
    loading.value = false
  }
}

const handleQuery = async (order_no: string) => {
  loading.value = true
  try {
    const response = await queryOrder(order_no)
    // need to be improved
    if (response === `已支付`) {
      ElMessage.success(response)
    } else {
      ElMessage.error(response)
    }
  } finally {
    loadOrderList()
    loading.value = false
  }
}

onMounted(() => {
  loadOrderList()
})
</script>
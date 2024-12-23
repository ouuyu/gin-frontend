<template>
    <div>
        <ElLoading v-if="loading" />
        <div v-else>
            <el-table stripe :data="userList">
                <el-table-column prop="id" label="ID" />
                <el-table-column prop="username" label="用户名" />
                <el-table-column prop="role" label="角色" />
            </el-table>
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :total="total"
                layout="total, sizes, prev, pager, next"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';   
import { getUserList } from '../../services/user';
import { ElLoading } from 'element-plus';

const userList = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const loading = ref(false);

const handleSizeChange = (val: number) => {
    pageSize.value = val;
    currentPage.value = 1;
    loadUserList();
};

const handleCurrentChange = (val: number) => {
    currentPage.value = val;
    loadUserList();
};

const loadUserList = async () => {
    loading.value = true;
    const res = await getUserList(currentPage.value, pageSize.value);
    userList.value = res.list;
    total.value = res.total;
    loading.value = false;
};

onMounted(() => {
    loadUserList();
});
</script>



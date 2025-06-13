<script>
import { ElMessage } from 'element-plus';
import { get } from '@/net';

export default {
    data() {
        return {
            pileId: 1,
            chargingPiles: [],
        };
    },
    mounted() {
        this.getChargingPileQueue();  // 每次初始化该组件时调用
    },
    methods: {
        getChargingPileQueue() {
            get(`/api/admin/pile/queue?id=${this.pileId}`, (data) => {
                this.chargingPiles = data;
            },
            (code, message) => {
                if (code === 400) {
                    ElMessage.error(message);
                } else {
                    ElMessage.warning(code + ':' + message);
                }
            });
        },
    },
};
</script>

<template>
    <div class="waiting-vehicles">
        <el-card class="charging-pile-card">
            <template #header>
                <div class="card-header">
                    <span>充电桩ID: {{ pileId }}</span>
                    <el-input-number v-model="pileId" :min="1" @change="getChargingPileQueue" style="width: 120px;"></el-input-number>
                </div>
            </template>
            <div class="table-container">
                <el-table :data="chargingPiles" border size="small">
                    <el-table-column prop="requestId" label="请求ID" width="80"></el-table-column>
                    <el-table-column prop="userId" label="用户ID" width="80"></el-table-column>
                    <el-table-column prop="username" label="用户名" width="100"></el-table-column>
                    <el-table-column prop="batteryCapacity" label="电池容量(度)" width="100"></el-table-column>
                    <el-table-column prop="requestAmount" label="请求量(度)" width="100"></el-table-column>
                    <el-table-column prop="position" label="队列位置" width="80"></el-table-column>
                    <el-table-column prop="enterTime" label="进入时间" width="160"></el-table-column>
                    <el-table-column prop="waitingTime" label="等待时间(分)" width="100"></el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<style scoped>
.waiting-vehicles {
    margin: 20px;
    width: calc(100% - 40px);
    box-sizing: border-box;
}

.charging-pile-card {
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table-container {
    width: 100%;
    overflow-x: auto;
}

:deep(.el-card__body) {
    padding: 10px;
}
</style>
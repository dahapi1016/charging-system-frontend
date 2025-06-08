<script>
import { ElMessage } from 'element-plus';
import { get } from '@/net';

export default {
    data() {
        return {
            chargingPiles: [
                { id: 1, status: true, chargeCount: 10, chargeDuration: 300, chargeEnergy: 50 },
                { id: 2, status: false, chargeCount: 5, chargeDuration: 150, chargeEnergy: 25 },
                { id: 3, status: true, chargeCount: 8, chargeDuration: 240, chargeEnergy: 40 },
                { id: 4, status: false, chargeCount: 3, chargeDuration: 90, chargeEnergy: 15 },
            ],
        };
    },
    mounted() {
        this.getChargingPilesStatus();  // 每次初始化该组件时调用
    },
    methods: {
        getChargingPilesStatus() {
            get('/api/charging-piles', (data, message) => {
                this.chargingPiles = data;
                ElMessage.success(message);
            });
        },
    },
};
</script>

<template>
    <div class="charging-piles-dashboard">
        <el-table :data="chargingPiles" style="width: 100%">
            <el-table-column prop="id" label="充电桩ID" width="180"></el-table-column>
            <el-table-column prop="status" label="状态" width="180">
                <template #default="{ row }">
                    <el-tag :type="row.status ? 'success' : 'danger'">{{ row.status ? '启动' : '关闭' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="chargeCount" label="累计充电次数" width="180"></el-table-column>
            <el-table-column prop="chargeDuration" label="充电总时长(分钟)" width="180"></el-table-column>
            <el-table-column prop="chargeEnergy" label="充电总电量(度)" width="180"></el-table-column>
        </el-table>
    </div>
</template>

<style scoped>
.charging-piles-dashboard {
    padding: 20px;
}

.el-tag {
    cursor: pointer;
}
</style>
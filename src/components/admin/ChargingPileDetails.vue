<script>
import { ElMessage } from 'element-plus';
import { get } from '@/net';

export default {
    data() {
        return {
            chargingPiles: [
                // 初始数据将被API调用替换
            ],
        };
    },
    mounted() {
        this.getChargingPilesStatus();  // 每次初始化该组件时调用
    },
    methods: {
        getChargingPilesStatus() {
            get('/api/admin/pile/status', (data, message) => {
                this.chargingPiles = data;
                if (message) {
                    // ElMessage.success(message);
                }
            }, (code, message) => {
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
    <div class="charging-piles-dashboard">
        <el-table :data="chargingPiles" style="width: 100%">
            <el-table-column prop="id" label="充电桩ID" width="100"></el-table-column>
            <el-table-column prop="pileCode" label="充电桩编号" width="100"></el-table-column>
            <el-table-column prop="pileTypeDesc" label="充电桩类型" width="100"></el-table-column>
            <el-table-column prop="statusDesc" label="状态" width="100">
                <template #default="{ row }">
                    <el-tag :type="row.status === 1 ? 'success' : 'danger'">{{ row.statusDesc }}</el-tag>
</template>
            </el-table-column>
            <el-table-column prop="power" label="功率(度/小时)" width="100"></el-table-column>
            <el-table-column prop="totalChargingTimes" label="累计充电次数" width="120"></el-table-column>
            <el-table-column prop="totalChargingDuration" label="充电总时长(分钟)" width="150"></el-table-column>
            <el-table-column prop="totalChargingAmount" label="充电总电量(度)" width="150"></el-table-column>
            <el-table-column prop="queueLength" label="排队长度" width="100"></el-table-column>
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
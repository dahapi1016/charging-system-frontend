<script>
import { ElMessage } from 'element-plus';
import { get } from '@/net';

export default {
    data() {
        return {
            chargingDetails: {
                detailId: '123456789',
                generatedTime: '2023-10-01 10:00:00',
                chargingPileId: 1,
                chargeEnergy: 20,
                chargeDuration: 120,
                startTime: '2023-10-01 09:00:00',
                endTime: '2023-10-01 11:00:00',
                chargeCost: 200,
                serviceCost: 50,
                totalCost: 250
            }
        };
    },
    mounted() {
        this.getChargingDetails();  // 每次初始化该组件时调用
    },
    methods: {
        getChargingDetails() {
            get('/api/charging-piles', (data, message) => {
                this.chargingDetails = data;
                ElMessage.success(message);
            });
        },
    },
};
</script>

<template>
    <div class="detail-dashboard">
        <el-card class="detail-card">
            <template #header>
                <div class="card-header">
                    <span>充电详单信息</span>
                </div>
            </template>
            <el-row :gutter="30" class="detail-row">
                <el-col :span="12">
                    <div class="detail-item">
                        <span class="detail-label">详单编号:</span>
                        <span class="detail-value">{{ chargingDetails.detailId }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="detail-item">
                        <span class="detail-label">详单生成时间:</span>
                        <span class="detail-value">{{ chargingDetails.generatedTime }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="30" class="detail-row">
                <el-col :span="12">
                    <div class="detail-item">
                        <span class="detail-label">充电桩编号:</span>
                        <span class="detail-value">{{ chargingDetails.chargingPileId }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="detail-item">
                        <span class="detail-label">充电电量(度):</span>
                        <span class="detail-value">{{ chargingDetails.chargeEnergy }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="30" class="detail-row">
                <el-col :span="12">
                    <div class="detail-item">
                        <span class="detail-label">充电时长(分钟):</span>
                        <span class="detail-value">{{ chargingDetails.chargeDuration }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="detail-item">
                        <span class="detail-label">启动时间:</span>
                        <span class="detail-value">{{ chargingDetails.startTime }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="30" class="detail-row">
                <el-col :span="12">
                    <div class="detail-item">
                        <span class="detail-label">停止时间:</span>
                        <span class="detail-value">{{ chargingDetails.endTime }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="detail-item">
                        <span class="detail-label">充电费用:</span>
                        <span class="detail-value">{{ chargingDetails.chargeCost }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="30" class="detail-row">
                <el-col :span="12">
                    <div class="detail-item">
                        <span class="detail-label">服务费用:</span>
                        <span class="detail-value">{{ chargingDetails.serviceCost }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="detail-item">
                        <span class="detail-label">总费用:</span>
                        <span class="detail-value">{{ chargingDetails.totalCost }}</span>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<style scoped>
.detail-dashboard {
    padding: 20px;
}

.detail-card {
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.detail-row {
    margin-bottom: 10px;
}

.detail-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
}

.detail-label {
    min-width: 110px;
    /* 增加标签的最小宽度 */
    font-weight: 500;
    white-space: nowrap;
}

.detail-value {
    flex: 1;
    color: #333;
    white-space: nowrap;
}
</style>
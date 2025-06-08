<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { ElMessage } from 'element-plus';
import { get } from '@/net';

export default {
    data() {
        return {
            reportData: {
                time: '3天2周1月',
                chargingPileIds: [1, 2, 3, 4, 1, 2, 3, 4,],
                totalChargeCount: 50,
                totalChargeDuration: 1500,
                totalChargeEnergy: 250,
                totalChargeCost: 5000,
                totalServiceCost: 1000,
                totalCost: 6000
            },
        };
    },
    mounted() {
        this.getReportData();  // 每次初始化该组件时调用
    },
    methods: {
        getReportData() {
            get('/api/charging-piles', (data, message) => {
                this.reportData = data;
                ElMessage.success(message);
            });
        },
    },
};
</script>

<template>
    <div class="report-dashboard">
        <el-card class="report-card">
            <template v-slot:header>
                <div class="card-header">
                    <span>充电站报表信息</span>
                </div>
            </template>
            <el-row :gutter="20" class="report-row">
                <el-col :span="12">
                    <div class="report-item">
                        <span class="report-label">时间:</span>
                        <span class="report-value">{{ reportData.time }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="report-item">
                        <span class="report-label">累计充电次数:</span>
                        <span class="report-value">{{ reportData.totalChargeCount }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="report-row">
                <el-col :span="12">
                    <div class="report-item">
                        <span class="report-label">累计充电时长(分钟):</span>
                        <span class="report-value">{{ reportData.totalChargeDuration }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="report-item">
                        <span class="report-label">累计充电量(度):</span>
                        <span class="report-value">{{ reportData.totalChargeEnergy }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="report-row">
                <el-col :span="12">
                    <div class="report-item">
                        <span class="report-label">累计充电费用:</span>
                        <span class="report-value">{{ reportData.totalChargeCost }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="report-item">
                        <span class="report-label">累计服务费用:</span>
                        <span class="report-value">{{ reportData.totalServiceCost }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="report-row">
                <el-col :span="12">
                    <div class="report-item">
                        <span class="report-label">累计总费用:</span>
                        <span class="report-value">{{ reportData.totalCost }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="report-row">
                <el-col :span="24">
                    <div class="report-item">
                        <span class="report-label">所有充电桩编号:</span>
                        <div class="report-value">
                            <el-tag v-for="id in reportData.chargingPileIds" :key="id" style="margin-right: 8px">{{ id
                                }}</el-tag>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>


<style scoped>
.report-dashboard {
    padding: 20px;
}

.report-card {
    margin-bottom: 20px;
}

.card-header {
    font-size: 18px;
    font-weight: bold;
}

.report-row {
    margin-bottom: 10px;
}

.report-item {
    display: flex;
    align-items: center;
}

.report-label {
    font-weight: bold;
    margin-right: 8px;
    white-space: nowrap;
}

.report-value {
    flex: 1;
}
</style>

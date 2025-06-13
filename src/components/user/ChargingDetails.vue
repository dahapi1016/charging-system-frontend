<script>
import { ElMessage } from 'element-plus';
import { get } from '@/net';

export default {
    data() {
        return {
            chargingDetails: [], // 当前页的充电详单列表
            pagination: {
                current: 1,  // 当前页码
                size: 2,     // 每页显示数量固定为2个
                total: 0,    // 总记录数
                pages: 0     // 总页数
            }
        };
    },
    mounted() {
        this.getChargingDetails();  // 每次初始化该组件时调用
    },
    methods: {
        getChargingDetails() {
            get(`/api/billing/list?current=${this.pagination.current}&size=${this.pagination.size}`, (data, message) => {
                this.chargingDetails = data.records;
                this.pagination.total = data.total;
                this.pagination.pages = data.pages;
                this.pagination.current = data.current;
                this.pagination.size = data.size;
                // ElMessage.success(message);
            },
            (code, message) => {
                if (code === 400) {
                    ElMessage.error(message);
                } else {
                    ElMessage.warning(code + ':' + message);
                }
            });
        },
        handleCurrentChange(val) {
            this.pagination.current = val;
            this.getChargingDetails();
        }
    },
};
</script>

<template>
    <div class="detail-dashboard">
        <!-- 使用v-for循环渲染多个充电详单卡片 -->
        <div v-if="chargingDetails.length > 0">
            <el-card v-for="bill in chargingDetails" :key="bill.id" class="detail-card">
                <template #header>
                    <div class="card-header">
                        <span>充电详单信息</span>
                        <span class="bill-number">单号: {{ bill.billNumber }}</span>
                    </div>
                </template>
                <el-row :gutter="30" class="detail-row">
                    <el-col :span="12">
                        <div class="detail-item">
                            <span class="detail-label">详单生成时间:</span>
                            <span class="detail-value">{{ bill.createTime }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="detail-item">
                            <span class="detail-label">充电桩编号:</span>
                            <span class="detail-value">{{ bill.pileCode }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="30" class="detail-row">
                    <el-col :span="12">
                        <div class="detail-item">
                            <span class="detail-label">充电电量(度):</span>
                            <span class="detail-value">{{ bill.chargingAmount }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="detail-item">
                            <span class="detail-label">充电时长(分钟):</span>
                            <span class="detail-value">{{ bill.chargingDuration }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="30" class="detail-row">
                    <el-col :span="12">
                        <div class="detail-item">
                            <span class="detail-label">启动时间:</span>
                            <span class="detail-value">{{ bill.startTime }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="detail-item">
                            <span class="detail-label">停止时间:</span>
                            <span class="detail-value">{{ bill.endTime }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="30" class="detail-row">
                    <el-col :span="12">
                        <div class="detail-item">
                            <span class="detail-label">充电费用:</span>
                            <span class="detail-value">{{ bill.chargingFee }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="detail-item">
                            <span class="detail-label">服务费用:</span>
                            <span class="detail-value">{{ bill.serviceFee }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="30" class="detail-row">
                    <el-col :span="12">
                        <div class="detail-item">
                            <span class="detail-label">总费用:</span>
                            <span class="detail-value">{{ bill.totalFee }}</span>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </div>
        <div v-else class="no-data">
            <el-empty description="暂无充电详单"></el-empty>
        </div>

        <!-- 分页组件 - 移除页面大小控制器 -->
        <div class="pagination-container">
            <el-pagination
                v-model:current-page="pagination.current"
                layout="prev, pager, next, jumper, total"
                :total="pagination.total"
                :page-size="pagination.size"
                @current-change="handleCurrentChange"
                background
            />
        </div>
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
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.bill-number {
    font-size: 14px;
    color: #666;
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

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.no-data {
    margin: 40px 0;
}
</style>
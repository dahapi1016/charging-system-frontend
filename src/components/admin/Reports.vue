<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { ElMessage } from 'element-plus';
import { get } from '@/net';

export default {
    data() {
        const currentDate = new Date();
        return {
            reportData: {
                time: '',
                chargingPileIds: [],
                totalChargeCount: 0,
                totalChargeDuration: 0,
                totalChargeEnergy: 0,
                totalChargeCost: 0,
                totalServiceCost: 0,
                totalCost: 0
            },
            reportList: [], // 存储后端返回的报表数据列表
            timeType: 'monthly', // 默认按月查看
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            weekOfYear: this.getWeekOfYear(currentDate),
            date: this.formatDate(currentDate),
            currentDate: currentDate, // 存储当前日期用于选择器默认值
            yearPickerValue: currentDate, // 年份选择器的值
            monthPickerValue: currentDate, // 月份选择器的值
        };
    },
    mounted() {
        this.getReportData();  // 每次初始化该组件时调用
    },
    computed: {
        // 计算汇总数据
        summaryData() {
            if (!this.reportList || this.reportList.length === 0) {
                return {
                    time: this.getTimeDescription(),
                    chargingPileIds: [],
                    totalChargeCount: 0,
                    totalChargeDuration: 0,
                    totalChargeEnergy: 0,
                    totalChargeCost: 0,
                    totalServiceCost: 0,
                    totalCost: 0
                };
            }

            // 提取所有充电桩ID
            const pileCodes = [...new Set(this.reportList.map(item => item.pileCode))];

            // 计算汇总数据
            const totalChargeCount = this.reportList.reduce((sum, item) => sum + item.chargingTimes, 0);
            const totalChargeDuration = this.reportList.reduce((sum, item) => sum + item.chargingDuration, 0);
            const totalChargeEnergy = this.reportList.reduce((sum, item) => sum + item.chargingAmount, 0);
            const totalChargeCost = this.reportList.reduce((sum, item) => sum + item.chargingFee, 0);
            const totalServiceCost = this.reportList.reduce((sum, item) => sum + item.serviceFee, 0);
            const totalCost = this.reportList.reduce((sum, item) => sum + item.totalFee, 0);

            return {
                time: this.getTimeDescription(),
                chargingPileIds: pileCodes,
                totalChargeCount,
                totalChargeDuration,
                totalChargeEnergy: parseFloat(totalChargeEnergy.toFixed(2)),
                totalChargeCost: parseFloat(totalChargeCost.toFixed(2)),
                totalServiceCost: parseFloat(totalServiceCost.toFixed(2)),
                totalCost: parseFloat(totalCost.toFixed(2))
            };
        }
    },
    methods: {
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        getWeekOfYear(date) {
            const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
            const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
            return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        },
        getTimeDescription() {
            switch (this.timeType) {
                case 'daily':
                    return `${this.date}`;
                case 'weekly':
                    return `${this.year}年第${this.weekOfYear}周`;
                case 'monthly':
                default:
                    return `${this.year}年${this.month}月`;
            }
        },
        getReportData() {
            let url = '';
            let params = {};

            switch (this.timeType) {
                case 'daily':
                    url = '/api/admin/report/daily';
                    params = { date: this.date };
                    break;
                case 'weekly':
                    url = '/api/admin/report/weekly';
                    params = { weekOfYear: this.weekOfYear, year: this.year };
                    break;
                case 'monthly':
                default:
                    url = '/api/admin/report/monthly';
                    params = { month: this.month, year: this.year };
                    break;
            }

            // 构建查询字符串
            const queryString = Object.keys(params)
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join('&');

            get(`${url}?${queryString}`, (data) => {
                // 处理后端返回的数据
                if (data && Array.isArray(data)) {
                    this.reportList = data;
                    this.reportData = this.summaryData;
                    ElMessage.success('报表数据加载成功');
                } else {
                    this.reportList = [];
                    ElMessage.warning('未获取到报表数据');
                }
            },
            (code, message) => {
                if (code === 400) {
                    ElMessage.error(message);
                } else {
                    ElMessage.warning(code + ':' + message);
                }
            });
        },
        changeTimeType(type) {
            this.timeType = type;
            this.getReportData();
        },
        changeYear(year) {
            this.year = year;
            if (this.timeType !== 'daily') {
                this.getReportData();
            }
        },
        changeMonth(month) {
            this.month = month;
            if (this.timeType === 'monthly') {
                this.getReportData();
            }
        },
        changeWeek(week) {
            this.weekOfYear = week;
            if (this.timeType === 'weekly') {
                this.getReportData();
            }
        },
        changeDate(date) {
            this.date = date;
            if (this.timeType === 'daily') {
                this.getReportData();
            }
        }
    },
};
</script>

<template>
    <div class="report-dashboard">
        <el-card class="report-card">
            <template v-slot:header>
                <div class="card-header">
                    <span>充电站报表信息</span>
                    <div class="time-selector">
                        <el-radio-group v-model="timeType" @change="changeTimeType" size="small">
                            <el-radio-button label="daily">日报表</el-radio-button>
                            <el-radio-button label="weekly">周报表</el-radio-button>
                            <el-radio-button label="monthly">月报表</el-radio-button>
                        </el-radio-group>

                        <!-- 日期选择器 -->
                        <div class="date-selectors">
                            <!-- 年份选择，所有报表类型都需要 -->
                            <el-date-picker
                                v-if="timeType !== 'daily'"
                                v-model="yearPickerValue"
                                type="year"
                                placeholder="选择年份"
                                :clearable="false"
                                @change="(val) => changeYear(new Date(val).getFullYear())"
                                style="width: 100px; margin-left: 10px;"
                                size="small"
                            />

                            <!-- 月份选择，仅月报表需要 -->
                            <el-date-picker
                                v-if="timeType === 'monthly'"
                                v-model="monthPickerValue"
                                type="month"
                                format="MM"
                                placeholder="选择月份"
                                :clearable="false"
                                @change="(val) => changeMonth(new Date(val).getMonth() + 1)"
                                style="width: 100px; margin-left: 10px;"
                                size="small"
                            />

                            <!-- 周选择，仅周报表需要 -->
                            <el-select
                                v-if="timeType === 'weekly'"
                                v-model="weekOfYear"
                                placeholder="选择周"
                                @change="changeWeek"
                                style="width: 100px; margin-left: 10px;"
                                size="small"
                            >
                                <el-option
                                    v-for="i in 52"
                                    :key="i"
                                    :label="`第${i}周`"
                                    :value="i"
                                />
                            </el-select>

                            <!-- 日期选择，仅日报表需要 -->
                            <el-date-picker
                                v-if="timeType === 'daily'"
                                v-model="date"
                                type="date"
                                placeholder="选择日期"
                                format="YYYY-MM-DD"
                                value-format="YYYY-MM-DD"
                                :clearable="false"
                                @change="changeDate"
                                style="width: 130px; margin-left: 10px;"
                                size="small"
                            />
                        </div>
                    </div>
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
                            <el-tag v-for="id in reportData.chargingPileIds" :key="id" style="margin-right: 8px">{{ id }}</el-tag>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <!-- 详细报表数据表格 -->
            <el-table v-if="reportList.length > 0" :data="reportList" style="width: 100%; margin-top: 20px;" border size="small">
                <el-table-column prop="pileCode" label="充电桩编号" width="80" />
                <el-table-column prop="reportTypeDesc" label="报表类型" width="80" />
                <el-table-column prop="reportDate" label="报表日期" width="100" />
                <el-table-column prop="chargingTimes" label="充电次数" width="80" />
                <el-table-column prop="chargingDuration" label="充电时长(分钟)" width="110" />
                <el-table-column prop="chargingAmount" label="充电量(度)" width="90" />
                <el-table-column prop="chargingFee" label="充电费用" width="90" />
                <el-table-column prop="serviceFee" label="服务费用" width="90" />
                <el-table-column prop="totalFee" label="总费用" width="90" />
            </el-table>
            <div v-else class="no-data">暂无报表数据</div>
        </el-card>
    </div>
</template>


<style scoped>
.report-dashboard {
    padding: 20px;
}

.report-card {
    margin-bottom: 20px;
    max-width: 900px;
    margin: 0 auto;
}

.card-header {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.time-selector {
    display: flex;
    align-items: center;
}

.date-selectors {
    display: flex;
    align-items: center;
}

.report-row {
    margin-bottom: 8px;
}

.report-item {
    display: flex;
    align-items: center;
    font-size: 14px;
}

.report-label {
    font-weight: bold;
    margin-right: 8px;
    white-space: nowrap;
}

.report-value {
    flex: 1;
}

.no-data {
    text-align: center;
    padding: 20px;
    color: #909399;
}
</style>

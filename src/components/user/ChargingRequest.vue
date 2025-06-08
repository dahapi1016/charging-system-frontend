<script>
import { ElMessage } from 'element-plus';
import { post } from '@/net';

export default {
    data() {
        return {
            requestForm: {
                chargingMode: 1,
                chargeAmount: 0,
                batteryCapacity: 0
            }
        };
    },
    methods: {
        submitRequest() {
            post('/api/charging/request', this.requestForm, (message) => {
                ElMessage.success(message);
            });
        },
        changeRequest() {
            post('/api/charging/request/change', this.requestForm, (message) => {
                ElMessage.success(message);
            });
        }, 
        cancelRequest() {
            post('/api/charging/request/cancel', (message) => {
                ElMessage.success(message);
            });
        }
    }
};
</script>

<template>
    <el-card class="request-card">
        <template #header>
            <div class="card-header">
                <span>充电请求</span>
            </div>
        </template>
        <el-form ref="requestForm" :model="requestForm" label-width="120px">
            <el-form-item label="充电模式">
                <el-radio-group v-model="requestForm.chargingMode">
                    <el-radio label="1">快充</el-radio>
                    <el-radio label="2">慢充</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="充电量(度)">
                <el-input-number v-model="requestForm.chargeAmount" :min="1" :max="200" />
            </el-form-item>
            <el-form-item label="车辆电池容量(度)">
                <el-input-number v-model="requestForm.batteryCapacity" :min="1" :max="200" />
            </el-form-item>
            <el-form-item class="form-buttons" style="text-align: center;">
                <el-button type="primary" @click="submitRequest">提交请求</el-button>
                <el-button @click="changeRequest">修改请求</el-button>
                <el-button type="danger" @click="cancelRequest">取消请求</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style scoped>
.request-card {
    max-width: 600px;
    margin: 20px auto;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.form-buttons {
    display: flex;
    justify-content: center;
}
</style>
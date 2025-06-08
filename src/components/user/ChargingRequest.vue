<script>
import { ElMessage } from 'element-plus';
import { post } from '@/net';

export default {
    data() {
        return {
            requestForm: {
                chargingMode: '',
                chargeAmount: ''
            }

        };
    },
    methods: {
        submitRequest() {
            post('/user/login', this.requestForm, (message) => {
                ElMessage.success(message);
            });
        },
        resetForm() {
            post('/user/login', this.requestForm, (message) => {
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
                    <el-radio label="快充">快充</el-radio>
                    <el-radio label="慢充">慢充</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="充电量(度)">
                <el-input-number v-model="requestForm.chargeAmount" :min="1" :max="100" />
            </el-form-item>
            <el-form-item class="form-buttons">
                <el-button type="primary" @click="submitRequest">提交请求</el-button>
                <el-button @click="resetForm">修改请求</el-button>
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
<script>
import { ElMessage } from "element-plus";
import { get, post } from "@/net";
export default {
    data() {
        return {
            chargingPiles: [
                { id: 1, status: true },
                { id: 2, status: false },
                { id: 3, status: true },
                { id: 4, status: false },
                { id: 3, status: true },
                { id: 4, status: false },
            ]
        };
    },
    mounted() {
        this.getChargingPilesStatus();  // 每次初始化该组件时调用
    },
    methods: {
        getChargingPilesStatus() {  // 获取所有充电桩id及其对应状态
            get("/api/admin/pile/status", (data, message) => {
                this.chargingPiles = data.map(item => ({
                    ...item,
                    status: item.status === 1
                }));
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
        handleStatusChange(row) {  // 一旦修改了某个充电桩的状态，就向后端发送修改请求
            post(`/api/admin/pile/${row.id}/status`, { status: row.status ? 1 : 0}, message => {
                // ElMessage.success(message);
            },
            (code, message) => {
                if (code === 400) {
                    ElMessage.error(message);
                    // 如果修改失败，恢复原状态
                    row.status = !row.status;
                } else {
                    ElMessage.warning(code + ':' + message);
                    row.status = !row.status;
                }
            });
        }
    }
};
</script>

<template>
    <div>
        <el-table :data="chargingPiles" style="width: 100%">
            <el-table-column prop="id" label="充电桩ID" width="180"></el-table-column>
            <el-table-column prop="pileCode" label="充电桩编号" width="180"></el-table-column>
            <el-table-column prop="status" label="状态" width="180">
                <template #default="{ row }">
                    <el-switch v-model="row.status" active-color="#13ce66" inactive-color="#ff4949" active-text="启动"
                        inactive-text="关闭" @change="handleStatusChange(row)">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped>
</style>
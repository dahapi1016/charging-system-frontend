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
            get("/api/charging-piles", (data, message) => {
                this.chargingPiles = data;
                ElMessage.success(message);
            });
        },
        handleStatusChange(row) {  // 一旦修改了某个充电桩的状态，就向后端发送修改请求
            // post("/api/charging-piles/update", { id: row.id, status: row.status }, message => {
            //     ElMessage.success(message);
            // });
        }
    }
};
</script>

<template>
    <div>
        <el-table :data="chargingPiles" style="width: 100%">
            <el-table-column prop="id" label="充电桩ID" width="180"></el-table-column>
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
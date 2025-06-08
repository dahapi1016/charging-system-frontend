<script>
import { ElMessage } from 'element-plus';
import { get } from '@/net';

export default {
    data() {
        return {
            chargingPiles: [
                {
                    "id": 1,
                    "vehicles": [
                        {
                            "userId": "12345",
                            "batteryCapacity": 60,
                            "requestedCharge": 30,
                            "queueDuration": 45
                        },
                        {
                            "userId": "67890",
                            "batteryCapacity": 75,
                            "requestedCharge": 50,
                            "queueDuration": 30
                        }
                    ]
                },
                {
                    "id": 2,
                    "vehicles": [
                        {
                            "userId": "11111",
                            "batteryCapacity": 70,
                            "requestedCharge": 40,
                            "queueDuration": 60
                        },
                        {
                            "userId": "22222",
                            "batteryCapacity": 80,
                            "requestedCharge": 60,
                            "queueDuration": 20
                        }
                    ]
                }
            ],
        };
    },
    mounted() {
        this.getChargingPilesWaitingVehicles();  // 每次初始化该组件时调用
    },
    methods: {
        getChargingPilesWaitingVehicles() {
            get('/api/charging-piles', (data, message) => {
                this.chargingPiles = data;
                ElMessage.success(message);
            });
        },
    },
};
</script>

<template>
    <div class="waiting-vehicles">
        <el-card v-for="pile in chargingPiles" :key="pile.id" class="charging-pile-card">
            <template #header>
                <div class="card-header">
                    <span>充电桩ID: {{ pile.id }}</span>
                </div>
            </template>
            <el-table :data="pile.vehicles" style="width: 100%">
                <el-table-column prop="userId" label="用户ID" width="180"></el-table-column>
                <el-table-column prop="batteryCapacity" label="电池总容量(度)" width="180"></el-table-column>
                <el-table-column prop="requestedCharge" label="请求充电量(度)" width="180"></el-table-column>
                <el-table-column prop="queueDuration" label="排队时长(分钟)" width="180"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style scoped>
.waiting-vehicles {
    margin: 20px;
}

.charging-pile-card {
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
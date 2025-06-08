<script>
import { ElMessage } from 'element-plus';
import { get } from '@/net';

export default {
    data() {
        return {
            queueNumber: 8,
            waitingCount: 10
        };
    },
    mounted() {
        this.getQueueInfo();  // 每次初始化该组件时调用
    },
    methods: {
        getQueueInfo() {
            get('/api/charging-piles', (data, message) => {
                this.queueNumber = data.queueNumber;
                this.waitingCount = data.waitingCount;
                ElMessage.success(message);
            });
        },
    },
};
</script>

<template>
    <el-card class="queue-card">
        <el-row>
            <el-col :span="12">
                <div class="queue-info">
                    <h3>本车排队号码</h3>
                    <p>{{ queueNumber }}</p>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="queue-info">
                    <h3>前车等待数量</h3>
                    <p>{{ waitingCount }}</p>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<style scoped>
.queue-dashboard {
    padding: 20px;
}

.queue-card {
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
    text-align: center;
}

.queue-info {
    margin: 10px 0;
    padding: 20px;
    /* 增加内边距来增加间距 */
    border: 1px solid #f0f0f0;
    /* 可选：添加边框以更清晰地看到间距效果 */
    border-radius: 8px;
    /* 可选：添加圆角使外观更柔和 */
}

.queue-info h3 {
    color: #333;
    font-size: 18px;
}

.queue-info p {
    color: #666;
    font-size: 24px;
    font-weight: bold;
}
</style>
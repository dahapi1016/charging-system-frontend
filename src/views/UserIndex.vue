<script>
import ChargingDetails from '../components/user/ChargingDetails.vue';
import ChargingRequest from '../components/user/ChargingRequest.vue';
import QueueInfo from '../components/user/QueueInfo.vue';
import { post } from "@/net";
import { ElMessage } from "element-plus";
export default {
  components: {
    ChargingDetails,   // 充电详单
    ChargingRequest,   // 充电请求
    QueueInfo          // 排队信息
  },
  data() {
    return {
      activeTab: 'ChargingDetails',  // 存储当前激活的组件名称
    };
  },
  methods: {
    endCharging() {
      post('/api/charging/end', (message) => {
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
    logout() {
      localStorage.removeItem('token')  // 移除token
      this.$router.push('/user/login');
    }
  }
};
</script>

<template>
  <div class="index-container">
    <el-card class="index-card">
      <div class="card-content">
        <h2 class="text-center">用户首页</h2>
        <el-tabs v-model="activeTab" class="index-tabs">
          <el-tab-pane label="充电详单" name="ChargingDetails"></el-tab-pane>
          <el-tab-pane label="充电请求" name="ChargingRequest"></el-tab-pane>
          <el-tab-pane label="排队信息" name="QueueInfo"></el-tab-pane>
        </el-tabs>
        <div class="tab-content">
          <component :is="activeTab" />
        </div>
        <div class="actions">
          <el-button type="danger" @click="endCharging">结束充电</el-button>
          <el-button @click="logout">退出登录</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.index-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.index-card {
  width: 1000px;
  padding: 20px;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.text-center {
  text-align: center;
}

.index-tabs {
  width: 100%;
  margin-top: 20px;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
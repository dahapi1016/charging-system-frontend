<script>

import ChargingPileControl from '../components/admin/ChargingPileControl.vue';
import ChargingPileDetails from '../components/admin/ChargingPileDetails.vue';
import WaitingVehicles from '../components/admin/WaitingVehicles.vue';
import Reports from '../components/admin/Reports.vue';

export default {
  components: {
    ChargingPileControl,  // 充电桩控制(开/关)
    ChargingPileDetails,  // 充电桩详情
    WaitingVehicles,      // 等候车辆信息
    Reports               // 报表展示
  },
  data() {
    return {
      activeTab: 'ChargingPileControl'  // 存储当前激活的组件名称
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token')  // 移除token
      this.$router.push('/admin/login');
    }
  }
};
</script>

<template>
  <div class="admin-index-container">
    <el-card class="admin-index-card">
      <div class="card-content">
        <h2 class="text-center">管理员首页</h2>
        <el-tabs v-model="activeTab" class="admin-index-tabs">
          <el-tab-pane label="充电桩控制" name="ChargingPileControl"></el-tab-pane>
          <el-tab-pane label="充电桩详情" name="ChargingPileDetails"></el-tab-pane>
          <el-tab-pane label="等候车辆信息" name="WaitingVehicles"></el-tab-pane>
          <el-tab-pane label="报表展示" name="Reports"></el-tab-pane>
        </el-tabs>
        <div class="tab-content">
          <component :is="activeTab"/>
        </div>
        <div class="actions">
          <el-button @click="logout">退出登录</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.admin-index-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.admin-index-card {
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

.admin-index-tabs {
  width: 100%;
  margin-top: 20px;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>
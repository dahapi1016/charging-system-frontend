<script>
import { ElMessage } from "element-plus";
import { post } from "@/net";

export default {
  data() {
    return {
      adminname: '',
      password: ''
    };
  },
  methods: {
    login() {
      const data = {
        adminname: this.adminname,
        password: this.password
      };
      post('/admin/login', data, (message) => {
        ElMessage.success(message);
        this.$router.push('/admin/index');
      });
    }
  }
};
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="card-content">
        <h2 class="text-center">管理员登录</h2>
        <el-form @submit.prevent="login" class="login-form">
          <el-form-item label="管理员名:">
            <el-input v-model="adminname" placeholder="请输入管理员名" />
          </el-form-item>
          <el-form-item label="密码:">
            <el-input type="password" v-model="password" placeholder="请输入密码" />
          </el-form-item>
          <el-button type="primary" class="login-button" @click="login">登录</el-button>
        </el-form>
        <p class="text-center">
          <router-link to="/user/login">普通用户登录</router-link>
        </p>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  /* 可选，添加背景色 */
}

.login-card {
  width: 400px;
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

.login-form {
  width: 100%;
  /* 确保表单宽度占满卡片 */
  margin-top: 20px;
}

.login-button {
  width: 100%;
  margin-top: 20px;
}
</style>
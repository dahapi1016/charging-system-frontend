<script>
import { login } from "@/net";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    userLogin() {
      const data = {
        username: this.username,
        password: this.password
      };
      login(data, (code, message) => {
        ElMessage.error(message);
      });
    }
  }
};
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="card-content">
        <h2 class="text-center">用户登录</h2>
        <el-form @submit.prevent="userLogin" class="login-form">
          <el-form-item label="用户名:">
            <el-input v-model="username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码:">
            <el-input type="password" v-model="password" placeholder="请输入密码" />
          </el-form-item>
          <el-button type="primary" class="login-button" @click="userLogin">登录</el-button>
        </el-form>
        <p class="text-center">
          还未注册？<router-link to="/user/register">点击这里</router-link>
        </p>
        <p class="text-center">
          <router-link to="/admin/login">管理员登录</router-link>
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
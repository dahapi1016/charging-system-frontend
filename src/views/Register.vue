<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { ElMessage } from "element-plus";
import { post } from "@/net";

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    register() {
      const data = {
        username: this.username,
        password: this.password
      };
      post('/user/register', data, (message) => {
        ElMessage.success(message);
        this.$router.push('/user/index');
      });
    }
  }
};
</script>

<template>
  <div class="register-container">
    <el-card class="register-card">
      <div class="card-content">
        <h2 class="text-center">注册</h2>
        <el-form @submit.prevent="register" class="register-form">
          <el-form-item label="用户名:">
            <el-input v-model="username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码:">
            <el-input type="password" v-model="password" placeholder="请输入密码" />
          </el-form-item>
          <el-button type="primary" class="register-button" @click="register">注册</el-button>
        </el-form>
        <p class="text-center">
          已注册？<router-link to="/user/login">点击这里</router-link>
        </p>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  /* 可选，添加背景色 */
}

.register-card {
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

.register-form {
  width: 100%;
  /* 确保表单宽度占满卡片 */
  margin-top: 20px;
}

.register-button {
  width: 100%;
  margin-top: 20px;
}
</style>
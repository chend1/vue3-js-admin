<script setup>
import { ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { login } from '@/api';
import { useMainStore } from '@/store';
import router from '@/router';
import Mouse from './Mouse.vue';

const baseStore = useMainStore();
const userInfo = ref({
  account: '',
  password: '',
});
if (import.meta.env.MODE === 'development') {
  userInfo.value.account = 'admin';
  userInfo.value.password = '123456';
}

const loginClick = async () => {
  const { token } = await login(userInfo.value);
  baseStore.setToken(token);
  await baseStore.setUserInfo();
  router.push('/');
};
</script>

<template>
  <div class="login">
    <div class="login-box">
      <div class="left">
        <Mouse></Mouse>
      </div>
      <div class="right">
        <div class="title">
          登录管理后台
        </div>
        <div class="form">
          <el-form
            :model="userInfo"
            label-width="0"
          >
            <el-form-item label="">
              <el-input
                v-model="userInfo.account"
                placeholder="请输入账号"
                size="large"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model="userInfo.password"
                placeholder="请输入密码"
                size="large"
                :prefix-icon="Lock"
                type="password"
              />
            </el-form-item>
          </el-form>
          <div class="operation">
            <el-button
              type="primary"
              style="width: 100%;color: #fff;"
              size="large"
              color="#12ADA9"
              @click="loginClick"
            >
              确认登录
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  .login-box {
    width: 900px;
    height: 520px;
    background-color: #fff;
    display: flex;
  }
  .left {
    flex: 1;
    background-color: #1ddbd5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right {
    flex: 1;
    box-sizing: border-box;
    padding: 80px 20px;
    .title {
      width: 100%;
      line-height: 50px;
      font-size: 30px;
      font-weight: 700;
      text-align: center;
    }
    .form {
      width: 100%;
      box-sizing: border-box;
      padding: 50px 80px;
      .operation{
        width: 100%;
        margin: 50px 0 30px;
      }
    }
  }
}
</style>

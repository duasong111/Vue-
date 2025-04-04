<template>
  <div class="body-login">
    <el-form ref="ruleFormRef" :model="loginForm" status-icon :rules="rules" label-width="auto" class="login-contain">
      <h1>欢迎登录</h1>
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码:" prop="pass">
        <el-input v-model="loginForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <div class="submitBtn">
        <el-form-item>
          <el-button type="primary" @click="handleLogin">
            提交
          </el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import { useAllDataStore } from '@/stores'
import { useRouter } from 'vue-router'
const ruleFormRef = ref(null)
const { proxy } = getCurrentInstance()
const store = useAllDataStore()
const router = useRouter()
const loginForm = reactive({
  username: '',
  pass: ''
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
  ],
  pass: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
})

const handleLogin = async () => {
  try {
    await ruleFormRef.value.validate()
    const res = await proxy.$api.getMenu(loginForm)
    store.updateMenuList(res.menuList)
    store.state.token = res.token
    router.push('/home')
  } catch (error) {
    console.error('登录出错:', error)
  }
}

const resetForm = () => {
  ruleFormRef.value.resetFields()
}
</script>

<style lang="scss" scoped>
.body-login {
  width: 100%;
  height: 100vh;
  background-size: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-contain {
  width: 350px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }

  :deep(.el-form-item__content) {
    justify-content: center;
  }

  .submitBtn {
    text-align: center;
  }
}
</style>
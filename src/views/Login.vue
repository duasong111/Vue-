<style lang="scss" scoped>
.body-login {
  width: 100%;
  height: 100%;
  background-size: 100%;
  overflow: hidden;
}

.login-contain {
  width: 350px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 250px auto;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>

<template>
  <div class="body-login">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules" label-width="auto"
      class="login-contain">
      <h1>欢迎登录</h1>
      <el-form-item label=" 用 户 名:" prop="username">
        <el-input v-model.number="ruleForm.username" />
      </el-form-item>
      <el-form-item label=" 密 码 :" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <div class="submitBtn">
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Submit
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </div>

    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const ruleFormRef = ref()

    const checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the username'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'))
        } else {
          if (value < 18) {
            callback(new Error('Username must be greater than 18'))
          } else {
            callback()
          }
        }
      }, 1000)
    }

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (ruleForm.checkPass !== '') {
          if (!ruleFormRef.value) return
          ruleFormRef.value.validateField('checkPass')
        }
        callback()
      }
    }

    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }

    const ruleForm = reactive({
      pass: '',
      checkPass: '',
      username: '',
    })

    const rules = reactive({
      pass: [{ validator: validatePass, trigger: 'blur' }],
      checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      username: [{ validator: checkUsername, trigger: 'blur' }],
    })

    const submitForm = (formEl) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!')
        }
      })
    }

    const resetForm = (formEl) => {
      if (!formEl) return
      formEl.resetFields()
    }

    // 返回给模板使用的变量和方法
    return {
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      resetForm
    }
  }
}
</script>

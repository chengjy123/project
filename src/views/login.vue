<template>
  <el-form :model="userForm" ref='form' class="formStyle">
             <h3 class="title">登录系统首页</h3>
            <el-form-item prop="userName">
                 <el-input v-model="userForm.userName" class="inputStyle" type="text"  placeholder="账号"></el-input>
             </el-form-item>
             <el-form-item prop="userPassword">
                 <el-input v-model="userForm.userPassword" class="inputStyle" type="password" placeholder="密码"></el-input>
             </el-form-item>
             <el-form-item>
                 <el-button @click="login" type="primary" class="buttonStyle" >登录</el-button>
             </el-form-item>
         </el-form>
</template>

<script>
import UserApi from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      userForm: {
        userName: '',
        userPassword: ''
      }
    }
  },
  methods: {
    async login () {
      if (this.userForm.userName === '') {
        this.$message({
          message: '请输入用户名',
          type: 'info'
        })
        return
      }
      if (this.userForm.userPassword === '') {
        this.$message({
          message: '请输入密码',
          type: 'info'
        })
        return
      }
      let data = this.userForm
      let result = await UserApi.login(data)
      if (result.data.code === 1) {
        sessionStorage.setItem('access-token', 'success')
        this.$router.push({path: '/manager'})
        this.userForm = {
          userPassword: '',
          userName: ''
        }
        this.$message({
          message: result.data.msg,
          type: 'success'
        })
      } else {
        this.$message({
          message: data.data.msg,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
  .inputStyle{
    width: 300px
  }
  .buttonStyle{
    width:70px;
  }
  .formStyle{
    text-align: center
  }
</style>

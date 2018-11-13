<template>
  <el-form :model="userForm" ref='form' lable-position='left' lable-width='0px' class='demo-ruleForm login-container'>
             <h3 class="title">登录系统首页</h3>
            <el-form-item prop="userName">
                 <el-input v-model="userForm.userName" style="width: 300px" type="text" auto-complete="off" placeholder="账号"></el-input>
             </el-form-item>
             <el-form-item prop="userPassword">
                 <el-input v-model="userForm.userPassword" style="width: 300px" type="password" auto-complete="off" placeholder="密码"></el-input>
             </el-form-item>
             <el-form-item style="width:100%;">
                 <el-button @click="login" type="primary" style="width:70px;" >登录</el-button>
             </el-form-item>

         </el-form>
</template>

<script>
  import UserApi from '@/api/user/user'
  export default {
    name: 'login'
    ,
    data(){
      return {
        userForm:{
          userName :'',
          userPassword:''
        }
    }
    },
    methods:{
      login(){
        if(this.userForm.userName==''){
          this.$message({
            message:'请输入用户名',
            type:'info'
          });
          return
        }
        if(this.userForm.userPassword==''){
          this.$message({
            message:'请输入密码',
            type:'info'
          });
          return
        }
        let data = this.userForm
        UserApi.login(data).then(async data=>{
          if(data.data.code == 1){
            sessionStorage.setItem('access-token',"success");
            this.$router.push({path:'/manager'});
            this.userForm.userPassword = null
            this.userForm.userName = null
            this.$message({
              message:data.data.msg,
              type:'success'
            });
          }else{
            this.$message({
              message:data.data.msg,
              type:'error'
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>

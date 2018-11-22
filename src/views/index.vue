<template>
  <div>
    <el-row class="el-row">
      <el-col :span="4" class="el-col">
        <el-menu router
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
        class="el-menu">
          <el-menu-item index="index"><i></i>首页</el-menu-item>
          <!--<el-submenu index="2">-->
            <!--<template slot="title"><i></i>后台管理</template>-->
            <!--<el-menu-item index="user">用户列表</el-menu-item>-->
          <!--</el-submenu>-->
          <el-menu-item index="user-index">用户列表</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>
<style>
  .el-row{
    height: 100%
  }
  .el-menu{
    height: 580px;
    text-align: center
  }
</style>

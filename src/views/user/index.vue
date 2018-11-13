<template>
  <div>
    <OrgForm @queryUser="queryUser"></OrgForm>
    <div style="float:left;width:80%;height:100%">
      <div style="text-align: right;margin-bottom: 10px">
        <el-button type="primary" @click="openDialog">新增</el-button>
      </div>
      <el-table border :data="userData">
        <el-table-column label="用户名" prop="userName"></el-table-column>
        <el-table-column label="密码" prop="userPassword"></el-table-column>
        <el-table-column label="组织名" prop="orgName"></el-table-column>
        <el-table-column label="操作" prop="userId">
          <tamplate slot-scope="scope">
            <el-button @click="update(scope.row)" type="success">
              修改
            </el-button>
            <el-button @click="remove(scope.row.userId)" type="danger">
              删除
            </el-button>
          </tamplate>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="pageChange">
        </el-pagination>
      </div>
      <UserForm :visible.sync="visible" @success="loadData" :optionData.sync="optionData" :updateData="updateData" :title="title"></UserForm><!--用":"表示为变量，否则为字符串-->
    </div>
  </div>
</template>
<script>
import UserForm from './form.vue'
import OrgForm from '@/views/org/index.vue'
import UserApi from '@/api/user/user'
import OrgApi from '@/api/org/org'

export default {
  components: {UserForm,OrgForm},
  props:{
  },
  data () {
    return {
      count: 1,
      visible: false,
      title: '',
      userData: [], // 必须声明
      total: 0,
      optionData:{
        orgId :'',
        orgName:''
      },
      updateData: {
        userId: '',
        userName: '',
        userPassword: '',
        orgId: ''
      },
      query: {
        pageNumber: 0,
        pageSize: 0,
        userName: '',
        orgId: ''
      },
      rules: {
        orgName: {
          required: true, message: '请输入组织名'
        },
        orgShortName: {
          required: true, message: '请输入组织简称'
        }
      }
    }
  },
  async mounted () {
    // this.loadData()
  },
  methods: {
    async loadData () {
      let resp = await UserApi.paging(this.query)
      this.userData = resp.data.list
      this.total = resp.data.pageCount
    },
    async openDialog () {
      let ret = await OrgApi.data('')
      this.optionData = ret.data
      this.visible = true
      this.title = '新增用户'
    },
    remove (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        let resp = await UserApi.remove(id)
        if (resp.data.code === 1) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    update (user) {
      this.updateData = user
      this.visible = true
      this.title = '修改用户'
    },
    pageChange (page) {
      this.query.pageNumber = page
      this.loadData()
    },
    queryUser(data){
      this.query.orgId = data
      this.loadData()
    }
  }
}
</script>
<style>
</style>

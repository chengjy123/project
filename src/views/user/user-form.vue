<template>

  <el-dialog
    :visible.sync="visible"
    :title="title"
  >
    <div>
      <el-form ref="form" label-width="100px" :model="userForm" :rules="rules">
        <el-input v-model="userForm.userId" type="hidden"></el-input>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input type="password" v-model="userForm.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="组织ID" prop="orgId">
          <el-select v-model="userForm.orgId" clearable placeholder="请选择">
            <el-option key="0" label="请选择" value="0"></el-option>
            <el-option
              v-for="item in orgData"
              :key="item.orgId"
              :label="item.orgName"
              :value="item.orgId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="closeDialog">关闭</el-button>
    </div>
</el-dialog>

</template>
<script>
import UserApi from '@/api/user'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    formData: {
      type: Object
    },
    orgData: {
      type: Object
    },
    orgId: {
      type: String
    },
    flag: {
      type: Number
    }
  },
  watch: {
    visible (val) {
      this.userForm = {
        userName: null,
        userPassword: null
      }
      this.userForm.orgId = this.orgId
      if (this.formData.userId) {
        this.userForm = this.formData
      }
      if (!val) {
        this.$emit('update:visible', false)
        if (this.title === '新增用户') {
          this.userForm = {
            userName: null,
            userPassword: null
          }
          this.$refs['form'].resetFields()
        }
      }
    }
  },
  async mounted () {

  },
  data () {
    return {
      rules: {
        userName: {
          required: true, message: '请输入用户名'
        },
        userPassword: {
          required: true, message: '请输入密码'
        },
        orgId: {
          required: true, message: '请选择组织'
        }
      },
      userForm: {
        userName: null,
        userPassword: null,
        orgId: '',
        userId: ''
      }
    }
  },
  methods: {
    save () {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          debugger
          let record = null
          if (this.userForm.userId) {
            record = await UserApi.modifyUser(this.userForm)
          } else {
            record = await UserApi.createUser(this.userForm)
          }
          if (record.data.code === 1) {
            this.closeDialog()
            this.$emit('success')
            this.$message({
              message: record.data.msg,
              type: 'success'
            })
          }
        }
      })
    },
    closeDialog () {
      this.visible = false
    }
  }
}
</script>

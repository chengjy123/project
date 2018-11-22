<template>
  <div>
    <el-button type="primary" size="mini" @click="addNode">新增组织</el-button>
    <el-tree
      :props="treeProps"
      :load="loadNode"
      :check-on-click-node="false"
      :check-strictly="true"
      :data="treeData"
      node-key="orgId"
      default-expand-all
      :expand-on-click-node="false"
      ref="tree"
      lazy
      accordion
      @node-click="nodeClick">
        <span slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button icon="el-icon-edit"
            type="text"
            size="mini"
            @click="() => updateNode(data)">
          </el-button>
          <el-button icon="el-icon-delete"
            type="text"
            size="mini"
            @click="() => deleteNode(node, data)">
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog :title="treeTitle" :visible.sync="showFlag">
      <div>
        <el-form ref="treeForm" label-width="100px" :model="treeForm" :rules="rules">
          <el-input v-model="treeForm.orgId" type="hidden"></el-input>
          <el-form-item label="组织名" prop="orgName">
            <el-input v-model="treeForm.orgName"></el-input>
          </el-form-item>
          <el-form-item label="组织简称" prop="orgShortName">
            <el-input v-model="treeForm.orgShortName"></el-input>
          </el-form-item>
          <el-form-item label="所属组织" prop="parentId">
            <el-select :disabled="disabled" v-model="treeForm.parentId" clearable placeholder="请选择">
              <el-option key="0" label="请选择" value="0"></el-option>
              <el-option
                v-for="item in treeOrg"
                :key="item.orgId"
                :label="item.orgName"
                :value="item.orgId"
                :data="treeOrg">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="saveOrg">保存</el-button>
        <el-button type="primary" @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import OrgApi from '@/api/org'
export default {
  data () {
    return {
      disabled: false,
      treeProps: {
        label: 'orgName',
        children: 'child',
        isLeaf: 'leaf'
      },
      treeOrg: {
        orgId: '',
        orgName: ''
      },
      treeData: [],
      visible: false,
      treeTitle: '',
      showFlag: false,
      title: '',
      treeForm: {
        orgId: '',
        orgName: '',
        orgShortName: '',
        parentId: ''
      },
      org: {
        orgId: '',
        orgName: '',
        parentId: ''
      },
      orgId: '',
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
    let list = await OrgApi.getOrgs('')
    this.treeOrg = list.data
  },
  methods: {
    async loadNode (node, resolve) {
      let treeData = []
      let res = []
      if (node.level === 0) {
        res = await OrgApi.getOrgs(0)
      } else {
        res = await OrgApi.getOrgs(node.data.orgId)
      }
      res.data.forEach(e => {
        treeData.push(e)
      })
      this.org = treeData
      resolve(treeData)
    },
    nodeClick (org, node, component) {
      this.$emit('queryUser', org.orgId)
    },
    addNode () {
      this.treeForm = {
        orgName: null,
        orgShortName: null,
        parentId: null,
        orgId: null
      }
      this.showFlag = true
      this.treeTitle = '新增树节点'
      this.disabled = false
    },
    saveOrg () {
      this.$refs['treeForm'].validate(async valid => {
        if (valid) {
          debugger
          let record = []
          if (this.treeForm.orgId !== null && this.treeForm.orgId !== '') {
            record = await OrgApi.modifyOrg(this.treeForm)
          } else {
            record = await OrgApi.createOrg(this.treeForm)
          }
          if (record.data.code === 1) {
            this.showFlag = false
            this.$message({
              message: record.data.msg,
              type: 'success'
            })
            this.loadTree()
          }
        }
      })
    },
    deleteNode (node, data) {
      this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        debugger
        let resp = await OrgApi.removeOrg(data.orgId)
        if (resp.data.code === 1) {
          this.$message({
            type: 'success',
            message: resp.data.msg
          })
          this.loadTree()
        } else {
          this.$message({
            type: 'info',
            message: resp.data.msg
          })
        }
      }).catch(async () => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updateNode (data) {
      this.showFlag = true
      this.treeTitle = '修改树节点'
      this.treeForm = {
        orgId: data.orgId,
        orgName: data.orgName,
        orgShortName: data.orgShortName,
        parentId: data.parentId
      }
      this.disabled = true
    },
    close () {
      this.showFlag = false
    },
    async loadTree () {
      let res = await OrgApi.getOrgs(0)
      let treeData = []
      res.data.forEach(e => {
        treeData.push(e)
      })
      this.treeData = treeData
      let list = await OrgApi.getOrgs('')
      this.treeOrg = list.data
      this.$refs['treeForm'].resetFields()
    }
  }
}
</script>

<style scoped>
</style>

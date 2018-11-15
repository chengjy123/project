<template>
  <div style="float:left;width:20%;">
    <el-button style="position: relative;left: -70px" type="primary" size="mini" @click="addNode">新增组织</el-button>
    <el-tree
      :props="props1"
      :load="loadNode"
      :check-on-click-node="false"
      :check-strictly="true"
      :data="tData"
      node-key="orgId"
      :expand-on-click-node="false"
      ref="tree"
      lazy
      accordion
      @node-click="nodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button icon="el-icon-edit"
            type="text"
            size="mini"
            @click="() => checkedNode(data)">
          </el-button>
          <el-button icon="el-icon-delete"
            type="text"
            size="mini"
            @click="() => deleteNode(node, data)">
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog :title="treeTitle" :visible.sync="showFlag" style="width:900px">
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
                v-for="item in treeOptions"
                :key="item.orgId"
                :label="item.orgName"
                :value="item.orgId"
                :data="treeOptions">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="saveTree">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import OrgApi from '@/api/org/org'
  export default {
    data () {
      return {
        disabled:false,
        props1: {
          label: 'orgName',
          children: 'child',
          isLeaf: 'leaf'
        },
        treeOptions:{
          orgId :'',
          orgName:''
        },
        tData:[],
        visible: false,
        treeTitle:'',
        showFlag: false,
        title: '',
        treeForm:{
          orgId:'',
          orgName: '',
          orgShortName: '',
          parentId: ''
        },
        org: {
          orgId:'',
          orgName:'',
          parentId:''
        },
        orgId:'',
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
      let list = await OrgApi.data('')
      this.treeOptions =  list.data
    },
    methods: {
      async loadNode(node, resolve) {
        if  (node.level == 0) {
          await OrgApi.data(0).then(res => {
            let treeData = []
            res.data.forEach(e => {
              treeData.push(e)
            })
            this.org = treeData
            resolve(treeData);
          }).catch(res => {
            resolve([]);
          })
        }else{
          await OrgApi.data(node.data.orgId).then(res => {
            let myList = [];
            res.data.forEach(e => {
              myList.push(e)
            })
            this.org = myList
            resolve(myList);
          }).catch(res => {
            resolve([]);
          })
        }
      },
      nodeClick(org,node,component) {
        this.$emit("queryUser",org.orgId)
      },
      addNode(){
        this.treeForm.orgName = null
        this.treeForm.orgShortName = null
        this.treeForm.parentId = null
        this.treeForm.orgId = null
        this.showFlag = true
        this.treeTitle='新增树节点'
        this.disabled = false
        debugger
      },
      saveTree (){
        this.$refs['treeForm'].validate(async valid => {
          if (valid) {
            if(this.treeTitle=='修改树节点') {
              let record = await OrgApi.modify(this.treeForm)
              if (record.data.code === 1) {
                this.showFlag = false
                this.$message({
                  message: record.data.msg,
                  type: 'success'
                })
                let res = await OrgApi.data(0)
                let treeData = []
                res.data.forEach(e => {
                  treeData.push(e)
                })
                this.tData = treeData
                let list = await OrgApi.data('')
                this.treeOptions =  list.data
                this.$refs['treeForm'].resetFields()
              }
            }else{
              let record = await OrgApi.create(this.treeForm)
              if (record.data.code === 1) {
                this.showFlag = false
                this.$message({
                  message: record.data.msg,
                  type: 'success'
                })
                let res = await OrgApi.data(0)
                let treeData = []
                res.data.forEach(e => {
                  treeData.push(e)
                })
                this.tData = treeData
                let list = await OrgApi.data('')
                this.treeOptions =  list.data
                this.$refs['treeForm'].resetFields()
              }
            }
          }
        })
      },
      deleteNode (node, data){
        this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
          let resp = await OrgApi.remove(data.orgId)
          if (resp.data.code === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            let res = await OrgApi.data(0)
            let treeData = []
            res.data.forEach(e => {
              treeData.push(e)
            })
            this.tData = treeData
            let list = await OrgApi.data('')
            this.treeOptions =  list.data
            this.$refs['treeForm'].resetFields()
          }else{
            this.$message({
              type: 'info',
              message: resp.data.msg
            })
          }
        }).catch(async () => {
          debugger
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      checkedNode(data){
        debugger
        this.showFlag = true
        this.treeTitle='修改树节点'
        this.treeForm.orgId = data.orgId
        this.treeForm.orgName = data.orgName
        this.treeForm.orgShortName = data.orgShortName
        this.treeForm.parentId = data.parentId
        this.disabled = true
      }
    }
  }
</script>

<style scoped>

</style>

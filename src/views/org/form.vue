<template>
  <div>
    <div style="float:left;width:80%;height:100%">
      <el-table border :data="orgData">
        <el-table-column label="组织名" prop="orgName"></el-table-column>
        <el-table-column label="组织简称" prop="orgShortName"></el-table-column>
        <el-table-column label="所属组织" prop="parentId" :formatter="formatter"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import OrgApi from '@/api/org/org'
  export default {
    methods: {
      async loadData () {
        let resp = await OrgApi.data('')
        this.orgData = resp.data
      },
      formatter (row, column){
        debugger
        return '1'
      }
    },
    data(){
      return {
        orgData:[]
      }
    },
    async mounted(){
      this.loadData()
    }
  }
</script>

<style scoped>

</style>

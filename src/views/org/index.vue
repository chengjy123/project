<template>
  <div>
    <div>
      <el-table border :data="orgData">
        <el-table-column class="columnStyle" label="组织名" prop="orgName"></el-table-column>
        <el-table-column class="columnStyle" label="组织简称" prop="orgShortName"></el-table-column>
        <el-table-column class="columnStyle" label="所属组织" prop="parentId" :formatter="formatter"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import OrgApi from '@/api/org'
export default {
  methods: {
    async loadData () {
      let resp = await OrgApi.getOrgs('')
      this.orgData = resp.data
    },
    formatter (row, column) {
      let data = this.orgData
      for (let i = 0; i < data.length; i++) {
        if (data[i].orgId === row.parentId) {
          return data[i].orgName
        } else {
          return '无'
        }
      }
    }
  },
  data () {
    return {
      orgData: []
    }
  },
  async mounted () {
    this.loadData()
  }
}
</script>

<style scoped>
  .columnStyle{
    align :'center'
  }
</style>

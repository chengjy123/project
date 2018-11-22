import axios from 'axios'
export default {
  getOrgs: async (parentId) => {
    let resp = await axios.get(`/api/orgs/?parentId=${parentId}`)
    return resp
  },
  createOrg: async (org) => {
    let resp = await axios.post('/api/orgs/', org)
    return resp
  },
  removeOrg: async (orgId) => {
    let resp = await axios.delete(`/api/orgs/${orgId}`)
    return resp
  },
  modifyOrg: async (org) => {
    let resp = await axios.put(`/api/orgs/${org.orgId}`, org)
    return resp
  }
}

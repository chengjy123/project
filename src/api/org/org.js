import axios from 'axios'
export default {
  data: async (parentId) => {
    let resp = await axios.get(`/api/orgs/?parentId=${parentId}`)
    return resp
  },
  create: async (org) => {
    let resp = await axios.post('/api/orgs/', org)
    return resp
  },
  remove: async (id) => {
    let resp = await axios.delete(`/api/orgs/${id}`)
    return resp
  },
  modify: async (org) => {
    let resp = await axios.put(`/api/orgs/${org.orgId}`, org)
    return resp
  }
}

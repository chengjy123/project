import axios from 'axios'

export default {
  paging: async ({pageSize, pageNumber, userName,orgId}) => {
    let resp = await axios.get(`/api/users/?pageSize=${pageSize}&orgId=${orgId}&pageNumber=${pageNumber}&userName=${userName}`)
    return resp
  },
  create: async (user) => {
    let resp = await axios.post('/api/users/', user)
    return resp
  },
  remove: async (id) => {
    let resp = await axios.delete(`/api/users/${id}`)
    return resp
  },
  modify: async (user) => {
    let resp = await axios.put(`/api/users/${user.userId}`, user)
    return resp
  },
  login:async (user) =>{
    let resp = await axios.post('/api/users/actions/login/',user)
    return resp
  }
}

import axios from "axios";
//团队管理
export const pageTeam = (params) => {
    return axios.get('/attackTeam', { params })
}
export const oneTeam = (params) => {
    return axios.get('/attackTeam/list', { params })
}
export const saveTeam = (params) => {
    return axios.post('/attackTeam', params)
}
export const delTeam = (params) => {
    return axios.delete('/attackTeam', { params })
}
import axios from "axios";
//角色列表
export const oneRoles = (params) => {
    return axios.get('/manage/role/getOne', { params })
}
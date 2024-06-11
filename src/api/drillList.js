import axios from 'axios'
// 演练列表
export const pageDrill = (params) => {
  return axios.get('/manage/drillList/listPage', { params })
}
export const oneDrill = (params) => {
  return axios.get('/manage/drillList/getOne', { params })
}
export const saveDrill = (params) => {
  return axios.post('/manage/drillList/save', params)
}
// 人员管理
export const pageStaff = (params) => {
  return axios.get('/manage/user/page', { params })
}
export const saveStaff = (params) => {
  return axios.put('/manage/user', params)
}
export const delStaff = (params) => {
  // let _id = params

  return axios.delete('/manage/user/' + `${params}`)
}

// export const oneStaff = (params) => {
//     return axios.get('/manage/user/getOne', { params })
// }
// 目标系统管理
export const pageTarget = (params) => {
  return axios.get('/manage/targetSystem/listPage', { params })
}
export const oneTarget = (params) => {
  return axios.get('/manage/targetSystem/getOne', { params })
}
export const saveTarget = (params) => {
  return axios.post('/manage/targetSystem/save', params)
}
export const delTarget = (params) => {
  // console.log(params);
  const _params = new URLSearchParams()
  _params.append('ids', params.id)
  return axios.post('/manage/targetSystem/del', _params)
}
// 攻击成果列表
export const pageAttack = (params) => {
  return axios.get('/manage/achievementsBug/listPage', { params })
}
export const oneAttack = (params) => {
  return axios.get('/manage/achievementsBug/getOne', { params })
}
export const delAttack = (params) => {
  // console.log(params);
  const _params = new URLSearchParams()
  _params.append('ids', params.id)
  return axios.post('/manage/achievementList/del', _params)
}
// export const saveAttack = (params) => {
//     return axios.post('/manage/achievementList/save', params)
// }

// 防御成果列表
export const pageDefense = (params) => {
  return axios.get('/manage/achievementsDefense/listPage', { params })
}
export const oneDefense = (params) => {
  return axios.get('/manage/achievementsDefense/getOne', { params })
}
export const delDefense = (params) => {
  // console.log(params);
  const _params = new URLSearchParams()
  _params.append('ids', params.id)
  return axios.post('/manage/achievementsDefense/del', _params)
}
// 0-Day漏洞列表
export const pageBug = (params) => {
  return axios.get('/manage/achievementsBug/listPage', { params })
}
export const oneBug = (params) => {
  return axios.get('/manage/achievementsBug/getOne', { params })
}
export const delBug = (params) => {
  // console.log(params);
  const _params = new URLSearchParams()
  _params.append('ids', params.id)
  return axios.post('/manage/achievementsBug/del', _params)
}
// 攻击日志管理

export const pageLog = (params) => {
  return axios.get('/manage/attcakLog/listPage', { params })
}
export const oneLog = (params) => {
  return axios.get('/manage/attcakLog/getOne', { params })
}
export const delLog = (params) => {
  // console.log(params);
  const _params = new URLSearchParams()
  _params.append('ids', params.id)
  return axios.post('/manage/attcakLog/del', _params)
}

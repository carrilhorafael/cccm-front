import axios from "axios";


export const api = axios.create({
  baseURL: "https://cccm-back.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ""
  }
})

export function postLogin(loginData){
  return api.post("auth/login", loginData)
}

export function getChurches(){
  return api.get("churches/")
}

export function getValidateToken (token) {
  api.defaults.headers.Authorization = token
  return api.get("validate_user")
}

export function postResetPassword (data) {
  return api.post('auth/reset', data)
}

export function getChurchUsers(churchId) {
  return api.get(`churches/${churchId}/users`)
}

export function getChurchMinisteries(churchId) {
  return api.get(`churches/${churchId}/ministeries`)
}

export function getChurchResume(churchId) {
  return api.get(`churches/${churchId}/resume`)
}

export function getChurchProselytes(churchId) {
  return api.get(`churches/${churchId}/proselytes`)
}

export function postChurchUser(churchId, userParams) {
  return api.post(`churches/${churchId}/users`, userParams)
}

export function postChurchMinistery(churchId, ministeryParams) {
  return api.post(`churches/${churchId}/ministeries`, ministeryParams)
}

export function postCultProselyte(cultId, proselyteParams) {
  return api.post(`cults/${cultId}/proselytes`, proselyteParams)
}

export function postChurchCult(churchId, cultDate) {
  return api.post(`churches/${churchId}/cults`, {
    cult: {
      date_of: cultDate,
      responsible_name: "Pr Julio"
    }
  })
}

export function postChurch(churchParams) {
  return api.post("churches", churchParams)
}

export function putChurch(churchId, churchParams) {
  return api.put(`churches/${churchId}`, churchParams)
}

export function deleteChurch(churchId) {
  return api.delete(`churches/${churchId}`)
}

export function deleteUser(userId) {
  return api.delete(`users/${userId}`)
}

export function putUser(userId, userParams){
  return api.put(`users/${userId}`, userParams)
}

export function deleteMinistery(ministeryId) {
  return api.delete(`ministeries/${ministeryId}`)
}

export function putMinistery(ministeryId, ministeryParams) {
  return api.put(`ministeries/${ministeryId}`, ministeryParams)
}

export function putProselyte(proselyteId, proselyteParams) {
  return api.put(`proselyte/${proselyteId}`, proselyteParams)
}

export function deleteProselyte(proselyteId) {
  return api.delete(`proselyte/${proselyteId}`)
}

export function getMemberCard(userId) {
  window.open(`${api.defaults.baseURL}/users/${userId}/member_card`)
}

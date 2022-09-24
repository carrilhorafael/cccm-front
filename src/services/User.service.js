import { api } from "services/Api.service";

export function getUsers(churchId, params) {
  return api.get(`churches/${churchId}/users`, {
    params
  })
}
export function postUser(churchId, userParams) {
  return api.post(`churches/${churchId}/users`, userParams)
}
export function destroyUser(userId) {
  return api.delete(`users/${userId}`)
}
export function putUser(userId, userParams){
  return api.put(`users/${userId}`, userParams)
}
export function putFilter(filterParams) {
  return api.put(`current_user/filter`, filterParams)
}
export function getMemberCard(userId) {
  window.open(`${api.defaults.baseURL}/users/${userId}/member_card`)
}
export function getFilter() {
  return api.get(`/current_user/filter`)
}

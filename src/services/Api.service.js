import axios from "axios";


export const api = axios.create({
  baseURL: "https://cccm-back.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ""
  }
})

export function postLogin(userData){
  return api.post("auth/login", userData)
}

export function getValidateUser(){
  return api.get("validate_user")
}

export function getUsers(){
  return api.get("users")
}

export function getChurch(id) {
  return api.get("churches/" + id)
}
export function getChurches() {
  return api.get("churches/")
}

export function deleteUser(id) {
  return api.delete("users/" + id)
}

export function postUser (churchId, userParams) {
  return api.post(`churches/${churchId}/users`, userParams)
}
export function updateUser (id, userParams) {
  return api.put(`users/${id}`, userParams)
}
export function grantUserAccess(id, accessParams) {
  return api.put(`users/${id}/grant_access`, accessParams)
}

export function revokeUserAccess(id) {
  return api.put(`users/${id}/revoke_access`)
}
export function postMinistery(church_id, ministeryParams) {
  return api.post(`churches/${church_id}/ministeries`, ministeryParams)
}
export function updateMinistery(id, ministeryParams) {
  return api.put(`ministeries/${id}`, ministeryParams)
}

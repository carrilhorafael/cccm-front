import axios from "axios";


export const api = axios.create({
  baseURL: "https://cccm-back.herokuapp.com/",
  Headers: {
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

export function deleteUser(id){
  return api.delete("users/" + id)
}

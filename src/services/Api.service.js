import axios from "axios";


export const api = axios.create({
  baseURL: "https://cccm-back.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ""
  }
})


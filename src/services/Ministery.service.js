import { api } from "./Api.service";

export function getChurchMinisteries(churchId) {
  return api.get(`churches/${churchId}/ministeries`)
}

export function postChurchMinistery(churchId, ministeryParams) {
  return api.post(`churches/${churchId}/ministeries`, ministeryParams)
}

export function deleteMinistery(ministeryId) {
  return api.delete(`ministeries/${ministeryId}`)
}

export function putMinistery(ministeryId, ministeryParams) {
  return api.put(`ministeries/${ministeryId}`, ministeryParams)
}

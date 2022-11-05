import showToast from "./showToast";

export default async function handleRequestErrors (error) {

  if (error.response) {
    if (error.response.status >= 500) {
      showToast('negative', 'Houve um erro em nosso servidor.')
      return Promise.reject(error)
    } else {
      console.log(error.response)
      return Promise.resolve(error.response.data)
    }
  }
  else {
    console.error(error)
    return Promise.reject(error)
  }
}

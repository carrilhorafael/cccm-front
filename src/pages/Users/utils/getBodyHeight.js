export const getBodyHeight = (resource) => {
  let height = 216

  if (resource.ministeries.length !== 0) {
    height = height + 52
  }

  if (!!resource.notes) {
    height = height + 52
  }

  if (resource.has_access) {
    height = height + 12
  }

  return height
}

export const numberWithTwoDigits = (number) => {
  return number < 10 ? `0${number}` : `${number}`
}

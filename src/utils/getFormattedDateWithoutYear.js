export default function getFormattedDateWithoutYear(date) {
  const data_splitted = date.split("-")
  return data_splitted[2] + "/" + data_splitted[1]
}

export default function getFormattedDate(date) {
  const data_splitted = date.split("-")
  return data_splitted[2] + "/" + data_splitted[1] + "/" + data_splitted[0]
}

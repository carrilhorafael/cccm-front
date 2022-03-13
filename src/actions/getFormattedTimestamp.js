import getFormattedDate from "./getFormattedDate"

export default function getFormattedTimestamp (time) {
  const time_splitted = time.split("T")
  const data = getFormattedDate(time_splitted[0])
  return `${data} - ${time_splitted[1].split(".")[0]}`
}

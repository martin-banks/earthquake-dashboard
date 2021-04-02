import addOrdinal from './add-ordinals'

function displayDate (time) {
  const date = new Date(time)
  const days = date.getDate()
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  let hours = date.getHours()
  if (hours > 12) {
    hours -= 12
  }
  const minutes = `0${date.getMinutes()}`.slice(-2)

  return `${addOrdinal(days)} ${month} ${year}. At ${hours}:${minutes} ${hours >= 12 ? 'pm' : 'am'}`
}

export default displayDate

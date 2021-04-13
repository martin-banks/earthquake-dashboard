// import addOrdinal from './add-ordinals'

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
  // const month = months[date.getMonth()]
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  // return `${addOrdinal(days)} ${month} ${year}`
  return `${days}/${month}/${year}`
}

export default displayDate

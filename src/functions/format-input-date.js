function formatInputDate (rawDate) {
  const d = new Date(rawDate)
  const year = d.getFullYear()
  const month = `0${d.getMonth() + 1}`.slice(-2)
  const day = `0${d.getDate()}`.slice(-2)

  return `${year}-${month}-${day}`
}

export default formatInputDate

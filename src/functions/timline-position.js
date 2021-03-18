
function timelinePosition (props) {
  const {
    from,
    to,
    time,
  } = props

  const offset = time - from
  const range = to - from

  const position = offset / range

  return position * 100

}

export default timelinePosition

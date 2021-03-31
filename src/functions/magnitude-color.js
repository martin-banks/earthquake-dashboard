
function magnitudeColor ({ mag, alpha }) {

  // HSL range
  // 0 - 60
  // red - yellow
  return `hsla(${60 - ((mag + 3) / 13 * 60)}, 100%, 50%, ${alpha || 1})`

}

export default magnitudeColor


function convert ({ lat, long }) {
  // ? In order to use LAT and LONG to plot items on a THREE.js sphere,
  // ? they must first be converted to the appropriate angles represent
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (long + 180) * (Math.PI / 180)

  // ? These angles can then be used to calculate the x, y, z coords
  // ? used to plot them in 3d space as a child of a parent model (shpere)
  // ? These coords are relative to the center of the parent
  const x = -1 * Math.sin(phi) * Math.cos(theta)
  const y = Math.cos(phi)
  const z = Math.sin(phi) * Math.sin(theta)

  return {
    lat,
    long,
    phi,
    theta,
    x,
    y,
    z,
  }
}

 export default convert

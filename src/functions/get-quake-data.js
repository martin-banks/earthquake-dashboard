
function quakeData ({ dateFrom, dateTo }) {
  const endpoint = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${dateFrom}&endtime=${dateTo}`

  return new Promise ((resolve, reject) => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const felt = data.features.filter(f => f.properties.felt)
        const tsunami = data.features.filter(f => f.properties.tsunami)

        const dates = data.features.map(f => f.properties.time)
        const from = Math.min(...dates)
        const to = Math.max(...dates)
        const range = to - from

        const dateRange = { from, to, range }
        const timelineRange = {
          from: new Date(new Date(from).setHours(0,0,0,0)),
          to: new Date((to + 1)).setHours(0,0,0,0),
        }

        resolve({
          success: true,
          dateRange,
          timelineRange,
          felt,
          tsunami,
          events: data.features,
          data,
        })
      })
      .catch(error => {
        console.log('raw error', error)
        reject({
          success: false,
          message: 'Error fetching data',
          error: `${error}`,
        })
      })
  })
}

export default quakeData

import { useState, useEffect } from 'react'

import getQuakeData from '../functions/get-quake-data'

const initialEndDate = new Date(new Date().setHours(0, 0, 0, 0)) // midnight today
const initialStartDate = new Date(new Date().setDate(initialEndDate.getDate() - 7))

function useQuakeData () {
  const [ data, storeData ] = useState(null)
  const [ events, storeEvents ] = useState(null)
  const [ dates, setDates ] = useState({
    start: initialStartDate,
    end: initialEndDate,
  })
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)


  useEffect(() => {
    console.log('date change detected', dates)
    setLoading(true)

    const monthFrom = `0${dates.start.getMonth() + 1}`.slice(-2)
    const dayFrom = `0${dates.start.getDate()}`.slice(-2)
    const yearFrom = dates.start.getFullYear()

    const monthTo = `0${dates.end.getMonth() + 1}`.slice(-2)
    const dayTo = `0${dates.end.getDate()}`.slice(-2)
    const yearTo = dates.end.getFullYear()

    const dateFrom = `${yearFrom}-${monthFrom}-${dayFrom}`
    const dateTo = `${yearTo}-${monthTo}-${dayTo}`


    getQuakeData({ dateFrom, dateTo })
      .then(response => {
        storeData(response)
        storeEvents(response.events)
        setLoading(false)
      })
      .catch(err => {
        console.error('--- ERROR FETCHING DATA ---\n', err)
        setError(err)
      })

  }, [ dates ])

  return {
    data,
    events,
    storeData,
    dates,
    setDates,
    loading,
    // updateLoading,
    error,
  }
}

export default useQuakeData

import { useState, useEffect } from 'react'

import getQuakeData from '../functions/get-quake-data'
import formatDate from '../functions/format-input-date'

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
    setLoading(true)

    const dateFrom = formatDate(dates.start)
    const dateTo = formatDate(dates.end)

    getQuakeData({ dateFrom, dateTo })
      .then(response => {
        storeData(response)
        storeEvents(response.events)
        setLoading(false)
      })
      .catch(err => {
        console.error('--- ERROR FETCHING DATA ---\n', err)
        setError(err)
        setTimeout(() => {
          setLoading(false)
        }, 3 * 1000)
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
    // updateError,
  }
}

export default useQuakeData

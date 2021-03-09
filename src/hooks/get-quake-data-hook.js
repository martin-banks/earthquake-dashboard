import React, { useState, useEffect } from 'React'

import getQuakeData from '../functions/get-quake-data'

function useQuakeData () {
  const [ data, storeData ] = useState(null)
  const [ settings, updateSettings ] = useState({
    days: 7,
    dateStart: null,
    dateEnd: null,
  })
  const [ loading, updateLodaing ] = useState(false)



  useEffect(() => {
    updateLodaing(true)
    const {
      days,
      dateStart,
      dateEnd,
    } = settings

    const today = new Date(dateEnd || new Date().setHours(0,0,0,0)) // midnight today
    const firstDay = new Date(dateStart || new Date().setDate(today.getDate() - days))

    console.log({ firstDay, today })

    const monthFrom = `0${firstDay.getMonth() + 1}`.slice(-2)
    const dayFrom = `0${firstDay.getDate()}`.slice(-2)
    const yearFrom = firstDay.getFullYear()

    const monthTo = `0${today.getMonth() + 1}`.slice(-2)
    const dayTo = `0${today.getDate()}`.slice(-2)
    const yearTo = today.getFullYear()

    const dateFrom = `${yearFrom}-${monthFrom}-${dayFrom}`
    const dateTo = `${yearTo}-${monthTo}-${dayTo}`


    getQuakeData({ dateFrom, dateTo })
      .then(response => {
        setData(response)
        storeEvents(response.events)
      })
      .catch(err => console.error({ err }))

  }, [ settings ])

  return {
    data,
    storeData,
    settings,
    updateSettings,
    loading,
    // updateLoading,
  }
}

export default useQuakeData

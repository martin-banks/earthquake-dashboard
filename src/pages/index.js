import React, { useEffect, useState } from "react"
// import { Link } from "gatsby"
import Styled from 'styled-components'

// import Image from "../components/image"
import SEO from "../components/seo"
import Dashboard from '../components/dashboard'
import TitleOverlay from '../components/title-overlay'

import getQuakeData from '../functions/get-quake-data'



// ! Hardcoded to the previous 7 days for now
const days = 7
const today = new Date(new Date().setHours(0,0,0,0)) // midnight today
const firstDay = new Date(new Date().setDate(today.getDate() - days))

console.log({ firstDay, today })

const monthFrom = `0${firstDay.getMonth() + 1}`.slice(-2)
const dayFrom = `0${firstDay.getDate()}`.slice(-2)
const yearFrom = firstDay.getFullYear()

const monthTo = `0${today.getMonth() + 1}`.slice(-2)
const dayTo = `0${today.getDate()}`.slice(-2)
const yearTo = today.getFullYear()

const dateFrom = `${yearFrom}-${monthFrom}-${dayFrom}`
const dateTo = `${yearTo}-${monthTo}-${dayTo}`




const IndexPage = () => {
  const [ data, setData ] = useState(null)
  const [ loading, setIsLoading ] = useState(true)

  useEffect(() => {
    getQuakeData({ dateFrom, dateTo })
      .then(response => {
        setData(response)
        setIsLoading(false)
      })
      .catch(err => console.error({ err }))
  }, [])


  return (<>
    <SEO title="Home" />
    <Dashboard data={ data } />
    { loading && <TitleOverlay loading={ loading } /> }
  </>)
}

export default IndexPage

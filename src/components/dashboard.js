import React, { useState, useEffect, useContext } from 'react'
import Styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import getQuakeData from '../functions/get-quake-data'

const Container = Styled.article`
  position: relative;
  display: grid;
  grid-template-rows: auto 200px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 90vh;
  z-index: 100;
  outline: solid 1px lime;
  margin: 0;
`

const sharedStyles = css`
  outline: solid 2px pink;
`

const MainSection = Styled.section`
  display: grid;
  grid-template-columns: auto 60% auto;
`
const SectionLeft = Styled.section`
  ${ sharedStyles };
`
const SectionRight = Styled.section`
  ${ sharedStyles };
`
const SectionBottom = Styled.section`
  outline: solid 2px cyan;
`




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







const Dashboard = () => {
  const [ data, setData ] = useState(null)

  useEffect(() => {
    getQuakeData({ dateFrom, dateTo })
      .then(response => {
        setData(response)
        console.log({ response, data })
      })
      .catch(err => console.error({ err }))

  }, [])

  return (
    <Container>
      <MainSection>
        <SectionLeft />
          <div>
            <p>This space is a cutout for the globe behind</p>
            <pre className="dump">{ JSON.stringify({
              keys: data && Object.keys(data),
              dates: data?.dateRange,
              felt: data?.felt?.length,
              tsunami: data?.tsunami?.length,
              events: data?.events?.length,
            }, null, 2) }</pre>
          </div>
        <SectionRight />
      </MainSection>

      <SectionBottom />
    </Container>
  )
}

// Dashboard.defaultPropTypes = {}
// Dashboard.proptypes = {}


export default Dashboard


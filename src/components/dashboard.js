import React, { useState, useEffect, useContext } from 'react'
import Styled, { css } from 'styled-components'
import PropTypes from 'prop-types'


import QuakeTotals from './quake-totals'
import MagnitudeChart from './magnitude-chart'
import DashboardSettings from './dashboard-settings'

const Container = Styled.article`
  display: grid;
  grid-template-rows: auto 200px;
  height: 100vh;
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
  display: grid;
  grid-template-rows: auto 1fr;
`
const SectionBottom = Styled.section`
  outline: solid 2px cyan;
`





function Dashboard (props) {
  const { data } = props

  const [ magnitudeRange, updateMagnitudeRange ] = useState({ min: -2, max: 10})
  const [ eventsToRender, updateEventsToRender ] = useState(null)
  // const [ magnitudes, setMags ] = useState(null)
  // const [ events, storeEvents ] = useState(null)

  const [ totals, updateTotals ] = useState({ total: 0, felt: 0, tsunami: 0, })

  useEffect(() => {
    if (!data) return

    const filteredByRange = data.events.filter(e => {
      return (e.properties.mag >= magnitudeRange.min) && (e.properties.mag <= magnitudeRange.max)
    })
    updateEventsToRender(filteredByRange)

    const felt = filteredByRange.filter(f => f.properties.felt)
    const tsunami = filteredByRange.filter(f => f.properties.tsunami)

    updateTotals({
      felt: felt.length,
      tsunami: tsunami.length,
      total: filteredByRange.length
    })

  }, [ data, magnitudeRange ])



  return (
    <Container>
      <MainSection>

        <SectionLeft>
          <DashboardSettings
            magnitudeRange={ magnitudeRange }
            updateMagnitudeRange={ updateMagnitudeRange }
          />
        </SectionLeft>

        <div>
          <p>This space is a cutout for the globe behind</p>
          <pre className="dump">
            {
              JSON.stringify({
                keys: data && Object.keys(data),
                dates: data?.dateRange,
                felt: data?.felt?.length,
                tsunami: data?.tsunami?.length,
                events: data?.events?.length,
                magnitudeRange,
              }, null, 2)
            }
          </pre>
        </div>

        <SectionRight>
          {/* Totals */}
          { data && <QuakeTotals
            totals={ totals }
          />}
          {/* magnitude chart */}
          { data &&
            <MagnitudeChart events={ eventsToRender } />
          }
        </SectionRight>

      </MainSection>

      <SectionBottom>
        {/* popup details */}
        {/* timeline / scrubber */}
      </SectionBottom>

    </Container>
  )
}

// Dashboard.defaultPropTypes = {}
// Dashboard.proptypes = {}


export default Dashboard


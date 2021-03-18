import React, { useState, useEffect } from 'react'
import Styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import useQuakeData from '../hooks/get-quake-data-hook'

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


const quakeTypes = [
  {
    label: 'All quakes',
    type: 'all'
  },
  {
    label: 'Quakes felt',
    type: 'felt'
  },
  {
    label: 'Tsunami warnings',
    type: 'tsunami'
  },
]


function Dashboard (props) {
  const {
    setLoading,
    setError,
  } = props

  const [ magnitudeRange, updateMagnitudeRange ] = useState(null)
  const [ eventsToRender, updateEventsToRender ] = useState(null)
  const [ typeToShow, updateTypeToShow ] = useState(quakeTypes[0])
  const [ totals, updateTotals ] = useState({ all: 0, felt: 0, tsunami: 0, })

  const {
    data,
    events,
    dates,
    setDates,
    loading,
    error,
  } = useQuakeData()


  useEffect(() => {
    if (!data) return

    const magnitudes = []
    for (let event of data.events) {
      magnitudes.push(Math.round(event.properties.mag * 10) / 10)
    }

    const min = Math.min(...magnitudes)
    const max = Math.max(...magnitudes)

    updateMagnitudeRange({ min, max })
  }, [ data ])


  useEffect(() => {
    if (!data || !magnitudeRange) return

    const filteredByRange = data.events.filter(e => {
      return (e.properties.mag >= magnitudeRange.min) && (e.properties.mag <= magnitudeRange.max)
    })
    const felt = filteredByRange.filter(f => f.properties.felt)
    const tsunami = filteredByRange.filter(f => f.properties.tsunami)
    const updatedData = {
      all: filteredByRange,
      felt,
      tsunami,
    }

    updateTotals({
      felt: felt.length,
      tsunami: tsunami.length,
      all: filteredByRange.length
    })

    updateEventsToRender(updatedData[typeToShow.type])
  }, [ data, magnitudeRange, typeToShow ])

  useEffect(() => {
    setLoading(loading)
  }, [ loading ])

  useEffect(() => {
    setError(error)
  }, [ error ])



  return (
    <Container>
      <MainSection>

        <SectionLeft>
          {
            magnitudeRange &&
              <DashboardSettings
                magnitudeRange={ magnitudeRange }
                updateMagnitudeRange={ updateMagnitudeRange }
                quakeTypes={ quakeTypes }
                updateTypeToShow={ updateTypeToShow }
                dateRange={ data.dateRange }
                dates={ dates }
                setDates={ setDates }
              />
          }
        </SectionLeft>

        <div>
          {
            (events?.length < 1) &&
              <h2>No results found please try adjusting your settings</h2>
          }
          <p>This space is a cutout for the globe behind</p>
          <pre className="dump">
            {
              JSON.stringify({
                // data,
                // events
                keys: data && Object.keys(data),
                dates,
                felt: data?.felt?.length,
                tsunami: data?.tsunami?.length,
                events: data?.events?.length,
                magnitudeRange,
              }, null, 2)
            }
          </pre>
        </div>

        <SectionRight>
          {
            data && <>
              <QuakeTotals totals={ totals } />
              <MagnitudeChart events={ eventsToRender } typeToShow={ typeToShow } />
            </>
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


Dashboard.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

export default Dashboard

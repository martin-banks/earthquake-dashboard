import React, { useState, useEffect } from 'react'
import Styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import useQuakeData from '../hooks/get-quake-data-hook'

import QuakeTotals from './quake-totals'
import MagnitudeChart from './magnitude-chart'
import DashboardSettings from './dashboard-settings'
import Globe from './globe'
import PopupDetails from './popup-details'

import timelinePosition from '../functions/timline-position'
import quakeTypes from '../content/quake-types'
import magnitudeColor from '../functions/magnitude-color'
import timelineDate from '../functions/format-timeline-date'


const Container = Styled.article`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 95vh;
  z-index: 100;
  margin: 0;
`
const sharedStyles = css`
  padding: 2rem;
  width: 20vw;
`
const MainSection = Styled.section`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  pointer-events: none;
  `
const SectionLeft = Styled.section`
  ${ sharedStyles };
  background: rgba(0,0,0, 0.5);
  z-index: 100;
  pointer-events: all;
  backdrop-filter: blur(10px);
`
const SectionRight = Styled.section`
  ${ sharedStyles };
  background: rgba(0,0,0, 0.5);
  display: grid;
  grid-template-rows: auto 1fr;
  z-index: 100;
  pointer-events: all;
  backdrop-filter: blur(10px);
`
const SectionBottom = Styled.section`
  padding: 2rem;
  background: rgba(0,0,0, 0.5);
  z-index: 100;
  pointer-events: all;
  backdrop-filter: blur(10px);
`
const SectionMain = Styled.section`
  pointer-events: none;
  * {
    pointer-events: none;
  }
`

const Timeline = Styled.section`
  position: relative;
  display: block;
  width: 100%;
`
const TimelineTitle = Styled.h3`
  margin-bottom: 0;
`
const TimelineMarkWrapper = Styled.div`
  display: block;
  position: relative;
  height: 50px;
  margin-bottom: 2px;
`
const TimelineDateWrapper = Styled.ul`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    margin: 0;
    opacity: 0.6;
  }
`

const TimelineTickWrapper = Styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 2px 0;
  padding: 0;
  list-style: none;
  li {
    margin: 0;
    padding: 0;
    height: 10px;
    border-left: solid 2px rgba(100, 100, 100, 0.8);
    &:last-of-type {
      opacity: 0;
    }
  }
`

const Separator = Styled.hr`
  margin: 0;
  margin-bottom: 2rem;
  padding: 0;
`


function timelineHeight (mag) {
  const height = ((mag + 3) / 13) * 100
  return `${height}%`
}




function Dashboard (props) {
  const {
    setLoading,
    setError,
  } = props

  const [ magnitudeRange, updateMagnitudeRange ] = useState(null)

  const [ dataMagRange, setDataMagRange ] = useState(null)
  const [ renderedMagRange, setRenderedMagRange ] = useState(null)

  const [ eventsToRender, updateEventsToRender ] = useState(null)
  const [ typeToShow, updateTypeToShow ] = useState(quakeTypes[0])
  const [ totals, updateTotals ] = useState({ all: 0, felt: 0, tsunami: 0 })
  const [ popup, setPopup ] = useState(null)

  const [ dateFrom, setDateFrom ] = useState(null)
  const [ dateTo, setDateTo ] = useState(null)

  const [ activeId, setActiveId ] = useState(null)

  const {
    data,
    events,
    dates,
    setDates,
    loading,
    error,
  } = useQuakeData()

  useEffect(() => {
    if (!eventsToRender) return
  }, [ eventsToRender ])

  useEffect(() => {
    setDateFrom(dates.start.getTime())
    setDateTo(dates.end.getTime())
  }, [ dates ])

  useEffect(() => {
    if (!activeId) return
    const activeEvent = eventsToRender.find(e => e.id === activeId)
    setPopup(activeEvent)
  }, [ activeId ])


  useEffect(() => {
    if (!data) return

    const magnitudes = []
    for (let event of data.events) {
      magnitudes.push(Math.round(event.properties.mag * 10) / 10)
    }

    const min = Math.min(...magnitudes)
    const max = Math.max(...magnitudes)

    updateMagnitudeRange({ min, max })

    setDataMagRange({ min, max })
    setRenderedMagRange({ min, max })
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
  }, [ data, magnitudeRange, renderedMagRange, typeToShow ])

  useEffect(() => {
    setLoading(loading)
  }, [ loading ])

  useEffect(() => {
    setError(error)
  }, [ error ])



  return (
    <Container>
      <Globe
        quakes={ eventsToRender }
        setPopup={ setPopup }
        activeId={ activeId }
        setActiveId={ setActiveId }
      />
      <MainSection>

        <SectionLeft>
          {
            magnitudeRange &&
              <DashboardSettings
                magnitudeRange={ magnitudeRange }
                updateMagnitudeRange={ updateMagnitudeRange }

                dataMagRange={ dataMagRange }
                renderedMagRange={ renderedMagRange }
                setRenderedMagRange={ setRenderedMagRange }

                quakeTypes={ quakeTypes }
                updateTypeToShow={ updateTypeToShow }
                dateRange={ data.dateRange }
                dates={ dates }
                setDates={ setDates }
              />
          }
        </SectionLeft>

        <SectionMain>
          {/* {
            (events?.length < 1) &&
              <h2>No results found please try adjusting your settings</h2>
          } */}
          {/* <p>This space is a cutout for the globe behind</p> */}
          {/* <pre className="dump">
            {
              JSON.stringify({
                activeId
                // popup,
                // data,
                // events
                // keys: data && Object.keys(data),
                // dates,
                // felt: data?.felt?.length,
                // tsunami: data?.tsunami?.length,
                // events: data?.events?.length,
                // magnitudeRange,
                // sampleEvent: data?.events?.[0]
              }, null, 2)
            }
          </pre> */}
        </SectionMain>

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
        { popup && <PopupDetails event={ popup } /> }
        { popup && <Separator/> }

        {/* timeline / scrubber */}
        <TimelineTitle>Timeline of quakes</TimelineTitle>
        {/* <p>Each mark represents a single quake event</p> */}
        <Timeline>
          <TimelineMarkWrapper>
            {
              eventsToRender &&
                eventsToRender.map((e, i) => <div
                  className="timelineMark"
                  style={{
                    left: `${timelinePosition({
                      from: dateFrom,
                      to: dateTo,
                      time: e.properties.time,
                    })}%`,
                    borderColor: magnitudeColor({ mag: e.properties.mag }),
                    height: timelineHeight(e.properties.mag),

                  }}
                  key={ `timeline-mark-${i}` }
                />)
            }
          </TimelineMarkWrapper>
          <TimelineTickWrapper>
            {
              [... new Array(((dateTo - dateFrom) / (1000 * 60 * 60 * 24)) + 2)]
                .map(x => <li />)
            }
          </TimelineTickWrapper>
          <TimelineDateWrapper>
            <li>{ timelineDate(dateFrom) }</li>
            <li>{  }</li>
            <li>{ timelineDate(dateTo) }</li>
          </TimelineDateWrapper>
        </Timeline>
        <style jsx>{`
          .timelineMark {
            height: 100%;
            position: absolute;
            width: 0px;
            bottom: 0;
            border-right: solid 1px;
            opacity: 0.3;
          }
        `}</style>
      </SectionBottom>

    </Container>
  )
}


Dashboard.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

export default Dashboard

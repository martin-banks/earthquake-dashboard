import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import InputRange from 'react-input-range'
import PropTypes from 'prop-types'

// ? Styles have been included intop the global.css file for common use
// import 'react-input-range/lib/css/index.css'

import formatInputDate from '../functions/format-input-date'


const DateContainer = Styled.div`
  gap: 1rem;
`
const Wrapper = Styled.section`
  min-width: 200px;
  max-width: 500px;
`
const Section = Styled.div`
  padding: 2rem;
  margin-bottom: 3rem;
`
const Indent = Styled.div`
  padding: 0.5rem;
  border: solid 1px rgba(100,100,100, 0.5);
  border-radius: 8px;
`
const QuakeTypesContainer = Styled.div`
  position: relative;
  display: block;
`
const QuakeTypeMarker = Styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: calc(100% / 3);
  height: 100%;
  background: rgba(180,180,180, 0.4);
  border-radius: 4px;
  transition: transform 300ms;
  transform: translateX(${p => p.pos * 100}%);
`
const QuakeTypes = Styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  div {
    cursor: pointer;
    display: grid;
    height: 100%;
    padding: 1rem 1rem;
    align-items: center;
    justify-content: center;
    &:hover {
      p {
        opacity: 0.6;
      }
    }
  }
`
const QuakeTypeLabel = Styled.p`
  transition: opacity 200ms;
  margin: 0;
  text-align: center;
  word-spacing: 1000px;
  opacity: ${p => p.active ? 1 : 0.5};
`




function DashboardSettings (props) {
  const {
    magnitudeRange,
    updateMagnitudeRange,
    quakeTypes,
    updateTypeToShow,
    dates,
    setDates,
    // requestNewData,
    // sendDateUpdate,
  } = props

  const [ showType, setShowType ] = useState(0)
  const [ rangeToUse, updateRangeToUse ] = useState({ min: 0, max: 0 })
  const [ min, updateMin ] = useState(0)
  const [ max, updateMax ] = useState(0)
  const [ dateFrom, setDateFrom ] = useState(null)
  const [ dateTo, setDateTo ] = useState(null)
  const [ today, setToday ] = useState(formatInputDate(new Date))



  const changeType = index => {
    setShowType(index)
    updateTypeToShow(quakeTypes[index])
  }

  useEffect(() => {
    if (!dates) return
    const dateTo = formatInputDate(dates.end)
    const dateFrom = formatInputDate(dates.start)

    setDateTo(dateTo)
    setDateFrom(dateFrom)

    updateRangeToUse({ min: magnitudeRange.min, max: magnitudeRange.max })
    updateMin(magnitudeRange.min)
    updateMax(magnitudeRange.max)
  }, [ dates ])



  return <Wrapper>
    <Section>
      <h3>Date range</h3>

      {/* Change the date range to fetch data by */}
      <DateContainer>
        <div>
          <label htmlFor="date-from">Date from</label>
          <input
            id="date-from"
            type="date"
            max={ dateTo }
            value={ formatInputDate(dates.start) }
            onChange={ e => {
              setDateFrom(formatInputDate(e?.target?.value))
              setDates({
                start: new Date(e?.target?.value),
                end: new Date(dateTo),
              })
            }}
          />
        </div>
        <div>
          <label htmlFor="date-to">Date to</label>
          <input
            id="date-to"
            className="last"
            type="date"
            min={ formatInputDate(dates.start) }
            max={ formatInputDate(today) }
            value={ formatInputDate(dates.end) }
            onChange={ e => {
              setDateTo(formatInputDate(e?.target?.value))
              setDates({
                start: new Date(dateFrom),
                end: new Date(e?.target?.value),
              })
            }}
          />
        </div>
      </DateContainer>
    </Section>


    {/* Filter by magnitude range */}
    <Section>
      <h3>Magnitude range</h3>
      <InputRange
        draggableTrack
        minValue={ rangeToUse.min }
        maxValue={ rangeToUse.max }
        step={ 0.1 }
        value={{ min, max }}
        formatLabel={ value => value.toFixed(1) }
        onChange={ x => {
          updateMin(x.min)
          updateMax(x.max)
        }}
        onChangeComplete={ x => {
          console.log('values from input range', x.min, x.max)
          updateMagnitudeRange({ min: x.min, max: x.max })
        }}
      />
    </Section>


    {/* Filter by quake types */}
    <Section>
      <h3>Quake types</h3>
      <h4>Which event types to show</h4>
      <Indent>
        <QuakeTypesContainer>
          <QuakeTypeMarker pos={ showType } />
          <QuakeTypes>
            {
              quakeTypes.map((type, i) =>(
                <div
                  key={ `quake-type-filter-${i}` }
                  onClick={ () => changeType(i) }
                >
                  <QuakeTypeLabel active={ i === showType }>
                    { type.label }
                  </QuakeTypeLabel>
                </div>
              ))
            }
          </QuakeTypes>
        </QuakeTypesContainer>
      </Indent>
    </Section>

  </Wrapper>
}


DashboardSettings.propTypes = {
  magnitudeRange: PropTypes.object.isRequired,
  updateMagnitudeRange: PropTypes.func.isRequired,
  quakeTypes: PropTypes.array.isRequired,
  updateTypeToShow: PropTypes.func.isRequired,
  dates: PropTypes.object.isRequired,
  setDates: PropTypes.func.isRequired,
}

export default DashboardSettings

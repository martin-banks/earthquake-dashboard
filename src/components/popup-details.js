import React from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'

import formatDate from '../functions/format-date-time'


const Wrapper = Styled.section`
  display: grid;
  grid-template-columns: 250px 250px auto 200px 200px;
  gap: 4rem;
  border-bottom: solid 1px rgba(0,0,0, 0.4);
  padding: 0;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  @media screen and (prefers-color-scheme: dark) {
    border-color: rgba(200,200,200, 0.4);
  }
`

const Kicker = Styled.h4`
  text-align: center;
  margin: 0;
  margin-bottom: 4px;
`
const Value = Styled.p`
  font-size: 4rem;
  font-family: dharma-gothic-e;
  font-weight: 300;
  text-align: center;
  margin: 0;
`

const MagnitudeGrid = Styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
`
const ScaleSlider = Styled.div`
`
const Track = Styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  padding: 2px;
  margin-bottom: 4px;
  border-radius: 10px;
  background: linear-gradient(to left, red, orange, gold);
`
const Marker = Styled.span`
  transition: left 300ms;
  position: absolute;
  height: 8px;
  width: 8px;
  left: ${p => p.x}%;
  top: 1px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 4px black;
`
const Scale = Styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
  }
`



function PopupDetails (props) {
  const { event } = props

  return <>
    <Wrapper>
      {/* This is the popup details for events hovered on the globe */}

      {/* Date and time
        |- title
        |- date, time (include time zone)
      */}
      <div>
        <Kicker>Date & time</Kicker>
        {/* <Value>{ JSON.stringify(new Date(event.properties.time)) }</Value> */}
        <Value>{ formatDate(event.properties.time) }</Value>
      </div>

      {/* Location
        |- title
        |- location 
      */}
      <div>
        <Kicker>Locaiton</Kicker>
        <Value>{ event.properties.place }</Value>
      </div>

      {/* Magnitude scale
          |- scale-container
          |- title
          |- track
          |- marker
          |- scale-wrapper
          |- min
          |- max
          |- magnitude-container
          |- magnitude number
        */}
      <div>
        <Kicker>Magnitude</Kicker>
        <MagnitudeGrid>
          <ScaleSlider>
            <Track>
              <Marker x={ (event.properties.mag + 3) / 13 * 100 } />
            </Track>
            <Scale>
              <p>-3</p>
              <p>10</p>
            </Scale>
          </ScaleSlider>
          <Value>{ event.properties.mag.toFixed(2) }</Value>
        </MagnitudeGrid>
      </div>

      {/* Tsunami warning?
        |- title
        |- yes/no
      */}
      <div>
        <Kicker>Tsunami warning?</Kicker>
        <Value>{ event.properties.tsunami ? 'Yes' : 'No' }</Value>
      </div>

      {/* Was felt
        |- title
        |- yes/no
      */}
      <div>
        <Kicker>Was felt?</Kicker>
        <Value>{ event.properties.felt ? 'Yes' : 'No' }</Value>
      </div>

    </Wrapper>
  </>
}


PopupDetails.propTypes = {
  event: PropTypes.object.isRequired,
}


export default PopupDetails

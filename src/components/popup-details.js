import React from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'


const Wrapper = Styled.section`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  border-bottom: solid 1px black;
  padding: 0 2rem;
  @media screen and (prefers-color-scheme: dark) {
    border-color: white;
  }
`

const Value = Styled.p`
  font-size: 6rem;
`

const ScaleSlider = Styled.div``
const Track = Styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  padding: 2px;
  border-radius: 10px;
  background: linear-gradient(to right, red, orange, gold);
`
const Marker = Styled.span`
  position: absolute;
  height: 8px;
  width: 8px;
  left: ${p => p.x}%;
  top: 0;
  border-radius: 10px;
  background: white;
`
const Scale = Styled.div`
  display: flex;
  justify-content: space-between;
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
        <h4>Date & time</h4>
        <Value>-- date, time</Value>
      </div>

      {/* Location
        |- title
        |- location 
      */}
      <div>
        <h4>Locaiton</h4>
        <Value>-- location details</Value>
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
        <h4>Magnitude</h4>
        <ScaleSlider>
          <Track>
            <Marker x={ (event.properties.mag + 3) / 13 * 100 } />
          </Track>
          <Scale>
            <p>-3</p>
            <p>10</p>
          </Scale>
        </ScaleSlider>
        <Value>{ event.properties.mag }</Value>
      </div>

      {/* Tsunami warning?
        |- title
        |- yes/no
      */}
      <div>
        <h4>Tsunami warning?</h4>
        <Value>{ event.properties.tsunami ? 'Yes' : 'No' }</Value>
      </div>

      {/* Was felt
        |- title
        |- yes/no
      */}
      <div>
        <h4>Was felt?</h4>
        <Value>{ event.properties.felt ? 'Yes' : 'No' }</Value>
      </div>

    </Wrapper>
  </>
}


PopupDetails.propTypes = {
  event: PropTypes.object.isRequired,
}


export default PopupDetails

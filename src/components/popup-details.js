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

const Details = Styled.p`
  font-size: 6rem;
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
        <Details>-- date, time</Details>
      </div>

      {/* Location
        |- title
        |- location 
      */}
      <div>
        <h4>Locaiton</h4>
        <Details>-- location details</Details>
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
        <Track>
          <Marker x={ 'calcukate range between -3 and 10' } />
        </Track>
      </div>

      {/* Tsunami warning?
        |- title
        |- yes/no
      */}
      <div>
        <h4>Tsunami warning?</h4>
        <Details>{ event.properties.tsunami ? 'Yes' : 'No' }</Details>
      </div>

      {/* Was felt
        |- title
        |- yes/no
      */}
      <div>
        <h4>Was felt?</h4>
        <Details>{ event.properties.felt ? 'Yes' : 'No' }</Details>
      </div>

    </Wrapper>
  </>
}


PopupDetails.propTypes = {
  event: PropTypes.object.isRequired,
}


export default PopupDetails

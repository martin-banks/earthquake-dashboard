import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'


const Container = Styled.div`
  display: flex;
  flex-wrap: wrap;
`
const StatFull = Styled.div`
  flex: 1 1 0;
  width: 100%;
  min-width: 100%;
`
const StatHalf = Styled.div`
  flex: 1 1 0;
  width: 50%;
`
const Kicker = Styled.h4`
  margin: 0;
  padding: 0;
  letter-spacing: 2px;
  font-weight: 400;
`
const Value = Styled.p`
  font-size: 100px;
  line-height: 90px;
  margin: 0;
  padding: 0;
  font-family: Dharma-gothic-e;
  letter-spacing: 10px;
  font-weight: 600;
`


const QuakeTotals = props => {
  const { total, tsunami, felt } = props.totals

  return <Container>
    <StatFull>
      <Kicker>Total quakes</Kicker>
      <Value>{ total }</Value>

    </StatFull>

    <StatHalf>
      <Kicker>Tsunami warnings</Kicker>
      <Value>{ tsunami }</Value>

    </StatHalf>

    <StatHalf> 
      <Kicker>How many were felt</Kicker>
      <Value>{ felt }</Value>

    </StatHalf>
  </Container>
}

QuakeTotals.defaultPropTypes = {
  total: 0,
  tsunami: 0,
  felt: 0,
}

QuakeTotals.propTypes = {
  total: PropTypes.number,
  tsunami: PropTypes.number,
  felt: PropTypes.number,
}


export default QuakeTotals

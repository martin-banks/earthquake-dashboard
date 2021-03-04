import React from 'react'
import PropTypes from 'prop-types'


const QuakeTotals = props => {
  const { total, tsunami, felt } = props.totals

  return <div>
    <p>TOTAL: { total }</p>
    <p>TSUNAMI: { tsunami }</p>
    <p>FELT: { felt }</p>
  </div>
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

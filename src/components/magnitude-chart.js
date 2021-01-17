import React from 'react'
import PropTypes from 'prop-types'

const MagnitudeChart = (props) => {

  return <>
    <p>This is the chart</p>
    <pre className="dump">{ JSON.stringify(props.mags, null, 2) }</pre>
  </>
}


MagnitudeChart.defaultPropTypes = {}
MagnitudeChart.propTypes = {}


export default MagnitudeChart

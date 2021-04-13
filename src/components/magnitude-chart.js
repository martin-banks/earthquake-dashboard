import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

import mousePositionHook from '../hooks/mouse-position-hook'

import magnitudeColor from '../functions/magnitude-color'


const Container = Styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
`
const BarWrapper = Styled.div`
  position: relative;
  display: block;
  padding-right: 30px;
  padding-left: 8px;
  margin-left: 30px;
  border-left: solid 1px rgba(255,255,255, 0.5);
  height: 100%;
`
const Bar = Styled.div`
  position: relative;
  display: block;
  height: ${p => 100 / p.total}%;
  background: ${p => magnitudeColor({ mag: p.mag })};
  width: ${p => p.width * 100}%;
  cursor: help;
  border-bottom: solid 1px white;
  @media screen and (prefers-color-scheme: dark) {
    border-bottom: solid 1px black
  }
  &:hover {
    background: steelblue;
  }
`
const Value = Styled.span`
  position: absolute;
  left: 100%;
  transform: translate(4px);
  opacity: 0.6;
`
const MagnitudeKey = Styled.span`
  position: absolute;
  left: 0;
  transform: translateX(calc(-100% - 16px));
  opacity: 0.6;
  font-size: 1.25rem;
`

const Popup = Styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(-90%, calc(${p => p.coords.y}px - 50%), 0);
  padding: 16px;
  border-radius: 4px;
  background: rgba(0,0,0, 0.8);
  border: solid 1px darkgrey;
  * {
    color: white;
    margin: 0;
  }
  pointer-events: none;
  z-index: 999;
`



function MagnitudeChart (props) {
  const {
    events,
    typeToShow,
  } = props

  const [ magnitudes, storeMagnitudes ] = useState(null)
  const [ magnitudeKeys, storeMagnitudeKeys ] = useState([])
  const [ chartData, storeChartData ] = useState([])
  const [ chartRange, storeChartRange ] = useState(null)
  const [ popupInfo, updatePopupInfo ] = useState(null)

  const mouseCoords = mousePositionHook()



  useEffect(() => {
    if (!events) return
    // console.log({ events })
    // Split data into subests grouped to each quater dof magnitude -1 to 10
    // ! Because magnitudes are measured on a logarhytmic scale very minor quakes can result in negative numbers
    // https://www.usgs.gov/faqs/how-can-earthquake-have-a-negative-magnitude?qt-news_science_products=0#qt-news_science_products

    const allMags = {}
    let magValues = []

    if (events.length) {
      for (let mag of events) {
        const cleanMag = Math.round(mag.properties.mag * 10) / 10
        if (!allMags[`mag__${cleanMag}`]) {
          allMags[`mag__${cleanMag}`] = 0
          magValues.push(cleanMag)
        }
        allMags[`mag__${cleanMag}`] += 1
      }
    } else {
      magValues = null
    }


    const sortedMags = Object.keys(allMags).sort((a, b) => {
      const aMag = parseFloat(a.replace('mag__', ''))
      const bMag = parseFloat(b.replace('mag__', ''))

      if (aMag > bMag) return 1
      if (aMag < bMag) return -1
      return 0
    })

    storeChartData(allMags)
    storeMagnitudes(sortedMags)

    let minMag = magValues ? Math.min(...magValues) : 0
    let maxMag = magValues ? Math.max(...magValues) : 0

    const keyCount = Math.ceil((maxMag + 0.1) * 10) - (minMag * 10)
    const magKeys = [...new Array(keyCount)]
      .map((_, i) => ((minMag * 10) + i) / 10)

    storeMagnitudeKeys(magKeys)

    const chartValues = Object.keys(allMags).map(m => allMags[m])
    storeChartRange({ min: Math.min(...chartValues), max: Math.max(...chartValues) })

  }, [ events ])


  const handleMouseOver = (magKey, e) => {
    updatePopupInfo({
      magnitude: magKey,
      count: chartData[`mag__${magKey}`],
    })
  }
  const handleMouseOut = magKey => {
    updatePopupInfo(null)
  }

  return <Container>
    <div>
      <h3>Magnitudes for { typeToShow.label.toLowerCase() }</h3>
      <p><i>Quake magnitudes can be negative numbers due to the way they are calculated and are typically very minor. <a href="https://www.usgs.gov/faqs/how-can-earthquake-have-a-negative-magnitude?qt-news_science_products=0#qt-news_science_products">Visit the USGS to learn more.</a></i></p>
    </div>


    {/* <div> */}
      <BarWrapper>
        { (chartData && magnitudes) &&
            magnitudeKeys.map((m, i, arr) => <Bar
              key={ `chart-bar-${i}` }
              width={ chartData[`mag__${m}`] / chartRange?.max || 0 }
              total={ arr.length }
              index={ (arr.length - i) / arr.length }
              mag={ m }
              onMouseOver={ e => handleMouseOver(m, e) }
              onClick={ e => handleMouseOver(m, e) }
              onMouseOut={ e => handleMouseOut(m, e) }
            >
              <Value>{ chartData[`mag__${m}`]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</Value>
              {/* Only show every other axis key */}
              { !(i % 2) && <MagnitudeKey>{ `${m.toFixed(1)}` }</MagnitudeKey> }
            </Bar>)
        }
      </BarWrapper>
    {/* </div> */}


    { popupInfo && <Popup coords={ { x: mouseCoords.x, y: mouseCoords.y} }>
        <h6>Magnitude: { popupInfo?.magnitude }</h6>
        <h4>Events: { popupInfo?.count }</h4>
      </Popup>
    }

    {/* { magnitudes &&
      <pre className="dump">{ JSON.stringify(magnitudes, null, 2) }</pre>
    } */}
  </Container>
}


MagnitudeChart.defaultPropTypes = {}
MagnitudeChart.propTypes = {}


export default MagnitudeChart

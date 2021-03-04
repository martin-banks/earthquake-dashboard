import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

import mousePositionHook from '../hooks/mouse-position-hook'


const Container = Styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
`
const BarWrapper = Styled.div`
  position: relative;
  display: block;
  padding-right: 10px;
  padding-left: 10px;
  margin-left: 50px;
  border-left: solid 4px rgba(255,255,255, 0.5);
  height: 100%;
`
const Bar = Styled.div`
  /* height: 8px; */
  position: relative;
  display: block;
  height: ${p => 100 / p.total}%;
  background: rgba(255, ${p => p.index * 255}, 0, 1);
  /* margin-bottom: 1px; */
  width: ${p => p.width * 100}%;
  cursor: help;
  border-bottom: solid 1px black;
  &:hover {
    background: steelblue;
  }
`

const Popup = Styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(${p => p.coords.x}px, ${p => p.coords.y}px, 0);
  padding: 16px;
  border-radius: 4px;
  background: rgba(0,0,0, 0.8);
  border: solid 1px darkgrey;
  * {
    color: white;
    margin: 0;
  }
  pointer-events: none;
`



function MagnitudeChart (props) {
  const { events } = props
  const [ magnitudes, storeMagnitudes ] = useState(null)
  const [ magnitudeKeys, storeMagnitudeKeys ] = useState([])
  const [ chartData, storeChartData ] = useState([])
  const [ chartRange, storeChartRange ] = useState(null)

  const [ popupInfo, updatePopupInfo ] = useState(null)

  const mouseCoords = mousePositionHook()



  useEffect(() => {
    if (!events) return
    // Split data into subests grouped to each quater dof magnitude -1 to 10
    // ! Because magnitudes aremeasured on a logarhytmic scale very minor quakes can result in negative numbers
    // https://www.usgs.gov/faqs/how-can-earthquake-have-a-negative-magnitude?qt-news_science_products=0#qt-news_science_products

    const allMags = {}
    const magValues = []
    for (let mag of events) {
      const cleanMag = Math.round(mag.properties.mag * 10) / 10
      if (!allMags[ `mag__${cleanMag}` ]) {
        allMags[ `mag__${cleanMag}`] = 0
        magValues.push(cleanMag)
      }
      allMags[`mag__${cleanMag}`] += 1
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

    let minMag = Math.min(...magValues)
    let maxMag = Math.max(...magValues)
    const magKeys = [...new Array(((maxMag + 0.1) * 10) - (minMag * 10))]
    .map((_, i) => ((minMag * 10) + i) / 10)
    storeMagnitudeKeys(magKeys)

    const chartValues = Object.keys(allMags).map(m => allMags[m])
    storeChartRange({ min: Math.min(...chartValues), max: Math.max(...chartValues) })

  }, [ events ])


  const handleMouseOver = (magKey, e) => {
    updatePopupInfo(prev => ({
      magnitude: magKey,
      count: chartData?.[`mag__${magKey}`]
    }))
  }
  const handleMouseOut = magKey => {
    updatePopupInfo(null)
  }

  return <Container>
    <div>
      <h3>Magnitudes</h3>
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
            onMouseOver={ e => handleMouseOver(m, e) }
            onMouseOut={ e => handleMouseOut(m, e) }
            />)
        }
      </BarWrapper>
    {/* </div> */}


    { popupInfo && <Popup coords={ mouseCoords }>
          <h6>Magnitude: { popupInfo?.magnitude }</h6>
          <h4>Events: { popupInfo?.count }</h4>
          <p>{ mouseCoords.x } / { mouseCoords.y }</p>
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

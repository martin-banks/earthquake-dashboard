import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'


const BarWrapper = Styled.div`
  padding-right: 10px;
`
const Bar = Styled.div`
  height: 8px;
  background: rgba(255, ${p => p.index * 255}, 0, 1);
  margin-bottom: 1px;
  /* width: ${p => p.width * 3}px; */
  width: ${p => p.width * 100}%;
  cursor: help;
`

const Popup = Styled.div`
  position: absolute;
  padding: 16px;
  border-radius: 4px;
  background: rgba(0,0,0, 0.8);
  border: solid 1px darkgrey;
  * {
    color: white;
    margin: 0;
  }
`



function MagnitudeChart (props) {
  const { events } = props
  const [ magnitudes, storeMagnitudes ] = useState(null)
  const [ magnitudeKeys, storeMagnitudeKeys ] = useState([])
  const [ chartData, storeChartData ] = useState([])
  const [ chartRange, storeChartRange ] = useState(null)

  const [ popupInfo, updatePopupInfo ] = useState(null)


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


    const chartValues = Object.keys(allMags).map(m => allMags[m])

    const maxValue = Math.max(...chartValues)
    const minValue = Math.min(...chartValues)

    storeChartRange({ min: Math.min(...chartValues), max: Math.max(...chartValues) })

    console.log({ maxValue, minValue })

    // console.log(magValues.sort((a, b) => {
    //   if (a > b) return 1
    //   if (a < b) return -1
    //   return 0
    // }), magValues.length)

    const magKeys = [...new Array(((maxMag + 0.1) * 10) - (minMag * 10))]
      .map((_, i) => ((minMag * 10) + i) / 10)

    storeMagnitudeKeys(magKeys)

  }, [ events ])


  const handleMouseOver = magKey => {
    updatePopupInfo(prev => ({
      magnitude: magKey,
      count: chartData?.[`mag__${magKey}`]
    }))
  }
  const handleMouseOut = magKey => {
    updatePopupInfo(null)
  }

  return <>
    {/* { (chartData && magnitudes) &&
        magnitudes.map((m, i, arr) => <Bar width={ chartData[m] } index={ (arr.length - i) / arr.length } />)
    } */}

    { popupInfo && <Popup>
        <h6>Magnitude: { popupInfo?.magnitude }</h6>
        <h4>Events: { popupInfo?.count }</h4>
      </Popup>
    }

    <BarWrapper>
      { (chartData && magnitudes) &&
          magnitudeKeys.map((m, i, arr) => {
            return <Bar
              key={ `chart-bar-${i}` }
              // width={ chartData[`mag__${m}`] || 0 }
              width={ chartData[`mag__${m}`] / chartRange?.max || 0 }
              index={ (arr.length - i) / arr.length }
              onMouseOver={ e => handleMouseOver(m) }
              onMouseOut={ e => handleMouseOut(m) }
            />

          })
      }
    </BarWrapper>



    {/* { magnitudes &&
      <pre className="dump">{ JSON.stringify(magnitudes, null, 2) }</pre>
    } */}
  </>
}


MagnitudeChart.defaultPropTypes = {}
MagnitudeChart.propTypes = {}


export default MagnitudeChart

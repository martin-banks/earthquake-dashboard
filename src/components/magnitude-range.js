import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'



const Container = Styled.div`
  padding: 0 1rem;
`
const Track = Styled.div`
  position: relative;
  height: 8px;
  border-radius: 100px;
  background: purple;
  box-sizing: border-box;
  margin-bottom: 4rem;
`
const Handle = Styled.span`
  position: absolute;
  left: ${p => p.position * 100}%;
  transform: translate(-50%, -50%);
  top: 0px;
  margin-top: 4px;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background: white;
`


function MagnitudeRange (props) {
  const { range } = props

  const [ min, updateMin ] = useState(0)
  const [ max, updateMax ] = useState(1)

  useEffect(() => {
    if (!range) return
    updateMin(range.min)
    updateMax(range.max)
  }, [ range ])



  return <div>
    <h5>Minimum</h5>
    <Container>
      <Track
        onMousemove={ () => {} }
        onMouseup={ () => {} }
        onMouseout={ () => {} }
        onMouseleave={ () => {} }
      >
        <Handle
          key="magnitude-range-min"
          value={ min }
          onMousedown={ () => {} }
          onMouseup={ () => {} }
          position={ min }
        />
      </Track>
    </Container>

    <h5>Maximum</h5>
    <Container>
      <Track
        onMousemove={ () => {} }
        onMouseup={ () => {} }
        onMouseout={ () => {} }
        onMouseleave={ () => {} }
      >
        <Handle
          key="magnitude-range-max"
          value={ max }
          onMousedown={ () => {} }
          onMouseup={ () => {} }
          position={ max }
        />
      </Track>
    </Container>
  </div>
}


export default MagnitudeRange

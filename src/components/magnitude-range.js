import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import InputRange from 'react-input-range'

// import 'react-input-range/lib/css/index.css'


const Container = Styled.div`
  margin-bottom: 4rem;
  background: seagreen;
`
const Form = Styled.form`
  padding: 100px 0;
`
const Track = Styled.div`
  position: relative;
  height: 8px;
  border-radius: 100px;
  background: rgba(150, 150, 150, 0.5);
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
  background: black;
  @media screen and (prefers-color-scheme: dark) {
    background: white;
  }
`


function MagnitudeRange (props) {
  const { range, updateRange } = props

  const [ min, updateMin ] = useState(0)
  const [ max, updateMax ] = useState(10)

  useEffect(() => {
    // if (!range) return
    // updateMin(range.min)
    // updateMax(range.max)
  }, [ range ])


  // const handleUpdate = x => {
  //   const { value, type } = x
  //   updateRange
  // }

  return <Container>

    <Form>
      <InputRange
        draggableTrack
        minValue="0"
        maxValue="10"
        value={{ min, max }}
        // value="5"
        step="0.1"
        // onChange={ x => {
        //   updateMin(x.min)
        //   updateMax(x.max)
        // }}
        onChangeComplete={ x => {
          updateMin(x.min)
          updateMax(x.max)
        }}
      />

    </Form>


    {/* <Container>
      <h5>Minimum</h5>
      <input
        type="range"
        step="0.1"
        min={ min }
        max={ max }
        value={ min }
        onChange={ e => updateRange({ value: e.target.value, type: 'min' })}
      />
    </Container> */}
    {/* <Container>
      <Track
        onMouseMove={ () => {} }
        onMouseUp={ () => {} }
        onMouseOut={ () => {} }
        onMouseLeave={ () => {} }
      >
        <Handle
          key="magnitude-range-min"
          value={ min }
          onMouseDown={ () => {} }
          onMouseUp={ () => {} }
          position={ min }
        />
      </Track>
    </Container> */}

    {/* <Container>
      <h5>Maximum</h5>
      <input
        type="range"
        step="0.1"
        min={ min }
        max={ max }
        value={ max }
        onChange={ e => updateRange({ value: e.target.value, type: 'max' })}
      />
    </Container> */}
    {/* <Container>
      <Track
        onMouseMove={ () => {} }
        onMouseUp={ () => {} }
        onMouseOut={ () => {} }
        onMouseLeave={ () => {} }
      >
        <Handle
          key="magnitude-range-max"
          value={ max }
          onMouseDown={ () => {} }
          onMouseUp={ () => {} }
          position={ max }
        />
      </Track>
    </Container> */}
  </Container>
}


export default MagnitudeRange

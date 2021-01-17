import React from 'react'
import Styled from 'styled-components'

import gridDark from './Isometric-grid-dark.png'
import gridLight from './Isometric-grid-light.png'

const Wrapper = Styled.div`
  z-index: -1;
`

const Grid = Styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-repeat: repeat;
  background-size: 40px;
  z-index: 0;
  @media (prefers-color-scheme: dark) {
    background-image: url(${gridDark});
  }
  @media (prefers-color-scheme: light) {
    background-image: url(${gridLight});
  }
`
const Gradient = Styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(150deg, rgba(180,0,255, 1), rgba(0, 200,255, 1));
    opacity: 0.05;
  }
  @media (prefers-color-scheme: light) {
    background: linear-gradient(150deg, rgba(120, 0, 255, 1), rgba(3, 218, 230, 1));
    opacity: 0.05;
  }
`

export default function ({ theme }) {
  return (
    <Wrapper>
      <Grid />
      {/* <Gradient /> */}
    </Wrapper>
  )
}
import React from 'react'
import Styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'


const Container = Styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
`
const Hr = Styled.hr`
  margin: 4rem auto;
  min-width: 300px;
  width: 50vw;
  max-width: 500px;
  margin: 5rem auto;
`
const Title = Styled.h1`
  transform: scale(2);
  font-weight: 100;
  text-align: center;
  letter-spacing: 3px;
  /* margin-bottom: 8rem; */
`
const Intro = Styled.h3`
  font-size: 3rem;
  text-align: center;
  font-weight: 300;
  font-size: 4rem;
  margin: 0;
`
const Loading = Styled.p`
  font-family: dharma-gothic-e;
  font-size: 3rem;
  text-align: center;
`
const Svg = Styled.svg`
  position: relative;
  overflow: visible;
  width: 40px;
  left: 50%;
  transform: translateX(-50%);
`
const circleStroke = keyframes`
  from {
    stroke-dashoffset: 250px;
    transform: rotate(0deg);
  }
  to {
    stroke-dashoffset: -500px;
    transform: rotate(7200deg);
  }
`
const Circle = Styled.circle`
  transform-origin:center;
  stroke: black;
  fill: none;
  @media (prefers-color-scheme: dark) {
    stroke: white;
  };
  stroke-width: 2px;
  stroke-dasharray: 30;
  stroke-dashoffset: 10px;
  animation: ${circleStroke} 60s infinite linear;
`



function TitleOverlay (props) {
  const {
    loading,
    error,
  } = props

  return <Container>
    <div>
      <div>
        <Title>Earthquakes</Title>
        <Hr />
        <Intro>Every earthquake around the world</Intro>
      </div>


      { loading && 
        <div>
          <Loading>Loading...</Loading>
          <Svg viewBox="0 0 10 10">
            <Circle r="5" cx="5" cy="5" />
          </Svg>
        </div>
      }

      {
        error &&
          <pre>
            <code>
              { JSON.stringify({ error }, null, 2) }
            </code>
          </pre>
      }

    </div>
  </Container>
}

TitleOverlay.defaultProps = {
  loading: true
}

TitleOverlay.propTypes = {
  loading: PropTypes.bool
}


export default TitleOverlay

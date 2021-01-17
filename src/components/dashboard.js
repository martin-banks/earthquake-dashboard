import React from 'react'
import Styled, { css } from 'styled-components'
import PropTypes from 'prop-types'


const Container = Styled.article`
  position: relative;
  display: grid;
  grid-template-rows: auto 200px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  /* width: 100%; */
  height: 90vh;
  z-index: 100;
  outline: solid 1px lime;
  margin: 0;
`

const sharedStyles = css`
  outline: solid 2px pink;
`

const MainSection = Styled.section`
  display: grid;
  grid-template-columns: auto 60% auto;
`
const SectionLeft = Styled.section`
  ${ sharedStyles };
`
const SectionRight = Styled.section`
  ${ sharedStyles };
`
const SectionBottom = Styled.section`
  outline: solid 2px cyan;
`


const Dashboard = () => {

  return (
    <Container>
      <MainSection>
        <SectionLeft />
        <div />
        <SectionRight />
      </MainSection>

      <SectionBottom />
    </Container>
  )
}

// Dashboard.defaultPropTypes = {}
// Dashboard.proptypes = {}


export default Dashboard


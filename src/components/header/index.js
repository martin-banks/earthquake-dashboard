// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Styled from 'styled-components'

import Signature from '../signature-new.js'


const Container = Styled.header`
  position: absolute;
  display: grid;
  grid-template-columns: auto 1fr;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  padding-top: 2rem;
  padding-left: 6rem;
  /* Background colors are supported but not in use by default */
  /* background: rgba(0,0,0, 0.5); */
  /* @media (prefers-color-scheme: dark) {
    background: rgba(0,0,0, 0.5)
  }; */
  /* @media (prefers-color-scheme: light) {
    background: rgba(255,255,255, 0.5)
  }; */
`

// ? Child components for additional elements in header area
// const HeaderElement = Styled.div`
//   width: 100px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `

// const HeaderEndElement = Styled.div`
//   outline: solid 1p pink;
//   width: 100px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `


const Header = () => (
  <Container>
    <Signature />
  </Container>
)

Header.propTypes = {}
Header.defaultProps = {}

export default Header

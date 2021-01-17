// import PropTypes from "prop-types"
import React from "react"
import Styled from 'styled-components'

import ThemeContext from '../context/theme-context'

import signatureBlack from '../files/images/signature.1.0.0-black.png'
import signatureWhite from '../files/images/signature.1.0.0-white.png'


const LogoImageWrapper = Styled.div`
  position: relative;
  width: 100%;
  height: auto;
  left: 50%;
  transform: translateX(-50%);
  background-size: contain;
  background-repeat: no-repeat;
  background-image: ${p => `url(${p.logo})`};
`

const LogoImage = Styled.img`
  opacity: 0;
  width: 200px;
  max-width: 500px;
`

const LogoWrapper = Styled.div`
  position: relative;
  width: 100%;
  max-width: 150px;
`

const Signature = () => {

  return <div>
    <a href="https://martinbanks.com.au">
      <LogoWrapper>
          <ThemeContext.Consumer>
            {c => {
              const logo = c.theme === 'light' ? signatureBlack : signatureWhite
              return <LogoImageWrapper logo={ logo }>
                <LogoImage src={ logo } />
              </LogoImageWrapper>
            }}
          </ThemeContext.Consumer>
      </LogoWrapper>
    </a>
  </div>
}

// Signature.propTypes = {}
// Signature.defaultProps = {}

export default Signature

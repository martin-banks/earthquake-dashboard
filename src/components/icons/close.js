import React from 'react'
import PropTypes from 'prop-types'
import Styled, { css } from 'styled-components'

const commonStyles = css`
  @media (prefers-color-scheme: dark) {
    fill: ${p => p.fill || '#ffffff'};
  };
  @media (prefers-color-scheme: light) {
    fill: ${p => p.fill || '#000000'};
  };
`

const Polygon = Styled.polygon`
  ${commonStyles};
`

const Close = ({ fill, size } = {}) => (
  <svg width={ `${size}px` } height={ `${size}px` } fill={ fill } viewBox="0 0 100 100" version="1.1">
      <g transform="translate(-20.000000, -72.000000)" fill={ fill }>
        <Polygon id="close-icon" fill={ fill } points="120 82.0714286 109.928571 72 70 111.928571 30.0714286 72 20 82.0714286 59.9285714 122 20 161.928571 30.0714286 172 70 132.071429 109.928571 172 120 161.928571 80.0714286 122" />
      </g>
  </svg>
)

Close.defaultProps = {
  fill: '#000000',
  size: 200
}

Close.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default Close

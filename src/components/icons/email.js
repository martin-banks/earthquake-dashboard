import React from 'react'
import Styled, { css } from 'styled-components'

const commonStyles = css`
  @media (prefers-color-scheme: dark) {
    fill: ${p => p.fill || '#ffffff'};
  };
  @media (prefers-color-scheme: light) {
    fill: ${p => p.fill || '#000000'};
  };
`

const Path = Styled.path`
  ${commonStyles};
`
const Rect = Styled.rect`
  ${commonStyles};
`
const Group = Styled.g`
  ${commonStyles};
`

export default ({ fill, size = '100px' } = {}) => (
  <svg width={ size } height={ size } fill={ fill } viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <Rect strokeOpacity="0" stroke="none" fillOpacity="0" fill="none" x="0" y="0" width="100" height="100"></Rect>
    <Group transform="translate(8.000000, 16.000000)" fill={ fill }>
      <Path d="M75.9768116,0 L8.77681159,0 C4.15681159,0 0.418811594,3.825 0.418811594,8.5 L0.376811594,59.5 C0.376811594,64.175 4.15681159,68 8.77681159,68 L75.9768116,68 C80.5968116,68 84.3768116,64.175 84.3768116,59.5 L84.3768116,8.5 C84.3768116,3.825 80.5968116,0 75.9768116,0 L75.9768116,0 Z M75.9768116,59.5 L8.77681159,59.5 L8.77681159,17 L42.3768116,38.25 L75.9768116,17 L75.9768116,59.5 L75.9768116,59.5 Z M42.3768116,29.75 L8.77681159,8.5 L75.9768116,8.5 L42.3768116,29.75 L42.3768116,29.75 Z"></Path>
    </Group>
  </svg>
)

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'

import './src/styles/global.css'
import { ThemeProvider } from './src/context/theme-context'



const wrapPageElement = ({ element, props }) => {
  return <div>
    <ThemeProvider { ...props }>{ element }</ThemeProvider>
  </div>
}

export { wrapPageElement }

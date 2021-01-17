import React from 'react'

import Layout from '../components/layout'

const theme = typeof window !== 'undefined' 
  ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark') 
  : 'dark'

const ThemeContext = React.createContext({ theme })

const ThemeProvider = ({ children }) => {
  return <ThemeContext.Provider value={{ theme }}>
    <Layout>{ children }</Layout>
  </ThemeContext.Provider>
}


export default ThemeContext
export { ThemeProvider }

import React, { createContext } from 'react'

const QuakeContext = createContext({
  data: 'Loading...',
  setData: () => {},
})

export default QuakeContext

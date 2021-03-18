import React, { useState } from "react"
// import { Link } from "gatsby"
// import Styled from 'styled-components'

import SEO from "../components/seo"
import Dashboard from '../components/dashboard'
import TitleOverlay from '../components/title-overlay'


function IndexPage () {
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  return (<>
    <SEO title="Home" />
    <Dashboard setLoading={ setLoading } setError={ setError } />
    { loading && <TitleOverlay loading={ loading } error={ error } /> }
  </>)
}

export default IndexPage

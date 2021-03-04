/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Styled from 'styled-components'

import Header from "./header"
// import "./layout.css"
import BackgroundGrid from '../components/backgrounds/isometric-grid'
import Footer from './footer'
import ThemeContext from '../context/theme-context'


// const theme = typeof window !== 'undefined'
//   ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
//   : 'dark'

const Page = Styled.div`
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;
`

const LayoutWrapper = Styled.div`
  display: block;
  /* width: 100%; */
  min-height: 100vh;
  /* flex-direction: column; */
  position: relative;
  /* padding-top: 20rem; */
`

const Main = Styled.main`
  display: block;
  /* width: 100%; */
  /* padding: 4rem; */
  box-sizing: border-box;
`


const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <Page>
      {/* <ThemeContext.Consumer>
        { c => <BackgroundGrid theme={ c.theme } /> }
      </ThemeContext.Consumer> */}
      <LayoutWrapper>
        {/* <Header /> */}
        <Main>{ children }</Main>
        <Footer />
      </LayoutWrapper>
    </Page>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

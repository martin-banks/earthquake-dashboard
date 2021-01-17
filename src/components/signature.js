import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Styled from 'styled-components'

const Wrapper = Styled.div`
  transform: translateX(20%);
  width: 100%;
  max-width: 500px;
`

export default () => {
  const theme = typeof window !== 'undefined' ? (window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark') : 'dark'
  

  // ? GraphQL query for using Gatsby Image Component
  // * This supports lazy loading and low-res placeholder images
  // * However this is not desirable for displaying the autograph logo
  // TODO Clean up the unused example below (kept for reference) - cleanup
  //   // ! Light and dark refer to the theme detected.
  //   // ! Dark theme wants the white logo and vice versa.
  const data = useStaticQuery(graphql`
    query {
      light: file(relativePath: { eq: "signtaure.1.0.0-black.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      dark: file(relativePath: { eq: "signtaure.1.0.0-white.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Wrapper>
      <Img fluid={data[theme] && data[theme].childImageSharp.fluid} />
    </Wrapper>
  )
}

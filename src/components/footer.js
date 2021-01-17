import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Styled, { css } from 'styled-components'

// import Logo from './logo-main'
import Signature from './signature-new'

const Footer = Styled.footer`
  position: relative;
  display: block;
  /* justify-content: center; */
  /* align-self: flex-end; */
  bottom: 0;
  left: 0;
  border-top: solid 1px;
  font-size: 2rem;
  font-family: sans-serif;
  justify-self: flex-end;
  margin-top: auto;
  padding: 2rem 0 4rem 0;
  text-align: center;
  /* width: 100%; */
  z-index: 0;
  p {
    display: block;
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    text-align: center;
    width: 100%;
  };

  background: rgba(255,255,255, 0.8);
  border-color: rgba(0,0,0, 0.15);
  @media (prefers-color-scheme: dark) {
    background: rgba(0,0,0, 0.8);
    border-color: rgba(255,255,255, 0.2);
  };
`

const ContentWrapper = Styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 100;
`

const Subtitle = Styled.h4`
  letter-spacing: 0;
`

const Socials = Styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 0;
  cursor: pointer;
`

const SocialLink = Styled.li`
  padding: 0;
  margin: 0;
  flex: 1 1 0;
  width: 60px;
  @media screen and (min-width: 600px) {
    width: 80px;
  };
  list-style-type: none;
  transition: opacity 200ms, filter 200ms;
  opacity: ${p => p.isHovering ? p.active ? 1 : 0.4 : 1};
  filter: blur(${p => p.isHovering ? p.active ? 0 : '2px' : 0});
  a {
    text-decoration: none;
  };
`
const backgroundCommon = css`
  position: absolute;
  top: 0;
  left: 0;
  /* width: 100%; */
  height: 100%;
  z-index: 0;
  pointer-events: none;
`

const FooterBackground = Styled.div`
  ${backgroundCommon};
  transition: background 300ms;
`

const Background = Styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 300ms;
  background: ${p => p.background};
  opacity: ${p => p.active ? 1 : 0};
  color: white;
`

const FooterBackgroundFade = Styled.div`
  ${backgroundCommon};
  background: linear-gradient(rgba(240, 240, 240, 1), rgba(240, 240, 240, 0.2));
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(rgba(10, 10, 10, 1), rgba(10, 10, 10, 0.2));
  };
`

const Label = Styled.p`
  display: block;
  min-height: 32px;
  transition: opacity 400ms;
  opacity: ${p => p.active ? 1 : 0};
  font-family: fira-code, monospace;
  font-size: 2rem !important;
  margin-bottom: 3rem !important;
`

const SignatureWrapper = Styled.div`
  padding: 1rem 0 0 0;
  width: 200px;
  align-self: center;
  margin: 0;
  /* margin-bottom: 1rem; */
  transform: translateX(40%);
`

const Copyright = Styled.p`
  font-size: 2rem !important;
  font-family: fira-code, monospace;
`

export default props => {
  const [activeSocial, setActiveSocial ] = useState(null)
  const [ socialIcons, storeIcon ] = useState({})
  const [ isHovering, setIsHovering ] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      socials: allAboutJson(
        filter: {active: {eq: true}},
        sort: {order: ASC, fields: index}
      ) {
        edges {
          node {
            id
            name
            active
            gradient
            color
            icon
            link
          }
        }
      }
    }
  `)

  useEffect(() => {
    const icons = {}
    data.socials.edges.forEach(({ node }) => {
      icons[node.name] = require(`./icons/${node.icon}`).default({ size: '40px' })
    })
    storeIcon(icons)
  }, [])

  return (
    <>
      <Footer>
        {/* active background */}
        <FooterBackground>
          {
            data.socials.edges.map(({ node }, i) => (
              <Background
                key={ `background-${i}-${node.name}` }
                active={ node.name === activeSocial }
                background={ node.gradient || node.color }
              >
                { node.gradient || node.color }
              </Background>
            ))
          }
        </FooterBackground>

        <FooterBackgroundFade />

        <ContentWrapper>
          {/* Logo */}
          <SignatureWrapper>
            <Signature />
          </SignatureWrapper>

          {/* <Subtitle></Subtitle> */}

          {/* Social links */}
          <Socials>{
            data.socials.edges.map(({ node }, i) => !node.active ? null
              : <OutboundLink
                key={ `footer-socials-${i}-${node.name}` }
                href={ node.link }
              >
                <SocialLink
                  onMouseEnter={ () => {
                    setActiveSocial(node.name)
                    setIsHovering(true)
                  }}
                  onMouseLeave={ () => {
                    setActiveSocial(null)
                    setIsHovering(false)
                  }}
                  active={ node.name === activeSocial }
                  isHovering={ isHovering }
                >
                  { socialIcons[node.name] }
                </SocialLink>
              </OutboundLink>
            )
          }</Socials>
          <Label active={ !!activeSocial && activeSocial !== '-' }>
            { activeSocial }
          </Label>

          <Copyright>© {new Date().getFullYear()}, Martin Banks</Copyright>

        </ContentWrapper>

      </Footer>
    </>
  )
}

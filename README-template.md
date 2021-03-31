# Gatsby project template

Based on the [Gatsby Starter Default](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-default/) template (notes below), this is intended for me to create a simple project setup for personal project, skipping the hassle of all the initial setup so I can get to the fun stuff quicker!


## Creating a new project with this template
Open your favourite CLI app and use the following to generate a new project from this repo:

```shell
gatsyby new witty-project-name https://github.com/martin-banks/project-template-gatsby.git
cd witty-project-name

```


## Site information
All of the site metadata and setting have been moved out into a single config file in the project root `site-data.json` to referenced in the gatsby config file or in pages that use repetative SEO data (for example).

Information includes:
- Site title
- Site description
- Author
- Tracking ID (Google analytics)
- PWA options


## Personal / social information
Details for social media and contacts are stored in separate JSON files in `./src/files/about` and can be accessed through a GraphQL query:

```graphql
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
```

Each file includes values for either a colour or gradient that can be seen in use by hovering over the social icons in the page footer.


## Themes
A theme context wraps every page making the users browser themes easily available on every page and component. Reference the theme value through it's consumer:

```javascript
import React from 'react'
import ThemeContext from '../context/theme-context'

export default () => (
  <ThemeContent.Consmuer>
    { c => <p>The theme is use is: { c.theme }</p> }
  </ThemeContent.Consmuer>
)

```


## Creating pages
New pages are created by adding a file the in the `./src/pages` folder. This file name will then create a new separate page accessible by using it's filename in the site path. All of the layout basics are included as default so only the page content and SEO details are required


The SEO will default to the information stored in the `site-data.json` file mentioned earlier but can be configured by passing appropriate the props.

```jsx
import React from "react"
import SEO from "../components/seo"

export default () => (
  <>
    <SEO title="Page title" />
    <h1>Hello world!</h1>
  </>
)
```
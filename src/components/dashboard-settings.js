import React, { useState } from 'react'
import Styled from 'styled-components'

import DropdownMenu from './dropdown-menu'
import MagnitudeRange from './magnitude-range'

const Wrapper = Styled.section`
  min-width: 200px;
  max-width: 500px;
`
const Section = Styled.div`
  padding: 2rem;
  margin-top: 2rem;
  border-top: solid 1px #979797;
`
const Indent = Styled.div`
  padding: 0.5rem;
  border: solid 1px rgba(100,100,100, 0.5);
  border-radius: 8px;
`
const QuakeTypesContainer = Styled.div`
  position: relative;
  display: block;
`
const QuakeTypeMarker = Styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: calc(100% / 3);
  height: 100%;
  background: rgba(180,180,180, 0.4);
  border-radius: 4px;
  transition: transform 300ms;
  transform: translateX(${p => p.pos * 100}%);
`
const QuakeTypes = Styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  div {
    cursor: pointer;
    display: grid;
    height: 100%;
    padding: 1rem 1rem;
    align-items: center;
    justify-content: center;
    &: hover {
      p {
        opacity: 0.6;
      }
    }
  }
`
const QuakeTypeLabel = Styled.p`
  transition: opacity 200ms;
  margin: 0;
  text-align: center;
  word-spacing: 1000px;
  opacity: ${ p => p.active ? 1 : 0.5};
`


function DashboardSettings (props) {
  const [ showType, setShowType ] = useState(0)

  const quakeTypes = [
    'All',
    'Quakes felt',
    'Tsunami warnings',
  ]
  const dateRangePresets = [
    {
      label: 'Last 24 hours',
      value: 1,
    },
    {
      label: 'Last 7 days',
      value: 7,
    },
    {
      label: 'Last 4 weeks',
      value: 28,
    },
  ]


  const changeType = index => {
    console.log('click', index)
    setShowType(index)
  }

  const handleDateRangeUpdate = val => {
    console.log(val)
  }

  return <Wrapper>

    {/* <Section>
      <h3>Theme</h3>
    </Section> */}

    <Section>
      <h3>Date range</h3>

      <DropdownMenu
        label="Default presets"
        options={ dateRangePresets }
        initialActive={ 1 }
        handleUpdate={ handleDateRangeUpdate }
      />
    </Section>

    <Section>
      {/* min and max magnitude */}
      <h3>Magnitude range</h3>
      <MagnitudeRange />
    </Section>


    <Section>
      <h3>Quake types</h3>
      {/* how many days */}

      {/* quake types */}
      <h4>Which event types to show</h4>
      <Indent>
        <QuakeTypesContainer>
          <QuakeTypeMarker pos={ showType } />
          <QuakeTypes>
            {
              quakeTypes.map((type, i) => <div onClick={ e => changeType(i) } key={ `quake-type-filter-${i}` }>
                <QuakeTypeLabel active={ i === showType }>{ type }</QuakeTypeLabel>
              </div>)
            }
          </QuakeTypes>
        </QuakeTypesContainer>
      </Indent>

    </Section>

  </Wrapper>
}

export default DashboardSettings

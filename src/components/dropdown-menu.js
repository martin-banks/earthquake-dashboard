import React, { useState } from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'


const Label = Styled.p`
  font-family: dharma-gothic-e;
  font-weight: 300;
  font-size: 20px;
  letter-spacing: 1px;
`

const Container = Styled.ul`
  position: relative;
  margin: 0;
  margin-bottom: 2rem;
  padding: 0;
  height: 36px;
  border: solid 1px rgba(100,100,100, 0.5);
`
const Option = Styled.li`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 20px;
  span {
    text-align: center;
    font-weight: bold;
  }

  top: 0;
  left: 0;
  width: 100%;
  list-style: none;
  padding: 1rem 2rem;
  transform: translateY(${p => p.index * 100}%);
  box-sizing: border-box;
  cursor: pointer;
  background: ${p => p.active && p.selected ? '#ddd' : p.active ? 'white' : 'none'};
  @media screen and (prefers-color-scheme: dark) {
    background: ${p => p.active && p.selected ? '#333' : p.active ? 'black' : 'none'};
  }
  transition: all 200ms;
  &:hover {
    background: ${p => p.active && 'slategrey'};
  }
`

function DropdownMenu (props) {
  const {
    label,
    options,
    handleUpdate,
    initialActive,
  } = props

  const [ selected, updateSelected ] = useState(initialActive)
  const [ showOptions, setShowOptions ] = useState(false)


  const updateActiveSelection = i => {
    setShowOptions(false)
    if (i === selected) return
    updateSelected(i)
    handleUpdate(i)
  }

  return <div>
    { label && <Label>{ label }</Label> }

    <Container onClick={ () => !showOptions ? setShowOptions(!showOptions) : null }>
      {
        showOptions
          ? options && options.map((o, i) => <Option
                key={ `dropdown-${o.label}-${i}` }
                selected={ i === selected }
                active={ true }
                index={ i }
                onClick={ e => updateActiveSelection(i)}
              >{ o.label }</Option>
            )
          : <Option selected={ true }>{ options[selected].label }<span>+</span></Option>

      }

    </Container>
  </div>
}


DropdownMenu.defaultProps = {
  initialActive: 0
}

DropdownMenu.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func,
  initialActive: PropTypes.number
}


export default DropdownMenu

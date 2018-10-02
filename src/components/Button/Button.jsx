import React, { Component } from 'react'
import { string, func } from 'prop-types'
import './Button.css'

export default class Button extends Component {
  render() {
    const { title, onClick } = this.props

    return (
      <div className='button' onClick={onClick}>
        {title}
      </div>
    )
  }
}

Button.propTypes = {
  title: string,
  onClick: func
}

Button.defaultProps = {
  title: '',
  onClick: () => {}
} 

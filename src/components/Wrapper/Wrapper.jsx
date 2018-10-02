import React, { Component } from 'react'
import { node } from 'prop-types'
import './Wrapper.css'

export default class Wrapper extends Component {
  render() {
    return (
      <div className='wrapper'>
        {this.props.children}
      </div>
    )
  }
}

Wrapper.propTypes = {
  children: node
}

import React, { Component } from 'react'
import { string } from 'prop-types'
import './Loader.css'

const CHUCK_AVATAR = 'https://res.cloudinary.com/jerrick/image/upload/f_auto,fl_progressive,q_auto,c_fit,w_1100/wvanipvk1xocft2jsthp'

export default class Loader extends Component {
  render() {
    const { title } = this.props

    return (
      <div className='loader'>
        <h2>{title}</h2>
        <img
          src={CHUCK_AVATAR}
          className='favorites_avatar'
        />
      </div>
    )
  }
}

Loader.propTypes = {
  title: string
}

Loader.defaultProps = {
  title: ''
} 

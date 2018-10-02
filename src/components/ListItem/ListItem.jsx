import React, { Component } from 'react'
import { object, string, func, bool } from 'prop-types'
import Button from '../Button'
import './ListItem.css'

export default class List extends Component {
  handleMarkAsFavorite = () => {
    const {
      item: {
        id,
        joke,
        jokeId
      },
      action
    } = this.props

    const itemId = jokeId ? jokeId : id

    action({
      joke,
      jokeId: itemId
    })
  }

  render() {
    const {
      item: { id, joke, jokeId },
      title,
      isFavorite
    } = this.props

    const buttonTitle = isFavorite ? '- Remove from favorite' : '+ Add to favorite'

    return (
      <li className='listItem'>
        <span className='listItem_title'>{title} {id}</span>
        <i className='listItem_quote'>{joke}</i>
        <Button title={buttonTitle} onClick={this.handleMarkAsFavorite}/>
      </li>
    )
  }
}

List.propTypes = {
  isFavorite: bool,
  item: object,
  title: string,
  action: func
}

List.defaultProps = {
  isFavorite: false,
  object: {},
  title: '',
  action: () => {}
} 

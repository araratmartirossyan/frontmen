import React, { Component } from 'react'
import { object, string, func } from 'prop-types'
import Button from '../Button'
import './ListItem.css'

export default class List extends Component {
  handleMarkAsFavorite = () => {
    const { item: { id, joke }, action } = this.props
    action({
      joke,
      jokeId: id
    })
  }

  render() {
    const {
      item: { id, joke },
      title
    } = this.props

    return (
      <li className='listItem'>
        <span className='listItem_title'>{title} {id}</span>
        <i className='listItem_quote'>{joke}</i>
        <Button title='Add to favorite' onClick={this.handleMarkAsFavorite}/>
      </li>
    )
  }
}

List.propTypes = {
  item: object,
  title: string,
  action: func
}

List.defaultProps = {
  object: {},
  title: '',
  action: () => {}
} 

import React, { Component } from 'react'
import { array, func } from 'prop-types'
import ListItem from '../ListItem'
import './List.css'

export default class List extends Component {
  isFavorite = ({ id, jokeId }) => {
    const { favorites } = this.props
    const itemId = jokeId ? jokeId : String(id)
    return favorites.map(({ jokeId }) => jokeId).includes(itemId)
  }

  render() {
    const { list, action } = this.props

    return (
      <ul className='list'>
        {list.map((item, key) =>
          <ListItem
            item={item}
            key={key}
            isFavorite={this.isFavorite(item)}
            title='Joke number'
            action={action}
          />
        )}
      </ul>
    )
  }
}

List.propTypes = {
  list: array,
  favorites: array,
  action: func
}

List.defaultProps = {
  list: [],
  favorites: [],
  action: () => {}
} 

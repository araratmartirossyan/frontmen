import React, { Component } from 'react'
import { array, func } from 'prop-types'
import ListItem from '../ListItem'
import './List.css'

export default class List extends Component {
  render() {
    const { list, action } = this.props

    return (
      <ul className='list'>
        {list.map((item, key) =>
          <ListItem
            item={item}
            key={key}
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

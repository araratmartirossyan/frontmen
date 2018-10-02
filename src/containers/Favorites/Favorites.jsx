import React, { Component } from 'react'
import { array } from 'prop-types'
import connect from 'redux-connect-decorator'
import List from '../../components/List'
import { markFavoriteJoke, fetchFavorites } from '../../stores/modules/favorite'

import './Favorites.css'

const CHUCK_AVATAR = 'https://res.cloudinary.com/jerrick/image/upload/f_auto,fl_progressive,q_auto,c_fit,w_1100/wvanipvk1xocft2jsthp'

@connect(
  ({ favorite: { favorites } }) => ({ favorites }),
  {
    markFavoriteJoke,
    fetchFavorites
  }
)

export default class Favorites extends Component {
  componentWillMount() {
    this.props.fetchFavorites()
  }

  render() {
    const { favorites, markFavoriteJoke } = this.props
    if (favorites.length === 0) {
      return (
        <div className='favorites'>
          <h2>Sorry. But you did not add any jokes to your favorite list! </h2>
          <img
            src={CHUCK_AVATAR}
            className='favorites_avatar'
          />
        </div>
      )
    }
    return (
      <div className='favorites'>
        <List
          list={favorites}
          favorites={favorites}
          action={markFavoriteJoke}
        />
      </div>
    )
  }
}

Favorites.propTypes = {
  favorites: array
}

Favorites.defaultProps = {
  favorites: []
}

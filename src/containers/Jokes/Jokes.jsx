import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import { array, func } from 'prop-types'
import { fetchJokes } from '../../stores/modules/jokes'
import { markFavoriteJoke, fetchFavorites } from '../../stores/modules/favorite'
import List from '../../components/List'

import './Jokes.css'

@connect(
  ({
    jokes: { jokesList },
    favorite: { favorites }
  }) => ({
    jokesList,
    favorites
  }),
  {
    fetchJokes,
    markFavoriteJoke,
    fetchFavorites
  }
)

export default class Jokes extends Component {
  componentWillMount() {
    this.props.fetchJokes()
    this.props.fetchFavorites()
  }

  render() {
    const { jokesList, markFavoriteJoke, favorites } = this.props

    return (
      <div className='jokes'>
        <List
          list={jokesList}
          favorites={favorites}
          action={markFavoriteJoke}
        />
      </div>
    )
  }
}

Jokes.propTypes = {
  jokesList: array,
  favorites: array,
  markFavoriteJoke: func
}

Jokes.defaultProps = {
  jokesList: [],
  favorites: [],
  markFavoriteJoke: () => {}
}

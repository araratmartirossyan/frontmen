import React, { Component } from 'react'
import List from '../../components/List'
import connect from 'redux-connect-decorator'
import { array, func } from 'prop-types'
import { fetchJokes, markFavoriteJoke } from '../../stores/modules/jokes'

import './Jokes.css'

@connect(
  ({ jokes: { jokesList } }) => ({ jokesList }),
  {
    fetchJokes,
    markFavoriteJoke
  }
)

export default class Jokes extends Component {
  componentWillMount() {
    this.props.fetchJokes()
  }

  render() {
    const { jokesList, markFavoriteJoke } = this.props

    return (
      <div className='jokes'>
        <List list={jokesList} action={markFavoriteJoke}/>
      </div>
    )
  }
}

Jokes.propTypes = {
  jokesList: array,
  markFavoriteJoke: func
}

Jokes.defaultProps = {
  jokesList: [],
  markFavoriteJoke: () => {}
}

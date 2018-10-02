import React, { Component } from 'react'
import Wrapper from '../../components/Wrapper'
import List from '../../components/List'
import connect from 'redux-connect-decorator'
import { array } from 'prop-types'
import { fetchJokes } from '../../stores/modules/jokes'

import './Favorites.css'

@connect(
  ({ jokes: { favorites } }) => ({ favorites }),
  {
    fetchFavorites
  }
)

export default class Favorites extends Component {
  componentWillMount() {
    this.props.fetchFavorites()
  }

  render() {
    const { favorites } = this.props

    return (
      <div className='jokes'>
        <Wrapper>
          <List list={favorites}/>
        </Wrapper>
      </div>
    )
  }
}

Favorites.propTypes = {
  favorites: array
}

Favorites.defaultProps = {
  favorites: () => []
}

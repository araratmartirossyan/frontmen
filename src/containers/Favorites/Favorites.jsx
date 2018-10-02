import React, { Component } from 'react'
import { array } from 'prop-types'
import connect from 'redux-connect-decorator'
import List from '../../components/List'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { markFavoriteJoke, fetchFavorites } from '../../stores/modules/favorite'

import './Favorites.css'

const LOADER_TITLE = 'Sorry. But you did not add any jokes to your favorite list!'

@connect(
  ({ favorite: { favorites, pages, meta } }) => ({ favorites, pages, meta }),
  {
    markFavoriteJoke,
    fetchFavorites
  }
)

export default class Favorites extends Component {
  componentWillMount() {
    this.props.fetchFavorites({
      page: 1,
      limit: 10
    })
  }

  handleNextPage = () => {
    const { fetchFavorites, meta: { page, limit } } = this.props
    const currentPage = page + 1
    fetchFavorites({ page: currentPage, limit })
  }

  handlePreviousPage = () => {
    const { fetchFavorites, meta: { page, limit } } = this.props
    const currentPage = page - 1
    fetchFavorites({ page: currentPage, limit })
  }

  render() {
    const {
      favorites,
      markFavoriteJoke,
      pages,
      meta: { page }
    } = this.props
    const hasMore = page < pages
    const showPreviousButton = page > 1
    if (favorites.length === 0) {
      return (<Loader title={LOADER_TITLE} />)
    }
    
    return (
      <div className='favorites'>
        <List
          list={favorites}
          favorites={favorites}
          action={markFavoriteJoke}
        />
        {showPreviousButton && <Button title='Previous page' onClick={this.handlePreviousPage} />}
        {hasMore && <Button title='Next page' onClick={this.handleNextPage} />}
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

import React, { Component } from 'react'
import { array } from 'prop-types'
import connect from 'redux-connect-decorator'
import List from '../../components/List'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { markFavoriteJoke, fetchFavorites, generateFavoriteJoke } from '../../stores/modules/favorite'

import './Favorites.css'

const LOADER_TITLE = 'Sorry. But you did not add any jokes to your favorite list!'
const STATUS_REQUEST_INTERVAL = 5 * 1000

@connect(
  ({ favorite: { favorites, pages, meta } }) => ({ favorites, pages, meta }),
  {
    markFavoriteJoke,
    fetchFavorites,
    generateFavoriteJoke
  }
)

export default class Favorites extends Component {
  constructor(props) {
    super(props)

    this.tm = null
  }

  componentWillMount() {
    this.props.fetchFavorites({
      page: 1,
      limit: 10
    })
  }

  componentWillReceiveProps() {
    if (this.props.favorites.length >= 10) {
      clearInterval(this.tm)
    }
  }

  componentWillUnmount() {
    clearInterval(this.tm)
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

  handleStartCount = () => {
    const { favorites, generateFavoriteJoke } = this.props
    if (favorites.length >= 10) {
      clearInterval(this.tm)
    } else {
      this.tm = setInterval(() =>
        generateFavoriteJoke(),
        STATUS_REQUEST_INTERVAL
      )
    }
  }

  renderButton = ({ title, func }) =>
    <Button
      title={title}
      onClick={func}
    />

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
        {
          this.renderButton({
            title: 'Start count',
            func: this.handleStartCount
          })
        }
        <List
          list={favorites}
          favorites={favorites}
          action={markFavoriteJoke}
        />
        {showPreviousButton &&
          this.renderButton({
            title: 'Previous page',
            func: this.handlePreviousPage
          })
        }
        {hasMore &&
          this.renderButton({
            title: 'Next page',
            func: this.handleNextPage
          })
        }
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

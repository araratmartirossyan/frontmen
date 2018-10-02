import React, { Component } from 'react'
import { array, func, number, object } from 'prop-types'
import connect from 'redux-connect-decorator'
import List from '../../components/List'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { markFavoriteJoke, fetchFavorites, generateFavoriteJoke } from '../../stores/modules/favorite'

import './Favorites.css'

const LOADER_TITLE = 'Sorry. But you did not add any jokes to your favorite list!'
const STATUS_REQUEST_INTERVAL = 2 * 1000

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

  state = {
    isCounting: false
  }

  componentWillMount() {
    this.props.fetchFavorites({
      page: 1,
      limit: 10
    })
  }

  componentWillReceiveProps() {
    if (this.props.favorites.length >= 9) {
      this.handleKillCounter()
      this.setState({ 
        isCounting: false
      })
    }
  }

  componentWillUnmount() {
    this.handleKillCounter()
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

  handleKillCounter = () => {
    clearInterval(this.tm)
    this.setState({
      isCounting: !this.state.isCounting
    })
  }

  handleStartCount = () => {
    const { favorites, generateFavoriteJoke } = this.props
    if (favorites.length >= 10) {
      this.handleKillCounter()
    } else {
      this.setState({
        isCounting: !this.state.isCounting
      })
      this.tm = setInterval(() =>
        generateFavoriteJoke(1),
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
    const { isCounting } = this.state
    const hasMore = page < pages
    const showPreviousButton = page > 1
    const cantCount = favorites.length >= 10
    const counterProps = isCounting ?
      { title: 'Stop count', func: this.handleKillCounter } :
      { title: 'Start count', func: this.handleStartCount }

    if (favorites.length === 0) {
      return (
        <div className='favorites'>
          {!cantCount && this.renderButton({ ...counterProps })}
          <Loader title={LOADER_TITLE} />
        </div>
      )
    }

    return (
      <div className='favorites'>
        {!cantCount && this.renderButton({ ...counterProps })}
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
  favorites: array,
  meta: object,
  pages: number,
  markFavoriteJoke: func,
  fetchFavorites: func,
  generateFavoriteJoke: func
}

Favorites.defaultProps = {
  favorites: [],
  meta: {},
  pages: 0,
  markFavoriteJoke: () => {},
  fetchFavorites: () => {},
  generateFavoriteJoke: () => {}
}

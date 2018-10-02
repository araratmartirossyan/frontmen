import { createAction, createReducer } from 'redux-act'
import { propOr } from 'ramda'
import {
  fetchFavoritesRequest,
  markFavoriteJokeRequest,
  generateFavorite
} from '../../services/favoriteService'
import { setFavoriteJoke } from '../modules/jokes'
const initialState = {
  favorites: [],
  meta: {
    page: 1,
    limit: 10
  }
}

const fetchFavoritesSuccess = createAction('frontmen/favorite/FETCH_FAVORITE_SUCCESS')
const fetchFavoritesFailure = createAction('frontmen/favorite/FETCH_FAVORITE_FAILURE')
const markFavoriteSuccess = createAction('frontmen/favorite/MARK_FAVORITE_SUCCESS')
const markFavoriteFailure = createAction('frontmen/favorite/MARK_FAVORITE_FAILURE')
const generateFavoriteSuccess = createAction('frontmen/favorite/GENERATE_FAVORITE_SUCCESS')
const generateFavoriteFailure = createAction('frontmen/favorite/GENERATE_FAVORITE_FAILURE')

export const fetchFavorites = ({ page, limit }) => dispatch =>
  fetchFavoritesRequest({ page, limit })
    .then(data =>
      dispatch(fetchFavoritesSuccess({ ...propOr([], 'data', data), page, limit }))
    )

const handleFetchFavoritesSuccess = (
  state,
  {
    data: {
      count,
      favorites = [],
      pages
    } = {},
    page,
    limit
  }
) => ({
  ...state,
  favorites,
  favCount: count,
  pages,
  meta: {
    page,
    limit
  }
})
  

const handleFetchFavoritesFailure = (state, error) =>
  ({
    ...state,
    isError: true,
    error
  })

export const markFavoriteJoke = params => (dispatch, getState) =>
  markFavoriteJokeRequest(params)
    .then(() => {
      dispatch(fetchFavorites({ ...getState().favorite.meta }))
      dispatch(markFavoriteSuccess())
      dispatch(setFavoriteJoke(params))
    })

const handleMarkFavoriteSuccess = state => ({ ...state })
 
const handleMarkFavoriteFailure = (state, error) =>
  ({
    ...state,
    isError: true,
    error
  })

export const generateFavoriteJoke = count => dispatch =>
  generateFavorite(count)
    .then(data => dispatch(
      generateFavoriteSuccess(
        propOr({}, 'data', data)
      )
    )
  )

const handleGenerateFavoriteSuccess = (state, { data: { count, data } }) => {
  const favs = state.favorites
  const favorites = [...favs, data]
  return ({
    ...state,
    favorites,
    favCount: count
  })
}
 
const handleGenerateFavoriteFailure = (state, error) =>
  ({
    ...state,
    isError: true,
    error
  })

const reducer = createReducer(on => {
  on(fetchFavoritesFailure, handleFetchFavoritesFailure)
  on(fetchFavoritesSuccess, handleFetchFavoritesSuccess)

  on(markFavoriteSuccess, handleMarkFavoriteSuccess)
  on(markFavoriteFailure, handleMarkFavoriteFailure)

  on(generateFavoriteSuccess, handleGenerateFavoriteSuccess)
  on(generateFavoriteFailure, handleGenerateFavoriteFailure)
}, initialState)

export default reducer

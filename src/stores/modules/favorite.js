import { createAction, createReducer } from 'redux-act'
import { propOr } from 'ramda'
import { fetchFavoritesRequest, markFavoriteJokeRequest } from '../../services/favoriteService'
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

const handleMarkFavoriteSuccess = (state) =>
  ({
    ...state,
    isLoading: false,
    isLoaded: true
  })
 
const handleMarkFavoriteFailure = (state, error) =>
  ({
    ...state,
    isError: true,
    isLoading: false,
    isLoaded: true,
    error
  })

const reducer = createReducer(on => {
  on(fetchFavoritesFailure, handleFetchFavoritesFailure)
  on(fetchFavoritesSuccess, handleFetchFavoritesSuccess)
  on(markFavoriteSuccess, handleMarkFavoriteSuccess)
  on(markFavoriteFailure, handleMarkFavoriteFailure)
}, initialState)

export default reducer

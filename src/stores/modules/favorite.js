import { createAction, createReducer } from 'redux-act'
import { fetchFavoritesRequest, markFavoriteJokeRequest } from '../../services/favoriteService'

const initialState = {
  favorites: []
}

const fetchFavoritesSuccess = createAction('frontmen/favorite/FETCH_FAVORITE_SUCCESS')
const fetchFavoritesFailure = createAction('frontmen/favorite/FETCH_FAVORITE_FAILURE')
const markFavoriteSuccess = createAction('frontmen/favorite/MARK_FAVORITE_SUCCESS')
const markFavoriteFailure = createAction('frontmen/favorite/MARK_FAVORITE_FAILURE')


export const fetchFavorites = () => dispatch =>
  fetchFavoritesRequest()
  .then(({ data }) =>
    dispatch(fetchFavoritesSuccess(data))
  )

const handleFetchFavoritesSuccess = (state, { data }) =>
  ({
    ...state,
    favorites: data
  })

const handleFetchFavoritesFailure = (state, error) =>
  ({
    ...state,
    isError: true,
    error
  })

export const markFavoriteJoke = params => dispatch =>
  markFavoriteJokeRequest(params)
    .then(() => {
      dispatch(fetchFavorites())
      dispatch(markFavoriteSuccess())
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

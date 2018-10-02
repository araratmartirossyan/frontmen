import { createAction, createReducer } from 'redux-act'
import { fetchJokesRequest, markFavoriteJokeRequest } from '../../services/jokesService'

const initialState = {
  jokes: []
}

const fetchFavoritesSuccess = createAction('frontmen/favorite/FETCH_FAVORITE_SUCCESS')
const fetchFavoritesFailure = createAction('frontmen/favorite/FETCH_FAVORITE_FAILURE')
const markFavoriteSuccess = createAction('frontmen/jokes/MARK_FAVORITE_SUCCESS')
const markFavoriteFailure = createAction('frontmen/jokes/MARK_FAVORITE_FAILURE')

export const fetchJokes = () => dispatch =>
  fetchJokesRequest()
    .then(({ data: { value } }) =>
      dispatch(fetchJokesSuccess(value))
    )

const handleFetchJokesSuccess = (state, jokesList) =>
  ({
    ...state,
    jokesList
  })

const handleFetchJokesFailure = (state, error) =>
  ({
    ...state,
    isError: true,
    error
  })

export const markFavoriteJoke = params => dispatch =>
  markFavoriteJokeRequest(params)
    .then(({ data: { success } }) => )

const handleMarkFavoriteSuccess = (state, jokesList) =>
  ({
    ...state,
    jokesList
  })
  
const handleMarkFavoriteFailure = (state, error) =>
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
}, initialState)

export default reducer
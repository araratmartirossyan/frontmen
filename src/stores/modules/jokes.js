import { createAction, createReducer } from 'redux-act'
import { fetchJokesRequest, markFavoriteJokeRequest } from '../../services/jokesService'

const initialState = {
  jokes: []
}

const fetchJokesSuccess = createAction('frontmen/jokes/FETCH_JOKES_SUCCESS')
const fetchJokesFailure = createAction('frontmen/jokes/FETCH_JOKES_FAILURE')
const markFavoriteSuccess = createAction('frontmen/jokes/FETCH_JOKES_SUCCESS')
const markFavoriteFailure = createAction('frontmen/jokes/FETCH_JOKES_FAILURE')

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
    .then(data => {
      console.log(data, 'important')
    })

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
  on(fetchJokesFailure, handleFetchJokesFailure)
  on(fetchJokesSuccess, handleFetchJokesSuccess)
  on(markFavoriteSuccess, handleMarkFavoriteSuccess)
  on(markFavoriteFailure, handleMarkFavoriteFailure)
}, initialState)

export default reducer
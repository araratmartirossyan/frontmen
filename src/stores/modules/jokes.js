import { createAction, createReducer } from 'redux-act'
import { fetchJokesRequest } from '../../services/jokesService'
import { pathOr } from 'ramda'

const initialState = {
  jokesList: []
}

const fetchJokesSuccess = createAction('frontmen/jokes/FETCH_JOKES_SUCCESS')
const fetchJokesFailure = createAction('frontmen/jokes/FETCH_JOKES_FAILURE')
export const setFavoriteJoke = createAction('frontmen/jokes/SET_FAVORITE_JOKE')

export const fetchJokes = ({ count }) => dispatch =>
  fetchJokesRequest(count)
    .then(data =>
      dispatch(
        fetchJokesSuccess(
          pathOr([], ['data', 'value'], data)
        )
      )
    )

const handleSetFavoriteJoke = (state, { jokeId }) => {
  const { jokesList } = state
  const index = jokesList.findIndex(({ id }) => id === jokeId)
  const newState = {
    ...state,
    ...jokesList[index] = {
      ...jokesList[index],
      isFavorite: jokesList[index] && !jokesList[index].isFavorite
    }
  }
  return ({
    ...newState
  })
}

const handleFetchJokesSuccess = (state, jokesList = []) =>
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

const reducer = createReducer(on => {
  on(fetchJokesFailure, handleFetchJokesFailure)
  on(fetchJokesSuccess, handleFetchJokesSuccess)
  on(setFavoriteJoke, handleSetFavoriteJoke)
}, initialState)

export default reducer

import { createAction, createReducer } from 'redux-act'
import { fetchJokesRequest } from '../../services/jokesService'

const initialState = {
  jokesList: []
}

const fetchJokesSuccess = createAction('frontmen/jokes/FETCH_JOKES_SUCCESS')
const fetchJokesFailure = createAction('frontmen/jokes/FETCH_JOKES_FAILURE')

export const fetchJokes = () => dispatch =>
  fetchJokesRequest()
    .then(({ data: { value } }) =>
      dispatch(fetchJokesSuccess(value))
    )

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
}, initialState)

export default reducer

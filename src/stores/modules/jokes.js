import { createAction, createReducer } from 'redux-act'
import { fetchJokesRequest } from '../../services/jokesService'

const initialState = {
  jokes: []
}

const fetchJokesSuccess = createAction('frontmen/jokes/FETCH_JOKES_SUCCESS')
const fetchJokesFailure = createAction('frontmen/jokes/FETCH_JOKES_FAILURE')

export const fetchJokes = () => dispatch =>
  fetchJokesRequest()
    .then(({ data }) =>
      dispatch(fetchJokesSuccess(data)))

const handleFetchJokesSuccess = (state, jokes) =>
  ({
    ...state,
    jokes
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
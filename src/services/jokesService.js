import { clientApi } from '../utils/clientApi'

export const fetchJokesRequest = () =>
  clientApi('get', 'http://localhost:3000/api/v1/jokes/random')

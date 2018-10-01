import { clientApi } from '../utils/clientApi'

export const fetchJokesRequest = () =>
  clientApi('get', 'https://api.incodewetrust.ru/api/v1/posts')
import { clientApi } from '../utils/clientApi'

export const fetchFavoritesRequest = () =>
  clientApi('get', 'http://localhost:3000/api/v1/jokes/favorites')

export const markFavoriteJokeRequest = params =>
  clientApi('post', 'http://localhost:3000/api/v1/jokes/', params)

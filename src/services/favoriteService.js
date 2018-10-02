import { clientApi } from '../utils/clientApi'

export const fetchFavoritesRequest = ({ page, limit }) =>
  clientApi(
    'get',
    `http://localhost:3000/api/v1/jokes/favorites?page=${page}&limit=${limit}`
  )

export const markFavoriteJokeRequest = params =>
  clientApi(
    'post',
    'http://localhost:3000/api/v1/jokes/',
    params
  )

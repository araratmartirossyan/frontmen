import { intersection, isEmpty } from 'ramda'

export const getJokeList = (favorites, jokesList) => {
  if (!isEmpty(favorites) && !isEmpty(jokesList)) {
    console.log(favorites, jokesList)
    const existingItems = intersection(favorites, jokesList)
    existingItems.map(item => console.log(item))
  }
}
import { combineReducers } from 'redux'
import jokes from './modules/jokes'
import favorite from './modules/favorite'

export default combineReducers({
  jokes,
  favorite
})

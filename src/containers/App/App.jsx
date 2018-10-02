import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import connect from 'redux-connect-decorator'
import Wrapper from '../../components/Wrapper'
import Jokes from '../Jokes'
import Favorites from '../Favorites'

import './App.css'

@connect(
  ({ favorite: { favCount } }) => ({ favCount }),
)

export default class App extends Component {
  render() {
    const { favCount } = this.props

    return (
      <Router>
        <div className='app'>
          <div className='app_header'>
            <NavLink 
              to='/favorites'
              className='button'
            >
              My Favorites {favCount}
            </NavLink>
            <NavLink 
              to='/jokes'
              className='button'
            >
              Jokes
            </NavLink>
          </div>
          <Wrapper>
            <Route path='/jokes' component={Jokes} />
            <Route path='/favorites' component={Favorites} />
          </Wrapper>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
}

App.defaultProps = {
}

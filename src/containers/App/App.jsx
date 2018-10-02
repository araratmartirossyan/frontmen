import React, { Component } from 'react'
import Wrapper from '../../components/Wrapper'
import Jokes from '../Jokes'

import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Wrapper>
          <Jokes />
        </Wrapper>
      </div>
    )
  }
}

App.propTypes = {
}

App.defaultProps = {
}

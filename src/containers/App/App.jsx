import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import { array } from 'prop-types'
import { fetchJokes } from '../../stores/modules/jokes'
import './App.css'

@connect(
  ({ jokes: { jokes } }) => ({ jokes }),
  {
    fetchJokes
  }
)

class App extends Component {

  renderJokes = (item, key) =>
    <li key={key}>{item.id}</li>

  render() {
    const { jokes } = this.props

    return (
      <div className="App">
        <button onClick={this.props.fetchJokes}>Fetch jokes</button>
        {jokes && jokes.map(this.renderJokes)}
      </div>
    )
  }
}

App.propTypes = {
  jokes: array
}

App.defaultProps = {
  jokes: []
}

export default App

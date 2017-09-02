import { h, Component } from 'preact'
import style from './style'

export default class Search extends Component {

  handlerOnSearch = event => {
    event.preventDefault()
    const $input = event.target.querySelector('#searchInput')
    const query = $input.value
    $input.value = ''
    this.props.handlerOnSearch(query)
  }

  render () {
    return (
      <header>
        <div class={style.innerContainer}>
          <h1>Mini github client</h1>
          <form action="" onSubmit={this.handlerOnSearch}>
            <input id="searchInput" type="search"
                   placeholder="Search GitHub"/>
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
    )
  }
}
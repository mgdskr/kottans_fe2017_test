import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'

export default class Header extends Component {
  state = {
    data: [],
    baseURL: 'https://api.github.com',
  }

  handlerOnSearch = event => {
    event.preventDefault()
    console.log('search start')
    // fetch
  }git

  // componentDidMount() {
  //   console.log(this)
  // }

  render () {
    return (
      <header class={style.header}>
        <h1>mini GitHub API client</h1>
        <form action="" onSubmit={this.handlerOnSearch}>
          <input type="text" placeholder="Search for github repo here..."/>
          <button type="submit">Search</button>
        </form>



        <nav>
          <Link activeClassName={style.active} href="/">Home</Link>
          <Link activeClassName={style.active} href="/profile">Me</Link>
          <Link activeClassName={style.active} href="/profile/john">John</Link>
        </nav>
      </header>
    )
  }
}

import { h, Component } from 'preact'
import style from './style'

export default class Main extends Component {
  render ({main}) {
    console.log('query from main',main)
    return (
      <main>
        MAIN

      </main>
    )
  }
}

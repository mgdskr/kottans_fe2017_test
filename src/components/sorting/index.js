import { h, Component } from 'preact'
import style from './style'

export default class Sorting extends Component {
  render ({handlerOnSort, sorting}) {
    console.log(sorting)
    return (
      <div>
        {Object.keys(sorting).map(sortType => <button onClick={handlerOnSort(sortType)}>{sorting[sortType].title}</button>
          )
        }
      </div>
    )
  }
}
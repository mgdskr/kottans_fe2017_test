import { h, Component } from 'preact'
import style from './style'
import sortingTypes, { sortingOptions } from './sorting'

export default class Sorting extends Component {

  handlerOnSort = sortingType => () => {
    console.log('handlerOnSort', sortingType)
    const sortingObj = sortingOptions[sortingType]
    this.props.handlerOnSort(sortingObj)
  }

  render ({sortingObj, handlerOnSort}) {
    console.log()
    return (
      <div>
        Sort options
        <ul>
          {Object.keys(sortingOptions).
            map(key =>
              <li>
              <label htmlFor={key}>{sortingOptions[key].title}</label>
              <input type="radio"
                     id={key}
                     name="sorting"
                     value={key}
                     checked={sortingOptions[key].sortingField === sortingObj.sortingField &&
                              sortingOptions[key].sortingOrder === sortingObj.sortingOrder}
                     onChange={this.handlerOnSort(key)}/>

              </li>
            )
          }
        </ul>


      </div>
    )
  }
}
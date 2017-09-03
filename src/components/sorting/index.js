import { h, Component } from 'preact'
import style from './style'
import { sortingOptions } from './sorting'

export default class Sorting extends Component {

  handlerOnSort = event => {
    const sortingType = [].find.call(event.target.childNodes, option => option.selected).value
    const sortingObj = sortingOptions[sortingType]
    this.props.handlerOnSort(sortingObj)
  }

  render ({sortingObj, handlerOnSort}) {
    console.log()
    return (
      <div class={style.sort}>
        <label htmlFor="sorting">Sort options</label>
        <select size="1" id="sorting" name="sorting" onChange={this.handlerOnSort}>
          {Object.keys(sortingOptions).
            map(key =>
              <option value={key}
                      selected={sortingOptions[key].sortingField === sortingObj.sortingField &&
                                sortingOptions[key].sortingOrder === sortingObj.sortingOrder}>
                {sortingOptions[key].title}
              </option>
            )
          }
        </select>
      </div>
    )
  }
}
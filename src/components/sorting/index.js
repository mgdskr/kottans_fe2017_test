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
      <div class={style.sortingContainer}>
        <div class={style.sort}>
          <label htmlFor="sorting">Sort</label>
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
      </div>
    )
  }
}
import { h, Component } from 'preact'
import style from './style'
import sortingTypes from './sorting'

export default class Sorting extends Component {

  handlerOnSort = sortingField => () => {
    this.props.handlerOnSort(sortingField)
  }


  render ({filterObj, handlerOnSort}) {
    return (
      <div>
        {Object.keys(sortingTypes).
          map(sortingParameter => <button
            onClick={this.handlerOnSort(sortingTypes[sortingParameter].field)}>{sortingTypes[sortingParameter].title}</button>,
          )
        }
      </div>
    )
  }
}
import { h, Component } from 'preact'
import style from './style'

export default class Filters extends Component {

  //TODO if user is changed lang has to be set to 'Any'

  handlerOnFilterBy = event => {
    const t = event.target
    const $inputId = t.id
    const $inputName = t.name
    const filterObj = {...this.props.filterObj}

    if ($inputId === 'hasOpenIssues') {
      filterObj.hasOpenIssues = t.checked
    } else if ($inputId === 'hasTopics') {
      filterObj.hasTopics = t.checked
    } else if ($inputId === 'starred') {
      filterObj.starredGTXTimes = t.value
    } else if ($inputId === 'updatedAfter') {
      filterObj.updatedAfter = t.value
    } else if ($inputName === 'type') {
      filterObj.type = t.value.toLowerCase()
    } else if ($inputId === 'language') {
      console.log('!!!!!!')
      filterObj.lang = [].find.call(t.childNodes, option => option.selected).value
    }

    this.props.handlerOnFilter(filterObj)
  }


  render ({filterObj ,languages}) {
    return (
      <div >
        <div>
          <label htmlFor="hasOpenIssues">Has open issues</label>
          <input id="hasOpenIssues"
                 type="checkbox"
                 checked={filterObj.hasOpenIssues}
                 onChange={this.handlerOnFilterBy}/>
        </div>

        <div>
          <label htmlFor="hasTopics">Has topics</label>
          <input id="hasTopics"
                 type="checkbox"
                 checked={filterObj.hasTopics}
                 onChange={this.handlerOnFilterBy}/>
        </div>

        <div>
          <label htmlFor="starred">Starred more than X times</label>
          <input id="starred"
                 type="number"
                 value={filterObj.starredGTXTimes}
                 onInput={this.handlerOnFilterBy}/>
        </div>
        <div>
          <label htmlFor="updatedAfter">Updated after</label>
          <input id="updatedAfter"
                 type="date"
                 value={filterObj.updatedAfter}
                 onChange={this.handlerOnFilterBy}/>
        </div>
        <div>
          Type
          {['All', 'Fork', 'Source'].map(type =>
            <div>
              <label htmlFor={type}>{type}</label>
              <input id={type}
                     type="radio"
                     name="type"
                     value={type}
                     checked={type.toLowerCase() === filterObj.type}
                     onChange={this.handlerOnFilterBy}/>
            </div>
          )}
        </div>
        <div>
          Languages
          <select id="language" size="1" name="sorting" onChange={this.handlerOnFilterBy}>
            {languages.map(language =>
                <option value={language}
                        selected={language === filterObj.lang}>
                  {language}
                </option>
              )
            }
          </select>
        </div>
      </div>
    )
  }
}
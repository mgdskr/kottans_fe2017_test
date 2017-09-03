import { h, Component } from 'preact'
import style from './style'

export default class Filters extends Component {

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
    } else if ($inputId === 'type') {
      console.log('!!!!!!')
      filterObj.type = [].find.call(t.childNodes, option => option.selected).value.toLowerCase()
    } else if ($inputId === 'language') {
      filterObj.lang = [].find.call(t.childNodes, option => option.selected).value
    }

    this.props.handlerOnFilter(filterObj)
  }


  render ({filterObj ,languages}) {
    return (
      <div >
        <div class={style.filter}>
          <input id="hasOpenIssues"
                 type="checkbox"
                 checked={filterObj.hasOpenIssues}
                 onChange={this.handlerOnFilterBy}/>
          <label class={style.checkbox}
                 htmlFor="hasOpenIssues">
            Has open issues
          </label>

          <input id="hasTopics"
                 type="checkbox"
                 checked={filterObj.hasTopics}
                 onChange={this.handlerOnFilterBy}/>
          <label class={style.checkbox}
                 htmlFor="hasTopics">
            Has topics
          </label>
        </div>

        <div class={style.filter}>
          <label htmlFor="starred">Starred more than X times</label>
          <input id="starred"
                 type="number"
                 value={filterObj.starredGTXTimes}
                 onInput={this.handlerOnFilterBy}/>
        </div>

        <div class={style.filter}>
          <label htmlFor="updatedAfter">Updated after</label>
          <input id="updatedAfter"
                 type="date"
                 value={filterObj.updatedAfter}
                 onChange={this.handlerOnFilterBy}/>
        </div>
        <div class={style.filter}>
          <label htmlFor="type">Type</label>
          <select id="type" name="type" size="1"onChange={this.handlerOnFilterBy}>
            {['All', 'Fork', 'Source'].map(type =>
                <option value={type}
                        selected={type.toLowerCase() === filterObj.type}>
                  {type}
                </option>
              )
            }
          </select>
        </div>

        <div class={style.filter}>
          <label htmlFor="language">Languages</label>
          <select name="language" id="language" size="1" onChange={this.handlerOnFilterBy}>
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
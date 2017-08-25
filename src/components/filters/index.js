import { h, Component } from 'preact'
import style from './style'

export default class Filters extends Component {
  state = {
    hasOpenIssues: false,
    starredGTXTimes: 0,
    updatedAfter: '1970-00-00T00:00:00Z',
    type: 'all',
    lang: 'Any',
  }

  _filterFunction = () => {
    const {hasOpenIssues, starredGTXTimes, updatedAfter, type, lang} = this.state
    return item => {
      return (hasOpenIssues ? item.open_issues_count > 0 : true) &&
        (item.stargazers_count >= starredGTXTimes) &&
        (item.updated_at > updatedAfter) &&
        (lang === 'Any' ? true : item.language === lang) &&
        (type === 'fork'
            ? item.fork === true
            : type === 'source'
              ? item.fork === false
              : true
        )
    }
  }

  handlerOnFilterByIssues = event => {
    this.setState({hasOpenIssues: event.target.checked})
    this.props.handlerOnFilter(this._filterFunction())
  }

  handlerOnFilterByStars = event => {
    this.setState({starredGTXTimes: event.target.value})
    this.props.handlerOnFilter(this._filterFunction())
  }

  handlerOnFilterByDate = event => {
    this.setState({updatedAfter: event.target.value})
    this.props.handlerOnFilter(this._filterFunction())
  }

  handlerOnFilterByType = event => {
    this.setState({type: event.target.value})
    this.props.handlerOnFilter(this._filterFunction())
  }

  handlerOnFilterByLang = event => {
    console.log('50', event.target.value)
    this.setState({lang: event.target.value})
    this.props.handlerOnFilter(this._filterFunction())
  }

  render ({languages}) {
    return (
      <div >
        <div>
          <label htmlFor="hasOpenIssues">Has open issues</label>
          <input id="hasOpenIssues"
                 type="checkbox"
                 onChange={this.handlerOnFilterByIssues}/>
        </div>
        <div>
          <label htmlFor="starred">Starred more than X times</label>
          <input id="starred"
                 type="number"
                 onInput={this.handlerOnFilterByStars}/>
        </div>
        <div>
          <label htmlFor="updatedAfter">Updated after</label>
          <input id="updatedAfter"
                 type="date"
                 onChange={this.handlerOnFilterByDate}/>
        </div>
        <div>
          Type
          <div>
            <label htmlFor="typeAll">All</label>
            <input id="typeAll"
                   type="radio"
                   name="type"
                   value="all"
                   defaultChecked="true"
                   onChange={this.handlerOnFilterByType}/>
          </div>
          <div>
            <label htmlFor="typeFork">Fork</label>
            <input id="typeFork"
                   type="radio"
                   name="type"
                   value="fork"
                   onChange={this.handlerOnFilterByType}/>
          </div>
          <div>
            <label htmlFor="typeSource">Source</label>
            <input id="typeSource"
                   type="radio"
                   name="type"
                   value="source"
                   onChange={this.handlerOnFilterByType}/>
          </div>
        </div>
        <div>
          Language
          {languages.map(lang => <div key={lang}>
            <label htmlFor={lang}>{lang}</label>
            <input id={lang}
                   type="radio"
                   name="lang"
                   value={lang}
                   onChange={this.handlerOnFilterByLang}/>
          </div>)}
        </div>
      </div>
    )
  }
}

// has open issues
// has_issues

// has topics

// starred >= X times
// stargazers_count

// updated after X date
// updated_at

// type (all, forks, or sources)
// fork  any true false

// language

// forks
// erlcourses
// kottans-calendar
// ruby-slides
import { h, Component } from 'preact'
import { Router, route } from 'preact-router'

import * as githubApi from '../lib/github-api'
import initialState from './initialState'

import Header from './header'
import Home from '../routes/home'
import Profile from '../routes/profile'
import Search from './search'
import ReposList from './reposList'
import Filters from './filters'
import Sorting from './sorting'
import Dialog from './dialog'
import Main from './main'

import * as utils from '../lib/utils'

// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
  state = initialState

  handleRoute = e => {
    return
    // if (e.url !== this.state.query) {
    //   this.handlerOnSearch(e.url.replace('/\//', ''))
    // }

    // console.log('e', e.current.attributes.matches)

    const {query, sortingObj, filterObj} = this.state
    // const fullRoute = utils.getFullRoute(query, sortingObj, filterObj)
    // const routeChanged = fullRoute !== e.url.replace(/\//, '')
    console.log('currentRoute', this.currentRoute)
    const routeChanged = this.currentRoute !== e.url.replace(/\//, '')

    if (routeChanged) {
      const matches = e.current.attributes.matches
      const {sort, order, has_open_issues, language, starred_gt, type, updated_after, user, has_topics} = matches

      let setSorting = {}
      let setFilter = {}

      let updateSorting = false

      if (sort) {
        const sortingObj = {
          sortingField: sort,
          sortingOrder: order,
        }
        updateSorting = JSON.stringify(sortingObj) !== JSON.stringify(this.state.sortingObj)

        setSorting = updateSorting
          ? {
            sortingObj,
            sortingFunction: utils.sortingFunction(sortingObj),
          }
          : {}
      }

      let updateFilter = false

      console.log('matches', has_open_issues, starred_gt,  updated_after, type, language, has_topics)

      const isFilter = matches.hasOwnProperty('has_open_issues') || matches.hasOwnProperty('starred_gt') || updated_after || type ||
        language || matches.hasOwnProperty('has_topics')
      if (isFilter) {
        const filterObj = {
          hasOpenIssues: matches.hasOwnProperty('has_open_issues'),
          has_topics: matches.hasOwnProperty('has_topics'),
          starredGTXTimes: matches.hasOwnProperty('starred_gt') ? starred_gt : 0,
          updatedAfter: (updated_after && updated_after.replace(/_/, '-')) ||
          '2000-01-01',
          type: type || 'all',
          lang: language || 'Any',
        }

        updateFilter = JSON.stringify(filterObj) !== JSON.stringify(this.state.filterObj)

        setFilter = updateFilter
          ? {
            filterObj,
            filterFunction: utils.filterFunction(filterObj),
          }
          : {}
      }

      if (updateSorting || updateFilter) {
        this.setState(Object.assign({}, setSorting, setFilter,
          {updateRoute: false}
          ))
      }
    }
  }

  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentDidUpdate() {
    const {query, sortingObj, filterObj, updateRoute} = this.state
    const newRoute =  utils.getFullRoute(query, sortingObj, filterObj)
    if (newRoute !== this.currentRoute && updateRoute) {
      this.currentRoute = newRoute
      history.pushState({filterObj: this.state.filterObj, sortingObj: this.state.sortingObj}, 'Mini github client', newRoute)
    }
  }

  componentDidMount() {
    window.addEventListener('popstate', e => {
      this.setState({...e.state, updateRoute: false})
    })
  }


  render ({}, {
    data,
    additionalData,
    sorting,
    languages,
    selectedItemId,
    languagesList,
    query,
    filterObj,
    sortingObj,
    }) {

    console.log('render app', this.state)

    const filterFunction = utils.filterFunction(filterObj)
    const sortingFunction= utils.sortingFunction(sortingObj)
    const filteredAndSortedData = data.filter(filterFunction).sort(sortingFunction)
    const selectedItem = selectedItemId && additionalData[selectedItemId]

    console.log('filtered data', filterFunction)
    console.log('filtered data', filteredAndSortedData)


    return (
      <div id="app">
        <Router onChange={this.handleRoute}>
          <Search path="/:user?" handlerOnSearch={this.handlerOnSearch}/>
        </Router>
        <Filters filterObj={filterObj}
                 languages={languages}
                 handlerOnFilter={this.handlerOnFilter}/>
        <Sorting sortingObj={sortingObj}
                 handlerOnSort={this.handlerOnSort}
                 sorting={sorting}/>
        <ReposList data={filteredAndSortedData}
                   handlerOnOpenDialog={this.handlerOnOpenDialog}/>
        <Dialog dialogItem={selectedItem}/>

        {data.length === 0 || data.length % 30 ? null : <button onClick={this.handleLoadMore}>Load more</button>}

        <Header />
      </div>
    )
  }

  handlerOnOpenDialog = selectedItemId => {
    if (this.state.additionalData[selectedItemId]) {
      return this.setState({selectedItemId})
    }

    const selectedItem = this.state.data.find(item => item.id === selectedItemId)
    const URLs = [selectedItem.languages_url,
                  selectedItem.contributors_url,
                  selectedItem.url + '/pulls?sort=popularity&per_page=5']

    if (selectedItem.fork) {
      URLs.push(selectedItem.url)
    }

    const promises = URLs.map(URL => {
      return fetch(URL).then(res => res.json())
    })

    Promise.all(promises)
      .then(responses => {
        console.log('fromPromise', responses)
        const languages = responses[0]

        this.setState({
          selectedItemId,
          additionalData: {...this.state.additionalData, [selectedItemId]: {
            htmlUrl: selectedItem.html_url,
            languages,
            contributors: responses[1],
            pulls: responses[2],
            source: responses[3] ? responses[3].parent.html_url : ''
          }}
        })
      }
      )
      .catch(err => console.log(err))
  }

  handlerOnSearch = query => {
    const page = 1
    githubApi.searchRepositories(query, page)
      .then(data => {
        const languages = data.reduce((acc, item) => {
          if (item.language === null || acc.includes(item.language)) {return acc}
          return acc.concat(item.language)
        }, [])

        this.setState({
          ...initialState,
          ...{
            query,
            data: data,
            languages: ['Any', ...languages],
            page,
            allPagesLoaded: data.length < 30,
          }})
        })
      .catch(err => console.log(err))
  }

  handleLoadMore = () => {
    const page = this.state.page + 1

    githubApi.searchRepositories(this.state.query, page).then(data => {
      const languages = data.reduce((acc, item) => {
        if (item.language === null || acc.includes(item.language)) {return acc}
        return acc.concat(item.language)
      }, [])

      this.setState({
        data: [...this.state.data, ...data],
        languages: ['Any', ...languages],
        page,
        allPagesLoaded: data.length < 30,
      })
    }).catch(err => console.log(err))
  }

  handlerOnFilter = filterObj => {
    this.setState({
      filterObj,
      updateRoute: true,
    })
  }

  handlerOnSort = sortingField => {
    const sortingObj = {
      sortingField,
      sortingOrder: this.state.sortingObj.sortingOrder || 'asc'
    }
    const oppositeSortingOrder = sortingObj.sortingOrder === 'asc' ? 'desc' : 'asc'
    this.setState({
      sortingObj: {...sortingObj, sortingOrder: oppositeSortingOrder},
      updateRoute: true,
    })
  }

}
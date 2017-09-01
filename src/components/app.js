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
    console.log('handleRoute')
    if (!this.state.query && e.url !== '/') {
      const matches = e.current.attributes.matches
      const {sort, order, has_open_issues, language, starred_gt, type, updated_after, user, has_topics} = matches

    console.log(`%c matches `, 'color: red; font-size: 19px', matches)
    console.log('user', user)


      const sortingObj = {
        sortingField: sort,
        sortingOrder: order,
      }

      const filterObj = {
            hasOpenIssues: matches.hasOwnProperty('has_open_issues'),
            hasTopics: matches.hasOwnProperty('has_topics'),
            starredGTXTimes: matches.hasOwnProperty('starred_gt') ? starred_gt : 0,
            updatedAfter: (updated_after && updated_after.replace(/_/g, '-')) ||
            '2000-01-01',
            type: type || 'all',
            lang: language || 'Any',
      }

      const page = 1

      githubApi.searchRepositories(user, page)
        .then(data => {
          const languages = data.reduce((acc, item) => {
            if (item.language === null || acc.includes(item.language)) {return acc}
            return acc.concat(item.language)
          }, []).sort(utils.sortingAlg)

          history.replaceState({filterObj, sortingObj,}, 'Mini github client', e.url)

          this.setState({
            ...initialState,
              query: user,
              data: data,
              languages: ['Any', ...languages],
              page,
              allPagesLoaded: data.length < 30,
              filterObj,
              sortingObj
            })
        })
        .catch(err => console.log(err))
    }
  }


  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentDidUpdate() {
    const {query, sortingObj, filterObj, updateRoute} = this.state
    const newRoute =  utils.getFullRoute(query, sortingObj, filterObj)
    if (newRoute !== this.currentRoute && updateRoute) {
      console.log('pushing new route')
      this.currentRoute = newRoute
      history.pushState({filterObj, sortingObj,}, 'Mini github client', newRoute)
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
    allPagesLoaded,
    }) {

    console.log('render app', this.state)

    const filterFunction = utils.filterFunction(filterObj)
    const sortingFunction= utils.sortingFunction(sortingObj)
    const filteredAndSortedData = data.filter(filterFunction).sort(sortingFunction)
    if (data.length > 0 && filteredAndSortedData.length < 10 && !allPagesLoaded) {
      this.handlerLoadMore()
    }
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

        {data.length === 0 || data.length % 30 ? null : <button onClick={this.handlerLoadMore}>Load more</button>}

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
    console.log('searching new data')
    const page = 1
    githubApi.searchRepositories(query, page)
      .then(data => {
        const languages = data
          .reduce((acc, item) => {
            if (item.language === null || acc.includes(item.language)) {return acc}
            return acc.concat(item.language)
            }, [])
          .sort(utils.sortingAlg)

        console.log(languages)

        this.setState({
          ...initialState,
          ...{
            query,
            data: data,
            languages: ['Any', ...languages],
            page,
            allPagesLoaded: data.length < 30,
            updateRoute: true,
          }})
        })
      .catch(err => console.log(err))
  }

  handlerLoadMore = () => {
    const page = this.state.page + 1

    githubApi.searchRepositories(this.state.query, page).then(data => {
      const languages = data.reduce((acc, item) => {
        if (item.language === null || acc.includes(item.language)) {return acc}
        return acc.concat(item.language)
      }, [])

      this.setState({
        data: [...this.state.data, ...data],
        languages: ['Any', ...Array.from(new Set([...this.state.languages.slice(1), ...languages])).sort(utils.sortingAlg)],
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

// TODO add pagination to URL
// TODO add error handling if there are no user
import { h, Component } from 'preact'
import { Router, route } from 'preact-router'

import * as githubApi from '../lib/github-api'
import initialState from './initialState'

import Search from './search'
import ReposList from './reposList'
import Filters from './filters'
import Sorting from './sorting'
import Dialog from './dialog'
import Spinner from './spinner'
import * as utils from '../lib/utils'

import style from './style.css'

export default class App extends Component {
  state = {...initialState}

  handleRoute = e => {
    if (!this.state.query && e.url !== '/') {
      this.setState({spinnerVisible: true})

      const matches = e.current.attributes.matches
      const {sort, order, has_open_issues, language, starred_gt, type, updated_after, user, has_topics} = matches

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
      githubApi.searchRepositories(user, page).then(data => {
        if (!data.length) {throw 'no data'}
        const languages = data.reduce((acc, item) => {
          if (item.language === null ||
            acc.includes(item.language)) {return acc}
          return acc.concat(item.language)
        }, []).sort(utils.sortingAlg)

        const URLWithoutPage = e.url.replace(/.page=\d+/g, '')
        history.replaceState({filterObj, sortingObj,}, 'Mini github client',
          URLWithoutPage)

        this.setState({
          ...initialState,
          query: user,
          data: data,
          languages: ['Any', ...languages],
          allPagesLoaded: data.length < 30,
          page,
          filterObj,
          sortingObj,
          spinnerVisible: false,
        })
      }).catch(err => console.log(err))
    }
  }
  componentDidUpdate () {
    const {query, sortingObj, filterObj, updateRoute, page} = this.state
    const newRoute = utils.getFullRoute(query, sortingObj, filterObj, page)
    if (newRoute !== this.currentRoute && updateRoute) {
      this.currentRoute = newRoute
      history.pushState({filterObj, sortingObj,}, 'Mini github client',
        newRoute)
    }
  }

  componentDidMount () {
    window.addEventListener('popstate', e => {
      this.setState({...e.state, updateRoute: false})
    })
  }

  handlerOnOpenDialog = selectedItemId => {
    if (this.state.additionalData[selectedItemId]) {
      return this.setState({selectedItemId})
    }
    this.setState({spinnerVisible: true})

    const selectedItem = this.state.data.find(
      item => item.id === selectedItemId)
    const URLs = [
      selectedItem.languages_url,
      selectedItem.contributors_url,
      selectedItem.url + '/pulls?sort=popularity&per_page=5']

    if (selectedItem.fork) {
      URLs.push(selectedItem.url)
    }

    const promises = URLs.map(URL => {
      return fetch(URL).then(res => res.json())
    })

    Promise.all(promises).then(responses => {
        const contributors =

        this.setState({
          selectedItemId,
          additionalData: {
            ...this.state.additionalData, [selectedItemId]: {
              fullName: selectedItem.full_name,
              htmlUrl: selectedItem.html_url,
              languages: responses[0],
              contributors: responses[1].sort((a,b) => b.contributions - a.contributions).slice(0,3),
              pulls: responses[2],
              sourceUrl: responses[3] ? responses[3].parent.html_url : '',
              sourceName: responses[3] ? responses[3].parent.full_name : '',
            },
          },
          spinnerVisible: false,
        })
      },
    ).catch(err => console.log(err))
  }

  handlerOnSearch = query => {
    this.setState({spinnerVisible: true})

    const page = 1

    githubApi.searchRepositories(query, page).then(data => {
      const languages = data.reduce((acc, item) => {
        if (item.language === null || acc.includes(item.language)) {return acc}
        return acc.concat(item.language)
      }, []).sort(utils.sortingAlg)

      const newState = {
        ...initialState,
        ...{
          query,
          data: data,
          languages: ['Any', ...languages],
          page,
          allPagesLoaded: data.length < 30,
          updateRoute: true,
          spinnerVisible: false,
        },
      }

      this.setState(newState)
    })
    .catch(err => console.log(err))
  }

  handlerLoadMore = () => {
    this.setState({spinnerVisible: true})

    const page = this.state.page + 1

    githubApi.searchRepositories(this.state.query, page).then(data => {
      const languages = data.reduce((acc, item) => {
        if (item.language === null || acc.includes(item.language)) {return acc}
        return acc.concat(item.language)
      }, [])

      this.setState({
        data: [...this.state.data, ...data],
        languages: ['Any',
          ...Array.from(
            new Set([...this.state.languages.slice(1), ...languages])).
            sort(utils.sortingAlg)],
        page,
        allPagesLoaded: data.length < 30,
        updateRoute: true,
        spinnerVisible: false,
      })
    })
    .catch(err => console.log(err))
  }

  handlerOnFilter = filterObj => {
    this.setState({
      filterObj,
      updateRoute: true,
    })
  }

  handlerOnSort = sortingObj => {
    this.setState({
      sortingObj,
      updateRoute: true,
    })
  }

  handlerOnCloseDialog = () => {
    this.setState({selectedItemId: null})
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
    spinnerVisible
  }) {

    const filterFunction = utils.filterFunction(filterObj)
    const sortingFunction = utils.sortingFunction(sortingObj)
    const filteredAndSortedData = data.filter(filterFunction).
      sort(sortingFunction)

    //load more data if filtered results count less than 10
    if (data.length > 0 && filteredAndSortedData.length < 10 &&
      !allPagesLoaded) {
      this.handlerLoadMore()
    }
    const selectedItem = selectedItemId && additionalData[selectedItemId]

    return (
      <div id="app">
        <Router onChange={this.handleRoute}>
          <Search path="/:user?" handlerOnSearch={this.handlerOnSearch}/>
        </Router>
        <main>
          { query
            ? data.length
              ? <h1>{query}</h1>
              : <h1>{`No user with name ${query} is found`}</h1>
            : null
          }

          { data.length
            ? <div class={style.content}>
                <Filters filterObj={filterObj}
                         languages={languages}
                         handlerOnFilter={this.handlerOnFilter}/>
                <Sorting sortingObj={sortingObj}
                         handlerOnSort={this.handlerOnSort}
                         sorting={sorting}/>
                <ReposList data={filteredAndSortedData}
                           handlerOnOpenDialog={this.handlerOnOpenDialog}/>
                { data.length === 0 || data.length % 30
                  ? null
                  : <button type="button" class={style.loadMore} onClick={this.handlerLoadMore}>Load more</button>
                }
              </div>
            : null
          }

        </main>

        { selectedItemId
          ? <Dialog dialogItem={selectedItem}
                    handlerOnCloseDialog={this.handlerOnCloseDialog}/>
          : null
        }

        { spinnerVisible && <Spinner/>}

      </div>
    )
  }
}
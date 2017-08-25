import { h, Component } from 'preact'
import { Router } from 'preact-router'

import * as githubApi from '../lib/github-api'

import Header from './header'
import Home from '../routes/home'
import Profile from '../routes/profile'
import Search from './search'
import ReposList from './reposList'
import Filters from './filters'
import Sorting from './sorting'
import Dialog from './dialog'
// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
  state = {
    data: [],
    // filteredAndSortedData: [],
    query: '',
    sorting: {
      repoName: {
        title: 'Repo name',
        field: 'full_name',
        sortOrder: 'ASC',
      },
      starsCount: {
        title: 'Stars count',
        field: 'stargazers_count',
        sortOrder: 'DESC',
      },
      openIssuesCount: {
        title: 'Open issues count',
        field: 'open_issues_count',
        sortOrder: 'DESC',
      },
      updatedDate: {
        title: 'Updated at',
        field: 'updated_at',
        sortOrder: 'DESC',
      },
    },
    filterFunction: item => true,
    sortFunction: (a,b) => 0,
    languages: ['Any'],
    dialogItemId: null,
    languagesList: {},
  }

  /** Gets fired when the route changes.
   *  @param {Object} event    "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url  The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render ({}, {data, sorting, languages, dialogItemId, languagesList, filterFunction, sortFunction}) {
    console.log(data)
    console.log(languagesList)
    const filteredAndSortedData = data.filter(filterFunction).sort(sortFunction)
    const dialogItem = dialogItemId &&
      this.state.data.find(item => item.id === dialogItemId)
    console.log('render 60', dialogItem)

    return (
      <div id="app">
        <Search handlerOnSearch={this.handlerOnSearch}/>
        <Filters languages={languages}
                 handlerOnFilter={this.handlerOnFilter}/>
        <Sorting handlerOnSort={this.handlerOnSort}
                 sorting={sorting}/>
        <ReposList data={filteredAndSortedData}
                   handlerOnOpenDialog={this.handlerOnOpenDialog}/>
        <Dialog dialogItem={dialogItem}/>
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/"/>
          <Profile path="/profile/" user="me"/>
          <Profile path="/profile/:user"/>
        </Router>
      </div>
    )
  }

  handlerOnOpenDialog = dialogItemId => {
    console.log('dialogItemId', dialogItemId)
    const dialogItem = this.state.filteredAndSortedData.find(item => item.id === dialogItemId)
    console.log('dialogItem', dialogItem)
    const contributorsURL = dialogItem.contributors_url
    const languagesURL = dialogItem.languages_url
    let languagesList = null
    console.log('urls', languagesURL, contributorsURL)
    const getLanguages = fetch(languagesURL).then(res => {
      console.log('lang', res)
      return res.json()
    })
    const getContributors = fetch(contributorsURL).then(res => {
      console.log('cont', res)
      return res.json()
    })
    Promise.all([getLanguages, getContributors]).then(responses => {
      console.log('promise all', responses)
      this.setState({dialogItemId})
      // this.setState({languagesList})
    }).catch(err => console.log(err))
  }

  handlerOnFilter = filterFunction => {
    this.setState({filterFunction})
  }

  handlerOnSearch = query => {
    console.log(query)
    githubApi.searchRepositories(query).then(data => {
      const languages = data.items.reduce((acc, item) => {
        if (item.language === null || acc.includes(item.language)) {return acc}
        return acc.concat(item.language)
      }, [])

      this.setState({
        query,
        data: data.items,
        filteredAndSortedData: data.items,
        totalCount: data.total_count,
        languages: this.state.languages.concat(languages),
      })
    }).catch(err => console.log(err))
  }

  handlerOnSort = sortParameter => () => {
    const sortField = this.state.sorting[sortParameter].field
    const sortOrder = this.state.sorting[sortParameter].sortOrder
    const oppositeSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC'
    const sortFunction = (a, b) => {
      const sortingAlg = (x, y) => {
        if (typeof x === 'string' || typeof y === 'string') {
          x = x.toLowerCase()
          y = y.toLowerCase()
        }
        if (x < y) {
          return -1
        } else if (x > y) {
          return 1
        } else {
          return 0
        }
      }
      return sortOrder === 'ASC'
        ? sortingAlg(a[sortField], b[sortField])
        : sortingAlg(b[sortField], a[sortField])
    }
    this.setState({
      sortFunction,
      sorting: Object.assign({}, this.state.sorting, {
        [sortParameter]: Object.assign({}, this.state.sorting[sortParameter],
          {sortOrder: oppositeSortOrder}),
      }),
    })
  }

}
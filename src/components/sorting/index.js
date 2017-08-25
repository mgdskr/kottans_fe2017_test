import { h, Component } from 'preact'
import style from './style'

export default class Sorting extends Component {
  state = {
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
      sorting: Object.assign({}, this.state.sorting, {
        [sortParameter]: Object.assign({}, this.state.sorting[sortParameter],
          {sortOrder: oppositeSortOrder}),
      }),
    })

    this.props.handlerOnSort(sortFunction)
  }

  render ({handlerOnSort}, {sorting}) {
    console.log(sorting)
    return (
      <div>
        {Object.keys(sorting).
          map(sortParameter => <button
            onClick={this.handlerOnSort(sortParameter)}>{sorting[sortParameter].title}</button>,
          )
        }
      </div>
    )
  }
}
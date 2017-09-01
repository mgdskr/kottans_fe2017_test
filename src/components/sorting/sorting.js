const sortingTypes = {
  repoName: {
    title: 'Repo name',
    field: 'full_name',
    sortOrder: 'asc',
  },
  starsCount: {
    title: 'Stars count',
    field: 'stargazers_count',
    sortOrder: 'desc',
  },
  openIssuesCount: {
    title: 'Open issues count',
    field: 'open_issues_count',
    sortOrder: 'desc',
  },
  updatedDate: {
    title: 'Updated at',
    field: 'updated_at',
    sortOrder: 'desc',
  },
}

const sortingOptions = {
  repoNameAsc: {
    title: 'By name A-Z',
    sortingField: 'full_name',
    sortingOrder: 'asc',
  },
  repoNameDesc: {
    title: 'By name Z-A',
    sortingField: 'full_name',
    sortingOrder: 'desc',
  },
  starsCountDesc: {
    title: 'Most stars',
    sortingField: 'stargazers_count',
    sortingOrder: 'desc',
  },
  starsCountAsc: {
    title: 'Fewest stars',
    sortingField: 'stargazers_count',
    sortingOrder: 'asc',
  },
  openIssuesCountDesc: {
    title: 'Most open issues',
    sortingField: 'open_issues_count',
    sortingOrder: 'desc',
  },
  openIssuesCountAsc: {
    title: 'Least open issues',
    sortingField: 'open_issues_count',
    sortingOrder: 'asc',

  },
  updatedDateDesc: {
    title: 'Recently updated',
    sortingField: 'updated_at',
    sortingOrder: 'desc',

  },
  updatedDateAsc: {
    title: 'Least recently updated',
    sortingField: 'updated_at',
    sortingOrder: 'asc',

  },
}

export default sortingTypes
export {sortingOptions}
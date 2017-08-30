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

export default sortingTypes
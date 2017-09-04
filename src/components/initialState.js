const initialState = {
  data: [],
  additionalData: {},
  query: '',
  languages: [],
  selectedItemId: null,
  filterObj: {
    hasOpenIssues: false,
    hasTopics: false,
    starredGTXTimes: 0,
    updatedAfter: '2000-01-01',
    type: 'all',
    lang: 'Any',
  },
  sortingObj: {
    sortingField: 'full_name',
    sortingOrder: 'asc',
  },
  page: 0,
  allPagesLoaded: false,
  updateRoute: true,
  spinnerVisible: false,
}

export default initialState
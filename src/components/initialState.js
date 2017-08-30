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
  filterFunction: item => true,
  sortingObj: {},
  sortingFunction: (a,b) => 0,
  page: 0,
  allPagesLoaded: false,
  updateRoute: false,
}

export default initialState
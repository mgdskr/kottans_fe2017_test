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

const sortingFunction = ({sortingField, sortingOrder = 'asc'}) => (a, b) => {
  return sortingOrder === 'asc'
    ? sortingAlg(a[sortingField], b[sortingField])
    : sortingAlg(b[sortingField], a[sortingField])
}

const filterFunction = ({hasOpenIssues, hasTopics, starredGTXTimes, updatedAfter, type, lang}) =>
  item => {
    return (hasOpenIssues ? item.open_issues_count > 0 : true) &&
      (hasTopics ? item.topics.length > 0 : true) &&
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

const getFilterRoute = ({hasOpenIssues, hasTopics, starredGTXTimes, updatedAfter, type, lang}) => {
  let route = ''

  if (hasOpenIssues) {route += '&has_open_issues'}
  if (hasTopics) {route += '&has_topics'}
  if (starredGTXTimes) {route += '&starred_gt=' + starredGTXTimes}
  if (updatedAfter > '2000-01-01') {route += '&updated_after=' + updatedAfter.slice(0,10).replace(/-/g, '_')}
  if (type !== 'all') {route += '&type=' + type.toLowerCase()}
  if (lang !== 'Any') {route += '&language=' + lang.toLowerCase()}

  return route
}

const getSortingRoute = ({sortingField, sortingOrder}) => {
  return sortingField ? 'sort=' + sortingField + '&order=' + sortingOrder : ''
}

const getFullRoute = (query, sortingObj, filterObj, page) => {
  const sortingRoute = getSortingRoute(sortingObj)
  const filterRoute = getFilterRoute(filterObj)

  let fullRoute  = query
  fullRoute += sortingRoute || filterRoute || page > 1 ? '?' : ''
  fullRoute += sortingRoute ? sortingRoute : ''
  fullRoute += filterRoute ? filterRoute : ''
  fullRoute += page > 1 ? `&page=${page}` : ''

  return fullRoute.replace(/\?&/,'?')
}

const getLanguagesShares = languages => {
  const languagesTotalSum = Object.keys(languages)
  .reduce((acc, lang) => acc += languages[lang], 0)
  const otherLanguagesSum = Object.keys(languages)
  .reduce((acc, lang) => acc += languages[lang] < 1024 ? languages[lang] : 0, 0)
  const languagesInPercent = {}
  Object.keys(languages).forEach(lang => {
    if (languages[lang] >= 1024) {
      const languageShare = languages[lang] / languagesTotalSum * 100
      if (languageShare > 0) {
        languagesInPercent[lang] = languageShare
      }
    }
  })

  if (otherLanguagesSum > 0) {
    languagesInPercent.Others = otherLanguagesSum / languagesTotalSum * 100
  }
  return languagesInPercent
}


export { sortingFunction, filterFunction, getFilterRoute, getSortingRoute, getFullRoute, sortingAlg, getLanguagesShares }
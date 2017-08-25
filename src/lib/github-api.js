const searchRepositories = query => {
  const baseURL = 'https://api.github.com/search/repositories?q='
  console.log(query)
  return fetch(baseURL + query).then(result => result.json())
}

export { searchRepositories }
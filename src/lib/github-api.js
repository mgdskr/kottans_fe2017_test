const searchRepositories = (user, page = 1) => {
  // const baseURL = 'https://api.github.com/search/repositories?q='
  const baseURL = 'https://api.github.com/users/'
  // application/vnd.github.mercy-preview+json
  const headers = new Headers()
  headers.set('Accept', 'application/vnd.github.mercy-preview+json')
  return fetch(baseURL + user + '/repos?&page=' + page, {headers})
          .then(result => result.json())
}

export { searchRepositories }
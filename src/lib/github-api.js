const searchRepositories = (user, page = 1) => {
  const baseURL = 'https://api.github.com/users/'
  const headers = new Headers()
  headers.set('Accept', 'application/vnd.github.mercy-preview+json')
  return fetch(baseURL + user + '/repos?page=' + page, {headers})
          .then(result => result.json())
}

export { searchRepositories }
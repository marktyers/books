
var request = require('request')

exports.search = (request, callback) => {
  if (request.query.q === undefined) {
    callback(new Error('missing q query parameter'))
    return
  }
  const url = 'https://www.googleapis.com/books/v1/volumes'
  const query_string = {q: request.query.q, maxResults: 40, fields: 'items(id,volumeInfo(title,authors))'}
  getData(url, query_string, (err, data) => {
    if (err) {
      callback(new Error(err.message))
      return
    }
    const items = JSON.parse(data).items
    const books = items.map( element => {
      return {id:element.id, title:element.volumeInfo.title, authors:element.volumeInfo.authors}
    })
    console.log(books)
    callback(null, books)
  })
}

var getData = (url, queryString, callback) => {
  request.get({url: url, qs: queryString}, (err, res, body) => {
    if (err) {
      callback(new Error('request not successful'))
    }
    callback(null, body)
  })
}
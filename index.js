var restify = require('restify')
var server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

var books = require('./books')

server.get('library/', (req, res) => {
  books.search(req, (err, data) => {
    var code, response
    if (err) {
      console.log('error')
      code = 400
      response = err
    } else {
      code = 200
      response = data
    }
    res.setHeader('content-type', 'application/json')
    res.send(code, response)
    res.end()
  })
})

var port = process.env.PORT || 8080;
server.listen(port, function (err) {
  if (err) {
      console.error(err);
  } else {
    console.log('App is ready at : ' + port);
  }
})
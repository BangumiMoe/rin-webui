var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.dev')
var proxy = require('proxy-middleware');
var url = require('url');

var app = express()
var compiler = webpack(config)
if (process.env.HOT) {
  // options for dev env
}

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))

app.use('/api/user/signin', proxy(url.parse('https://bangumi.moe/api/user/signin')))
app.use('/api/torrent/fetch', proxy(url.parse('https://bangumi.moe/api/torrent/fetch')))
app.use('/api/tag/fetch', proxy(url.parse('https://bangumi.moe/api/tag/fetch')))
app.use('/api/user/fetch', proxy(url.parse('https://bangumi.moe/api/user/fetch')))
app.use('/api/team/fetch',proxy(url.parse('https://bangumi.moe/api/team/fetch')))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'index.hot.html'))
})

app.set('port', process.env.VUEPACK_PORT || 3000)
app.listen(app.get('port'), 'localhost', function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + app.get('port'))
})
require('newrelic');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon')
const proxy = require('http-proxy-middleware')


const app = express();

app.use(cors());

app.use(compression());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/api/cart/*', proxy({ target: 'http://ec2-54-183-240-90.us-west-1.compute.amazonaws.com', ws: true, changeOrigin: true}));

app.use('/files', express.static(`${__dirname}/public`));

app.get('/products/:id', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/loaderio-2f049c0ba64a8883a490dd74b1b3cc7b.txt', (req, res) => {
  res.sendFile(`${__dirname}/public/loaderio-2f049c0ba64a8883a490dd74b1b3cc7b.txt`);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.get('*', (req, res) => {
  res.redirect('/products/1');
})

app.listen(3000);

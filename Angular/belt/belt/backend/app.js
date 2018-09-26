const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const petsRoutes = require('./routes/pets')

const app = express();

mongoose.connect('mongodb://localhost:27017/authors', { useNewUrlParser : true})
.then(() => {
  console.log('connected to database!')
})
.catch(() => {
  console.log('connection failed')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  next();
})

app.use('', petsRoutes)

module.exports = app;

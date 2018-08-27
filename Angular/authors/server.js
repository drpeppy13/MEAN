const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/authors/dist/authors'))
mongoose.connect('mongodb://localhost:27017/authors', { useNewUrlParser : true});

const { Schema } = mongoose();

// app.js
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')

// my schema goes here!
const Review = new mongoose.Schema({
	courseNumber: String,
  courseName: String,
  semester: String,
  year: Number,
  professor: String,
	review: String,
});

mongoose.connect('mongodb://localhost/hw06');
mongoose.model('Review', Review);

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.send('hi');
});

//const dataPath = path.join(__dirname, 'data.json');
  const port = 3000;
  app.listen(port);
  console.log(`server started on port ${port}`);

// app.js
const express = require('express');
const path = require('path');
require('./db.js');

const mongoose = require('mongoose')
const Review = mongoose.model('Review');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

//const test = new Review(courseName: "CSCI-UA.2020", "Intro To Devin", "Spring", 2020, "Ms. Lewtan", "the big quar, huh")

const test = new Review ({
	courseNumber: "CSCI-UA.2020",
  courseName: "Intro To Devin",
  semester: "Spring",
  year: 2020,
  professor: "Ms. Lewtan",
	review: "the big quar, huh",
});

// app.get('/', (req, res) => {
//   res.send(test.courseName)
// });
let newReviews = [];

Review.find({}, (err, reviews) => {
  newReviews = reviews;
  //res.render('all', {reviews: newReviews});
});


app.get('/', (req, res) => {
  // shows form
  // show reviews too
  Review.find({}, (err, reviews) => {
    res.render('all', {reviews: newReviews});
  });
});

app.get('/add', (req, res) => {
  // shows form
    res.render('review');
});

app.post('/add', (req, res) => {
  Review.find({}, (err, reviews) => {
    const { courseNumber, courseName, semester, year, professor, review } = req.body
    newReviews = [new Review({ courseNumber, courseName, semester, year, professor, review }), ...reviews]
    res.render('all', {reviews: newReviews});
  });
});


//const dataPath = path.join(__dirname, 'data.json');
  const port = 3000;
  app.listen(port);
  console.log(`server started on port ${port}`);


//   db.createUser(
//   {
//     user: "djl",
//     pwd: "lewtan", // or cleartext password
//     roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
//   }
// )

// mongo --port 27017  --authenticationDatabase "admin" -u "djl" -p

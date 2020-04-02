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

//sesions
const session = require('express-session');
const sessionOptions = {
	secret: 'secret for signing session id',
	saveUninitialized: false,
	resave: false
};
app.use(session(sessionOptions));

//session visits middleware
app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = 0
  }
	res.locals.visits = req.session.views
  // count the views
  req.session.views++
  next()
})

//cooookies middleware
app.use((req, res, next) => {
  console.log(req.headers.cookie)
})

app.get('/', (req, res) => {
  const { semester, year, professor } = req.query;
	let query = {}
	if (semester !== undefined && semester !== "" && semester !== "All") {
		query.semester = semester
	}
	if (year !== undefined && year !== "") {
		query.year = year
	}
	if (professor !== undefined && professor !== "") {
		query.professor = professor
	}
  Review.find(query, (err, reviews) =>
    res.render('all', {reviews: reviews})
  )
  });

app.get('/reviews/add', (req, res) => {
  // shows form
    res.render('review');
});

app.post('/reviews/add', (req, res) => {
  Review.find({}, (err, reviews) => {
		const newReview = new Review(req.body)
		newReview.save((err, savedReview) => {
			if(err) {
	      Review.find({}, (err, reviews) => {
	        res.render('review', {reviews: reviews, error: 'there was an error in your submission'});
	      });
	    } else {
				console.log(savedReview.courseName, 'has been added to the reviews collection')
	      res.redirect('../');
	    }
		})
  });
});


  const port = 3000;
  app.listen(port);
  console.log(`server started on port ${port}`);

const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const review = require('./models/review');
const Review = require('./models/review');

require('dotenv').config();
const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
 .then(result => app.listen(process.env.PORT || 8080))
 .catch(err => console.log(err));
 
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.redirect('/reviews');
});

app.get('/reviews', (req, res) => {
    Review.find().sort({createdAt: -1})
     .then(result => res.render('index', {title: 'Reviews', reviews: result, arr: result.map(a => a.show_movie)}))
     .catch(err => console.log(err));
});

app.get('/reviews/:show_movie', (req, res) => {
    const show_movie = req.params.show_movie;
    Review.find({show_movie:show_movie})
     .then(result => res.render('single-review', {title: 'Search Results', reviews: result}))
     .catch(err => console.log(err));
});

app.post('/reviews', (req, res) => {
    const review = new Review(req.body);
    review.save()
     .then(result => res.redirect('/reviews'))
     .catch(err => console.log(err));
});

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});

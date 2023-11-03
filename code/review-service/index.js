const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5002;
app.use(cors());

//mongoose.connect('mongodb://localhost:27017/reviews', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://database-service.default.svc.cluster.local:27017/reviews', { useNewUrlParser: true, useUnifiedTopology: true });

const reviewSchema = new mongoose.Schema({
    bookTitle: String,
    reviewText: String,
    userid: Number,
});

const Review = mongoose.model('Review', reviewSchema);

app.use(bodyParser.json());

app.post('/post-review', async (req, res) => {
    const { bookTitle, reviewText, userid } = req.body;
    const review = new Review({ bookTitle, reviewText, userid });
    await review.save();
    res.status(201).json({ message: "Review posted successfully!" });
});

app.get('/get-reviews', async (req, res) => {
    const reviews = await Review.find();
    res.status(200).json(reviews);
});

app.listen(PORT, () => {
    console.log(`Review service running on port ${PORT}`);
});

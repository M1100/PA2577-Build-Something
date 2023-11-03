const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5003;
app.use(cors());

// mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://database-service.default.svc.cluster.local:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new mongoose.Schema({
    reviewId: mongoose.Schema.Types.ObjectId,
    userid: Number,
    commentText: String,
});

const Comment = mongoose.model('Comment', commentSchema);

app.use(bodyParser.json());

app.post('/post-comment', async (req, res) => {
    const { reviewId, userid, commentText } = req.body;
    const comment = new Comment({ reviewId, userid, commentText });
    await comment.save();
    res.status(201).json({ message: "Comment posted successfully!" });
});

app.get('/get-comments/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
    const comments = await Comment.find({ reviewId });
    res.status(200).json(comments);
});

app.listen(PORT, () => {
    console.log(`Comment service running on port ${PORT}`);
});

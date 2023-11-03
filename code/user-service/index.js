const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;
app.use(cors());

// mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://database-service.default.svc.cluster.local:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists!" });
    }
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        return res.status(200).json({
            message: "Login successful!",
            userId: user._id,
            userName: username
        });
    }
    res.status(401).json({ message: "Invalid credentials!" });
});

app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
});

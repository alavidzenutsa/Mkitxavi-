require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection 
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB-სთან კავშირი დამყარებულია!'))
.catch(err => {
    console.error(' MongoDB-სთან კავშირის შეცდომა:', err);
    process.exit(1);
});

// Quiz Schema
const questionSchema = new mongoose.Schema({
  category: String,
  question: String,
  choices: [String],
  answer: Number
});

const scoreSchema = new mongoose.Schema({
  username: String,
  score: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);
const Score = mongoose.model('Score', scoreSchema);

// API Routes
app.get('/api/questions/:category', async (req, res) => {
    try {
        const questions = await Question.find({ category: req.params.category });
        console.log(` მოიძებნა ${questions.length} კითხვა კატეგორიაში: ${req.params.category}`);
        if (questions.length === 0) {
            return res.status(404).json({ 
                message: `კითხვები ვერ მოიძებნა კატეგორიაში: ${req.params.category}` 
            });
        }
        res.json(questions);
    } catch (err) {
        console.error(' კითხვების მოძიების შეცდომა:', err);
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/scores', async (req, res) => {
    try {
        const newScore = new Score(req.body);
        await newScore.save();
        console.log(' ახალი ქულა დამატებულია:', req.body);
        res.status(201).json(newScore);
    } catch (err) {
        console.error(' ქულის შენახვის შეცდომა:', err);
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/scores/:category', async (req, res) => {
    try {
        const scores = await Score.find({ category: req.params.category })
            .sort({ score: -1 })
            .limit(10);
        console.log(` მოიძებნა ${scores.length} შედეგი კატეგორიაში: ${req.params.category}`);
        res.json(scores);
    } catch (err) {
        console.error(' შედეგების მოძიების შეცდომა:', err);
        res.status(500).json({ message: err.message });
    }
});


app.get('*', (req, res) => {
    
    if (req.path.endsWith('.html')) {
        res.sendFile(path.join(__dirname, 'public', path.basename(req.path)));
    } else {
    
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` სერვერი გაშვებულია პორტზე: ${PORT}`);
    console.log(` სტატიკური ფაილები იკითხება დირექტორიიდან: ${path.join(__dirname, 'public')}`);
}); 
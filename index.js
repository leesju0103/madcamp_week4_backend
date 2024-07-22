const express = require('express');
const mongoose = require('mongoose');
const Diary = require('./models/diary');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/mydb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/diaries', async (req, res) => {
  const diary = new Diary(req.body);
  console.log(req.body);
  try {
    await diary.save();
    res.status(201).send(diary);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/diaries', async (req, res) => {
  try {
    const diaries = await Diary.find({});
    res.send(diaries);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/diaries/:date', async (req, res) => {
  const date = new Date(req.params.date);
  try {
    const diaries = await Diary.find({ date });
    res.send(diaries);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/diaries/:id', async (req, res) => {
  try {
    const diary = await Diary.findByIdAndDelete(req.params.id);
    if (!diary) {
      return res.status(404).send();
    }
    res.send(diary);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

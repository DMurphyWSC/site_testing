const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(
  'mongodb://mongo:27017/docker-node-mongo',
  { useNewUrlParser: true }
) 
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  // mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

const Record = require('./models/record');

app.get('/', (req, res) => {
  Record.find()
    .then(records => res.render('index', { records }))
    .catch(err => res.status(404).json({ msg: 'No records found' }));
});

app.post('/record/add', (req, res) => {
  const newRecord = new Record({
    name: req.body.name
  });

  newRecord.save().then(record => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));

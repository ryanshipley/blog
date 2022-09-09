const express = require('express');
const app = express();
const authorsController = require('./controllers/authors.js');
app.use('/authors', authorsController);
require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	//useFindAndModify: false,
	//useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.listen(3000, () => {
    console.log('listening....');
});

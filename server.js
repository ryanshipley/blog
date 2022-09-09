const express = require('express');
const app = express();
const authorsController = require('./controllers/authors.js');
const articlesController = require("./controllers/articles.js");
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require("method-override");


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
app.use(methodOverride("_method"));
app.use('/authors', authorsController);
app.use("/articles", articlesController);

app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.listen(3000, () => {
    console.log('listening....');
});

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

const db = require('./config/mongoose-connection'); // added a closing parenthesis

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", 'ejs');

app.use('/owners', ownersRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
//   console.log('Server is running on port 3000');
});
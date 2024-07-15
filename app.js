const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");

const usersRouter = require("./routes/usersRouter");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index.js");
const db = require("./config/mongoose-connection"); // added the mongoose connection

const flash = require("connect-flash");
const expressSession = require("express-session"); // require express-session

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  expressSession({
    // use expressSession
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   next();
// });

app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/", indexRouter);

app.listen(3000, () => {});

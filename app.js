const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("./config/config");

let session = require("express-session");
let flash = require("connect-flash");
let passport = require("passport");

const usersRouter = require("./routes/users");
const ticketsRouter = require("./routes/tickets");

const app = express();

//added session here
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: "sessionSecret",
  })
);

// Sets up passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

//for db
const mongoose = require("mongoose");

//databasekey
const db = config.MongoURI;

//connection to atlas using mongoose for simplicity using documentation
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo Atlas Connected"))
  .catch((err) => console.log(err));

app.use("/users", usersRouter);
app.use("/tickets", ticketsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

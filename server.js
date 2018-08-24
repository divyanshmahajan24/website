const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use(express.static(__dirname + "/public"));

// Middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile("server.log", log + "\n", () => {});
  next();
});

// Home page
app.get("/", (req, res) => {
  res.render("home.hbs");
});

// About page
app.get("/about", (req, res) => {
  res.render("about.hbs");
});

// Blog
app.get("/blog", (req, res) => {
  res.render("blog.hbs");
});

// Portfolio
app.get("/portfolio", (req, res) => {
  res.render("portfolio.hbs");
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});

const path = require("path");
const express = require("express");
const hbs = require("hbs");
require("dotenv").config();
// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"));
const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");
const app = express();

const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// Setup handlebars engine views location
app.set("view engine", "hbs");
//used after changing views folder to templates:
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//now that public index.html is set, won't see this:
// app.get("/", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

//using hbs:
app.get("/", (req, res) => {
  //name of template in views folder:
  res.render("index", {
    title: "Weather App",
    name: "James Hansen",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "James Hansen",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "This is a message on the help page.",
    name: "James Hansen",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided!",
    });
  }

  // res.send({
  //   forecast: "It's 50\xB0F degrees",
  //   location: "Here",
  //   address: req.query.address,
  // });
  geocode(req.query.address, (error, { latitude, longitude, label } = {}) => {
    if (error)
      return res.send({
        error,
      });

    forecast(latitude, longitude, (error, forecastData) => {
      if (error)
        return res.send({
          error,
        });
      res.send({
        forecast: forecastData.message,
        location: label,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  // console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  // console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  // res.send("Help article not found");
  res.render("404", {
    title: "404 Error Page",
    name: "James Hansen",
    errorMessage: "Help article not found.",
  });
});

// has to come last to work:
app.get("/*", (req, res) => {
  // res.send("My 404 page");
  res.render("404", {
    title: "404 Error Page",
    name: "James Hansen",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

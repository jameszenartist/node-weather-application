const path = require("path");
const express = require("express");
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

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res, next) => {
  res.sendFile("/index.html");
  next();
});

app.get("/about", (req, res) => {
  res.sendFile("/about.html", { root: publicDirectoryPath });
});

app.get("/help", (req, res) => {
  res.sendFile("/help.html", { root: publicDirectoryPath });
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
  res.send("<h2>404 Error Page</h2>");
});

// has to come last to work:
app.get("/*", (req, res) => {
  res.send("<h2>404 Error Page</h2>");
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

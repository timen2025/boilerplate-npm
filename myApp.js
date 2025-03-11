require('dotenv').config();
var bodyParser = require("body-parser");

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

console.log("Hello World");

app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

app.get('/now', 
  (req, res, next) => {
    req.time = new Date().toString();  
  next();
}, 
  (req, res) => {
    res.json({ 
      time: req.time 
    });
});

app.get('/:word/echo', (req, res) => {
  // Access the corresponding key in the req.params
  // use destructuring to get multiple parameters
  const { word } = req.params;
   // Send the req.params object as a JSON Response
  res.json({
    echo: word
  });
});

app.get('/name', (req, res) => {
  //destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({ 
    name: `${firstName} ${lastName}`
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





























 module.exports = app;


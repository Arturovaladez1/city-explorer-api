'use strict';

const express = require('express');
let data = require('./data/weather.json');

require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('hello from our server');
});

app.get('/sayHello', (req, res) => {
  let firstName = req.query.firstName;
  console.log(req.query.firstName);
  res.send(`hello ${firstName}`);
});

app.get('/data', (request, response) => {
  let weather = request.query.weather;
  data.find(weather )
})


app.get('*', (req, res) => {
  res.send('the resource does not exist');
});

// Listen is a express method takes in two arguments, port value and a call back function
app.listen(PORT, () => console.log(`listening on ${PORT}`));

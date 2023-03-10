'use strict';

const express = require('express');
const data = require('./data/weather.json');
const app = express();
const cors = require('cors');
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT || 3002;


// passed in from weather json and transfered to the forcast object
class Forecast {
  constructor(ForecastObject){
    this.date = ForecastObject.datetime;
    this.description = ForecastObject.weather.description;
  }
}
// routes
app.get('/weather', (req, res, next) => {
  // res.send('hello from our server');
  try {
    let cityReq = req.query.searchQuery;

    let city = data.find(cityData => {
      return cityData.city_name === cityReq;
    });

    let weatherData = city.data.map(info => {
      return new Forecast(info);
    });

    res.send(weatherData);

  } catch (error) {
    next(error);
  }
});

// app.get('/sayHello', (req, res) => {
//   let firstName = req.query.firstName;
//   console.log(req.query.firstName);
//   res.send(`hello ${firstName}`);
// });

app.get('*', (req, res) => {
  res.send('the resource does not exist');
})

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})

// Listen is a express method takes in two arguments, port value and a call back function
app.listen(PORT, () => console.log(`listening on ${PORT}`));

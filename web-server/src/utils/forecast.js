const request = require("request");

// const forecast = (lat, lon, callback) => {
//   const url = `http://api.weatherstack.com/current?access_key=08ef58d048d60060202d1537458fa246&query=${encodeURIComponent(
//     lat
//   )},${encodeURIComponent(lon)}&units=f`;

//   //chose not to destructure response:
//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect to weather service.", undefined);
//     } else if (response.body.error) {
//       callback("Unable to find location.", undefined);
//     } else {
//       const { temperature, feelslike } = response.body.current;

//       // const temperature = response.body.current.temperature;
//       // const feelslike = response.body.current.feelslike;

//       //chose not to destructure this:
//       const description = response.body.current.weather_descriptions[0];

//       callback(undefined, {
//         message: `${description}. It is currently ${temperature} degrees out. Its feels like ${feelslike} degrees out.`,
//       });
//     }
//   });
// };

const forecastBase = process.env.FORECAST_BASE_URL;
const forecastKeyName = process.env.FORECAST_KEY_NAME;
const forecastKeyVal = process.env.FORECAST_KEY_VALUE;

const forecast = (lat, lon, callback) => {
  const url = `${forecastBase}?${forecastKeyName}=${forecastKeyVal}&query=${encodeURIComponent(
    lat
  )},${encodeURIComponent(lon)}&units=f`;

  //chose not to destructure response:
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, feelslike } = response.body.current;

      // const temperature = response.body.current.temperature;
      // const feelslike = response.body.current.feelslike;

      //chose not to destructure this:
      const description = response.body.current.weather_descriptions[0];

      callback(undefined, {
        message: `${description}. It is currently ${temperature} degrees out. Its feels like ${feelslike} degrees out.`,
      });
    }
  });
};

module.exports = { forecast };

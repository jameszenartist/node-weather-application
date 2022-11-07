const request = require("request");

const geocodeBase = process.env.GEOCODE_BASE_URL;
const geocodeKeyName = process.env.GEOCODE_KEY_NAME;
const geocodeKeyVal = process.env.GEOCODE_KEY_VALUE;

const geocode = (address, cb) => {
  const url = `${geocodeBase}?${geocodeKeyName}=${geocodeKeyVal}&query=${encodeURIComponent(
    address
  )}&limit=1`;
  //chose not to destructure response:
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      cb("Unable to connect to location services!", undefined);
    } else if (!response.body.data || !response.body.data[0]) {
      cb("Unable to find location!", undefined);
    } else {
      const { latitude, longitude, label } = response.body.data[0];

      cb(undefined, {
        // latitude: latitude,
        // longitude: longitude,
        // label: label,
        latitude,
        longitude,
        label,
      });
    }
  });
};

module.exports = { geocode };

const request = require("request");

//using positionstack API"
// const geocodeURL = `http://api.positionstack.com/v1/forward?access_key=${psKey}&query=${psQuery}&limit=1`;
// const psKey = "bfa736c8bb241a9a7516db706bdcac0c";
// const params = "Los%20Angeles%20";
// const psQuery = `${params}`;
// request({ url: geocodeURL, json: true }, (error, response) => {
//   if (error) {
//     throw new Error("LOW LEVEL ERROR: ", error);
//   } else if (response.body.data.length === 0) {
//     console.log("Unable to find location!");
//   } else {
//     const { latitude, longitude } = response.body.data[0];
//     console.log(latitude, longitude);
//   }
// });

// const geocode = (address, cb) => {
//   const url = `http://api.positionstack.com/v1/forward?access_key=${psKey}&query=${encodeURIComponent(
//     address
//   )}&limit=1`;
//   //chose not to destructure response:
//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       cb("Unable to connect to location services!", undefined);
//     } else if (!response.body.data || !response.body.data[0]) {
//       cb("Unable to find location!", undefined);
//     } else {
//       const { latitude, longitude, label } = response.body.data[0];

//       cb(undefined, {
//         // latitude: latitude,
//         // longitude: longitude,
//         // label: label,
//         latitude,
//         longitude,
//         label,
//       });
//     }
//   });
// };

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

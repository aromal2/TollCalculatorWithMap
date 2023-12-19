const axios = require("axios");
const { decode, encode } = require("@googlemaps/polyline-codec");
const { configKey } = require('../config')


// Function to fetch toll data from TollGuru API
const fetchTollData = async (req, res) => {
  const requestData = {
    from: {
      address: req.body.startLocation,
    },
    to: {
      address: req.body.endLocation,
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "config.APIKEY",
    },
  };
  try {
    const response = await axios.post(
      "https://apis.tollguru.com/toll/v2/origin-destination-waypoints",
      requestData,
      config
    );

    const fuelEfficiency = response.data.summary.fuelEfficiency;
    const fuelPrice = response.data.summary.fuelPrice;
    const fuel = { fuelEfficiency, fuelPrice };
    const data = response.data.routes[0].polyline;

    //polyline from API is decoding
    const decodedPolyline = decode(data);
    return res.json({ fuel, decodedPolyline });
  } catch (error) {
    throw error;
  }
};

module.exports = { fetchTollData };

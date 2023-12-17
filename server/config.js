const dotenv = require("dotenv");

const result = dotenv.config();

if (result.error) {
  throw result.error;
}


const configKey = {
  API_KEY: process.env.API_KEY,
}

module.exports = { configKey };

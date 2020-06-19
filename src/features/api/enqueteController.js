const axios = require("axios");

const config = require("./config.json");

async function getEnquete() {
  try {
    const response = await axios.get(`${config.baseURL}/enquetes`);
    return response.data;
  } catch (error) {
    return error;
  }
}

module.exports = getEnquete;

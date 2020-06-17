const axios = require("axios");

const config = require("./config.json");

async function postVoto() {
    try {
      const response = await axios.post(`${config.baseURL}votos`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  
  module.exports = postVoto;
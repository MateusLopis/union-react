const axios = require("axios");

const config = require("./config.json");

async function getConvidados() {
  try {
    const response = await axios.get(`${config.baseURL}servicos`);
    return response.data;
  } catch (error) {
    return error;
  }
}

module.exports = getConvidados;

const axios = require("axios");

const config = require("./config.json");

async function getEmpresa() {
  try {
    const response = await axios.get(`${config.baseURL}empresas`);
    return response.data;
  } catch (error) {
    return error;
  }
}

module.exports = getEmpresa;

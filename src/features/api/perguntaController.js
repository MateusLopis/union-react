const axios = require("axios");

const config = require("./config.json");

export default async function getPerguntas() {
  try {
    const response = await axios.get(`${config.baseURL}/perguntas`);
    return response.data;
  } catch (error) {
    return error;
  }
}

//module.exports = getPerguntas;

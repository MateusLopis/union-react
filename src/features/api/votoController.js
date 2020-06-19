const axios = require("axios");

const config = require("./config.json");

export default async function postVoto(idPergunta, votos) {
  try {
    const response = await axios.post(
      `${config.baseURL}/votos/${idPergunta}`,
      votos
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

//module.exports = postVoto;

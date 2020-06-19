const axios = require("axios");

const config = require("./config.json");

export default async function postConvidado(idUsuario, convidado) {
  try {
    const response = await axios.post(
      `${config.baseURL}/convidados/${idUsuario}`,
      convidado
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export default async function getConvidado() {
  try {
    const response = await axios.get(`${config.baseURL}/convidados`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export default async function putConvidado(idConvidado, convidado) {
  try {
    const response = await axios.put(
      `${config.baseURL}/convidados/${idConvidado}`,
      convidado
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

//module.exports = { postConvidado, putConvidado, getConvidado };

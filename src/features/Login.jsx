import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Input, Button } from "antd";
import Form from "antd/lib/form/Form";
import Title from "antd/lib/skeleton/Title";

import enqueteController from "./api/enqueteController";
import servicosController from "./api/perguntaController";

const { Sider, Content } = Layout;

function Login(props) {
  const [enquete, setEnquete] = useState({});
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [block, setBlock] = useState(false);

  const renderQuery = async () => {
    const enquetes = await enqueteController();
    const [, id] = props && props.location.search.split("=");

    if (id) {
      const [enqueteSelecionada] = enquetes.filter(
        (enquete) => enquete.idEnquete.toString() === id
      );

      setEnquete(enqueteSelecionada);
      setBlock(false);
    } else {
      setBlock(true);
    }
  };

  useEffect(() => {
    renderQuery();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ minHeight: "100vh" }}>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: "100vh" }}
          >
            <Col xs={20} md={12}>
              <h2>Convidado do casal:</h2>
              <h2>{enquete.tituloEnquete}</h2>
              <Input
                placeholder="Nome"
                value={nomeUsuario}
                onChange={({ target: { value } }) => setNomeUsuario(value)}
                disabled={block}
              />
              <Button
                style={{
                  marginTop: "20px",
                  marginLeft: "50px",
                  backgroundColor: "#ff4646",
                  borderColor: "#ff4646",
                }}
                type="primary"
                onClick={() => {
                  window.location.href = `/enquete?id=${enquete.idEnquete}`;
                  localStorage.setItem("nomeUsuario", nomeUsuario);
                }}
                disabled={block}
              >
                Entrar
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Sider
        width="75%"
        style={{
          background: "url(https://i.imgur.com/wJLKOub.jpg) no-repeat",
          backgroundSize: "cover",
        }}
        breakpoint="md"
        collapsedWidth="0"
      />
    </Layout>
  );
}

export default Login;

// const questions = [
//   {
//     id: "question1",
//     question: "Qual é a casa blabla",
//     answers: [
//       {
//         id: "1-answer1",
//         url:
//           "http://www.odiariodemogi.net.br/wp-content/uploads/2019/11/21a.jpg",
//         descricao: "Casa linda em Florença",
//       },
//       {
//         id: "1-answer2",
//         url:
//           "http://agencia.sorocaba.sp.gov.br/wp-content/uploads/2019/02/casaro-brig-tobias-gui-urban-20.jpg",
//         descricao: "Casa linda em Bragança",
//       },
//     ],
//   },
//   {
//     id: "question2",
//     question: "Qual é a casa Blublu",
//     answers: [
//       {
//         id: "2-answer1",
//         url:
//           "http://www.odiariodemogi.net.br/wp-content/uploads/2019/11/21a.jpg",
//         descricao: "Casa linda em Florença",
//       },
//       {
//         id: "2-answer2",
//         url:
//           "http://agencia.sorocaba.sp.gov.br/wp-content/uploads/2019/02/casaro-brig-tobias-gui-urban-20.jpg",
//         descricao: "Casa linda em Bragança",
//       },
//     ],
//   },
// ];

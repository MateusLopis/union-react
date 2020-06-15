import React, { useState, useEffect, Fragment, Component } from "react";
import { Button, Menu, Row, Col, Progress, Layout, Card, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";

import enqueteController from "./api/enqueteController";
import perguntaController from "./api/perguntaController";
import { createBrowserHistory } from "history";

const { Header } = Layout;

function Menuzaun(props) {
  return (
    <Menu mode="horizontal" style={{ borderBottom: "5px #ff4646 solid" }}>
      <Row>
        <Col md={5}>
          <div className="logo" />
        </Col>
        <Col md={14}>
          <Progress percent={props.progresso} status="active" />
        </Col>
        <Col md={4} style={{ textAlign: "right" }}>
          <Button
            disabled={props.disabledButton}
            style={{ backgroundColor: "#ff4646", borderColor: "#ff4646" }}
            onClick={() => {
              window.location.href = "/agradecimento";
            }}
          >
            Enviar Enquete
          </Button>
        </Col>
      </Row>
    </Menu>
  );
}

function App(props) {
  let [progresso, setProgresso] = useState(0);
  let [enquete, setEnquete] = useState([]);

  let [titulo, setTitulo] = useState("");

  const mapPegunta = (pergunta) => {
    const favoritos = [];
    for (let i = 0; i - 4; i++) {
      favoritos.push(pergunta[`favorito${i + 1}`]);
    }
    return {
      ...pergunta,
      favoritos,
    };
  };

  const renderEnquete = async () => {
    const [, id] = props && props.location.search.split("=");
    const enquetes = await enqueteController();
    const perguntas = await perguntaController();

    const [enqueteSelecionada] = enquetes.filter(
      (enquete) => enquete.idEnquete.toString() === id
    );
    const perguntasSelecionada = perguntas.filter(
      (pergunta) => pergunta.enquete.idEnquete.toString() === id
    );

    setEnquete({
      ...enqueteSelecionada,
      perguntas:
        perguntasSelecionada.length > 0 && perguntasSelecionada.map(mapPegunta),
    });
  };

  useEffect(() => {
    renderEnquete();
    setTitulo(`Seja Bem Vindo ${localStorage.getItem("nomeUsuario")}`);
  }, []);

  console.log(enquete.perguntas);

  return (
    <Fragment>
      <Menuzaun progresso={progresso} disabledButton={false} />
      <Header
        style={{
          backgroundColor: "#fff",
          textAlign: "center",
          height: "100px",
          boxShadow: "2px 5px #f4f4f4",
        }}
      >
        <h1>{titulo}</h1>
      </Header>
      {enquete &&
        enquete.perguntas &&
        enquete.perguntas.map((pergunta) => (
          <Fragment>
            <h1>{pergunta.perguntaEscrita}</h1>
            <Row style={{ marginLeft: "10px" }}>
              {pergunta.favoritos.map((favorito) => (
                <Fragment>
                  {favorito && (
                    <Col tyle={{ marginLeft: "10px" }}>
                      <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={favorito.servico.urlImagem} />}
                        onClick={() => setProgresso(progresso + 10)}
                      >
                        <Meta title={favorito.servico.descricao} />
                      </Card>
                    </Col>
                  )}
                </Fragment>
              ))}
            </Row>
          </Fragment>
        ))}
    </Fragment>
  );
}

export default App;

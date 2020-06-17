import React, { useState, useEffect, Fragment, Component } from "react";
import { Button, Menu, Row, Col, Progress, Layout, Card } from "antd";
import Meta from "antd/lib/card/Meta";

import enqueteController from "./api/enqueteController";
import perguntaController from "./api/perguntaController";
import { createBrowserHistory } from "history";
import "./App.css";

const { Header } = Layout;

function Menuzaun(props) {
  return (
    <Menu mode="horizontal" style={{ borderBottom: "5px #ff4646 solid" }}>
      <Row>
        <Col md={5}>
          <div className="logo" />
        </Col>
        <Col md={14}>
          <Progress percent={props.progresso} status="active"  strokeColor="#FF7676"/>
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
  let [eichProgress, setEichProgress] = useState(0);

  let [enquete, setEnquete] = useState([]);
  let [titulo, setTitulo] = useState("");

  const mapPegunta = (pergunta) => {
    const favoritos = [];
    for (let i = 0; i < 4; i++) {
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
    setEichProgress(100 / perguntasSelecionada.length);
  };

  const handleSelecionarCarrinho = () => {};

  const resetSelectAnswer = (pergunta, favoritoParam) => {
    return pergunta.favoritos.map((favorito) => {
      return favorito !== null
        ? {
            ...favorito,
            selecionado: favoritoParam.idFavorito === favorito.idFavorito,
          }
        : null;
    });
  };

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    renderEnquete();
    setTitulo(`Seja Bem Vindo ${localStorage.getItem("nomeUsuario")}`);
  }, []);

  return (
    <Fragment>
      <Menuzaun progresso={progresso} disabledButton={progresso < 100} />
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
            <h1 style={{marginLeft: "17%", marginTop: "40px"}} >{pergunta.perguntaEscrita}</h1>
            <Row style={{ marginLeft: "17%" }}>
              {pergunta.favoritos.map((favorito) => (
                <Fragment style={{ marginLeft: "30px"}}>
                  {favorito && (
                    <Col style={{ marginRight: "30px"}}>
                      <Card
                        hoverable={!favorito.selecionado}
                        className={favorito.selecionado ? "clicado" : ""}
                        style={{ width: 240}}
                        cover={
                          <img
                            style={{ width: 240, height: 180 }}
                            alt="example"
                            src={favorito.servico.urlImagem}
                          />
                        }
                        onClick={() => {
                          handleSelecionarCarrinho();
                          pergunta.favoritos = resetSelectAnswer(
                            pergunta,
                            favorito
                          );
                          setProgresso(
                            enquete.perguntas
                              .filter((pergunta) =>
                                pergunta.favoritos
                                  .map(
                                    (favorito) =>
                                      favorito && favorito.selecionado
                                  )
                                  .includes(true)
                              )
                              .map((el) => eichProgress)
                              .reduce((a, b) => a + b)
                          );
                          forceUpdate();
                        }}
                        type="primary"
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

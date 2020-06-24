import React, { useState, useEffect, Fragment, src } from "react";
import { Button, Menu, Row, Col, Progress, Layout, Card } from "antd";
import Meta from "antd/lib/card/Meta";

import union from "../images/union.png";


import enqueteController from "./api/enqueteController";
import perguntaController from "./api/perguntaController";
import { getConvidado, putConvidado } from "./api/convidadoController";
import votoController from "./api/votoController";

import "./App.css";

const { Header } = Layout;

function Menuzaun(props) {
  const { convidado, enquete } = props.registro;

  const onSubmit = async () => {
    const { idConvidado } = convidado;
    const { perguntas } = enquete;
    const convidadoPUT = await putConvidado(idConvidado, {
      ...convidado,
      status: "votou",
    });

    if (convidadoPUT) {
      for (const pergunta of perguntas) {
        const [resposta] = pergunta.favoritos.filter(
          (favorito) => favorito && favorito.selecionado
        );
        await votoController(pergunta.idPergunta, {
          convidado: { idConvidado },
          favorito: { idFavorito: resposta.idFavorito },
          pergunta: { idPergunta: resposta.idPergunta },
        });
      }
    }
    
    window.location.href = `/agradecimento`;
  };

  return (
    <Menu mode="horizontal" style={{ borderBottom: "5px #ff4646 solid" }}>
      <Row>
        <Col md={5}>
          <div className="logo" style={{ marginLeft: "50px" }}>
          <img src={union} width="110px" />
          </div>
        </Col>
        <Col md={14}>
          <Progress
            percent={props.progresso}
            status="active"
            strokeColor="#FF7676"
          />
        </Col>
        <Col md={4} style={{ textAlign: "right" }}>
          <Button
            disabled={props.disabledButton}
            style={{ backgroundColor: "#ff4646", borderColor: "#ff4646" }}
            onClick={async () => {
              await onSubmit();
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
  let [convidado, setConvidado] = useState({});

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

  const renderConvidado = async () => {
    const idConvidado = localStorage.getItem("idConvidado");
    const convidados = await getConvidado();

    const [convidadoSelecionado] = convidados.filter(
      (convidado) => convidado.idConvidado.toString() === idConvidado
    );

    setConvidado(convidadoSelecionado);
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
    renderConvidado();
  }, []);

  return (
    <Fragment>
      <Menuzaun
        progresso={progresso}
        disabledButton={progresso < 100}
        registro={{ convidado, enquete }}
      />
      <Header
        style={{
          backgroundColor: "#fff",
          textAlign: "center",
          height: "100px",
          boxShadow: "2px 5px #f4f4f4",
        }}
      >
        <h1>Seja Bem Vindo {convidado && convidado.nome} !</h1>
      </Header>
      {enquete &&
        enquete.perguntas &&
        enquete.perguntas.map((pergunta) => (
          <Fragment>
            <h1 style={{ marginLeft: "17%", marginTop: "40px" }}>
              {pergunta.perguntaEscrita}
            </h1>
            <Row style={{ marginLeft: "17%" }}>
              {pergunta.favoritos.map((favorito) => (
                <Fragment style={{ marginLeft: "30px" }}>
                  {favorito && (
                    <Col style={{ marginRight: "30px" }}>
                      <Card
                        hoverable={!favorito.selecionado}
                        className={favorito.selecionado ? "clicado" : ""}
                        style={{ width: 240 }}
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
                        <Meta title={favorito.servico.nomeServico} />
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

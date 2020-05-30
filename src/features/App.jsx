import React, { useState, useEffect, Fragment } from "react";
import { Button, Menu, Row, Col, Progress, Layout, Card, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import Title from "antd/lib/skeleton/Title";

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
          <Button disabled={props.disabledButton}>Enviar Enquete</Button>
        </Col>
      </Row>
    </Menu>
  );
}

// const handleQuestions = () => {};

// const handlePercent = (qtdeQuestion) => 10;

function App() {
  let [progresso, setProgresso] = useState(0);
  let [titulo, setTitulo] = useState("Seja Bem-vindo!");

  const questions = [
    {
      id: "question1",
      question: "Qual é a casa blabla",
      answers: [
        {
          id: "1-answer1",
          url: "http://www.odiariodemogi.net.br/wp-content/uploads/2019/11/21a.jpg",
          descricao: "Casa linda em Florença",
        },
        {
          id: "1-answer2",
          url: "http://agencia.sorocaba.sp.gov.br/wp-content/uploads/2019/02/casaro-brig-tobias-gui-urban-20.jpg",
          descricao: "Casa linda em Bragança",
        },
      ],
    },
    {
      id: "question2",
      question: "Qual é a casa Blublu",
      answers: [
        {
          id: "2-answer1",
          url: "http://www.odiariodemogi.net.br/wp-content/uploads/2019/11/21a.jpg",
          descricao: "Casa linda em Florença",
        },
        {
          id: "2-answer2",
          url: "http://agencia.sorocaba.sp.gov.br/wp-content/uploads/2019/02/casaro-brig-tobias-gui-urban-20.jpg",
          descricao: "Casa linda em Bragança",
        },
      ],
    },
  ];

  return (
    <Fragment>
      <Menuzaun progresso={progresso} disabledButton={progresso !== 100} />
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
      {questions.map((question) => (
        <Fragment>
          <h1>{question.question}</h1>
          <Row style={{ marginLeft: "10px" }}>
            {question.answers.map((answer) => (
              <Col tyle={{ marginLeft: "10px" }}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={answer.url}
                    />
                  }
                >
                  <Meta title={answer.descricao} />
                </Card>
              </Col>
            ))}
          </Row>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default App;

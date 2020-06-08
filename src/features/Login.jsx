import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Input, Button } from "antd";
import Form from "antd/lib/form/Form";
import Title from "antd/lib/skeleton/Title";

const { Sider, Content } = Layout;

function Login() {
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
              <h1>BLABLA</h1>
              <Input placeholder="Email" />

              <Button
                type="primary"
                onClick={() => {
                  window.location.href = "/enquete";
                }}
              >
                Entrar
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Sider
        width="60%"
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

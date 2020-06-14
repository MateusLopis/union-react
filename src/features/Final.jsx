import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Input, Button } from "antd";
import Form from "antd/lib/form/Form";
import Title from "antd/lib/skeleton/Title";

const { Sider, Content } = Layout;

function Final() {
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
            <Col xs={20} md={15}>
              
              <h1>Obrigado pela</h1>
              <h1>sua opnião!</h1>
              <br/>
              Ajudar os noivos desse momento é bem <br/>
              importante. Mantenha contato com eles. Agora <br/>
              é so aguentar o tão esperado dia do <br/>
              casamento!

              <br/>
              <Button
              style={{ marginTop: "20px", marginLeft:"50px", 
              backgroundColor: "#ff4646", 
              borderColor: "#ff4646"}}   
              type="primary"
              onClick={() => {
                  window.location.href = "/enquete";
                }}
              >
                Pagina Inicial!
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Sider
        width="55%"
        style={{
          background: "url(https://i.imgur.com/XNQ0PKZ.png) no-repeat",
          backgroundSize: "cover",
          backgroundPosition:"center"
        }}
        breakpoint="md"
        collapsedWidth="0"
      />
    </Layout>
  );
}

export default Final;


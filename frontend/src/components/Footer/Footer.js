import React from 'react'
import { Col, Container, Row } from "react-bootstrap";


const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor:"#34110F",
        color:"white",
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container fluid>
        <Row>
          <Col className="text-center py-3">Copyright &copy; ArtFusion</Col>
        </Row>
      </Container>
    </footer>

  )
}

export default Footer
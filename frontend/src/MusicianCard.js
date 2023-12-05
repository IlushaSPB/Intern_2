// MusicianCard.js
import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const MusicianCard = ({ musician }) => (
  <Card className="mx-auto my-3" style={{ backgroundColor: "#710808", color: "whitesmoke", maxWidth: "800px", borderRadius: "15px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
    <Container>
      <Row>
        <Col md={6}>
          <Card.Img
            variant="top"
            src={musician.photo}
            alt={musician.nickname}
            style={{ width: "100%", height: "auto", objectFit: "cover", borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px" }}
          />
        </Col>
        <Col md={6}>
          <Card.Body className="d-flex flex-column justify-content-between h-100">
            <div>
              <Card.Title>{musician.nickname}</Card.Title>
              <Card.Text>{musician.bio}</Card.Text>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  </Card>
);

export default MusicianCard;

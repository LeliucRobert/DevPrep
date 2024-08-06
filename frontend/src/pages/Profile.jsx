import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import profile from "/images/hero1.png";
const Profile = () => {
  return (
    <>
      <Row className="learn-row"></Row>
      <Row className="mb-3">
        <Col lg="2"></Col>
        <Col></Col>
      </Row>
      <Row></Row>
    </>
  );
};

export default Profile;

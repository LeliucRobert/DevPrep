import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { useContext, useState } from "react";
import api from "../../api";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import "../../styles/ModalForm.css";

function ModalForm({ show, handleClose, login, route }) {
  const title = login ? "Log In" : "Register";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const { login: loginContext } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    setAuthError("");

    if (!login && password !== confirmPassword) {
      setAuthError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(route, { username, password });
      if (login) {
        loginContext(res.data.access);
        handleClose();
      } else {
        alert("User registered successfully");
        handleClose();
      }
    } catch (error) {
      setAuthError(error.response?.data?.detail || "An error occurred");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="spinner-container">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {!login && (
              <>
                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                  />
                </Form.Group>
              </>
            )}
            {authError && (
              <div style={{ color: "red", marginTop: "5px" }}>{authError}</div>
            )}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {title}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalForm;

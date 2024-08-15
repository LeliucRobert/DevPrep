import React from "react";
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "../styles/SolveProblems/ProblemPage.css";
import { Alert } from "react-bootstrap";
import { Badge } from "react-bootstrap";
const ProblemPage = () => {
  const { title } = useParams();

  const location = useLocation();
  const problemData = location.state;
  const navigate = useNavigate();

  const handleGoToLearnPage = () => {
    navigate("/problems/");
  };
  console.log(problemData);
  return (
    <>
      <Row className="learn-row"></Row>

      <Row className="learn-header mb-4">
        <Col lg="2"></Col>
        <Col lg="8">
          <Row className="align-items-center">
            <Col md="auto">
              <h2 className="learn-title mb-0">{problemData.title}</h2>
            </Col>
            <Col md="auto">
              <Alert variant="danger" className="idAlert mb-0">
                #{problemData.id}
              </Alert>
            </Col>
            <Col md="auto">
              {problemData.difficulty === "Easy" ? (
                <Badge className="difficulty-badge" bg="success">
                  Easy{" "}
                </Badge>
              ) : problemData.difficulty === "Medium" ? (
                <Badge className="difficulty-badge" bg="warning">
                  Medium{" "}
                </Badge>
              ) : (
                <Badge className="difficulty-badge" bg="danger">
                  Hard{" "}
                </Badge>
              )}
            </Col>
            <Col md className="text-md-end">
              <Button variant="primary" onClick={handleGoToLearnPage}>
                Back
              </Button>
            </Col>
          </Row>
          <div className="learn-divider"></div>

          <Row className="problem-description">
            <Col>
              <strong>Description:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: problemData.description,
                }}
              />
            </Col>
          </Row>
          <Row className="problem-input-data">
            <Col>
              <strong>Input Data:</strong>{" "}
              <div
                dangerouslySetInnerHTML={{
                  __html: problemData.input_description,
                }}
              />
            </Col>
          </Row>
          <Row className="problem-output-data">
            <Col>
              <strong>Output Data:</strong>{" "}
              <div
                dangerouslySetInnerHTML={{
                  __html: problemData.output_description,
                }}
              />
            </Col>
          </Row>
          <Row className="problem-constraints">
            <Col>
              <strong>Constraints:</strong>{" "}
              <div>
                <ul>
                  <li>
                    <code>{problemData.restrictions}</code>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="problem-example">
            <Col>
              <strong>Example:</strong>

              <div className="problem-example-input">
                <code>
                  Input:
                  {problemData.sample_input}
                </code>
              </div>
              <div className="problem-example-output">
                <code>
                  Output:
                  {problemData.sample_output}
                </code>
              </div>
            </Col>
          </Row>
          <Row>hahaahhahahah</Row>
        </Col>
        <Col lg="2"></Col>
      </Row>
    </>
  );
};

export default ProblemPage;

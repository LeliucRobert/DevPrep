import React from "react";
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "../styles/SolveProblems/ProblemPage.css";
import { Alert } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import CodeEditor from "../components/SolveProblems/CodeEditor";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import api from "../api";
import { ScrollPanel } from "primereact/scrollpanel";
import { Link } from "react-router-dom";

const ProblemPage = () => {
  const { title } = useParams();
  const [submissions, setSubmissions] = useState([]);

  const location = useLocation();
  const problemData = location.state;
  const navigate = useNavigate();

  const handleGoToLearnPage = () => {
    navigate("/problems/");
  };
  console.log(problemData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `api/problems/${problemData.id}/getSubmissions`
        );
        setSubmissions(response.data);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
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
          <div className="learn-divider mb-5"></div>
          <Row>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Problem Submissions</Accordion.Header>
                <Accordion.Body>
                  <Row style={{ paddingLeft: "15px" }} className="mb-3">
                    <Col lg="1">Id</Col>
                    <Col lg="2">Username</Col>
                    <Col lg="2">Problem</Col>
                    <Col lg="3">Language</Col>
                    <Col lg="2">Date</Col>
                    <Col lg="1">Score</Col>
                  </Row>

                  <ScrollPanel style={{ width: "100%", height: "300px" }}>
                    {submissions.map((submission, index) => (
                      <Alert
                        key={index}
                        className="alert-submission mb-1" // Add a small margin for spacing between alerts
                        variant={
                          submission.total_score === 0 &&
                          submission.status === "Completed"
                            ? "danger"
                            : submission.total_score === 100
                            ? "success"
                            : submission.total_score > 0 &&
                              submission.total_score < 100
                            ? "warning"
                            : "secondary"
                        }
                      >
                        <Row className="align-items-center">
                          <div style={{ flex: "0 0 8%", textAlign: "left" }}>
                            #{submission.id}
                          </div>
                          <div
                            style={{
                              flex: "0 0 17%",
                              marginLeft: "10px",
                            }}
                          >
                            {submission.user.username}
                          </div>
                          <div
                            style={{
                              flex: "0 0 10%",
                              marginLeft: "10px",
                            }}
                          >
                            {submission.problem.title}
                          </div>
                          <div
                            style={{
                              flex: "0 0 18%",
                              marginLeft: "10px",
                              textAlign: "center",
                            }}
                          >
                            {submission.language}
                          </div>
                          <div
                            style={{
                              flex: "0 0 24%",
                              marginLeft: "10px",
                              textAlign: "right",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {formatDate(submission.created_at)}
                          </div>
                          <div style={{ flex: "0 0 10%", textAlign: "right" }}>
                            {submission.status === "Completed"
                              ? submission.total_score
                              : "Failed"}
                          </div>
                          {/* <div style={{ flex: "0 0 9%", textAlign: "right" }}>
                            <Button variant="link">View</Button>
                          </div> */}
                        </Row>
                      </Alert>
                    ))}
                  </ScrollPanel>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
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
          <Row>
            <CodeEditor problemId={problemData.id} />
          </Row>
        </Col>
        <Col lg="2"></Col>
      </Row>
    </>
  );
};

export default ProblemPage;

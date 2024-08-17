import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Editor from "@monaco-editor/react";
import "../../styles/SolveProblems/CodeEditor.css";
import api from "../../api";
import { ProgressSpinner } from "primereact/progressspinner";
import Alert from "react-bootstrap/Alert";
const initialCodeByLanguage = {
  cpp: "// Start coding in C++ here...",
  python: "# Start coding in Python here...",
  javascript: "// Start coding in JavaScript here...",
  java: "// Start coding in Java here...",
};

const CodeSubmissionForm = ({ problemId }) => {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(initialCodeByLanguage[language]);
  const [testResults, setTestResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  const resultsRectangle = useRef(null);

  const res = [
    {
      source_code: "Ly8gU3RhcnQgY29kaW5nIGluIEMrKyBoZXJlLi4u",
      language: "...",
      status: "accepted",
    },
    {
      source_code: "Ly8gU3RhcnQgY29kaW5nIGluIEMrKyBoZXJlLi4u",
      language: "...",
      status: "compilation error",
    },
    {
      source_code: "Ly8gU3RhcnQgY29kaW5nIGluIEMrKyBoZXJlLi4u",
      language: "...",
      status: "wrong answer",
    },
  ];

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(initialCodeByLanguage[selectedLanguage]);
  };

  async function postCode() {
    setLoading(true);
    try {
      const response = await api.post(`api/problems/${problemId}/submission`, {
        user_code: code,
        language: language,
      });
      console.log(response.data);
      setTestResults(response.data);
    } catch (error) {
      console.error("Error submitting code:", error);
    } finally {
      setLoading(false);
    }
  }
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const handleSubmitButton = async () => {
    setShowResults(true);
    // postCode();

    setLoading(false);
    setTimeout(() => {
      resultsRectangle.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  return (
    <Container className="mt-5">
      <div className="grey-background">
        <h2 className="mt-4 mb-5">Submit your code here!</h2>
        <Form>
          <Form.Group as={Row} className="my-3">
            <Form.Label column>
              <strong>Choose the language</strong>
            </Form.Label>
            <Col lg={2}>
              <Form.Control
                as="select"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
              </Form.Control>
            </Col>
            <Col lg={8}></Col>
          </Form.Group>

          <div className="editor-container">
            <Editor
              height="600px"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
              }}
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="primary" onClick={handleSubmitButton}>
              Submit solution
            </Button>
          </div>
        </Form>
      </div>

      {showResults &&
        (loading ? (
          <div
            className="grey-background results-rectangle"
            ref={resultsRectangle}
          >
            <div className="results-container">
              <div className="text-container">
                <h2 className="mt-4">Running your code...</h2>
                <p>Please wait while we run your code...</p>
              </div>
              <div className="spinner-container">
                <ProgressSpinner className="spinner-loading" />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="grey-background results-rectangle"
            ref={resultsRectangle}
          >
            <h5 className="mt-4">Test results</h5>
            <div>
              {res.map((item, index) => (
                <div
                  className={`test-result ${
                    item.status === "accepted"
                      ? "accepted"
                      : item.status === "wrong answer"
                      ? "wrong-answer"
                      : "default"
                  }`}
                  key={index}
                >
                  <h3 className="test-number">Test {index + 1}</h3>
                  <p className="test-label">
                    <strong>Status: {item.status}</strong>
                  </p>
                  <p>
                    <i>25p</i>
                  </p>

                  {item.status === "accepted" && (
                    <img
                      src="/public/images/good.png"
                      alt="Accepted Icon"
                      className="icon-small"
                    />
                  )}
                  {item.status === "wrong answer" && (
                    <img
                      src="/public/images/wrong.png"
                      alt="Wrong Answer Icon"
                      className="icon-small"
                    />
                  )}
                  {item.status !== "accepted" &&
                    item.status !== "wrong answer" && (
                      <img
                        src="/public/images/danger.png"
                        alt="Default Icon"
                        className="icon-small"
                      />
                    )}
                </div>
              ))}
            </div>
            <div className="final-score">
              <Alert variant="warning" className="alert-final-score">
                <h2>Final Score: 0/100</h2>
              </Alert>
            </div>
          </div>
        ))}
    </Container>
  );
};

export default CodeSubmissionForm;

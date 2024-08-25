import React, { useState, useRef, useEffect } from "react";
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
  const [finalScore, setFinalScore] = useState(0);
  const [errorMessages, setErrorMessages] = useState("");
  const resultsRectangle = useRef(null);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(initialCodeByLanguage[selectedLanguage]);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSubmitButton = async () => {
    setShowResults(true);
    setLoading(true);

    try {
      const postResponse = await api.post(
        `api/problems/${problemId}/submission`,
        {
          user_code: code,
          language: language,
        }
      );

      const submissionId = postResponse.data.submission_id;

      let pollResponse;
      let isCompleted = false;
      const maxAttempts = 10;
      let attempts = 0;

      while (!isCompleted && attempts < maxAttempts) {
        await sleep(2000);

        pollResponse = await api.get(`api/submissions/${submissionId}/results`);

        if (pollResponse.data.status === "Completed") {
          isCompleted = true;
          setTestResults(pollResponse.data.results);
          setFinalScore(pollResponse.data.total_score);
          setErrorMessages("");
        } else if (pollResponse.data.status === "Compilation Error") {
          isCompleted = true;
          setErrorMessages("Compilation Error!");
        } else if (pollResponse.data.status === "Failed") {
          isCompleted = true;
          setErrorMessages("Something bad happened!");
        }

        attempts += 1;
      }
    } catch (error) {
      setErrorMessages(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showResults) {
      resultsRectangle.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, showResults]);

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
        ) : errorMessages !== "" ? (
          <div
            className="grey-background results-rectangle"
            ref={resultsRectangle}
          >
            <div className="results-container">
              <div className="text-container">
                <h2 className="mt-4">Error</h2>
                <p>There was an error running your code:</p>
                <p>{errorMessages}</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="grey-background results-rectangle"
            ref={resultsRectangle}
          >
            <h3 className="mt-4 mb-4 text-center">
              <strong>Test results</strong>
            </h3>
            <div>
              {testResults.map((item, index) => (
                <div
                  className={`test-result ${
                    item.status === "Accepted"
                      ? "accepted"
                      : item.status === "Wrong Answer"
                      ? "wrong-answer"
                      : item.status === "Compilation Error"
                      ? "compilation-error"
                      : "default"
                  }`}
                  key={index}
                >
                  <h3 className="test-number">Test {index + 1}</h3>
                  <p className="test-label">
                    <strong>Status: {item.status}</strong>
                  </p>
                  <p>
                    <i>{item.score ? `${item.score}p` : "0p"}</i>
                  </p>

                  {item.status === "Accepted" && (
                    <img
                      src="images/good.png"
                      alt="Accepted Icon"
                      className="icon-small"
                    />
                  )}
                  {item.status === "Wrong Answer" && (
                    <img
                      src="images/wrong.png"
                      alt="Wrong Answer Icon"
                      className="icon-small"
                    />
                  )}
                  {item.status !== "Accepted" &&
                    item.status !== "Wrong Answer" && (
                      <img
                        src="images/danger.png"
                        alt="Default Icon"
                        className="icon-small"
                      />
                    )}
                </div>
              ))}
            </div>
            <div className="final-score">
              <Alert variant="warning" className="alert-final-score">
                <h2>Final Score: {finalScore}</h2>
              </Alert>
            </div>
          </div>
        ))}
    </Container>
  );
};

export default CodeSubmissionForm;

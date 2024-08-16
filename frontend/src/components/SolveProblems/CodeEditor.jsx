import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Editor from "@monaco-editor/react";
import "../../styles/SolveProblems/CodeEditor.css";
import api from "../../api";

const initialCodeByLanguage = {
  cpp: "// Start coding in C++ here...",
  python: "# Start coding in Python here...",
  javascript: "// Start coding in JavaScript here...",
  java: "// Start coding in Java here...",
};

const CodeSubmissionForm = ({ problemId }) => {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(initialCodeByLanguage[language]);
  const [showResults, setShowResults] = useState(false);

  const resultsRectangle = useRef(null);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(initialCodeByLanguage[selectedLanguage]);
  };

  async function postCode() {
    const response = await api.post(`api/problems/${problemId}/submission`, {
      user_code: code,
      language: language,
    });
    console.log(response.data);
  }

  const handleSubmitButton = () => {
    postCode();

    setShowResults(true);

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

      {showResults && (
        <div
          className="grey-background results-rectangle"
          ref={resultsRectangle}
        >
          <h5 className="mt-4">New Rectangle Rendered</h5>
          <p>Your new content goes here...</p>
        </div>
      )}
    </Container>
  );
};

export default CodeSubmissionForm;

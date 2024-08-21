import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1
        style={{ fontSize: "6rem", marginBottom: "30px", marginTop: "300px" }}
      >
        404
      </h1>
      <h2 style={{ marginBottom: "1.5rem" }}>Page Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;

import React from "react";
import "../../styles/HeroTerminal.css";
import ModalForm from "../NavBar/ModalForm";
import { useState } from "react";

const HeroTerminal = () => {
  const [showModalRegister, setShowModalRegister] = useState(false);

  const handleShowRegister = () => setShowModalRegister(true);

  const handleClose = () => {
    setShowModalRegister(false);
  };
  return (
    <>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button red"></span>
          <span className="terminal-button yellow"></span>
          <span className="terminal-button green"></span>
        </div>
      </div>
      <div className="terminal-body">
        <p>
          &gt; Walk into your coding interviews feeling like you{" "}
          <span className="highlight">own the room.</span>
        </p>
        <p>
          Feel empowered to land your{" "}
          <span className="highlight">dream job</span>
        </p>
        <p>Confidently answer any technical question.</p>
        <p>
          Never bomb an <span className="highlight">interview</span> again.
        </p>
      </div>
      <div className="terminal-footer">
        <button className="cta-button" onClick={handleShowRegister}>
          Create a Free Account for Full Access &rarr;
        </button>
      </div>
      <ModalForm
        show={showModalRegister}
        handleClose={handleClose}
        login={false}
        route="/api/user/register/"
      />
    </>
  );
};

export default HeroTerminal;

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
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="terminal-button red"></span>
          <span class="terminal-button yellow"></span>
          <span class="terminal-button green"></span>
        </div>
      </div>
      <div class="terminal-body">
        <p>
          &gt; Walk into your coding interviews feeling like you{" "}
          <span class="highlight">own the room.</span>
        </p>
        <p>
          Feel empowered to land your <span class="highlight">dream job</span>
        </p>
        <p>Confidently answer any technical question.</p>
        <p>
          Never bomb an <span class="highlight">interview</span> again.
        </p>
      </div>
      <div class="terminal-footer">
        <button class="cta-button" onClick={handleShowRegister}>
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

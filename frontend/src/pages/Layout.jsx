import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/NavBar.css";
import { useContext, useEffect, useState } from "react";
import "../styles/Layout.css";
const Layout = ({ children }) => {
  const { isAuthorized, username } = useContext(AuthContext);
  return (
    <div>
      <NavBar username={username} isAuthorized={isAuthorized} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;

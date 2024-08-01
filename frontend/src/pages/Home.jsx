import "../styles/NavBar.css";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";
import NavBar from "../components/NavBar";
import { AuthContext } from "../contexts/AuthContext";
function Home() {
  // const { isAuthorized, username } = useContext(AuthContext);
  // return <NavBar username={username} isAuthorized={isAuthorized} />;
}

export default Home;

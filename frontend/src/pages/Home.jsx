import "../styles/NavBar.css";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";
import NavBar from "../components/NavBar/NavBar";
import { AuthContext } from "../contexts/AuthContext";
import HeroSection from "../components/Home/HeroSection";
import AboutLearnSection from "../components/Home/AboutLearnSection";
import AboutProblemsSection from "../components/Home/AboutProblemsSection";
function Home() {
  // const { isAuthorized, username } = useContext(AuthContext);
  // return <NavBar username={username} isAuthorized={isAuthorized} />;
  return (
    <>
      <HeroSection />
      <br />
      <br />
      <br />
      <AboutLearnSection />
      <br />
      <br />
      <br />
      <AboutProblemsSection />
    </>
  );
}

export default Home;

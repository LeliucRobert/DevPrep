import "../styles/NavBar.css";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";
import NavBar from "../components/NavBar";
import { AuthContext } from "../contexts/AuthContext";
import HeroSection from "../components/HeroSection";
import AboutLearnSection from "../components/AboutLearnSection";
import AboutInterviewSection from "../components/AboutInterviewsSection";
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
      <AboutInterviewSection />
    </>
  );
}

export default Home;

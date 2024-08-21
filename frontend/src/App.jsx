import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/Utils/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import Learn from "./pages/Learn";
import Layout from "./pages/Layout";
import LessonPage from "./pages/LessonPage";
import Profile from "./pages/Profile";
import SolveProblems from "./pages/SolveProblems";
import ProblemPage from "./pages/ProblemPage";
import ScrollToTop from "./components/Utils/ScrollToTop";
import ComingSoon from "./pages/ComingSoon";
import AnimatedPage from "./components/Utils/AnimatedPage";
import "./styles/index.css";
import "./styles/custom-bootstrap.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={AnimatedPage(Home)()} />
        <Route path="/profile/:username" element={AnimatedPage(Profile)()} />
        <Route path="/problems" element={AnimatedPage(SolveProblems)()} />
        <Route path="/learn" element={AnimatedPage(Learn)()} />
        <Route path="/learn/:title" element={AnimatedPage(LessonPage)()} />
        <Route path="/problems/:id" element={AnimatedPage(ProblemPage)()} />
        <Route path="/login" element={AnimatedPage(Login)()} />
        <Route path="/interviews" element={AnimatedPage(ComingSoon)()} />

        <Route path="/*" element={AnimatedPage(NotFound)()} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastProvider>
          <Layout>
            <ScrollToTop />
            <AnimatedRoutes />
          </Layout>
        </ToastProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/Utils/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import Learn from "./pages/Learn";
import Layout from "./pages/Layout";
import "./styles/index.css";
import LessonPage from "./pages/LessonPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastProvider>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  // <ProtectedRoute>
                  <Home />
                  // </ProtectedRoute>
                }
              />
              <Route path="/profile/:username" element={<Profile />}></Route>
              <Route path="/learn" element={<Learn />}></Route>
              <Route path="/learn/:title" element={<LessonPage />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/*" element={<NotFound />}></Route>
            </Routes>
          </Layout>
        </ToastProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

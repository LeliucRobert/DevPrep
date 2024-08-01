import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Learn from "./pages/Learn";
import Layout from "./pages/Layout";
// function Logout() {
//   localStorage.clear();
//   return <Navigate to="/" />;
// }

// function RegisterAndLogout() {
//   localStorage.clear();
//   return <Register />;
// }

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
            <Route path="/learn" element={<Learn />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

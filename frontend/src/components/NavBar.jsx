import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import ModalForm from "../components/ModalForm";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

function NavBar({ username, isAuthorized }) {
  const { logout } = useContext(AuthContext);

  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);

  const handleShowLogin = () => setShowModalLogin(true);
  const handleShowRegister = () => setShowModalRegister(true);

  const handleClose = () => {
    setShowModalLogin(false);
    setShowModalRegister(false);
  };

  const handleLogout = (e) => {
    logout();
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/learn">
              Learn
            </Nav.Link>
            <Nav.Link as={Link} to="/problems">
              Solve Problems
            </Nav.Link>
            <Nav.Link href="/interviews">Mock Interviews</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {isAuthorized ? (
              <Navbar.Text>
                Signed in as:
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={username}
                  menuVariant="dark"
                >
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Text>
            ) : (
              <>
                <Button variant="dark" onClick={handleShowLogin}>
                  {" "}
                  Log in{" "}
                </Button>

                <Button variant="dark" onClick={handleShowRegister}>
                  {" "}
                  Register{" "}
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalForm
        show={showModalLogin}
        handleClose={handleClose}
        login={true}
        route="/api/token/"
        method="login"
      />
      <ModalForm
        show={showModalRegister}
        handleClose={handleClose}
        login={false}
        route="/api/user/register/"
      />
    </>
  );
}

export default NavBar;

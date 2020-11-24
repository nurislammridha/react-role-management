import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, withRouter } from "react-router-dom";

const Header = props => {
  const [isLogged, setIsLogged] = useState(false);
  const logout = () => {
    localStorage.removeItem("userData");
    setIsLogged(false);
    props.history.push("/");
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || undefined;
    if (typeof userData != "undefined") {
      if (userData.username && userData.username.length > 0) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    }
  });

  return (
    <Navbar bg="light" expand="lg">
      <div className="container">
        <Navbar.Brand href="#home">Role App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {!isLogged && (
              <Nav.Link>
                <Link to="/">Login</Link>
              </Nav.Link>
            )}

            {isLogged && (
              <>
                <Nav.Link>
                  <Link to="/users">Users</Link>
                </Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default withRouter(Header);

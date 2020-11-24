import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./login.css";
import checkLogin from "../../services/auth/LoginService";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorMessage: ""
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData")) || undefined;
    if (typeof userData != "undefined") {
      if (userData.username && userData.username.length > 0) {
        this.props.history.push("/users");
      }
    }
  }

  changeUserName = e => {
    const username = e.target.value;
    this.setState({ username });
  };

  changePassword = e => {
    const password = e.target.value;
    this.setState({ password });
  };

  submitLogin = () => {
    if (checkLogin(this.state)) {
      this.setState({
        errorMessage: ""
      });
      localStorage.setItem("userData", JSON.stringify(this.state));
      this.props.history.push("/users");
    } else {
      this.setState({
        errorMessage: "Sorry !! Invalid username and password"
      });
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center login-area">
        <Card style={{ width: "30rem" }}>
          <h3 className="text-center mt-2 mb-2 text-uppercase">Login</h3>
          <hr />
          {this.state.errorMessage.length > 0 && (
            <Alert show={true} variant="danger" className="m-2">
              <p>{this.state.errorMessage}</p>
            </Alert>
          )}

          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.username}
                  placeholder="Enter your username"
                  onChange={this.changeUserName}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.changePassword}
                />
              </Form.Group>
              <div className="text-center">
                <Button
                  variant="primary"
                  type="button"
                  className="btn btn-primary btn-block text-uppercase"
                  onClick={this.submitLogin}
                >
                  Login
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withRouter(Login);

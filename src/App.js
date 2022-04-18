import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
function App(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // eslint-disable-next-line default-case
    switch (id) {
      case 'name_s':
        setName(value);
        break;
      case 'email_s':
        setEmail(value);
        break;
      case 'password_s':
        setPassword(value);
        break;
      case 'c_password_s':
        setCPassword(value);
        break;
      case 'email_login':
        setLoginEmail(value);
        break;
      case 'password_login':
        setLoginPassword(value);
        break;
    }
  };
  const handleSubmit = () => {
    let data = {
      name: name,
      email: email,
      password: password,
      c_password: cPassword
    };
    const headers = {
      'Content-Type': 'application/json'
    };

    axios
      .post(`${process.env.BASE_URL}/api/register`, data, {
        headers: headers
      })
      .then((response) => {
        alert('User Registered Successfully!')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleLogin = () => {
    let data = {
      email: loginEmail,
      password: loginPassword
    };
    const headers = {
      'Content-Type': 'application/json'
    };

    axios
      .post(`${process.env.BASE_URL}/api/login`, data, {
        headers: headers
      })
      .then((response) => {
        localStorage.setItem('token', response.data.data.token);
      setTimeout(()=>{  navigate('/products')},500)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <h3>Product Finder</h3>
      <Container fluid="md" className="mt-5">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Login</Card.Title>

                <Form>
                  <Form.Group className="mb-3" controlId="email_login">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={loginEmail}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password_login">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => handleInputChange(e)}
                    />
                    
                  </Form.Group>

                  <Button variant="primary" type="button" onClick={() => handleLogin()}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Register</Card.Title>

                <Form>
                  <Form.Group className="mb-3" controlId="name_s">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email_s">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password_s">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="c_password_s">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={cPassword}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="button" onClick={() => handleSubmit()}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

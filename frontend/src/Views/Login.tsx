import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";

function Login({setAuth} : any) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username:''
    });
    const [validated, setValidated] = useState(false);
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            console.log('Form Data:', formData);
        }
        setValidated(true);
    };

    function sendData() {
        
        // axios.post()    
        axios.post(`http://localhost:3000/${formData.username}`, formData).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div>
        <Navigation />
        <Container data-bs-theme="dark" className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-50">
                <h2 className="mb-4 text-center">Log In</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formEmail">
                        <Col sm="10">
                            <Form.Control
                                name="email"
                                required
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                />
                            <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPassword">
                        <Col sm="10">
                            <Form.Control
                                name="password"
                                required
                                minLength={6}
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                />
                            <Form.Control.Feedback type="invalid">Your password must be at least 6 characters long and contain at least one uppercase letter, one number, and one special character.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formUsername">
                        <Col sm="10">
                            <Form.Control
                                name="username"
                                required
                                type="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                />
                        </Col>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" onClick={sendData} type="submit">Log in</Button>
                    </div>
                </Form>
            </div>
        </Container>
        </div>
    );
}

export default Login;
